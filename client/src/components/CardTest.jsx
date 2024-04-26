// eslint-disable-next-line react/prop-types
const CardTest = ({ title, description, icon, url, requestCount = 20 }) => {
  return (
    <a href={url} className="col-md-4 m-2 text-decoration-none">
      <div className="card text-center">
        <div className="card-body">
          {(title === "Solicitudes" || title === "Orden de ventas" ) && requestCount > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {requestCount}
              <span className="visually-hidden">unread request</span>
            </span>
          )}
          <i className={`fs-1 ${icon} text-dark mb-3`}></i>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </a>
  );
};

export default CardTest;
