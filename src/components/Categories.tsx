import React, {memo} from "react";
import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate'

type CategoriesProps = {
    categoryIndex: number;
    //что наша функция получит и что вернет
    // если мы хотим, чтобы функция была опциональная, то надо поставить setCategoryIndex?: (i: number) => void;
    setCategoryIndex: (i: number) => void;

};
const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые'];


const Categories: React.FC<CategoriesProps> = memo(({categoryIndex, setCategoryIndex}) => {

    useWhyDidYouUpdate('Categories', {categoryIndex, setCategoryIndex})

    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) =>
                    (
                        <li onClick={() => setCategoryIndex(index)} className={categoryIndex === index ? 'active' : ''}
                            key={index}>
                            {category}
                        </li>
                    ))}
            </ul>
        </div>
    );
})

export default Categories;
