namespace ClassLibrary1
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    using Microsoft.Xrm.Sdk;

    using NetworkInnovations.Crm.Core.Crm.Data;

    public static class Utilities
    {
        //public static void EnsureDefaultScotsmanValues(ref Opportunity opportunity, Opportunity opportunityPostImage)
        //{
        //    // weighting defaults
        //    if ((opportunityPostImage?.ni_purchaseindicationsweighing ?? opportunity.ni_purchaseindicationsweighing) == null)
        //        opportunity.ni_purchaseindicationsweighing = 2;

        //    if ((opportunityPostImage?.ni_decisionprocessweighing ?? opportunity.ni_decisionprocessweighing) == null)
        //        opportunity.ni_decisionprocessweighing = 2;

        //    if ((opportunityPostImage?.ni_competitionweighing ?? opportunity.ni_competitionweighing) == null)
        //        opportunity.ni_competitionweighing = 2;

        //    if ((opportunityPostImage?.ni_exactrequirementsweighing ?? opportunity.ni_exactrequirementsweighing) == null)
        //        opportunity.ni_exactrequirementsweighing = 3;

        //    if ((opportunityPostImage?.ni_experienceswithniweighing ?? opportunity.ni_experienceswithniweighing) == null)
        //        opportunity.ni_experienceswithniweighing = 1;

        //    if ((opportunityPostImage?.ni_immediateserviceweighing ?? opportunity.ni_immediateserviceweighing) == null)
        //        opportunity.ni_immediateserviceweighing = 3;

        //    if ((opportunityPostImage?.ni_dmuweighing ?? opportunity.ni_dmuweighing) == null)
        //        opportunity.ni_dmuweighing = 2;

        //    if ((opportunityPostImage?.ni_budgetweighing ?? opportunity.ni_budgetweighing) == null)
        //        opportunity.ni_budgetweighing = 2;

        //    // revenue defaults
        //    if ((opportunityPostImage?.ni_RevenueExVATHardware ?? opportunity.ni_RevenueExVATHardware) == null)
        //        opportunity.ni_RevenueExVATHardware = new Money(0);

        //    if ((opportunityPostImage?.ni_RevenueExclVATAirtime ?? opportunity.ni_RevenueExclVATAirtime) == null)
        //        opportunity.ni_RevenueExclVATAirtime = new Money(0);

        //    if ((opportunityPostImage?.ni_RevenueExclVATMaintenance ?? opportunity.ni_RevenueExclVATMaintenance) == null)
        //        opportunity.ni_RevenueExclVATMaintenance = new Money(0);
        //}

        public static Queue GetSupportQueue(NISvcContext svcContext, string name = "CRM Support")
        {
            var queueEmail = GetConfigValue(svcContext, name);

            var supportQueue = svcContext.QueueSet
                .Where(e => e.EMailAddress == queueEmail)
                .Select(e => new Queue
                {
                    QueueId = e.QueueId,
                    EMailAddress = e.EMailAddress,
                    Name = e.Name
                })
                .FirstOrDefault();

            if (supportQueue == null)
            {
                throw new Exception("CRM Support email queue does not exist. Please ensure that it exists.");
            }

            return supportQueue;
        }

        public static string GetConfigValue(NISvcContext svcContext, string key)
        {
            var value = svcContext.ni_queueSet
                            .Where(e => e.ni_name == key)
                            .Select(e => e.ni_Email)
                            .FirstOrDefault();
            if (string.IsNullOrEmpty(value))
            {
                throw new Exception("CRM Support queue configuration does not exist. Please ensure that it exists in the custom ni_queue entity.");
            }

            return value;
        }
    }
}
