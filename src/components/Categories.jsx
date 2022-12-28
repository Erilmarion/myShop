import {useState} from "react";

function Categories({categoryIndex, setCategoryIndex}) {
    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые'];



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
}

export default Categories;
