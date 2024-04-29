import React, { useEffect, useState } from 'react'
import { getSerial, setSerial } from './api/auth'

const Serial = () => {

    const [errors, setErrors] = useState([])
    const sendSerial = async () => {
        try {
            const serial = document.querySelector('input').value
            const res = await setSerial(serial)
            if (res.status === 401) {
                setErrors(res.data)
            }
            if (res.status === 200) {
                window.location.href = '/login'
            }
        } catch (error) {
            console.log(error)
            error.response.data.map(err => console.log(err))
            setErrors(error.response.data)
        }
    }

    const verifySerial = async () => {
        try {
            const res = await getSerial()
            console.log(res)
            setSerial(true)
        } catch (error) {
            error.response.data.map(e => console.log(e))
            setErrors(error.response.data)
        }
    }

    useEffect(() => {
        verifySerial()
    }, [])

    return (
        <div className="container mt-4  d-flex flex-column justify-content-center align-items-center">
            {errors.length > 0 && errors.map((error, index) => <p key={index} className='alert alert-danger'>{error}</p>)}
            <h1 className='my-4'>Ingrese el serial</h1>
            <input type="text" className='form-control' />
            <button onClick={sendSerial} className='mt-4 p-2 btn btn-primary'>Enviar</button>
        </div>
    )
}

export default Serial
