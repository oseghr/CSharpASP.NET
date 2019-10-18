::Entities
CrmSvcUtil.exe ^
/url:https://uat-networkinnovations.crm3.dynamics.com/XRMServices/2011/Organization.svc ^
/out:..\..\Crm\Data\Entities.cs ^
/username:Jonathan.lam@networkinv.com ^
/password:Iomer*3122 ^
/namespace:NetworkInnovations.Crm.Core.Crm.Data ^
/serviceContextName:NISvcContext


::Option Sets
CrmSvcUtil.exe ^
/codewriterfilter:"Microsoft.Crm.Sdk.Samples.FilteringService, GeneratePicklistEnums" ^
/codecustomization:"Microsoft.Crm.Sdk.Samples.CodeCustomizationService, GeneratePicklistEnums" ^
/namingservice:"Microsoft.Crm.Sdk.Samples.NamingService, GeneratePicklistEnums" ^
/url:https://uat-networkinnovations.crm3.dynamics.com/XRMServices/2011/Organization.svc ^
/out:..\..\Crm\Data\OptionSets.cs ^
/username:Jonathan.lam@networkinv.com ^
/password:Iomer*3122 ^
/namespace:NetworkInnovations.Crm.Core.Crm.Data ^