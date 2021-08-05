import * as ServicesResources from "./ServicesResources.js";
//import * as SecureStore from "expo-secure-store";

// const getUserToken = async () => {
// 	const user_token = await SecureStore.getItemAsync("token");
// 	return user_token;
// };

export const getProducts = async () => {
	try {
		let result = await fetch(ServicesResources.GET_ALL_PRODUCTS, {
			method: "GET",
			headers: {
                "ttrak-key": 'tt_V2Gzywch2iVbI1KwhHa6pd'
				//Authorization: "Bearer " + (await getUserToken()),
			}
		});
        let res = await result.json();
		return res;
	} catch (err) {
		console.log("ERROR", err);
	}
};