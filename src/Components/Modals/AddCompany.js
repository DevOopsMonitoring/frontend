import React from 'react';
import axios from 'axios';
import './Modal.css';


const AddCompany = ({show, closeModal, title, company}) => {
    const addCompany = () => {
        var name = document.getElementById("name").value;
        var description = document.getElementById("description").value;
        var phone = document.getElementById("phone").value;
        var address = document.getElementById("address").value;

        axios
            .request({
                method: 'post',
                url: `/api/v1/companies`,
                withCredentials: false,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                },
                data: {
                    "name": name,
                    "description": description,
                    "phone": phone,
                    "address": address,
                }
            })
            .then(Response => {
                closeModal();
            })
    }

    const updateCompany = () => {
        var name = document.getElementById("name").value;
        var description = document.getElementById("description").value;
        var phone = document.getElementById("phone").value;
        var address = document.getElementById("address").value;

        axios
            .request({
                method: 'put',
                url: `/api/v1/companies/${company.id}`,
                withCredentials: false,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                },
                data: {
                    "name": name,
                    "description": description,
                    "phone": phone,
                    "address": address,
                }
            })
            .then(Response => {
                closeModal();
            })
    }

    const deleteRule = () => {
        axios
            .request({
                method: 'delete',
                url: `/api/v1/companies/${company.id}`,
                withCredentials: false,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            .then(Response => {
                closeModal();
            })
    }

    const doCompamy = () => {
        if (title === 'Редактировать')
            updateCompany()
        else
            addCompany()
    }

    if (title === 'Редактировать') {
        document.getElementById("name").value = company.name
        document.getElementById("description").value = company.description
        document.getElementById("address").value = company.address
        document.getElementById("phone").value = company.phone
    } else if (title === 'Добавить') {
        document.getElementById("name").value = ""
        document.getElementById("description").value = ""
        document.getElementById("address").value = ""
        document.getElementById("phone").value = ""
    }

    return (
        <div className={'modal-container'} style={{visibility: show ? 'visible' : 'hidden'}}>
            <div style={
                {position: "absolute", right: "20px", top: "10px", fontSize: "xx-large", color: "red", cursor: "pointer",
                    visibility: title === "Редактировать" && show ? 'visible' : 'hidden'}}
                 onClick={() => {
                     deleteRule();
                     closeModal();
                 }}
            >
                🗑
            </div>
            <h2>{title} компанию</h2>
            <input id="name" type="text" placeholder='Название'/>
            <input id="description" type="text" placeholder='Описание'/>
            <input id="address" type="text" placeholder='Адрес'/>
            <input id="phone" type="phone" placeholder='Телефон'/>
            {
                title === "Редактировать" && show ?
                    <div>
                        Пригласительная ссылка: <a href={`https://abramov.bpi18.ru/register?q=${company.token}`}>https://abramov.bpi18.ru/register?q={company.token}</a>
                    </div>
                    :
                    null
            }
            <button onClick={() => {doCompamy(); closeModal();}} style={{marginRight: 10}} type="button">
                {title}
            </button>
            <button onClick={closeModal} type="button">Закрыть</button>
        </div>
    )
}

export default AddCompany;