import { fetchAllProducts } from "@/lib/api/productsApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// INITIALIZING THE STATE
const initialState = {
	products: [],
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
				state.products = action.payload;
			});
	},
});

export const selectAllProducts = (state) => state.products.products;
export default productSlice.reducer;
