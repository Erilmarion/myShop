import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type SortFilter = {
    name: string,
    sort: 'rating' | 'price' | 'title'
};

export interface FilterSliceState {
    categoryId: number,
    sort: SortFilter,
    currentPage: number,
    searchValue: string,
}


const initialState: FilterSliceState = {
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
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSort(state, action: PayloadAction<SortFilter>) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilter(state, action: PayloadAction<FilterSliceState>) {
            state.categoryId = Number(action.payload.categoryId );
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
