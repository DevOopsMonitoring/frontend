import React from 'react';
import axios from 'axios';
import './Modal.css';


const AddRule = ({show, closeModal, Titel, rule, sensorId, serverId}) => {
    const addRule = () => {
        var critical_value = document.getElementById("critical_value").value;

        axios
            .request({
                method: 'post',
                url: `/api/v1/rule`,
                withCredentials: false,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                },
                data: {
                    "server_id": serverId,
                    "sensor_id": sensorId,
                    "critical_value": critical_value
                }
            })
            .then(Response => {
                closeModal();
            })
    }

    const updateRule = () => {
        var critical_value = document.getElementById("critical_value").value;
        axios
            .request({
                method: 'put',
                url: `/api/v1/rule/${rule.rule_id}`,
                withCredentials: false,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                },
                data: {
                    "server_id": serverId,
                    "sensor_id": sensorId,
                    "critical_value": critical_value
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
                url: `/api/v1/rule/${rule.rule_id}`,
                withCredentials: false,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            .then(Response => {
                closeModal();
            })
    }

    const doSensor = () => {
        if (Titel === 'Редактировать')
            updateRule()
        else
            addRule()
    }

    if (Titel === 'Редактировать') {
        document.getElementById("critical_value").value = rule.critical_value
    } else if (Titel === 'Добавить') {
        document.getElementById("critical_value").value = ""
    }

    return (
        <div className={'modal-container'} style={{visibility: show ? 'visible' : 'hidden'}}>
            <div style={
                {position: "absolute", right: "20px", top: "10px", fontSize: "xx-large", color: "red", cursor: "pointer",
                    visibility: Titel === "Редактировать" && show ? 'visible' : 'hidden'}}
                 onClick={() => {
                     deleteRule();
                     closeModal();
                 }}
            >
                🗑
            </div>
            <h2>{Titel} правило</h2>
            <input id="critical_value" type="text" placeholder='Критическое значение'/>
            <button onClick={() => {doSensor(); closeModal();}} style={{marginRight: 10}} type="button">
                {Titel}
            </button>
            <button onClick={closeModal} type="button">Закрыть</button>
        </div>
    )
}

export default AddRule;