import FetchUtil from '../utils/FetchUtil.vue';

const getItemList = function (token, category) {
    const url = '/item/itemList';
    var params = {"category" : category || ''};
    return FetchUtil.handleGet(url, token, params);
}

const getItemIdList = function(selectedRows) {
    var deleteArray = [];
    selectedRows.map((selectedItem, index) => {
         deleteArray[index] = selectedItem.id;
    });
    return deleteArray;
}

const createUpdateItem = function (token, actionType, item) {
    const url = '/item/'+actionType;
    const payload = {
        'name' : item.name,
        'category' : item.category,
        'description' : item.description,
        'id' : actionType === 'update' ? item.id : null,
        'imageUrl' : item.img_url
    }
    var response = FetchUtil.handlePost(url, token, JSON.stringify(payload))
    .then(response => {
        if (response.status === 200 || response.status === 201) {
            console.log('Success***');
           // this.handleSuccess(actionType, 'item');
           return response;
        }
    })    
    .catch((error) => {
        console.log(error);
       // this.handleError('Business update failed.  Please try again.');
    });

    return response;
}

const deleteItem = function (userToken, itemList) {
    const url = '/item/delete';
    var payload = getItemIdList(itemList)
    var response = FetchUtil.handlePost(url, userToken, JSON.stringify(payload))
    .then(response => {
        if (response.status === 200) {
           // this.setState({loading : false});
            console.log('Delete: Success***');
            //this.handleSuccess('delete', 'Item');
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

export default { getItemList, createUpdateItem, deleteItem }
