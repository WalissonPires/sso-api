((module) => {

    /***
     * @return {
     *    success: boolean;
     *    error: any;
     *    data: {
     *     redirectUrl: string;
     *    };
     * }
    */
    module.submitData = async function (data) {

        const response = await fetch('/account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const statusClass = Math.trunc(response.status / 100);
        if (statusClass === 2) {
            const data = await response.json();
            return {
                success: true,
                data: data,
                error: null,
            };
        } else {
            const responseError = await response.json();
            return {
                success: false,
                error: responseError,
                data: null,
            };
        }
    };

})(window.LoginUtils = {});
