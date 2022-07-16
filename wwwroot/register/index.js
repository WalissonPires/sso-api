(() => {

	window.addEventListener('DOMContentLoaded', handleLoaded);

	function handleLoaded() {

		const formLogin = document.getElementById('formRegister');
		formLogin.addEventListener('submit', handleSubmit);

        const btnGoToLogin = document.getElementsByName('btnGoToLogin')[0];
		btnGoToLogin.addEventListener('click', handleGoToLogin);
	}

	function handleGoToLogin(event) {

		event.preventDefault();

		const url = UrlUtils.getLoginUrl();
		window.location.assign(url);
	}

	async function handleSubmit(event) {

		event.preventDefault();

		const form = event.currentTarget;
		const searchParams = new URLSearchParams(window.location.search);

		const data = {
			name: form.name.value,
			email: form.email.value,
			password: form.password.value,
            confirmPassword: form.confirmPassword.value,
			returnUrl: searchParams.get('returnUrl')
		};

		const btnSubmit = document.querySelector('[name="btnSubmt"]');

		btnSubmit.setAttribute('disabled', 'disabled');
		try {
			const response = await RegisterUtils.submitData(data);
			if (response.success) {

                const url = UrlUtils.getLoginUrl();
				window.location.assign(url);
			}
			else
				alert(response.error.message);
		}
		catch (error) {
			alert(error.message);
		}
		finally {
			btnSubmit.removeAttribute('disabled');
		}
	}

})();
