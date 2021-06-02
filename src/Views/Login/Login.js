import axios from 'axios';
import { useHistory } from "react-router-dom";
import React from 'react';
import './Login.css'


export default function Login(){
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('')
    const history = useHistory()

    const Login = () => {
        axios({
            method: 'post',
            url: '/auth/login',
            withCredentials: false,
            data: {
              username: login,
              password: password
            }
          })
          .then(response => {
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            history.push('/')
            window.location.reload()
          })
    }

    return(
        <div className="login">
            <h1>Авторизация</h1>
            <div>
                <form onSubmit={() => Login()}>
                    <div>
                        <input onChange={e => setLogin(e.target.value)} placeholder='Логин' type="text" name="username" v-model="form.username" />
                    </div>
                    <div>
                        <input onChange={e => setPassword(e.target.value)} placeholder='Пароль' type="password" name="password" v-model="form.password" />
                    </div>
                    <button onClick={() => Login()} type='button'>Войти</button>
                </form>
            </div>
        </div>
    )
}