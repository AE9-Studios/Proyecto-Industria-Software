import React from 'react'

const ServiceCardHome = ({title, description, icon}) => {
  return (
    <div className='container-cardServices container border p-4 rounded-4 mb-2'>
        <i className={`fs-1 ${icon}`}></i>
        <h3 className="fs-5 fw-bold mt-2">
            {title}
        </h3>
        <p className="fs-6">
            {description}
        </p>
    </div>
  )
}

export default ServiceCardHome