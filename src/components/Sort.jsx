import {useEffect, useRef, useState} from "react";
import SortIcon from "./icons/SortIcon";
import {useDispatch, useSelector} from "react-redux";
import {setSort} from "../redux/slices/filterSlice";

export const sortList = [
    {
        name: 'популярности', sort: 'rating'
    },
    {
        name: 'цене', sort: 'price'
    },
    {
        name: 'алфавиту',
        sort: 'title',
    }];

function Sort() {
    const dispatch = useDispatch();
    const sortItem = useSelector((state) => state.filter.sort);
    const sortRef = useRef();
    const [isVisiblePopup, setVisible] = useState(false);


    const setItemAndClosePopup = (obj) => {
        dispatch(setSort(obj))
        setVisible(false);
    }
    useEffect(() => {
        const handleClickOutside = event => {
            if (!event.path.includes((sortRef.current))) {
                setVisible(false);
            }

        }
        document.body.addEventListener('click', handleClickOutside);
        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        }
    }, [])

    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <SortIcon/>
                <b>Сортировка по:</b>
                <span onClick={() => (setVisible(!isVisiblePopup))}>{sortItem.name}</span>
            </div>
            {isVisiblePopup && (
                <div className="sort__popup">
                    <ul>
                        {sortList.map((obj, index) => (
                            <li key={index} onClick={() => setItemAndClosePopup(obj)}
                                className={sortItem.sort === obj.sort ? 'active' : ''}>{obj.name}</li>))}
                    </ul>
                </div>)}
        </div>
    );
}

export default Sort;
