var cityTemp = "Abaco";
var citytemp = "\'" + cityTemp + "\'";
var id = '9bd1423e-a0ae-e711-8126-480fcfeaa931';
/*Xrm.WebApi.retrieveMultipleRecords("account", "?$select=accountid,ni_citytemp,ni_check&$filter=ni_city eq 'Abaco'").then(
    function success(result) {
        id = result.entities[0].accountid;
    },
    function (error) {});*/
Xrm.WebApi.retrieveMultipleRecords("geo_city", "?$select=geo_name,geo_cityid&$filter=geo_name eq  "+citytemp).then(
    function success(result) {
        if (result != null) {
            var cityIde = result.entities[0].geo_cityid;
            alert("city retrieve success" + cityIde);
            var dataPasses = {"geo_CityId@odata.bind":"/geo_citys(+cityIde+')","ni_check":"Succeed"};
            alert('success3');
            Xrm.WebApi.updateRecord("account", id, dataPasses).then(
                function success(result) {
                    alert("Account update success");
                },
                function(error) {
                    alert(error.message);
                }
            );
        }
    }
);