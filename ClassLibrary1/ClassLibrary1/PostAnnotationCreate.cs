// Decompiled with JetBrains decompiler
// Type: NetworkInnovations.Crm.Plugins.PostAnnotationCreate
// Assembly: NetworkInnovations.Crm.Plugins, Version=1.3.0.0, Culture=neutral, PublicKeyToken=a4b6b3ab1edf0d16
// MVID: F34155CF-389E-482F-B5BF-EA3BF793B381
// Assembly location: C:\Users\oseghae.oaikhena\source\repos\NetworkInnovations.Crm.Plugins_1.3.0.0.dll

using Microsoft.Xrm.Sdk;
using NetworkInnovations.Crm.Core.Crm.Data;
using NetworkInnovations.Plugins;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace ClassLibrary1
{
    public class PostAnnotationCreates : Plugint
    {

        public PostAnnotationCreates(string unsecure, string secure)
          : base(typeof(PostAnnotationCreates))
        {
            this.RegisteredEvents.Add(new Tuple<int, string, string, Action<Plugint.LocalPluginContext>>(40, "Create", "annotation", new Action<Plugint.LocalPluginContext>(this.ExecutePostAnnotationCreate)));
            
        }

        protected void ExecutePostAnnotationCreate(Plugint.LocalPluginContext localContext)
        {
            IPluginExecutionContext executionContext = localContext.PluginExecutionContext;
            IOrganizationService organizationService = localContext.OrganizationService;


            if (localContext == null)
            {
                throw new InvalidPluginExecutionException(nameof(localContext));
            }
            

            if (!(executionContext.InputParameters.Contains("Target")) ||
            !(executionContext.InputParameters["Target"] is Entity))
                return;

            using (NISvcContext niSvcContext = new NISvcContext(localContext.OrganizationService))
            {
            Entity annotation_entity = (Entity)executionContext.InputParameters["Target"];

                // ISSUE: reference to a compiler-generated field
                localContext.TracingService.Trace("== Calling Annotation START ==");
                if (annotation_entity.LogicalName == "ni_emailview")
                {
                    localContext.TracingService.Trace("== Calling Annotation RUNNING ==");
                    ActivityMimeAttachment activityMimeAttachment = new ActivityMimeAttachment();
                    //ParameterExpression parameterExpression;
                    // ISSUE: field reference
                    // ISSUE: method reference
                    // ISSUE: method reference
                    // ISSUE: method reference
                    //ni_emailview niEmailview = niSvcContext.ni_emailviewSet.First<ni_emailview>(Expression.Lambda<Func<ni_emailview, bool>>((Expression)Expression.Equal(e.ni_emailviewId.Value, (Expression)Expression.Property((Expression)Expression.Property((Expression)Expression.Field((Expression)Expression.Constant((object)cDisplayClass10, typeof(PostAnnotationCreate.<>c__DisplayClass1_0)), FieldInfo.GetFieldFromHandle(__fieldref(PostAnnotationCreate.<>c__DisplayClass1_0.annotation_entity))), (MethodInfo)MethodBase.GetMethodFromHandle(__methodref(Annotation.get_ObjectId))), (MethodInfo)MethodBase.GetMethodFromHandle(__methodref(EntityReference.get_Id))), false, (MethodInfo)MethodBase.GetMethodFromHandle(__methodref(Guid.op_Equality))), parameterExpression));
                    //ni_emailview niEmailview = niSvcContext.ni_emailviewSet.First<ni_emailview>(Expression.Lambda<Func<ni_emailview, bool>>((Expression)Expression.Equal
                    //(e.ni_emailviewId.Value, (Expression)Expression.Property((Expression)Expression.Property((Expression)Expression.Field((Expression)Expression.Constant
                    //((object)cDisplayClass10, typeof(PostAnnotationCreate.<>c__DisplayClass1_0)), FieldInfo.GetFieldFromHandle(__fieldref(PostAnnotationCreate.<>c__DisplayClass1_0.annotation_entity))), (MethodInfo)MethodBase.GetMethodFromHandle(__methodref(Annotation.get_ObjectId))), 
                    //(MethodInfo)MethodBase.GetMethodFromHandle(__methodref(EntityReference.get_Id))), false, (MethodInfo)MethodBase.GetMethodFromHandle(__methodref(Guid.op_Equality))), parameterExpression));
                    Guid regardingobjectid = new Guid(executionContext.OutputParameters["id"].ToString());
                    string regardingobjectidType = "ni_emailview";



                    // ISSUE: reference to a compiler-generated field
                    activityMimeAttachment.MimeType = (string)annotation_entity.Attributes["MimeType"];
                    // ISSUE: reference to a compiler-generated field
                    activityMimeAttachment.FileName = (string)annotation_entity.Attributes["FileName"];
                    activityMimeAttachment.ObjectId = new EntityReference(regardingobjectidType, regardingobjectid);
                    activityMimeAttachment.ObjectTypeCode = "email";
                    // ISSUE: reference to a compiler-generated field
                    activityMimeAttachment.Body = (string)annotation_entity.Attributes["DocumentBody"];
                    organizationService.Create((Entity)activityMimeAttachment);

                    localContext.TracingService.Trace("== Calling Annotation END ==");
                }
            }
        }
    }
}




