import React from 'react';
import axios from 'axios';
import './UserServers.css'


export default function UserServers(){
    const [servers, setServers] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false)

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
        <div>
            {loaded ? 
            <>
                {servers.map(item => {
                    return(
                        <p>{item.name}</p>
                    )
                })}
            </> : null}
        </div>
    )
}