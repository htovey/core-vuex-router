import FetchUtil from '../utils/FetchUtil.vue';

const getPersonList = (bizId, roleTypes, userToken) => {
    console.log("getPersonList()");
    var url = "/person/persons";
    var params = {
        "bizId" : bizId,
        "roleTypes" : roleTypes
    };
    return FetchUtil.handleGet(url, userToken, params);
}

const getPersonIdList = function(selectedRows) {
    var deleteArray = [];
    selectedRows.map((selectedPerson, index) => {
         deleteArray[index] = selectedPerson.id;
    });
    return deleteArray;
}

const createUpdatePerson = function (token, actionType, person) {
    const url = '/person/'+actionType;
    const payload = {
        "id" : person.id,
        "fName" : person.fName,
        "lName" : person.lName,
        "userName" : person.userName
    }
    var response = FetchUtil.handlePost(url, token, JSON.stringify(payload))
    .then(response => {
        if (response.status === 200 || response.status === 201) {
            console.log('Success***');
           // this.handleSuccess(actionType, 'biz');
           return response;
        }
    })    
    .catch((error) => {
        console.log(error);
       // this.handleError('Business update failed.  Please try again.');
    });

    return response;
}

const deletePerson = function (userToken, personList) {
    const url = '/person/delete';
    var payload = getPersonIdList(personList)
    var response = FetchUtil.handlePost(url, userToken, JSON.stringify(payload))
    .then(response => {
        if (response.status === 200) {
           // this.setState({loading : false});
            console.log('Delete: Success***');
            //this.handleSuccess('delete', 'Person');
            //this.resetRows();
            return response;
        }
    })
        
    .catch((error) => {
        console.log(error);
        //this.handleError('Delete failed. Please try again later.');
    });
    return response;
}

export default {createUpdatePerson, deletePerson, getPersonList}
