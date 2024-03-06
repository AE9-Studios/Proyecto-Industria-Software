// eslint-disable-next-line react/prop-types
const CardEmployee = ({ title, description, icon, url, requestCount=20 }) => {
  return (
    <a href={url} className="col-md-4 text-decoration-none d-flex justify-content-center">
      <div className="card mb-3" style={{ width: '300px', margin: '10px', position: 'relative' }}>
        <div className="card-body">
          {title === 'Solicitudes' && requestCount && (
            <div className="position-absolute top-0 end-0" style={{ transform: 'translate(50%, -50%)', zIndex: '999' }}>
              <div className="bg-danger text-white rounded-circle d-flex justify-content-center align-items-center" style={{ width: '40px', height: '40px', fontSize: '0.9rem' }}>
                {requestCount}
              </div>
            </div>
          )}
          <i className={`fs-1 ${icon} text-dark mb-3`}></i>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </a>
  );
};

export default CardEmployee;



