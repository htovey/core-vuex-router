import FetchUtil from '../utils/FetchUtil';

const createUser = function(user, token, actionType) {
    const url = "/user/"+actionType;
    const payload = {
        "password" : user.password,
        "userName" : user.userName,
        "role" : user.role
    }
    var response = FetchUtil.handlePost(url, token, JSON.stringify(payload)); 
    return response;
};

const registerUser = function (user) {
    const payload = {
        "password" : user.password,
        "userName" : user.userName,
        "role" : user.role
    }
    let response = FetchUtil.handleRegistration('/register', JSON.stringify(payload));
    return response;
  
}
export default { createUser, registerUser };