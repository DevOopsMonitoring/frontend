import React from 'react';
import { Link, useHistory } from 'react-router-dom'
import './Header.css'

const Header = () => {
    const history = useHistory();
    return(
        <div id="nav">
            <Link to="/">Главная</Link> |
            
            {localStorage.getItem('refresh_token') !== null ?
            <>
            <Link to="/charts">Мои сервера</Link> |
            <span onClick={() => {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('user_id')
                history.push('/')
                window.location.reload()
            }}>
                <a>Выйти</a>
            </span>
            </> :
            <span>
                <Link to="/register">Зарегистрироваться</Link> |
                <Link to="/login">Войти</Link>
            </span>}
        </div>
    )
}

export default Header