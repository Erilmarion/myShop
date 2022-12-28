import React, {useContext, useEffect, useRef, useState} from 'react';
import Sort, {sortList} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage, setFilter} from "../redux/slices/filterSlice";
import qs from 'qs';

import {useNavigate} from "react-router-dom";
import {fetchPizzas as fetchPizza, setItems} from "../redux/slices/pizzaSlice";

const Home = () => {
    const navigate = useNavigate();
    // const {searchValue} = useContext(SearchContext);

    //  с помощью этого флажка фиксим двойной запрос
    const dispatch = useDispatch();
    //const sortItem = useSelector(state => state.filter.sort);
    //const currentPage = useSelector(state => state.filter.currentPage);
    const {sort: sortItem, currentPage, searchValue} = useSelector(state => state.filter);
    const items = useSelector(state => state.pizza.items);
    const status = useSelector(state => state.pizza.status);


    const isSearch = useRef(false);
    const isMounted = useRef(false);


    const categoryIndex = useSelector(state => state.filter.categoryId);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    };
    const onChangePage = (number) => {
        dispatch(setCurrentPage(number));
    }

    const fetchPizzas = async () => {

        dispatch(fetchPizza({
            categoryIndex,
            sortItem,
            search
        }));


    };


    const search = searchValue ? `&search=${searchValue}` : '';
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = sortList.find(obj => obj.sort === params.sort)
            dispatch(setFilter({...params, sort}));
            isSearch.current = true;
        }
    }, [])


    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sort: sortItem.sort,
                categoryIndex,
                currentPage,
            })
            navigate(`?${queryString}`);
        }
        //после того, как произошел ренден, рендер, говорим, что тру, чтобы дальше вшивать в юрл данные фильтра.
        isMounted.current = true;
    }, [sortItem, categoryIndex, currentPage,]);


    useEffect(() => {
        window.scrollTo(0, 0);
        if (!isSearch.current) {
            fetchPizzas();
        }
        isSearch.current = false;
    }, [categoryIndex, sortItem, searchValue, currentPage])


    // фильтр на фронтенде, но обычно на практике используют бекенд
    // console.log('item:',item.filter(pizza=>pizza.title.toLowerCase().includes(searchValue.toLowerCase())));

    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories categoryIndex={categoryIndex} setCategoryIndex={(i) => (onChangeCategory(i))}/>
                    <Sort/>
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {status === 'loading' ? ([...new Array(6)].map((_, index) => <Skeleton
                        key={index}/>)) : items.map(obj => (
                        <PizzaBlock key={obj.id}{...obj}/>
                    ))}
                </div>
                <Pagination currentPage={currentPage}
                            setPaginationIndex={onChangePage}/>
            </div>
        </>

    );
};

export default Home;
