import FetchUtil from '../utils/FetchUtil.vue';

const getImageList = function (token, viewId) {
    const url = '/image/imageList';
    var params = {"viewId" : viewId};
    return FetchUtil.handleGet(url, token, params);
}

const saveImageLinks = function (token, imageList) {
    const url = 'image/save';
    return FetchUtil.handlePost(url, token, JSON.stringify(imageList));
}

const createImageLink = function (token, actionType, item) {
    const url = '/image/'+actionType;
    const payload = {
        'name' : item.name,
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

const deleteImage = function (userToken, imageId) {
    const url = '/image/delete';
    var payload = imageId;
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

export default { getImageList, saveImageLinks, createImageLink, deleteImage }
