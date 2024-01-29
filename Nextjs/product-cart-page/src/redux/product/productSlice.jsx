import {
	fetchAllProducts,
	fetchBrands,
	fetchCategories,
} from "@/lib/api/productsApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// INITIALIZING THE STATE
const initialState = {
	products: [],
	categories: [],
	brands: [],
	totalItems: 0,
	loading: false,
};

// CREATING THE THUNK

export const fetchAllProductsAsync = createAsyncThunk(
	"product/fetchAllProducts",
	async () => {
		const data = await fetchAllProducts();

		return data;
	}
);

export const fetchCategoriesAsync = createAsyncThunk(
	"product/fetchCategories",
	async () => {
		const data = await fetchCategories();

		return data;
	}
);
export const fetchBrandsAsync = createAsyncThunk(
	"product/fetchBrands",
	async () => {
		const data = await fetchBrands();

		return data;
	}
);

export const productSlice = createSlice({
	name: "product",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllProductsAsync.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
				state.loading = false;
				const { products, totalItems } = action.payload.data;
				state.products = products;
				state.totalItems = totalItems;
			})
			.addCase(fetchCategoriesAsync.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.categories = action.payload;
			})
			.addCase(fetchBrandsAsync.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchBrandsAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.brands = action.payload;
			});
	},
});

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectCategories = (state) => state.product.categories;
export const selectBrands = (state) => state.product.brands;

export default productSlice.reducer;
