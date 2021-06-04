/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import axios from 'axios';
import AddSensor from '../../Components/Modal/AddSensor'
import './Sensors.css'


export default function Sensors(){
    const [rules, setRules] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false)
    const [ruleId, setRuleId] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)

    React.useEffect(() => {
        getServers()
    }, [])

    const getServers = () => {
        axios({
            method: 'get',
            url: `/api/v1/sensors`,
            withCredentials: false,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            }
        })
            .then(response => {
                setRules(response.data.results)
                setLoaded(true)
            })
            .catch(err => {
                console.warn(err)
            })
    }

    return(
        <div className='servers-container'>
            {
                loaded && (ruleId === null) ?
                <>
                    {
                        rules.map(item => {
                            return(
                                <div className='list-element' key={item.id}>
                                    <p className='elem-name'>{item.name}</p>
                                    <a className='data-link' onClick={() => setRuleId(item.id)}>
                                        <div className='data-button'>
                                            <a className='data-name'>Редактировать</a>
                                        </div>
                                    </a>
                                </div>
                            )
                        })
                    }
                    <a onClick={() => setShowModal(!showModal)}>
                        <div className='add-element'>
                            <p className='add-name'>+</p>
                        </div>
                    </a>
                </> : null
            }
            {
                ruleId !== null ?
                    <>
                        <a className={["data-link",  "return"]} style={{marginRight: 10}} onClick={() => setRuleId(null)}>
                            <div className='data-button'>
                                <a className='data-name'>Вернуться к списку сенсоров</a>
                            </div>
                        </a>
                        <a className={["data-link",  "return"]}>
                            <div className='data-button'>Сгенерировать файл</div>
                        </a>
                    </>: null
            }
            <AddSensor show={showModal} closeModal={() => {
                setShowModal(false)
                getServers()
            }}/>
        </div>
    )
}