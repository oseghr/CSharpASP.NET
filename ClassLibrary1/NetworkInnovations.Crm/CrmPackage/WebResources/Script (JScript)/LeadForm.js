niLeadForm =
{
    onLoadEvents: function () {
        //Xrm.Page.getControl("telephone1").addOnKeyPress(function () { niUtility.formatPhoneNumber("telephone1") });
        //Xrm.Page.getControl("mobilephone").addOnKeyPress(function () { niUtility.formatPhoneNumber("mobilephone") });
    },
    onChangeEventsToUpdateCountry: function () {
        niUtility.setCountry("ni_stateprovince", "ni_country");
    },
    onChangeEventsToUpdateProvince: function () {
        niUtility.setProvince("ni_city", "ni_stateprovince", "ni_country");
    }
};