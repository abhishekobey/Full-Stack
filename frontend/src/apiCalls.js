import axios from 'axios'

const getAllContacts = (success, failure) => {
    makeAuthorizedServerRequest('/contacts/getAllContacts', 'GET', {}, success, failure, process.env.ACCESS_TOKEN)
}

const addNewContact = (body, success, failure) => {
    makeAuthorizedServerRequest('/contacts/addNewContact', 'POST', body, success, failure)
}

const editContact = (id, body, success, failure) => {
    makeAuthorizedServerRequest('/contacts/updateContact/' + id, 'PUT', body, success, failure)
}

const deleteContact = (id, success, failure) => {
    makeAuthorizedServerRequest('/contacts/deleteContact/' + id, 'DELETE', {}, success, failure)
}

const makeAuthorizedServerRequest = (requestURL, requestMethod, requestBody, successCallBackFunction, failureCallBackFunction, authToken) => {
    const requestConfiguration = {
        method: requestMethod,
        url: requestURL,
        data: requestBody,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    axios(requestConfiguration)
        .then(
            function (serverResponse) {
                successCallBackFunction(serverResponse.data, serverResponse.status)
            }
        )
        .catch(function (err) {
            console.log(err)
            failureCallBackFunction(err.response)
        })
};

export {getAllContacts, addNewContact, editContact, deleteContact}