/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import axios from 'axios';
import Charts from '../../Components/Charts/Charts'
import AddServer from '../../Components/Modal/AddServer'
import './UserServers.css'


export default function UserServers(){
    const [servers, setServers] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false)
    const [serverId, setServerId] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)
    const [titleModal, setTitleModal] = React.useState(null)

    React.useEffect(() => {
        getServers()
        setTitleModal('Добавить')
    }, [])

    const getServers = () => {
        axios
            .request({
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

    const getFile = () => {
        axios
            .request({
                method: 'get',
                url: `/api/v1/servers/${serverId}/file`,
                withCredentials: false,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            .then(({data}) => {

                const downloadUrl = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', 'collect_info.py');
                document.body.appendChild(link);
                link.click();
                link.remove();
            });
        alert('Разместите данный файл на сервере.')
    }

    const deleteServer = () => {
        axios
            .request({
                method: 'delete',
                url: `/api/v1/servers/${serverId}`,
                withCredentials: false,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            .then(
                () => {
                    alert('Сервер успешно удален')
                    setServerId(null)
                    getServers()
                }
            );
    }

    const editServer = () => {
        setTitleModal('Редактировать')
        setShowModal(true);
    }

    if (servers === [])
        getServers()

    return (
        <div className='servers-container'>
            {
                loaded && (serverId === null) ?
                    <>
                        {
                            servers.map(item => {
                                return (
                                    <div className='list-element' key={item.id}>
                                        <p className='elem-name'>{item.name}</p>
                                        <a className='data-link' onClick={() => setServerId(item.id)}>
                                            <div className='data-button'>
                                                <a className='data-name'>Подробнее</a>
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
                serverId !== null ?
                    <>
                        <a className={["data-link", "return"]} style={{marginRight: 10}}
                           onClick={() => setServerId(null)}>
                            <div className='data-button'>
                                <a className='data-name'>Вернуться к списку серверов</a>
                            </div>
                        </a>
                        <a className={["data-link", "return"]} onClick={() => getFile()} style={{marginRight: 10}}>
                            <div className='data-button'>Сгенерировать файл</div>
                        </a>
                        <a className={["data-link", "return"]} onClick={() => deleteServer()} style={{marginRight: 10}}>
                            <div className='data-button'>Удалить</div>
                        </a>
                        <a className={["data-link", "return"]} onClick={() => editServer()} style={{marginRight: 10}}>
                            <div className='data-button'>Редактировать</div>
                        </a>
                        <Charts id={serverId}/>
                    </> : null
            }
            <AddServer
                show={showModal}
                closeModal={() => {
                    setShowModal(false)
                    getServers()
                }}
                titleModal={titleModal}
                serverId={serverId}
            />
        </div>
    )
}