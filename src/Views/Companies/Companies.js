import React from 'react';
import axios from 'axios';
import AddCompany from '../../Components/Modals/AddCompany'
import './Companies.css'


export default function Companies(){
    const [companies, setCompanies] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false)
    const [company, setCompany] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)
    const [titleModal, setTitleModal] = React.useState(null)

    React.useEffect(() => {
        setTitleModal('Добавить')
        getCompanies()
    }, [])

    const getCompanies = () => {
        axios({
            method: 'get',
            url: `/api/v1/companies`,
            withCredentials: false,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            }
        })
            .then(response => {
                setCompanies(response.data.results)
                setLoaded(true)
            })
            .catch(err => {
                console.warn(err)
            })
    }

    return(
        <div className='servers-container'>
            {
                loaded ?
                companies.map(item => {
                    return (
                        <div className='list-element' key={item.id}>
                            <p className='elem-name'>{item.name}</p>
                            <a className='data-link' onClick={() => {
                                setCompany(item)
                                setTitleModal('Редактировать')
                                setShowModal(true)
                            }}>
                                <div className='data-button'>
                                    <a className='data-name'>Редактировать</a>
                                </div>
                            </a>
                        </div>
                    )
                }) : null
            }

            <a onClick={() => {
                setTitleModal('Добавить')
                setShowModal(!showModal)
            }}>
                <div className='add-element'>
                    <p className='add-name'>+</p>
                </div>
            </a>
            <AddCompany
                show={showModal}
                closeModal={() => {
                    setShowModal(false)
                    setTitleModal('Добавить')
                    getCompanies()
                }}
                title={titleModal}
                company={company}
            />
        </div>
    )
}