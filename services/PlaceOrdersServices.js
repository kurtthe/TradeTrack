import * as ServicesResources from "./ServicesResources.js";
import * as SecureStore from "expo-secure-store";

const api_key = async () => {
	let api = await SecureStore.getItemAsync('api_key');
	return api;
}

export const getJobs = async () => {
	try{
		let result = await fetch(ServicesResources.GET_JOBS, {
			method: "GET",
			headers: {
                "ttrak-key": await api_key()
			}
		});
        let res = await result.json();
		return res;
	} catch (err) {
		console.log("ERROR", err);
	}
}

export const getStores = async () => {
	try{
		let result = await fetch(ServicesResources.GET_STORES, {
			method: "GET",
			headers: {
                "ttrak-key": await api_key()
			}
		});
        let res = await result.json();
		return res.locations;
	} catch (err) {
		console.log("ERROR", err);
	}
}