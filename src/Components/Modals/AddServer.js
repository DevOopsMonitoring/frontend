import React from 'react';
import axios from 'axios';
import './Modal.css';


const AddServer = ({show, closeModal, titleModal, serverId}) => {

    const registerServer = (server_id) => {
        axios
            .request({
                method: 'put',
                url: `/api/v1/users/${localStorage.getItem('user_id')}`,
                withCredentials: false,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                },
                data: {
                    "servers_id_add": [server_id]
                }
            })
            .then(
                () => {
                    closeModal()
                }
            )
    }

    const addServer = () => {

        var name = document.getElementById("name").value;
        var description = document.getElementById("description").value;
        var address = document.getElementById("address").value;

        axios
            .request({
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
                registerServer(Response.data.server.id)
            })
    }

    const updateServer = (server_id) => {
        axios
            .request({
                method: 'put',
                url: `/api/v1/servers/${server_id}`,
                withCredentials: false,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                },
                data: {
                    'name': document.getElementById("name").value,
                    'description': document.getElementById("description").value,
                    'address': document.getElementById("address").value
                }
            })
            .then(Response => {
                closeModal();
            })
    }

    async function aboutServer(server_id)  {
        return axios
            .request({
                method: 'get',
                url: `/api/v1/servers/${server_id}`,
                withCredentials: false,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                }
            })
    }

    const doServer = () => {
        if (titleModal === 'Добавить')
            addServer()
        else
            updateServer(serverId)
    }

    if (titleModal === 'Редактировать') {
       aboutServer(serverId).then(
            data => {
                let server = data.data.server
                document.getElementById("name").value = server.name
                document.getElementById("description").value = server.description
                document.getElementById("address").value = server.address
            }
        );
    } else if (titleModal === 'Добавить') {
        document.getElementById("name").value = ""
        document.getElementById("description").value = ""
        document.getElementById("address").value = ""
    }

    return (
        <div className={'modal-container'} style={{visibility: show ? 'visible' : 'hidden'}}>
            <h2>{titleModal} сервер</h2>
            <input id="name" type="text" placeholder='Название сервера'/>
            <input id="description" type="text" placeholder='Описание сервера'/>
            <input id="address" type="text" placeholder='Адрес сервера'/>
            <button onClick={() => {doServer(); }} style={{marginRight: 10}} type="button">
                {titleModal}
            </button>
            <button onClick={closeModal} type="button">Закрыть</button>
        </div>
    )
}

export default AddServer;