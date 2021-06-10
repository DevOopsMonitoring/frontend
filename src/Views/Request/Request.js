import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Request.css'

export default function Register(){
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [description, setDescription] = React.useState('')
    const history = useHistory();

    const Register = () => {
        axios({
            method: 'post',
            url: '/api/v1/order/create',
            withCredentials: false,
            data: {
                FIO: name,
                email: email,
                phone: phone,
                description: description
            }
        })
        .then(() => {
            history.push('/')
        })
        .catch(err => {
            throw err;
        })
    }

    return(
        <div className="register">
            <h1>Оставить заявку</h1>
            <div>
                <form>
                    <div>
                        <input onChange={e => setName(e.target.value)} placeholder="ФИО" type="text" name="fio" />
                    </div>
                    <div>
                        <input onChange={e => setEmail(e.target.value)} placeholder="Email" type="text" name="email" />
                    </div>
                    <div>
                        <input onChange={e => setPhone(e.target.value)} placeholder="Телефон" type="text" name="phone" />
                    </div>
                    <div>
                        <input onChange={e => setDescription(e.target.value)} placeholder="Описание" type="text" name="description" />
                    </div>
                    <button onClick={() => Register()} type="button">Отправить</button>
                </form>
            </div>
        </div>
    )
}