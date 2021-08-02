import * as ServicesResources from "./ServicesResources.js";

export const authSignIn = async (authData) => {
	try {
		let res = await fetch(ServicesResources.LOGIN_USER_ENDPOINT, {
			method: "POST",
			body: JSON.stringify({
				username: authData.email,
				password: authData.password,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const parsedRes = await res.json();
		if (parsedRes.api_key) {
			console.log('sign in')
            return true
		} else {
            alert(parsedRes.message);
            return false
		}
	} catch (err) {
		console.log(err);
	}
};

export const authResetPassword = async (authData) => {
	try {
		let res = await fetch(ServicesResources.RESET_PASSWORD_USER_ENDPOINT, {
			method: "POST",
			body: JSON.stringify({
				username: authData.email
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const parsedRes = await res.json();
		if (parsedRes.api_key) {
			console.log('reset password')
            return true
		} else {
            alert(parsedRes.message);
            return false
		}
	} catch (err) {
		console.log(err);
	}
};