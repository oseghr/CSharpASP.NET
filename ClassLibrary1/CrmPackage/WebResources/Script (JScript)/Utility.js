niUtility =
{
    PhoneNumberRegex: /(\d+)(\d{3})(\d{3})(\d{4})/,
    PostalCodeRegex: /(\w{3})(\w{3})/,

    formatPhoneNumber: function (phoneNumField) {
        var phoneNum = Xrm.Page.getControl(phoneNumField).getValue();
        if (phoneNum.length === 11) {
            phoneNum = phoneNum.replace(niUtility.PhoneNumberRegex, '$1 ($2) $3-$4');
            Xrm.Page.getAttribute(phoneNumField).setValue(phoneNum);
        }
        else if (phoneNum.length < 11) {
            phoneNum = phoneNum.replace(/\D/g, '');
            Xrm.Page.getAttribute(phoneNumField).setValue(phoneNum);
        }
        // At this moment, the updated field value has not been reflected server-side yet. When validating the field,
        // we will need to pass in the value of the field generated within this function
        niUtility.validateField(phoneNumField, phoneNum, /^\+?\d+ ?\(\d{3}\) ?\d{3}\- ?\d{4}$/, "A valid phone number of format '#(###) ###-####' must be provided");
    },

    formatPostalCode: function (postalCodeField, countryField) {
        var postalCode = Xrm.Page.getControl(postalCodeField).getValue();
        if (postalCode.length === 6) {
            postalCode = postalCode.toUpperCase();
            postalCode = postalCode.replace(niUtility.PostalCodeRegex, '$1 $2');
            Xrm.Page.getAttribute(postalCodeField).setValue(postalCode);
        }
        else if (postalCode.length < 6) {
            postalCode = postalCode.replace(/([\W_])/g, '');
            Xrm.Page.getAttribute(postalCodeField).setValue(postalCode);
        }
        // At this moment, the updated field value has not been reflected server-side yet. When validating the field,
        // we will need to pass in the value of the field generated within this function

        var test = Xrm.Page.getAttribute(countryField);

        if(Xrm.Page.getAttribute(countryField).getValue() != null) {
            if (Xrm.Page.getAttribute(countryField).getValue()[0].name === "Canada") {
                niUtility.validateField(postalCodeField, postalCode, /^[A-Z]\d[A-Z] \d[A-Z]\d$/, "A valid postal code of format 'A#A #A#' must be provided");
            }
            else {
                niUtility.validateField(postalCodeField, postalCode, /^[0-9]{5}$/, "A valid zip code of format '#####' must be provided");
            }
        } else {
            niUtility.validateField(postalCodeField, postalCode, /^[0-9]{5}$/, "A valid zip code of format '#####' must be provided");
        }
    },

    validateField: function (field, fieldValue, regex, message) {
        var notificationMsgId = field + "_InvalidFieldNotification";
        if (fieldValue.length === 0 || fieldValue === null) {
            Xrm.Page.getControl(field).clearNotification(notificationMsgId);
        }
        else {
            if (!fieldValue.match(regex)) {
                Xrm.Page.getControl(field).setNotification(message, notificationMsgId);
            }
            else {
                Xrm.Page.getControl(field).clearNotification(notificationMsgId);
            }
        }
    },

    /**
     * Sets the Country for the Contact/Instructor entity based off of the Province. This function will get executed whenever a user
     * changes the Province field. On creation of a new record, the business rules will automatically populate the Province and Country
     * fields to be "Alberta" and "Canada" respectively
     */
    setCountry: function (provinceFieldName, countryFieldName) {
        var provinceField = Xrm.Page.getAttribute(provinceFieldName);
        var provinceFieldValue = (provinceField === null) ? null : provinceField.getValue()[0];
        var countryField = Xrm.Page.getAttribute(countryFieldName);
        if (provinceField && provinceFieldValue && countryField) {
            var provinceId = provinceFieldValue.id;
            provinceId = provinceId.replace("{", "");
            provinceId = provinceId.replace("}", "");
            var promiseProvince = niUtility.makeODataRequest("GET", "/geo_provinces(" + provinceId + ")?$select=geo_name,_geo_countryid_value", null, true)
                .then(function (provinceRequest) {
                    var provinceValues = JSON.parse(provinceRequest.response);
                    if (provinceValues) {

                        // We have the Country ID at this point. Get rest of information to construct the Country lookup
                        var promiseCountry = niUtility.makeODataRequest("GET", "/geo_countries(" + provinceValues._geo_countryid_value + ")?$select=geo_name", null, true)
                            .then(function (countryRequest) {
                                var countryValues = JSON.parse(countryRequest.response);
                                if (countryValues) {

                                    // Create the Lookupfield object
                                    var lookupField = [];
                                    lookupField[0] =
                                    {
                                        id: countryValues.geo_countryid,
                                        name: countryValues.geo_name,
                                        entityType: "geo_country"
                                    };
                                    Xrm.Page.getAttribute(countryFieldName).setValue(lookupField);
                                }
                            })
                            .catch(function (error) {
                                niUtility.logToServer(0, 1, "Instructor and Contacts", error);
                                return Promise.reject(error);
                            })
                    }
                })
                .catch(function (error) {
                    niUtility.logToServer(0, 1, "Instructor and Contacts", error);
                    return Promise.reject(error);
                })
        }
    },

    setProvince: function (cityFieldName, provinceFieldName, countryFieldName) {
        var cityField = Xrm.Page.getAttribute(cityFieldName);
        var cityFieldValue = (cityField === null) ? null : cityField.getValue()[0];
        var provinceField = Xrm.Page.getAttribute(provinceFieldName);
        if (cityField && cityFieldValue) {
            var cityId = cityFieldValue.id;
            cityId = cityId.replace("{", "");
            cityId = cityId.replace("}", "");
            var promiseCity = niUtility.makeODataRequest("GET", "/geo_cities(" + cityId + ")?$select=geo_name,_geo_provinceid_value", null, true)
                .then(function (cityRequest) {
                    var cityValues = JSON.parse(cityRequest.response);
                    if (cityValues) {

                        // We have the City ID at this point. Get rest of information to construct the Province lookup
                        var promiseProvince = niUtility.makeODataRequest("GET", "/geo_provinces(" + cityValues._geo_provinceid_value + ")?$select=geo_name", null, true)
                            .then(function (provinceRequest) {
                                var provinceValues = JSON.parse(provinceRequest.response);
                                if (provinceValues) {

                                    // Create the Lookupfield object
                                    var lookupField = [];
                                    lookupField[0] =
                                    {
                                        id: provinceValues.geo_provinceid,
                                        name: provinceValues.geo_name,
                                        entityType: "geo_province"
                                    };

                                    if (provinceField != null) {
                                        provinceField.setValue(lookupField);
                                    }
                                    niUtility.setCountry(provinceFieldName, countryFieldName);
                                }
                            })
                            .catch(function (error) {
                                console.error(error);
                                return Promise.reject(error);
                            })
                    }
                })
                .catch(function (error) {
                    console.error(error);
                    return Promise.reject(error);
                })
        }
    },
    logToServer: function (location, level, subLocation, errorObj) {
        niUtility.getConfigurationValue("LogUrl")
            .then(function (url) {

                var stackTraceMessage = "Exception type: " + errorObj.innererror.type + " " +
                                        "Message: " + errorObj.innererror.message + " " +
                                        errorObj.innererror.stacktrace;

                // Generate JSON from the error here
                // Location and Level are enums defined under LoggingApiController.cs
                var requestObj = {
                    Location: location,
                    Level: level,
                    ExceptionId: niUtility.generateGuid(),
                    Message: errorObj.message,
                    StackTrace: stackTraceMessage,
                    SubLocation: subLocation
                };

                // Generate Alert message. Formatting can be changed later if need be
                alert(stackTraceMessage);

                // Create the HTTP POST request to send to the Web API
                var promise = niUtility.makeExternalAjaxRequest("POST", url, requestObj, "application/json", "application/json", null)
                    .then(function (request) {

                        // Nothing needed to be done after logs have been written
                    })
                    .catch(function (error) {
                        console.log(error);
                        Promise.reject(error);
                    })
            })
            .catch(function (error) {
                // "Chicken or the egg"
                console.log("Error while trying to read  ConfigurationValue(LogUrl): " + error);
            })
    },
    makeODataRequest: function (action, uri, data, formattedValue, maxPageSize) {

        var clientUrl = niUtility.getClientUrl();
        var webAPIPath = "/api/data/v8.2";

        if (!RegExp(action, "g").test("POST PATCH PUT GET DELETE")) { // Expected action verbs.
            throw new Error("Sdk.request: action parameter must be one of the following: " +
                "POST, PATCH, PUT, GET, or DELETE.");
        }
        if (!typeof uri === "string") {
            throw new Error("Sdk.request: uri parameter must be a string.");
        }
        if (RegExp(action, "g").test("POST PATCH PUT") && (data === null || data === undefined)) {
            throw new Error("Sdk.request: data parameter must not be null for operations that create or modify data.");
        }
        if (maxPageSize === null || maxPageSize === undefined) {
            maxPageSize = 50; // Default limit is 50 entities per page.
        }

        // Construct a fully qualified URI if a relative URI is passed in.
        if (uri.charAt(0) === "/") {
            uri = clientUrl + webAPIPath + uri;
        }

        // Construct request w/ ES6 Promise
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();
            request.open(action, encodeURI(uri), true);
            request.setRequestHeader("OData-MaxVersion", "4.0");
            request.setRequestHeader("OData-Version", "4.0");
            request.setRequestHeader("Accept", "application/json");
            request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            request.setRequestHeader("Prefer", "odata.maxpagesize=" + maxPageSize);
            if (formattedValue) {

                var requestHeader = "odata.include-annotations=OData.Community.Display.V1.FormattedValue";
                if (RegExp(action, "g").test("POST PATCH PUT")) {

                    requestHeader += ",return=representation";
                }

                request.setRequestHeader("Prefer", requestHeader);
            }
            request.onreadystatechange = function () {
                if (this.readyState === 4) {
                    request.onreadystatechange = null;
                    switch (this.status) {
                        case 200: // Success with content returned in response body.
                        case 201: // Successful entity Creation with content returned in response body.
                        case 202: // Request accepted.
                        case 204: // Success with no content returned in response body.
                            resolve(this);
                            break;
                        default: // All other statuses are unexpected so are treated like errors.
                            var error;
                            try {
                                error = JSON.parse(request.response).error;
                            } catch (e) {
                                error = new Error("Unexpected Error");
                            }
                            reject(error);
                            break;
                    }
                }
            };
            request.send(JSON.stringify(data));
        });
    },
    setToPartyList: function (fieldName, entityType) {
        niUtility.makeODataRequest("GET", "/ni_queues?$filter=ni_name+eq+'Active Service Queue'", null, true).then(function (configRequest) {
            var configValues = JSON.parse(configRequest.response);
            var queueName = configValues.value[0].ni_email;
            var queue = niUtility
                .makeODataRequest("GET", "/queues?$select=name,queueid&$filter=name+eq+'"+queueName+"'", null, true)
                .then(function(queueRequest) {
                    var queueValues = JSON.parse(queueRequest.response);
                    if (queueValues) {

                        // Create the Lookupfield object
                        var party = Xrm.Page.getAttribute(fieldName);

                        // Create new array
                        var partlist = new Array();
                        partlist[0] = new Object();

                        partlist[0].id = queueValues.value[0].queueid;
                        partlist[0].name = queueValues.value[0].name;
                        partlist[0].entityType = entityType;

                        // Set array value
                        party.setValue(partlist);
                    }
                })
                .catch(function(error) {
                    console.error(error);
                    return Promise.reject(error);
                });
        });
    },

    getClientUrl: function () {

        var context;

        // GetGlobalContext defined by including reference to 
        // ClientGlobalContext.js.aspx in the HTML page.
        if (typeof GetGlobalContext !== "undefined")
        { context = GetGlobalContext(); }
        else
        {
            if (typeof Xrm !== "undefined") {
                // Xrm.Page.context defined within the Xrm.Page object model for form scripts.
                context = Xrm.Page.context;
            }
            else { throw new Error("Context is not available."); }
        }
        return context.getClientUrl();
    },

    makeExternalAjaxRequest: function (action, uri, data, acceptHeader, contentType, authorizeHeader) {

        // Perform validations on params before preparing request.
        if (!RegExp(action, "g").test("POST PATCH PUT GET DELETE")) { // Expected action verbs.
            throw new Error("Sdk.request: action parameter must be one of the following: " +
                "POST, PATCH, PUT, GET, or DELETE.");
        }
        if (!typeof uri === "string") {
            throw new Error("Sdk.request: uri parameter must be a string.");
        }
        if (RegExp(action, "g").test("POST PATCH PUT") && (data === null || data === undefined)) {
            throw new Error("Sdk.request: data parameter must not be null for operations that create or modify data.");
        }

        // Construct request w/ ES6 Promise
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();

            request.open(action, encodeURI(uri), true);
            request.setRequestHeader("Accept", acceptHeader);
            request.setRequestHeader("Content-Type", contentType + "; charset=utf-8");

            if (authorizeHeader) {
                request.withCredentials = true;
                request.setRequestHeader("Authorization", authorizeHeader);
            }

            // Handle async call back
            request.onreadystatechange = function () {
                if (this.readyState === 4) {

                    request.onreadystatechange = null;
                    switch (this.status) {
                        case 200: // Success with content returned in response body.
                        case 204: // Success with no content returned in response body.
                            resolve(this);
                            break;

                        default: // All other statuses are unexpected so are treated like errors.
                            var error;

                            try {
                                error = JSON.parse(request.response);
                            } catch (e) {
                                error = new Error("Unexpected Error");
                            }
                            reject(error);

                            break;
                    }
                }
            };

            request.send(JSON.stringify(data));
        });
    }
};