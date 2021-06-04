import React from 'react';
import axios from 'axios';
import './Modal.css';


const AddSensor = ({show, closeModal, Titel, sensors, sensorID}) => {
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
                alert("Сенсор успешно создан");
                closeModal()
            })
    }

    const updateSensor = () => {
        axios
            .request({
                method: 'put',
                url: `/api/v1/sensors/${sensorID}`,
                withCredentials: false,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                },
                data: {
                    'name': document.getElementById("name").value,
                    'description': document.getElementById("description").value,
                    'snmp': document.getElementById("snmp").value
                }
            })
            .then(Response => {
                closeModal();
            })
    }

    const deleteSensor = () => {
        alert('123')
    }

    const doSensor = () => {
        if (Titel === 'Редактировать')
            updateSensor()
        else
            addSensor()
    }

    if (Titel === 'Редактировать') {
        var sensor = sensors.filter(item => item.id === sensorID)[0]
        document.getElementById("name").value = sensor.name
        document.getElementById("description").value = sensor.description
        document.getElementById("snmp").value = sensor.snmp
    } else if (Titel === 'Добавить') {
        document.getElementById("name").value = ""
        document.getElementById("description").value = ""
        document.getElementById("snmp").value = ""
    }

    return (
        <div className={'modal-container'} style={{visibility: show ? 'visible' : 'hidden'}}>
            <div style={
                {position: "absolute", right: "20px", top: "10px", fontSize: "xx-large", color: "red",
                visibility: Titel === "Редактировать" && show ? 'visible' : 'hidden'}}
                 onClick={() => deleteSensor()}
            >
                🗑
            </div>
            <h2>{Titel} сенсор</h2>
            <input id="name" type="text" placeholder='Название сенсора'/>
            <input id="description" type="text" placeholder='Описание сенсора'/>
            <input id="snmp" type="text" placeholder='SNMP'/>
            <button onClick={() => {doSensor(); }} style={{marginRight: 10}} type="button">
                {Titel}
            </button>
            <button onClick={closeModal} type="button">Закрыть</button>
        </div>
    )
}

export default AddSensor;