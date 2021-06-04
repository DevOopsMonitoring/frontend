import React from 'react';
import axios from 'axios';
import './Modal.css';


const AddSensor = ({show, closeModal}) => {
    const addSensor = () => {
        var name = document.getElementById("name").value;
        var description = document.getElementById("description").value;
        var snmp = document.getElementById("snmp").value;
        axios
            .request({
                method: 'post',
                url: `/api/v1/sensors`,
                withCredentials: false,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                },
                data: {
                    "name": name,
                    "description": description,
                    "snmp": snmp
                }
            })
            .then(() => {
                alert("Сервер успешно создан");
                closeModal()
            })
    }
    return (
        <div className={'modal-container'} style={{visibility: show ? 'visible' : 'hidden'}}>
            <h2>Добавить сервер</h2>
            <input id="name" type="text" placeholder='Название сенсора'/>
            <input id="description" type="text" placeholder='Описание сенсора'/>
            <input id="snmp" type="text" placeholder='SNMP'/>
            <button onClick={() => {addSensor(); }} style={{marginRight: 10}} type="button">
                Добавить
            </button>
            <button onClick={closeModal} type="button">Закрыть</button>
        </div>
    )
}

export default AddSensor;