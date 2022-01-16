<script>

const handleRegistration = (methodUrl, payload) => {
    var host = process.env.VUE_APP_API_URL || 'http://34.68.202.207:8080';
    var url = new URL(host+methodUrl);
    var result =  fetch( url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Accept": "application/json",
        },
        body: payload
    });
   
    return result;
}

const handleBasic = (methodUrl, userToken, params) => {
    var host = process.env.VUE_APP_API_URL || 'http://34.68.202.207:8080';
    var url = new URL(host+methodUrl);
    if (params) {
        url.search = new URLSearchParams(params).toString();
    }
    var result =  fetch( url, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            "Accept": "application/json",
            "Authorization" : userToken
        }
    });
   
    return result;
}

const handleGet = (methodUrl, userToken, params) => {
    var host = process.env.VUE_APP_API_URL || 'http://34.68.202.207:8080';
    var url = new URL(host+methodUrl);
    if (params) {
        url.search = new URLSearchParams(params).toString();
    }
    var result =  fetch( url, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            "Accept": "application/json",
            "Authorization" : "Bearer "+userToken
        }
    });
   
    return result;
}

const handlePost = (methodUrl, userToken, payload) => {
    var host = process.env.VUE_APP_API_URL || 'http://34.68.202.207:8080';
    var url = host+methodUrl;
    var result = fetch( url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Accept": "application/json",
            "Authorization" : "Bearer "+userToken
        },
        body: payload
    });

    return result;
}

export default {handleBasic, handleGet, handlePost, handleRegistration}
</script>