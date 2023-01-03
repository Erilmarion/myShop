import React, {useCallback, useEffect, useRef} from 'react';
import Sort, {sortList} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import {useSelector} from "react-redux";
import {FilterSliceState, setCategoryId, setCurrentPage, setFilter} from "../redux/slices/filterSlice";
import qs from 'qs';
import {Link, useNavigate} from "react-router-dom";
import {fetchPizzas as fetchPizza} from "../redux/slices/pizzaSlice";
import {useAppDispatch} from "../redux/store";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {sort: sortItem, currentPage, searchValue} = useSelector((state: any) => state.filter);
    const {items, status} = useSelector((state: any) => state.pizza);

    const isSearch = useRef(false);
    const isMounted = useRef(false);


    const categoryIndex = useSelector((state: any) => state.filter.categoryId);

    const onChangeCategory = useCallback((id: number) => {
        dispatch(setCategoryId(id));
    }, []);


    const onChangePage = (number: number) => {
        dispatch(setCurrentPage(number));
    }

    const fetchPizzas = async () => {

        dispatch(
            fetchPizza({
                categoryId: categoryIndex,
                sortItem,
                search
            }));


    };


    const search = searchValue ? `&search=${searchValue}` : '';
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = sortList.find(obj => obj.sort === params.sort)
            if (sort) {
                params.sort = sort;
            }
            params.categoryId = categoryIndex;
            dispatch(setFilter(params as unknown as FilterSliceState));
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


    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories categoryIndex={categoryIndex} setCategoryIndex={onChangeCategory}/>
                    <Sort value={sortItem}/>
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {status === 'loading' ? ([...new Array(6)].map((_, index) => <Skeleton
                        key={index}/>)) : items.map((obj: any) => (
                        <Link key={obj.id} to={`pizza/${obj.id}`}>
                            <PizzaBlock {...obj}/>
                        </Link>
                    ))}
                </div>
                <Pagination currentPage={currentPage}
                            setPaginationIndex={onChangePage}/>
            </div>
        </>

    );
};

export default Home;
