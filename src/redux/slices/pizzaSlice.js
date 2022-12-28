import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizza/ fetchPizzasStatus',
    async (params) => {
        const {
            categoryIndex,
            sortItem,
            search
        } = params;

        const {data} = await axios.get(`https://639b849fd51415019757269b.mockapi.io/items?${categoryIndex > 0 ? `category=${categoryIndex}` : ''}&sortType=${sortItem.sort}&order=desc${search}`)
        return data;
    }
)


const initialState = {
    items: [],
    status: 'loading'
};


const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.loading = 'loading';
            state.items = [];
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        },
        [fetchPizzas.rejected]: (state, action) => {
            state.status = 'error';
            state.items = [];
        }
    },

});

export const {setItems} = pizzasSlice.actions;

export default pizzasSlice.reducer;
