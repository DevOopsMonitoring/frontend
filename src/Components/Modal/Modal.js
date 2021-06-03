import React from 'react';
import axios from 'axios';
import './Modal.css';


const Modal = ({show, closeModal}) => {
    return(
        <div className={'modal-container'} style={{visibility: show ? 'visible' : 'hidden'}}>
            <h2>Добавить сервер</h2>
            <input type="text" placeholder='Название сервера'/>
            <input type="text" placeholder='Описание сервера'/>
            <input type="text" placeholder='Адрес сервера'/>
            <button onClick={() => {}} style={{marginRight: 10}} type="button">Добавить</button>
            <button onClick={closeModal} type="button">Закрыть</button>
        </div>
    )
}

export default Modal;