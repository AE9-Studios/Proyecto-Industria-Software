import React from 'react'

const CardModules = ({title, icon, description, url}) => {
    return (
        <a href={url} className="col-md-4 m-2 text-decoration-none">
            <div className="card text-center">
                {<i className={`fs-2 mt-3 ${icon}`}></i>}
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                </div>
            </div>
        </a>
    )
}

export default CardModules