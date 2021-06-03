import React from 'react';
import axios from 'axios';
import './Modal.css';


const Modal = ({show, closeModal}) => {
    const addServer = () => {
        var name = document.getElementById("name").value;
        var description = document.getElementById("description").value;
        var address = document.getElementById("address").value;
        axios({
            method: 'post',
            url: `/api/v1/servers`,
            withCredentials: false,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            },
            data: {
                "name": name,
                "description": description,
                "address": address
            }
        })
            .then(Response => {
                axios({
                    method: 'put',
                    url: `/api/v1/users/${localStorage.getItem('user_id')}`,
                    withCredentials: false,
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                    },
                    data: {
                        "servers_id_add": [Response.data.server.id]
                    }
                })
                    .then(
                        () => {
                            alert("Сервер успешно создан");
                            closeModal()
                        }
                    )
            })
    }
    return (
        <div className={'modal-container'} style={{visibility: show ? 'visible' : 'hidden'}}>
            <h2>Добавить сервер</h2>
            <input id="name" type="text" placeholder='Название сервера'/>
            <input id="description" type="text" placeholder='Описание сервера'/>
            <input id="address" type="text" placeholder='Адрес сервера'/>
            <button onClick={() => {addServer(); }} style={{marginRight: 10}} type="button">Добавить
            </button>
            <button onClick={closeModal} type="button">Закрыть</button>
        </div>
    )
}

export default Modal;