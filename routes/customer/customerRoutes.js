const express = require('express')
const router = express.Router()
const getMethod = require('../../controllers/customer/getMethod')
const apiCustomer = require('../../controllers/customer/api')

router.get("/", getMethod.home)

router.get('/listToys', getMethod.listToys)

router.get('/cart', getMethod.cart)

router.get('/single-product', getMethod.singleProduct)

//API
router.post('/buy', apiCustomer.buy)

router.get('/tet', (req, res) => {
    let a = {
        "IsExists": "true",
        "IsCase": "true",
        "WorkFlowNumber": "5359731001",
        "ID": "500770000016mqsAAA",
        "Status": "Active",
        "OwnerID": "00577000000dNd7AAE",
        "OwnerUserName": "loc.bui-dxc@hpe.com.hpeitl4dev",
        "AssignedResourceId": "",
        "AssignedResourceUserName": "",
        "AssignedPartnerId": "",
        "AssignedPartnerUserName": "",
        "TaskToCaseId": "",
        "ServiceRequestorName": "wes_csn",
        "Langauage": "^_LANG_^",
        "UniqueName": "",
        "BusinessType": "sWFM_RetrieveCaseDetails",
        "SessionId": "00D770000004dyI!ARsAQKaxgF3EJeM.v54jCjKeARyghczwAEP1o_jon2jBozfCx45Vozyj0yLXYAZBe1T_maPI5I2MXpc6nD9pIomoCl5nIZWM",
        "ServerURL": "https://hp--hpeitl4dev.my.salesforce.com",
        "ExternalSessionIdUsed": "true",
        "TransactionId": "wes_csn222022-08-18T00:08:36:2454",
        "MonitoringTransactionId": "wes_csn222022-08-18T00:08:36:2454",
        "InputData": "{\"CIM\":{\"$\":{\"CIMVERSION\":\"2.0\",\"DTDVERSION\":\"2.0\"},\"PRS_ServiceIncident\":{\"ProviderID\":\"5359731001\",\"PRS_Contact\":[{\"$\":{\"ContactRole\":\"Service_Requester\"},\"PRS_Organization\":[{\"Name\":\"wes_csn\"}]},{\"$\":{\"ContactRole\":\"Service_Provider\"},\"PRS_Organization\":[{\"Name\":\"HP-HPS\",\"Business\":\"sWFM_RetrieveCaseDetails\"}],\"PRS_Statement\":[{\"$\":{\"StatementRole\":\"KEYWORD\"},\"Text\":\"ENV=^_ENV_^\"}]}],\"PRS_Administrative\":[{\"Language\":\"^_LANG_^\"}],\"PRS_Activity\":[{\"PRS_Transaction\":[{\"$\":{\"TransactionType\":\"Request_Problem_Information\"},\"TransactionState\":\"Open\"}],\"PRS_Statement\":[{\"$\":{\"StatementRole\":\"DESCRIPTION\"},\"PRS_Feature\":[{\"$\":{\"DataType\":\"Date/Time\"},\"Prompt\":\"StartDate\",\"ValidValues\":\"2022-09-01\"},{\"$\":{\"DataType\":\"Date/Time\"},\"Prompt\":\"EndDate\",\"ValidValues\":\"2022-03-28\"},{\"$\":{\"DataType\":\"String\"},\"Prompt\":\"NoteType\",\"ValidValues\":\"Logs|Email Notes Log|On-site Logs|Phone Logs|Reseach Log|Status Change|Summit|Reject\"}]}]}]}}}"
    }
    a.InputData = JSON.parse(a.InputData)
    return res.json(a)
})

module.exports = router