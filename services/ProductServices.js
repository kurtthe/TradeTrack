import * as ServicesResources from "./ServicesResources.js";
//import * as SecureStore from "expo-secure-store";

// const getUserToken = async () => {
// 	const user_token = await SecureStore.getItemAsync("token");
// 	return user_token;
// };

const getSupplierId = async () => {
	try{
		let result = await fetch(ServicesResources.GET_SUPPLIERS, {
			method: "GET",
			headers: {
                "ttrak-key": 'tt_V2Gzywch2iVbI1KwhHa6pd'
				//Authorization: "Bearer " + (await getUserToken()),
			}
		});
        let res = await result.json();
		return res.id;
	} catch (err) {
		console.log("ERROR", err);
	}
}

export const getProducts = async () => {
	try {
		let id = await getSupplierId()
		let result = await fetch(`${ServicesResources.GET_ALL_PRODUCTS}${id}/products`, {
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

export const getCategories = async () => {
	try {
		let result = await fetch(ServicesResources.GET_ALL_CATEGORIES, {
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

export const loadMoreProducts = async (ppage) => {
	try {
		let id = await getSupplierId()
		let result = await fetch(`${ServicesResources.GET_ALL_PRODUCTS}${id}/products?per-page=${ppage}`, {
			method: "GET",
			headers: {
                "ttrak-key": 'tt_V2Gzywch2iVbI1KwhHa6pd'
				//Authorization: "Bearer " + (await getUserToken()),
			}
		});
        let res = await result.json();
		console.log(' REEEESSSS', res)
		return res;
	} catch (err) {
		console.log("ERROR", err)
	}
}