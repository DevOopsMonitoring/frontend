/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import axios from 'axios';
import AddSensor from '../../Components/Modals/AddSensor'
import './Sensors.css'


export default function Sensors(){
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
            {
                sensors.map(item => {
                    return (
                        <div className='list-element' key={item.id}>
                            <p className='elem-name'>{item.name}</p>
                            <a className='data-link' onClick={() => {
                                setSensorId(item.id)
                                setTitleModal('Редактировать')
                                setShowModal(true)
                            }}>
                                <div className='data-button'>
                                    <a className='data-name'>Редактировать</a>
                                </div>
                            </a>
                        </div>
                    )
                })
            }

            <a onClick={() => {
                setTitleModal('Добавить')
                setShowModal(!showModal)
            }}>
                <div className='add-element'>
                    <p className='add-name'>+</p>
                </div>
            </a>
            <AddSensor
                show={showModal}
                closeModal={() => {
                    setShowModal(false)
                    getSensors()
                }}
                Titel={titleModal}
                sensors={sensors}
                sensorID={sensorId}
            />
        </div>
    )
}