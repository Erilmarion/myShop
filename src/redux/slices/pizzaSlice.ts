import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

export type SearchPizzaParams = {
    categoryId: string,
    sortItem: string,
    search: string,
}


type FetchPizzasArgs = {
    categoryId: number;
    sortItem: { sort: string };
    search: string;
};

type Pizza = {
    id: string;
    imageUrl: string;
    price: number;
    sizes: number[];
    types: number[]
    rating: number;
}

interface PizzaSliceState {
    items: Pizza[];
    status: 'loading' | 'success' | 'error'
}


export const fetchPizzas = createAsyncThunk(
    'pizza/ fetchPizzasStatus',
    async (params: FetchPizzasArgs) => {
        const {
            categoryId,
            sortItem,
            search
        } = params;

        const {data} = await axios.get(`https://639b849fd51415019757269b.mockapi.io/items?${categoryId > 0 ? `category=${categoryId}` : ''}&sortType=${sortItem.sort}&order=desc${search}`)
        return data as Pizza[];
    }
);


const initialState: PizzaSliceState = {
    items: [],
    status: 'loading'
};


const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = 'loading';
            state.items = [];
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.status = 'success';
            state.items = action.payload;
        })

        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = 'error';
            state.items = [];
        })
    }


});

export const {setItems} = pizzasSlice.actions;

export default pizzasSlice.reducer;
