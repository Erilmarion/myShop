import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    sort: {
        name: 'популярности',
        sort: 'rating'
    },
    currentPage: 1,
    searchValue: '',
};


const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setFilter(state, action) {
            state.categoryId = Number(action.payload.categoryIndex);
            state.currentPage = Number(action.payload.currentPage);
            state.sort = action.payload.sort;
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },
    },

});

export const {setCategoryId, setSort, setCurrentPage, setFilter, setSearchValue} = filterSlice.actions;

export default filterSlice.reducer;
