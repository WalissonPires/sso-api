(() => {

	window.addEventListener('DOMContentLoaded', handleLoaded);

	function handleLoaded() {

		const formLogin = document.getElementById('formLogin');
		formLogin.addEventListener('submit', handleSubmit);

		const btnGoToRegister = document.getElementsByName('btnGoToRegister')[0];
		btnGoToRegister.addEventListener('click', handleGoToRegister);
	}

	function handleGoToRegister(event) {

		event.preventDefault();

		const url = UrlUtils.getRegisterUrl();
		window.location.assign(url);
	}

	async function handleSubmit(event) {

		event.preventDefault();

		const form = event.currentTarget;
		const searchParams = new URLSearchParams(window.location.search);

		const data = {
			email: form.email.value,
			password: form.password.value,
			returnUrl: searchParams.get('returnUrl')
		};

		const btnSubmit = document.querySelector('[name="btnSubmt"]');

		btnSubmit.setAttribute('disabled', 'disabled');
		try {
			const response = await LoginUtils.submitData(data);
			if (response.success) {

				const { redirectUrl } = response.data;
				window.location.assign(redirectUrl);
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
