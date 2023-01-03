import PlusIcon from "./icons/PlusIcon";
import logoSvg from "../assests/img/pizza-logo.svg"
import {Link} from "react-router-dom";
import Search from "./Search";
import {useSelector} from "react-redux";
import {selectCart} from "../redux/slices/cartSlice";
import {useEffect, useRef} from "react";

function Header() {
    const {items, totalPrice} = useSelector(selectCart);
    const isMounted = useRef(false);
    useEffect(() => {
        if (isMounted.current) {
            const json = JSON.stringify(items);
            localStorage.setItem('cart', json);
        }
        isMounted.current = true;

    }, [items]);
    const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0)
    return (
        <div className="header">
            <div className="container">
                <Link to='/'>
                    <div className="header__logo">
                        <img width="38" src={logoSvg} alt="Pizza logo"/>
                        <div>
                            <h1>Sancho Pizza</h1>
                            <p>самая вкусная пицца во вселенной</p>
                        </div>
                    </div>
                </Link>
                <Search/>
                <div className="header__cart">
                    <Link to="/cart" className="button button--cart">
                        <span>{totalPrice} $</span>
                        <div className="button__delimiter"></div>
                        <PlusIcon/>
                        <span>{totalCount}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;
