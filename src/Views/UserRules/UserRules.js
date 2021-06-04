/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import axios from 'axios';
import Charts from '../../Components/Charts/Charts'
import AddRule from '../../Components/Modals/AddRule'
import './UserRules.css'


export default function UserRules(){
    const [servers, setServers] = React.useState([]);
    const [sensors, setSensors] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false)
    const [serverId, setServerId] = React.useState(null)
    const [sensorId, setSensorId] = React.useState(null)
    const [mySensors, setMySensors] = React.useState([])
    const [showModal, setShowModal] = React.useState(false)
    const [titleModal, setTitleModal] = React.useState(null)

    React.useEffect(() => {
        getServers()
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
            })
            .catch(err => {
                console.warn(err)
            })
    }

    const getMySensors = (server_token) => {
        axios
            .request({
                method: 'get',
                url: `/api/v1/rule/${server_token}`,
                withCredentials: false,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            .then(response => {
                setMySensors(response.data.rules)
            })
            .catch(err => {
                console.warn(err)
            })
    }

    const getServers = () => {
        axios({
            method: 'get',
            url: `/api/v1/users/${localStorage.getItem('user_id')}`,
            withCredentials: false,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            }
        })
            .then(response => {
                setServers(response.data.user.servers)
                setLoaded(true)
            })
            .catch(err => {
                console.warn(err)
            })
    }

    const showMyServers = () => {
        return servers.map(item => {
            return(
                <div className='list-element' key={item.id}>
                    <p className='elem-name'>{item.name}</p>
                    <a className='data-link' onClick={() => {
                        getMySensors(item.token)
                        setServerId(item.id)
                    }}>
                        <div className='data-button'>
                            <a className='data-name'>Датчики</a>
                        </div>
                    </a>
                </div>
            )
        })
    }

    const showSensors = () => {
        var all_sensors = []
        var my_sensors = []
        for (let i = 0; i < sensors.length; i++) {
            var flag = true
            for (let j = 0; j < mySensors.length; j++) {
                if (sensors[i].id === mySensors[j].sensor_id){
                    var tmp_sensor = mySensors[j].sensor
                    tmp_sensor.critical_value = mySensors[j].critical_value
                    tmp_sensor.rule_id = mySensors[j].rule_id
                    my_sensors.push(mySensors[j].sensor)
                    flag = false
                    break
                }
            }
            if (flag)
                all_sensors.push(sensors[i])
        }
        return(
            <div>{
                my_sensors.map(item => {
                    return (
                        <div className='list-element' key={item.id}>
                            <p className='elem-name'>{item.name}</p>
                            <a className='data-link' onClick={() => {
                                setTitleModal('Редактировать')
                                setSensorId(item.id)
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
            {
                all_sensors.map(item => {
                    return (
                        <div className='list-element' key={item.id}>
                            <p className='elem-name'>{item.name}</p>
                            <a className='data-link' onClick={() => {
                                setTitleModal('Добавить')
                                setSensorId(item.id)
                                setShowModal(true)
                            }}>
                                <div className='data-button'>
                                    <a className='data-name'>Добавить</a>
                                </div>
                            </a>
                        </div>
                    )
                })
            }
            </div>
        )
    }

    return(
        <div className='servers-container'>
            {
                loaded && (serverId === null) ?
                <>
                    {showMyServers()}
                </> : null
            }
            {
                loaded && (serverId !== null) ?
                <span style={{display: "flex", flexDirection: "column"}}>
                    <a className={["data-link",  "return"]} style={{marginRight: 10}} onClick={() => {
                        setServerId(null)
                        setMySensors([])
                    }}>
                        <div className='data-button'>
                            <a className='data-name'>Вернуться к списку серверов</a>
                        </div>
                    </a>
                    <div style={{margin: 10}}>
                        {
                            showSensors()

                        }
                    </div>
                </span>: null
            }
            <AddRule
                show={showModal}
                closeModal={() => {
                    setShowModal(false)
                    getServers()
                }}
                Titel={titleModal}
                sensorId={sensorId}
                serverId={serverId}
            />
        </div>
    )
}