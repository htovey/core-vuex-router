import FetchUtil from '../utils/FetchUtil';

const createUser = function(user, token, actionType) {
    const url = "/user/"+actionType;
        const payload = {
            "password" : user.password,
            "userName" : user.userName,
            "adminId" : this.$store.adminId,
            "bizId" : this.$store.bizId,
            "roleId" : user.roleId
        }
        var response = FetchUtil.handlePost(url, token, JSON.stringify(payload)); 
        return response;
};

export default { createUser };