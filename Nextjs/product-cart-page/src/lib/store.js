import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "@/redux/product/productSlice";

const rootReducer = combineReducers({
	products: productReducer,
});

export const makeStore = () => {
	return configureStore({
		reducer: rootReducer,
	});
};
