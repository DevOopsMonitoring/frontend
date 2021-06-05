/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import axios from 'axios';
import AddSensor from '../../Components/Modals/AddSensor'
import './Report.css'


export default function Report(){
    const [sensors, setSensors] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false)
    const [sensorId, setSensorId] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)
    const [titleModal, setTitleModal] = React.useState(null)

    React.useEffect(() => {
        setTitleModal('Добавить')
        getSensors()
    }, [])

    const getSensors = () => {
        axios({
            method: 'get',
            url: `/api/v1/sensors`,
            withCredentials: false,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            }
        })
            .then(response => {
                setSensors(response.data.results)
                setLoaded(true)
            })
            .catch(err => {
                console.warn(err)
            })
    }

    return(
        <div className='servers-container'>
            <div className='list-element' key={1}>
                <p className='elem-name'>Число сотрудников</p>
                <a className='data-link' href="https://devoops.w0rng.ru/api/v1/reports/number_employees_in_companies/print">
                    <div className='data-button'>
                        <a className='data-name'>Подробнее</a>
                    </div>
                </a>
            </div>
            <div className='list-element' key={1}>
                <p className='elem-name'>Число серверов</p>
                <a className='data-link' href="https://devoops.w0rng.ru/api/v1/reports/number_servers_in_companies/file">
                    <div className='data-button'>
                        <a className='data-name'>Подробнее</a>
                    </div>
                </a>
            </div>
        </div>
    )
}