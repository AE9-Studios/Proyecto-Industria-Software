import React from 'react'
import { useAuth } from '../context/AuthContext'

const BottomNavigation = ({ list }) => {

    const path = window.location.pathname
    const {logoutUser} = useAuth()


    return (
        <div>
            <div className='bottom-navigation-space'></div>
            <div className='bottom-navigation'>
                {
                    list.map((item, index) => (
                        <a key={index} href={item.url} className={`bottom-navigation-item ${path === item.url ? 'active' : ''}`}

                        >
                            <i className={`${item.icon} fw-500 fs-3 bottom-navigation-item-icon`}></i>
                            <p className='bottom-navigation-item-text'>{item.title}</p>
                        </a>
                    ))
                }
                <a href='/login' className={`bottom-navigation-item`}
                    onClick={logoutUser}
                >
                    <i className={`bi bi bi-door-closed-fill fw-500 fs-3 bottom-navigation-item-icon`}></i>
                    <p className='bottom-navigation-item-text'>Salir</p>
                </a>
            </div>
        </div>
    )
}

export default BottomNavigation