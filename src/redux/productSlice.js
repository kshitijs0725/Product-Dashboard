import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [],
        favorites: localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [],
    },
    reducers: {
        addProducts: (state, action) => {
            state.items = action.payload;
            localStorage.setItem('products', JSON.stringify(action.payload));
        },
        addFavorites: (state, action) => {
            const productTitle = action.payload;
            if (state.favorites.includes(productTitle)) {
                state.favorites = state.favorites.filter((title) => title !== productTitle);
            } else {
                state.favorites.push(productTitle);
            }
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        },
    },
});

export const { addProducts, addFavorites } = productSlice.actions;

export default productSlice.reducer;