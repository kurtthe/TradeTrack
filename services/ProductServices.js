import * as SecureStore from "expo-secure-store";
import { getAllProductsSuccess } from "@core/module/store/cart/cart.js";
import { endPoints } from '@shared/dictionaries/end-points';



const api_key = async () => {
	let data = await SecureStore.getItemAsync('data_user');
	let api = JSON.parse(data)
	return api.api_key;
}

const getSupplierId = async () => {
	try{
		let result = await fetch(endPoints.suppliers, {
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
		const id = await getSupplierId()

    const url = endPoints.products.replace(':id',id)

		const result = await fetch(url, {
			method: "GET",
			headers: {
                "ttrak-key": await api_key()
			}
		});
        const res = await result.json();
		dispatch(getAllProductsSuccess(res))
	} catch (err) {
		console.log("ERROR", err);
	}
};
