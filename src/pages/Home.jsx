import React, {useEffect, useRef} from 'react';
import Sort, {sortList} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage, setFilter} from "../redux/slices/filterSlice";
import qs from 'qs';
import {Link, useNavigate} from "react-router-dom";
import {fetchPizzas as fetchPizza, setItems} from "../redux/slices/pizzaSlice";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {sort: sortItem, currentPage, searchValue} = useSelector(state => state.filter);
    const {items, status} = useSelector(state => state.pizza);

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
                        key={index}/>)) : items.map(obj => (<Link key={obj.id} to={`pizza/${obj.id}`}>
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
