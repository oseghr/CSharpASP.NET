// <copyright file="PostOperationopportunityUpdate.cs" company="">
// Copyright (c) 2017 All Rights Reserved
// </copyright>
// <author></author>
// <date>8/23/2017 4:41:18 PM</date>
// <summary>Implements the PostOperationopportunityUpdate Plugin.</summary>
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.1
// </auto-generated>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ServiceModel;
using Microsoft.Xrm.Sdk;
using NetworkInnovations.Crm.Core.Crm;
using NetworkInnovations.Crm.Core.Crm.Data;
using System.Reflection;
using NetworkInnovations.Plugins;

namespace NetworkInnovations.Crm.Plugins
{

    /// <summary>
    /// PostOperationopportunityUpdate Plugin.
    /// Fires when the following attributes are updated:
    /// ni_purchaseindicationsweighing,ni_didtheprospectgiveuspurchaseindications,ni_decisionprocessweighing,ni_doiknowthecompletedecisionprocess,ni_competitionweighing,ni_dowehavecompetition,ni_exactrequirementsweighing,ni_dowemeettheirexactrequirements,ni_experienceswithniweighing,ni_doestheprospecthaveexperienceswithni,ni_immediateserviceweighing,ni_doestheprospectneedourservicesnow,ni_expectedmonthtogettheorder,ni_dmuweighing,ni_howismycontactwiththedmu,ni_budgetweighing,ni_isthereenoughbudget,ni_margin,ni_match,ni_revenueexvathardware,ni_revenueexvathardware_base,ni_revenueexclvatairtime,ni_revenueexclvatairtime_base,ni_revenueexclvatmaintenance,ni_revenueexclvatmaintenance_base,ni_scoringchances,ni_totalrevenueforecast,ni_totalrevenueforecast_base,ni_weightmarginexvat,ni_weightmarginexvat_base,ni_weightedrevenueexvat,ni_weightedrevenueexvat_base
    /// </summary>    
    public class PostOpportunityUpdate: Plugin
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="PostOpportunityUpdate"/> class.
        /// </summary>
        /// <param name="unsecure">Contains public (unsecured) configuration information.</param>
        /// <param name="secure">Contains non-public (secured) configuration information. 
        /// When using Microsoft Dynamics 365 for Outlook with Offline Access, 
        /// the secure string is not passed to a plug-in that executes while the client is offline.</param>
        public PostOpportunityUpdate(string unsecure, string secure)
            : base(typeof(PostOpportunityUpdate))
        {
            base.RegisteredEvents.Add(new Tuple<int, string, string, Action<LocalPluginContext>>(40, "Update", "opportunity", new Action<LocalPluginContext>(ExecutePostOpportunityUpdate)));
            // TODO: Implement your custom configuration handling.
        }


