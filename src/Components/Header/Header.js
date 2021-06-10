import React from 'react';
import {Link, useHistory} from 'react-router-dom'
import './Header.css'

const Header = () => {
    const history = useHistory();
    const [pathname, setHistory] = React.useState(history.location.pathname)

    let unlisten = history.listen(({ action, location }) => {
        setHistory(history.location.pathname)
    });

    return(
        <div id="nav">
            <Link to="/" style={{textDecoration: pathname === '/' ? 'underline' : 'none', textUnderlineOffset: 10}}>Главная</Link>
            {
                localStorage.getItem('refresh_token') !== null ?
                    <>
                        | <Link to="/charts" style={{textDecoration: pathname === '/charts' ? 'underline' : 'none', textUnderlineOffset: 10}}>Мои сервера</Link> |
                        <Link to="/my_rules" style={{textDecoration: pathname === '/my_rules' ? 'underline' : 'none', textUnderlineOffset: 10}}>Правила сбора информации</Link>
                        <span style={{float: "right"}} onClick={() => {
                            localStorage.removeItem('access_token');
                            localStorage.removeItem('refresh_token');
                            localStorage.removeItem('user_id')
                            history.push('/')
                            window.location.reload()
                        }}>
                            | <a>Выйти</a>
                        </span>
                        <Link to="/sensors" style={{float: "right"}}>{localStorage.getItem('login')}</Link>
                    </> :
                    <span style={{float: "right"}}>
                        <Link to="/login" style={{textDecoration: pathname === '/login' ? 'underline' : 'none', textUnderlineOffset: 10}}>Войти</Link> |
                        <Link to="/request" style={{textDecoration: pathname === '/register' ? 'underline' : 'none', textUnderlineOffset: 10}}>Оставить заявку</Link>
                    </span>
            }
            {
                localStorage.getItem('user_id') === "1" ?
                    <>
                        | <Link to="/sensors" style={{textDecoration: pathname === '/sensors' ? 'underline' : 'none', textUnderlineOffset: 10}}>Датчики</Link> |
                        <Link to="/companies" style={{textDecoration: pathname === '/companies' ? 'underline' : 'none', textUnderlineOffset: 10}}>Организации</Link> |
                        <Link to="/report" style={{textDecoration: pathname === '/report' ? 'underline' : 'none', textUnderlineOffset: 10}}>Отчеты</Link>
                    </> : null
            }
        </div>
    );
}

export default Header