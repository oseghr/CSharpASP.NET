namespace ClassLibrary1
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using Microsoft.Crm.Sdk.Messages;
    using Microsoft.Xrm.Sdk;
    using Microsoft.Xrm.Sdk.Messages;
    
    using NetworkInnovations.Crm.Core.Crm.Data;
    using NetworkInnovations.Plugins;

    public class PostCaseCreateAsyncs : Plugint
    {
        
        public PostCaseCreateAsyncs(string unsecure, string secure)
            : base(typeof(PostCaseCreateAsyncs))
        {
            base.RegisteredEvents.Add(new Tuple<int, string, string, Action<LocalPluginContext>>(40, "Create", "incident", new Action<LocalPluginContext>(ExecutePostCreateAsync)));   
            // TODO: Implement your custom configuration handling.
        }

        protected void ExecutePostCreateAsync(LocalPluginContext localContext)
        {      

            if (localContext == null)
            {
                throw new InvalidPluginExecutionException("localContext");
            }
            
            IPluginExecutionContext context = localContext.PluginExecutionContext;
            IOrganizationService service = localContext.OrganizationService;

            localContext.TracingService.Trace("== Calling Case Create START ==");

            if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
            {
                localContext.TracingService.Trace("== Case Create RUNNING ==");
                using (var svcContext = new NISvcContext(localContext.OrganizationService))
                {
                    var caseTarget = ((Entity)context.InputParameters["Target"]).ToEntity<Incident>();
                    
                    // get support queue
                    var supportQueue = Utilities.GetSupportQueue(svcContext);
                    var fromParty = new List<ActivityParty>
                    {
                        new ActivityParty { PartyId = supportQueue.ToEntityReference() }
                    };

                    // to email
                    if (caseTarget.CustomerId == null)
                    {
                        throw new Exception("Cannot send auto-response email: Customer on case is not set.");
                    }

                    var toParties = new List<ActivityParty>
                    {
                        new ActivityParty { PartyId = caseTarget.CustomerId }
                    };

                    // cc emails - retrieve related contacts from case
                    var ccParties = new List<ActivityParty>();
                    if (!string.IsNullOrEmpty(caseTarget.ni_RelatedContactEmails))
                    {
                        var ccList = caseTarget.ni_RelatedContactEmails.Split(';').ToList();
                        var saveChanges = false;
                        foreach (var cc in ccList)
                        {
                            // check for existence of contact. Create if not present
                            var contact = svcContext.ContactSet
                                .Where(e => e.EMailAddress1 != null && e.EMailAddress1 == cc)
                                .FirstOrDefault();
                            if (contact == null)
                            {
                                saveChanges = true;
                                contact = new Contact
                                {
                                    ContactId = Guid.NewGuid(),
                                    LastName = cc,
                                    EMailAddress1 = cc
                                };

                                svcContext.AddObject(contact);
                            }

                            ccParties.Add(new ActivityParty
                            {
                                PartyId = contact.ToEntityReference()
                            });
                        }

                        if (saveChanges) svcContext.SaveChanges();
                    }
                    localContext.TracingService.Trace("== Case Create END ==");
                    // tie related contacts to N:N relationship with case
                    var relatedContacts = new EntityReferenceCollection();
                    ccParties.ForEach(e => relatedContacts.Add(e.PartyId));

                    var associateRequest = new AssociateRequest
                    {
                        Target = caseTarget.ToEntityReference(),
                        Relationship = new Relationship("ni_incident_related_contacts"),
                        RelatedEntities = relatedContacts
                    };

                    service.Execute(associateRequest);

                    // email template retrieval
                    var templateName = Utilities.GetConfigValue(svcContext, "Case Auto Email Template");
                    var emailTemplate = svcContext.TemplateSet
                        .Where(e => e.Title == templateName)
                        .Select(e => new Template
                        {
                            TemplateId = e.TemplateId,
                            TemplateTypeCode = e.TemplateTypeCode
                        })
                       .FirstOrDefault();
                    if (emailTemplate == null)
                    {
                        throw new Exception("Could not find template with name 'Case Auto Response'. Please ensure this email template exists.");
                    }

                    // email construction + send w/ template
                    var email = new Email
                    {
                        From = fromParty,
                        To = toParties,
                        Cc = ccParties,
                        Subject = "Case Auto-response email",
                        Description = "Case Auto-response email"
                    };

                    var sendRequest = new SendEmailFromTemplateRequest
                    {
                        Target = email,
                        TemplateId = emailTemplate.TemplateId.Value,
                        RegardingId = caseTarget.IncidentId.Value,
                        RegardingType = Incident.EntityLogicalName
                    };

                    var sendResponse = (SendEmailFromTemplateResponse)service.Execute(sendRequest);
                    localContext.TracingService.Trace("== Case Create END ==");
                    if (sendResponse == null || sendResponse.Id == null || sendResponse.Id == Guid.Empty)
                    {
                        throw new Exception("Send template email request failed. Returned Id from response came back empty");
                    }
                }
            }
        }
    }
}
