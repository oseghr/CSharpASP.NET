﻿using System;
using Microsoft.Xrm.Sdk;
using System.Linq;
using System.Text;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Runtime.Serialization;





namespace SamplePlugins
{
    public class PostCreateContact : IPlugin
    {
        private object isEntity;

        /// A plug-in that creates a follow-up task activity when a new account is created.
        /// Register this plug-in on the Create message, account entity,
        /// and asynchronous mode.

        public void Execute(IServiceProviderserviceProvider)
        {
            // Obtain the execution context from the service provider.
            IPluginExecutionContext context = (IPluginExecutionContext)
               serviceProvider.GetService(typeof(IPluginExecutionContext));

            // The InputParameters collection contains all the data
            passed in the message request.
  
         if ((context.InputParameters.Contains("Target") &&
            context.InputParameters["Target"]isEntity)) {

                // Obtain the target entity from the input parameters.
                Entity entity = (Entity)context.InputParameters["Target"];
                try
                {

                    // Create a task activity to follow up with the account customer in 7 days
                    Entity followup = new Entity("task");
                    followup["subject"] = "Send e-mail to the new customer.";
                    followup["description"] =
                       "Follow up with the customer. Check if there are any new issues
                      that need resolution.";
    

               followup["scheduledstart"] = DateTime.Now;
                    followup["scheduledend"] = DateTime.Now.AddDays(2);
                    followup["category"] = context.PrimaryEntityName;

                    // Refer to the contact in the task activity.
                    if (context.OutputParameters.Contains("id"))
                    {
                        Guid regardingobjectid = new Guid(context.OutputParameter
      
                           s["id"].ToString());
                        string regardingobjectidType = "contact";
                        followup["regardingobjectid"] =
                           new EntityReference(rega rdingobjectidType, regardingobjectid);
                    }

                    // Obtain the organization service reference.
                    IOrganizationServiceFactory serviceFactory =
                       (IOrganizationSer viceFactory)serviceProvider.GetService
                       (typeof(IOrganizationServiceFactory));
                    IOrganizationService service =
                       serviceFactory.CreateOrganizationService(context.UserId);

                    // Create the followup activity
                    service.Create(followup);
                }
                catch (Exception ex)
                {
                    throw new InvalidPluginExecutionException(ex.Message);
                }
            }
        }
    }
}

