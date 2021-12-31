import FetchUtil from './utils/FetchUtil.vue';

const submitLogin = function (uname, password) {
    const loginToken = "Basic "+window.btoa(uname+":"+password)
    let res = FetchUtil.handleLogin('/login', loginToken, null);
    res
        .then(response => {
          if (response.status === 200) {
            // this.reset();
            // var userToken = response.headers.get('authorization');
            // response.json()
        //   .then(json => {
        //     this.handleLoginSuccess(userToken, json);
        //     //this.props.handleLoginSuccess(json, userToken);
            return response;
        //  });
          } else {
            this.handleError('Login failed. Please try again.');
            return;
          }
        })    
        .catch(() => {
            this.handleError('Login failed. Please try again.');
        });
  }
}

export default { submitLogin };