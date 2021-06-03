import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Register.css'

export default function Register(){
    const [login, setLogin] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [repeat_password, setRepeatPassword] = React.useState('')
    const history = useHistory();

    const Register = () => {
        if (password === repeat_password)
            axios({
                method: 'post',
                url: '/api/v1/users',
                withCredentials: false,
                data: {
                    username: login,
                    email: email,
                    password: password
                }
            })
            .then(() => {
                history.push('/login')
            })
            .catch(err => {
                throw err;
            })
    }

    return(
        <div className="register">
            <h1>Регистрация</h1>
            <div>
                <form>
                    <div>
                        <input onChange={e => setLogin(e.target.value)} placeholder="Логин" type="text" name="username" />
                    </div>
                    <div>
                        <input onChange={e => setEmail(e.target.value)} placeholder="Email" type="text" name="full_name" />
                    </div>
                    <div>
                        <input onChange={e => setPassword(e.target.value)} placeholder="Пароль" type="password" name="password" />
                    </div>
                    <div>
                        <input onChange={e => setRepeatPassword(e.target.value)} placeholder="Повторите пароль" type="password" name="repeat_password" />
                    </div>
                    <button onClick={() => Register()} type="button">Зарегистрироваться</button>
                </form>
            </div>
        </div>
    )
}