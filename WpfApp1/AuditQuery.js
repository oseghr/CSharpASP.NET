function validatePreferredMethodOfCommunication() { 

    //get the value of Preffered Method of Communication code 
    var prefferedContactMethodCode = 
       Xrm.Page.getAttribute('preferredcontactmetho dcode').getValue();  
    
    //if Preferred Method = Any, make all fields as non-mandatory 
    
    //else if Preferred Method = Phone, make Mobile Phone field mandatory 
    //and all other fields as non-mandatory 
    
    //else if Preferred Method = Fax, make Fax field mandatory 
    //and all other fields as non-mandatory 
    
    if(prefferedContactMethodCode == 1) { 
       clearAllMandatoryFields(); 
    }  
    if(prefferedContactMethodCode == 2) { 
       clearAllMandatoryFields(); 
       Xrm.Page.getAttribute('emailaddress1').setRequiredLevel('required'); 
    } else if(prefferedContactMethodCode == 3) { 
       clearAllMandatoryFields(); 
       Xrm.Page.getAttribute('mobilephone').setRequiredLevel('required'); 
    } else if(prefferedContactMethodCode == 4) { 
       clearAllMandatoryFields(); 
       Xrm.Page.getAttribute('fax').setRequiredLevel('required'); 
    } 
 } 
 function clearAllMandatoryFields() { 
    
    //clear all mandatory fields 
    Xrm.Page.getAttribute('emailaddress1').setRequiredLevel('none'); 
    Xrm.Page.getAttribute('mobilephone').setRequiredLevel('none'); 
    Xrm.Page.getAttribute('fax').setRequiredLevel('none'); 
 }