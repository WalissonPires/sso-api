(function() {

    const isLogged = () => !!getToken();

    const getToken = () => localStorage.getItem('app-token');
    const setToken = (token) => token ? localStorage.setItem('app-token', token) : localStorage.removeItem('app-token');

    const sign = () => {

        const returnUrl = window.location.toString();
        const loginUrl = 'http://localhost:3000/login?returnUrl=' + encodeURIComponent(returnUrl);
        window.location.assign(loginUrl);
    }

    const signout = () => {

        setToken(null);
        window.location.assign('/');
    }

    const extractToken = () => {

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('access_token');
        return token;
    }

    const processSignFinished = () => {

        const newToken = extractToken();
        if (!newToken)
            return false;

        setToken(newToken);
        window.location.assign('/');
        return true;
    }


    const callPublicEndpoint = async () => {

        const response = await fetch('http://localhost:4001/');

        if (response.status === 200) {
            const data = await response.json();
            alert(JSON.stringify(data));
        }
        else
            alert('Request fail with status code ' + response.status);
    }

    const callProtectedEndpoint = async () => {

        const token =  getToken();

        const response = await fetch('http://localhost:4001/protected', {
            headers: {
                'Authorization': token ? ('Bearer ' + token) : undefined
            }
        });

        if (response.status === 200) {
            const data = await response.json();
            alert(JSON.stringify(data));
        }
        else
            alert('Request fail with status code ' + response.status);
    }


    const init = () => {

        if (processSignFinished())
            return;

        if (isLogged()) {

            document.getElementById('signout-form').classList.remove('d-none');
            document.getElementsByName('btnSignout')[0].addEventListener('click', signout);
        }
        else {

            document.getElementById('sign-form').classList.remove('d-none');
            document.getElementsByName('btnSigin')[0].addEventListener('click', sign);
        }

        document.getElementsByName('btnTestApiPublic')[0].addEventListener('click', callPublicEndpoint);
        document.getElementsByName('btnTestApiProtected')[0].addEventListener('click', callProtectedEndpoint);
    };

    window.addEventListener('DOMContentLoaded', init);
})();