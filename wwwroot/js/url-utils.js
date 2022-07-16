
((module) => {

    module.getRegisterUrl = () => {

        const registerUrl = '/register' + window.location.search;
        return registerUrl;
    };

    module.getLoginUrl = () => {

        const loginUrl = '/login' + window.location.search;
        return loginUrl;
    }

})(window.UrlUtils = {});