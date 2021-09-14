import * as ServicesResources from "./ServicesResources.js";
import * as SecureStore from "expo-secure-store";
import { getAllProductsSuccess } from "../app/core/module/store/cart/cart.js";

// const getUserToken = async () => {
// 	const user_token = await SecureStore.getItemAsync("token");
// 	return user_token;
// };

const api_key = async () => {
	let api = await SecureStore.getItemAsync('api_key');
	return api;
}

const getSupplierId = async () => {
	try{
		let result = await fetch(ServicesResources.GET_SUPPLIERS, {
			method: "GET",
			headers: {
                "ttrak-key": await api_key()
			}
		});
        let res = await result.json();
		return res.id;
	} catch (err) {
		console.log("ERROR", err);
	}
}

export const getProducts = () => async (dispatch) => {
	try {
		let id = await getSupplierId()
		let result = await fetch(`${ServicesResources.GET_ALL_PRODUCTS}${id}/products`, {
			method: "GET",
			headers: {
                "ttrak-key": await api_key()
			}
		});
        let res = await result.json();
		dispatch(getAllProductsSuccess(res))
	} catch (err) {
		console.log("ERROR", err);
	}
};

export const getCategories = async () => {
	try {
		let result = await fetch(`${ServicesResources.GET_ALL_CATEGORIES}?expand=products`, {
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
};

export const loadMoreProducts = async (ppage) => {
	try {
		let id = await getSupplierId()
		let result = await fetch(`${ServicesResources.GET_ALL_PRODUCTS}${id}/products?per-page=${ppage}`, {
			method: "GET",
			headers: {
                "ttrak-key": await api_key()
			}
		});
        let res = await result.json();
		return res;
	} catch (err) {
		console.log("ERROR", err)
	}
}

export const searchCategories = async (query) => {
	try {
		let id = await getSupplierId()
		let result = await fetch(`${ServicesResources.GET_ALL_CATEGORIES}?search=${query}&expand=products`, {
			method: "GET",
			headers: {
                "ttrak-key": await api_key()
			}
		});
        let res = await result.json();
		return res;
	} catch (err) {
		console.log("ERROR", err)
	}
}

export const searchProducts = async (query) => {
	try {
		let id = await getSupplierId()
		let result = await fetch(`${ServicesResources.GET_ALL_PRODUCTS}${id}/products?search=${query}`, {
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
};