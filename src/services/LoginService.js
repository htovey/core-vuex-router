import FetchUtil from '../utils/FetchUtil.vue';

const submitLogin = function (uname, password) {
    const loginToken = "Basic "+window.btoa(uname+":"+password)
    return FetchUtil.handleBasic('/login', loginToken, null)
    .then(response => {
      if (response.status === 200) {
        return response;  
      } 
    })    
    .catch(() => {
        this.handleError('Login failed. Please try again.');
    });

}

export default { submitLogin };