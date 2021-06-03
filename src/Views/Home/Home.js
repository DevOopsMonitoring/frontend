import React from 'react';
import './Home.css'


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function random(arr) {
    let key = getRandomInt(0, arr.length - 1);
    return arr[key];
}

export default function HomeScreen(){
    return(
        <div className="home">
            <h1 className='home-text'>Добро пожаловать в</h1>
            <h2 className='devoops'>Dev{
                random([`😀`, `😛`, `😮`, `🙃`, `😍`, `🧐`])
            }ops</h2>
        </div>
    )
}