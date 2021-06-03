/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import axios from 'axios';
import Charts from '../Charts/Charts'
import './UserServers.css'


export default function UserServers(){
    const [servers, setServers] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false)
    const [serverId, setServerId] = React.useState(null)

    React.useEffect(() => {
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
    }, [])

    return(
        <div className='servers-container'>
            {loaded && (serverId === null) ? 
            <>
                {servers.map(item => {
                    return(
                        <div className='list-element' key={item.id}>
                            <p className='elem-name'>{item.name}</p>
                            <a className='data-link' onClick={() => setServerId(item.id)}>
                                <div className='data-button'>
                                    <a className='data-name'>Данные</a>
                                </div>
                            </a>
                        </div>
                    )
                })}
            </> : null}
            {serverId !== null ? 
            <>
            <a className={["data-link",  "return"]} onClick={() => setServerId(null)}>
                <div className='data-button'>
                    <a className='data-name'>Вернуться к списку серверов</a>
                </div>
            </a>
            <Charts id={serverId}/> </>: null}
        </div>
    )
}