// Decompiled with JetBrains decompiler
// Type: NetworkInnovations.Crm.Plugins.PostAnnotationCreate
// Assembly: NetworkInnovations.Crm.Plugins, Version=1.3.0.0, Culture=neutral, PublicKeyToken=a4b6b3ab1edf0d16
// MVID: F34155CF-389E-482F-B5BF-EA3BF793B381
// Assembly location: C:\Users\oseghae.oaikhena\source\repos\NetworkInnovations.Crm.Plugins_1.3.0.0.dll

//using Microsoft.Xrm.Sdk;
//using NetworkInnovations.Crm.Core.Crm.Data;
//using NetworkInnovations.Plugins;
//using System;
//using System.Linq;
//using System.Linq.Expressions;
//using System.Reflection;

//namespace NetworkInnovations.Crm.Plugins
//{
//    public class PostAnnotationCreate : Plugint
//    {
//        public PostAnnotationCreate(string unsecure, string secure)
//          : base(typeof(PostAnnotationCreate))
//        {
//            this.RegisteredEvents.Add(new Tuple<int, string, string, Action<Plugint.LocalPluginContext>>(40, "Create", "annotation", new Action<Plugint.LocalPluginContext>(this.ExecutePostAnnotationCreate)));
//        }

//        protected void ExecutePostAnnotationCreate(Plugint.LocalPluginContext localContext)
//        {
//            if (localContext == null)
//                throw new InvalidPluginExecutionException(nameof(localContext));
//            IPluginExecutionContext executionContext = localContext.PluginExecutionContext;
//            IOrganizationService organizationService = localContext.OrganizationService;

//            if (!((DataCollection<string, object>)executionContext.get_InputParameters()).Contains("Target") || !(((DataCollection<string, object>)((IExecutionContext)executionContext).get_InputParameters()).get_Item("Target") is Entity))
//                return;
//            using (NISvcContext niSvcContext = new NISvcContext(localContext.OrganizationService))
//            {
//                // ISSUE: object of a compiler-generated type is created
//                // ISSUE: variable of a compiler-generated type
//                PostAnnotationCreate.<>cDisplayClass10 cDisplayClass10 = new PostAnnotationCreate.<>cDisplayClass10();
//                // ISSUE: reference to a compiler-generated field
//                cDisplayClass10.annotation_entity = (Annotation)((Entity)((DataCollection<string, object>)((IExecutionContext)executionContext).get_InputParameters()).get_Item("Target")).ToEntity<Annotation>();
//                // ISSUE: reference to a compiler-generated field
//                if (cDisplayClass10.annotation_entity.ObjectTypeCode == "ni_emailview")
//                {
//                    ActivityMimeAttachment activityMimeAttachment = new ActivityMimeAttachment();
//                    ParameterExpression parameterExpression;
//                    // ISSUE: field reference
//                    // ISSUE: method reference
//                    // ISSUE: method reference
//                    // ISSUE: method reference
//                    ni_emailview niEmailview = niSvcContext.ni_emailviewSet.First<ni_emailview>(Expression.Lambda<Func<ni_emailview, bool>>((Expression)Expression.Equal(e.ni_emailviewId.Value, (Expression)Expression.Property((Expression)Expression.Property((Expression)Expression.Field((Expression)Expression.Constant((object)cDisplayClass10, typeof(PostAnnotationCreate.\u003C\u003Ec__DisplayClass1_0)), FieldInfo.GetFieldFromHandle(__fieldref(PostAnnotationCreate.\u003C\u003Ec__DisplayClass1_0.annotation_entity))), (MethodInfo)MethodBase.GetMethodFromHandle(__methodref(Annotation.get_ObjectId))), (MethodInfo)MethodBase.GetMethodFromHandle(__methodref(EntityReference.get_Id))), false, (MethodInfo)MethodBase.GetMethodFromHandle(__methodref(Guid.op_Equality))), parameterExpression));
//                    // ISSUE: reference to a compiler-generated field
//                    activityMimeAttachment.MimeType = cDisplayClass10.annotation_entity.MimeType;
//                    // ISSUE: reference to a compiler-generated field
//                    activityMimeAttachment.FileName = cDisplayClass10.annotation_entity.FileName;
//                    activityMimeAttachment.ObjectId = niEmailview.ni_GeneratedEmail;
//                    activityMimeAttachment.ObjectTypeCode = "email";
//                    // ISSUE: reference to a compiler-generated field
//                    activityMimeAttachment.Body = cDisplayClass10.annotation_entity.DocumentBody;
//                    organizationService.Create((Entity)activityMimeAttachment);
//                }
//            }
//        }
//    }
//}