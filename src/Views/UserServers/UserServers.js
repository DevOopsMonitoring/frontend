/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import axios from 'axios';
import Charts from '../../Components/Charts/Charts'
import Modal from '../../Components/Modal/Modal'
import './UserServers.css'


export default function UserServers(){
    const [servers, setServers] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false)
    const [serverId, setServerId] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)

    React.useEffect(() => {
        getServers()
    }, [])

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
                <a onClick={() => setShowModal(!showModal)}>
                    <div className='add-element'>
                        <p className='add-name'>+</p>
                    </div>
                </a>
            </> : null}
            {serverId !== null ? 
            <>
            <a className={["data-link",  "return"]} style={{marginRight: 10}} onClick={() => setServerId(null)}>
                <div className='data-button'>
                    <a className='data-name'>Вернуться к списку серверов</a>
                </div>
            </a>
            <a className={["data-link",  "return"]} onClick={
                () => {
                    axios
                        .request({
                            method: 'get',
                            url: `/api/v1/servers/1/file`,
                            withCredentials: false,
                            headers: {
                                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                            }
                        })
                        .then(({ data }) => {

                            const downloadUrl = window.URL.createObjectURL(new Blob([data]));
                            const link = document.createElement('a');
                            link.href = downloadUrl;
                            link.setAttribute('download', 'collect_info.py'); //any other extension
                            document.body.appendChild(link);
                            link.click();
                            link.remove();
                        });
                    alert('Разместите данный файл на сервере.')
                    }
            }>
                <div className='data-button'>Сгенерировать файл</div>
            </a>
            <Charts id={serverId}/> </>: null}
            <Modal show={showModal} closeModal={() => {
                setShowModal(false)
                getServers()
            }}/>
        </div>
    )
}