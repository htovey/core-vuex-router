import FetchUtil from '../utils/FetchUtil.vue';

const getBizRoles = function (bizId, token) {
    var url = "/roles";
    var params = {"bizId" : bizId};
    return FetchUtil.handleGet(url, token, params);
}

const getBizList = function (token) {
    const url = '/biz/bizList';
    return FetchUtil.handleGet(url, token);
}

const getBizIdList = function(selectedRows) {
    var deleteArray = [];
    selectedRows.map((selectedBiz, index) => {
         deleteArray[index] = selectedBiz.id;
    });
    return deleteArray;
}

const createUpdateBiz = function (token, actionType, name, type, id) {
    const url = '/biz/'+actionType;
    const payload = {
        'name' : name,
        'type' : type,
        'id' : actionType === 'update' ? id : null
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

const deleteBiz = function (userToken, bizList) {
    const url = '/biz/delete';
    var payload = getBizIdList(bizList)
    var response = FetchUtil.handlePost(url, userToken, JSON.stringify(payload))
    .then(response => {
        if (response.status === 200) {
           // this.setState({loading : false});
            console.log('Delete: Success***');
            //this.handleSuccess('delete', 'Biz');
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

export default { getBizRoles, getBizList, createUpdateBiz, deleteBiz }
