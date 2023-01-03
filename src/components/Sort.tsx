import React, {useEffect, useRef, useState} from 'react';
import SortIcon from './icons/SortIcon';
import {useDispatch, useSelector} from 'react-redux';
import {setSort, SortFilter} from '../redux/slices/filterSlice';


type SortItem = {
    name: string;
    sort: string;
};

export const sortList: SortItem[] = [
    {
        name: 'популярности',
        sort: 'rating',
    },
    {
        name: 'цене',
        sort: 'price',
    },
    {
        name: 'алфавиту',
        sort: 'title',
    },
];


function Sort() {
    const dispatch = useDispatch();
    const sortItem = useSelector((state: any) => state.filter.sort);
    const sortRef = useRef<HTMLDivElement>(null);
    const [isVisiblePopup, setVisible] = useState(false);

    const setItemAndClosePopup = (obj: SortFilter) => {
        console.log('obj:', obj);
        dispatch(setSort(obj));
        setVisible(false);
    };
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {

            const _event = event as MouseEvent & {
                path: Node[];
            };

            if (sortRef.current && !_event.path.includes(sortRef.current)) {
                setVisible(false);
            }
        };
        document.body.addEventListener('click', handleClickOutside);
        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div ref={sortRef} className="sort">
            <div className="so  rt__label">
                <SortIcon/>
                <b>Сортировка по:</b>
                <span onClick={() => setVisible(!isVisiblePopup)}>{sortItem.name}</span>
            </div>
            {isVisiblePopup && (
                <div className="sort__popup">
                    <ul>
                        {sortList.map((obj, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    setItemAndClosePopup((obj as any as SortFilter))
                                }}
                                className={sortItem.sort === obj.sort ? 'active' : ''}
                            >
                                {obj.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Sort;