        /// <summary>
        /// Main entry point for he business logic that the plug-in is to execute.
        /// </summary>
        /// <param name="localContext">The <see cref="LocalPluginContext"/> which contains the
        /// <see cref="IPluginExecutionContext"/>,
        /// <see cref="IOrganizationService"/>
        /// and <see cref="ITracingService"/>
        /// </param>
        /// <remarks>
        /// For improved performance, Microsoft Dynamics 365 caches plug-in instances.
        /// The plug-in's Execute method should be written to be stateless as the constructor
        /// is not called for every invocation of the plug-in. Also, multiple system threads
        /// could execute the plug-in at the same time. All per invocation state information
        /// is stored in the context. This means that you should not use global variables in plug-ins.
        /// </remarks>
        protected void ExecutePostOpportunityUpdate(LocalPluginContext localContext)
        {
            IPluginExecutionContext context = localContext.PluginExecutionContext;
            IOrganizationService service = localContext.OrganizationService;

            if (context.InputParameters.Contains("Target") &&
                context.InputParameters["Target"] is Entity &&
                context.Depth <= 1)
            {
                try
                {
                    using (var svcContext = new NISvcContext(localContext.OrganizationService))
                    {
                        var opportunity_entity = ((Entity)context.InputParameters["Target"]).ToEntity<Opportunity>();
                        var opportunity_entity_postimage = ((Entity)context.PostEntityImages["PostImage"]).ToEntity<Opportunity>();

                        // ensure default values are set
                        Utilities.EnsureDefaultScotsmanValues(ref opportunity_entity, opportunity_entity_postimage);

                        // calculate values
                        var num =
                            (MatchFunc(opportunity_entity.ni_Doestheprospectneedourservicesnow != null ? opportunity_entity.ni_Doestheprospectneedourservicesnow.Value : opportunity_entity_postimage.ni_Doestheprospectneedourservicesnow!=null?opportunity_entity_postimage.ni_Doestheprospectneedourservicesnow.Value:0) *
                            (opportunity_entity.ni_immediateserviceweighing != null ? opportunity_entity.ni_immediateserviceweighing : opportunity_entity_postimage.ni_immediateserviceweighing) +
                            MatchFunc(opportunity_entity.ni_Isthereenoughbudget != null ? opportunity_entity.ni_Isthereenoughbudget.Value : opportunity_entity_postimage.ni_Isthereenoughbudget!=null?opportunity_entity_postimage.ni_Isthereenoughbudget.Value:0) *
                            (opportunity_entity.ni_budgetweighing != null ? opportunity_entity.ni_budgetweighing : opportunity_entity_postimage.ni_budgetweighing) +
                            MatchFunc(opportunity_entity.ni_HowismycontactwiththeDMU != null ? opportunity_entity.ni_HowismycontactwiththeDMU.Value : opportunity_entity_postimage.ni_HowismycontactwiththeDMU!=null?opportunity_entity_postimage.ni_HowismycontactwiththeDMU.Value:0) *
                            (opportunity_entity.ni_dmuweighing != null ? opportunity_entity.ni_dmuweighing : opportunity_entity_postimage.ni_dmuweighing) +
                            MatchFunc(opportunity_entity.ni_DoIknowthecompletedecisionprocess != null ? opportunity_entity.ni_DoIknowthecompletedecisionprocess.Value : opportunity_entity_postimage.ni_DoIknowthecompletedecisionprocess!=null?opportunity_entity_postimage.ni_DoIknowthecompletedecisionprocess.Value:0) *
                            (opportunity_entity.ni_decisionprocessweighing != null ? opportunity_entity.ni_decisionprocessweighing : opportunity_entity_postimage.ni_decisionprocessweighing) +
                            MatchFunc(opportunity_entity.ni_Dowehavecompetition != null ? opportunity_entity.ni_Dowehavecompetition.Value : opportunity_entity_postimage.ni_Dowehavecompetition!=null?opportunity_entity_postimage.ni_Dowehavecompetition.Value:0) *
                            (opportunity_entity.ni_competitionweighing != null ? opportunity_entity.ni_competitionweighing : opportunity_entity_postimage.ni_competitionweighing) +
                            MatchFunc(opportunity_entity.ni_Dowemeettheirexactrequirements != null ? opportunity_entity.ni_Dowemeettheirexactrequirements.Value : opportunity_entity_postimage.ni_Dowemeettheirexactrequirements!=null?opportunity_entity_postimage.ni_Dowemeettheirexactrequirements.Value:0) *
                            (opportunity_entity.ni_exactrequirementsweighing != null ? opportunity_entity.ni_exactrequirementsweighing : opportunity_entity_postimage.ni_exactrequirementsweighing) +
                            MatchFunc(opportunity_entity.ni_Didtheprospectgiveuspurchaseindications != null ? opportunity_entity.ni_Didtheprospectgiveuspurchaseindications.Value : opportunity_entity_postimage.ni_Didtheprospectgiveuspurchaseindications!=null?opportunity_entity_postimage.ni_Didtheprospectgiveuspurchaseindications.Value:0) *
                            (opportunity_entity.ni_purchaseindicationsweighing != null ? opportunity_entity.ni_purchaseindicationsweighing : opportunity_entity_postimage.ni_purchaseindicationsweighing) +
                            MatchFunc(opportunity_entity.ni_DoestheprospecthaveexperienceswithNI != null ? opportunity_entity.ni_DoestheprospecthaveexperienceswithNI.Value : opportunity_entity_postimage.ni_DoestheprospecthaveexperienceswithNI!=null?opportunity_entity_postimage.ni_DoestheprospecthaveexperienceswithNI.Value:0) *
                            (opportunity_entity.ni_experienceswithniweighing != null ? opportunity_entity.ni_experienceswithniweighing : opportunity_entity_postimage.ni_experienceswithniweighing)) * 100;

                        var denom = (
                            (opportunity_entity.ni_immediateserviceweighing != null ? opportunity_entity.ni_immediateserviceweighing : opportunity_entity_postimage.ni_immediateserviceweighing) +
                            (opportunity_entity.ni_budgetweighing != null ? opportunity_entity.ni_budgetweighing : opportunity_entity_postimage.ni_budgetweighing) +
                            (opportunity_entity.ni_dmuweighing != null ? opportunity_entity.ni_dmuweighing : opportunity_entity_postimage.ni_dmuweighing) +
                            (opportunity_entity.ni_decisionprocessweighing != null ? opportunity_entity.ni_decisionprocessweighing : opportunity_entity_postimage.ni_decisionprocessweighing) +
                            (opportunity_entity.ni_competitionweighing != null ? opportunity_entity.ni_competitionweighing : opportunity_entity_postimage.ni_competitionweighing) +
                            (opportunity_entity.ni_exactrequirementsweighing != null ? opportunity_entity.ni_exactrequirementsweighing : opportunity_entity_postimage.ni_exactrequirementsweighing) +
                            (opportunity_entity.ni_purchaseindicationsweighing != null ? opportunity_entity.ni_purchaseindicationsweighing : opportunity_entity_postimage.ni_purchaseindicationsweighing) +
                            (opportunity_entity.ni_experienceswithniweighing != null ? opportunity_entity.ni_experienceswithniweighing : opportunity_entity_postimage.ni_experienceswithniweighing)
                            ) * 4;

                        if (num != null && denom != null)
                        {
                            var match = Math.Round((double)num / (double)denom);
                            opportunity_entity.ni_Match = (int)match;
                        }

                        svcContext.ClearChanges();
                        svcContext.Attach(opportunity_entity);
                        svcContext.UpdateObject(opportunity_entity);
                        svcContext.SaveChanges();

                        //svcContext.AddObject(lead);
                        //svcContext.SaveChanges();
                    }
                }
                catch (Exception ex)
                {
                    throw new InvalidPluginExecutionException("An error occurred in the plug-in.", ex);
                }
            }
        }

        public int MatchFunc(int Value)
        {
            int MatchedPosition = 0;
            if (Value == 157530000)
            {
                MatchedPosition = 1;
            }
            else if (Value == 157530001)
            {
                MatchedPosition = 2;
            }
            else if (Value == 157530002)
            {
                MatchedPosition = 3;
            }
            else if (Value == 157530003)
            {
                MatchedPosition = 4;
            }

            return MatchedPosition;
        }
    }
}
