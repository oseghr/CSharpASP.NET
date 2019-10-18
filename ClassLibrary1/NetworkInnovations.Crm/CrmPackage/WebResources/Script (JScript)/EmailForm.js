function SetFrom()
{
    if(Xrm.Page.getAttribute("subject").getValue() == null)
    {
        niUtility.setToPartyList("from", "queue");
        if(Xrm.Page.getAttribute("regardingobjectid").getValue() != null)
        {
            var regarding = Xrm.Page.getAttribute("regardingobjectid").getValue()[0];
            if (regarding["entityType"] == "incident") {
                var formatted_id = regarding["id"].substring(1, regarding["id"].length - 1)
                niUtility.makeODataRequest("GET", "/incidents(" + formatted_id+ ")?$select=ticketnumber", null, true).then(function(data){
                     var case_number = JSON.parse(data.response);
                     Xrm.Page.getAttribute("subject").setValue(Xrm.Page.getAttribute("regardingobjectid").getValue()[0]["name"] + " :[#" + case_number["ticketnumber"] +"]");
                });
            }
        }
    }
};