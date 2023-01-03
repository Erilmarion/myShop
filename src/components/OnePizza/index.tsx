import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

const OnePizza: React.FC = () => {

    const [data, setData] = useState <{imageUrl : string }>();


    let {id} = useParams();

    useEffect(() => {
        async function fetchPizza() {
            try {
                const {data: pizzaInfo} = await axios.get('https://639b849fd51415019757269b.mockapi.io/items/' + id);
                console.log(pizzaInfo);
                setData(pizzaInfo);
            } catch (e) {
                console.log('some error', e);
            }
        }

        fetchPizza();

    }, [])

    if (!data) {
        return (<> Loading...</>)
    }

    return (
        <div className='container'>
            <h1>Одна пицца и её характеристики</h1>
            <img src={data.imageUrl} alt=""/>
        </div>
    );
};

export default OnePizza;
