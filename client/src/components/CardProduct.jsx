import PropTypes from "prop-types";

const CardProducts = ({
  image,
  title,
  price,
  handleAdd,
  handleRemove,
  inCart,
}) => {
  return (
    <div
      className={`card m-2 border-1 ${
        inCart ? "border-danger" : "border-primary"
      } d-flex flex-column`}
      style={{
        width: "18rem",
        textDecoration: "none",
      }}
    >
      <div
        className={`rounded-top bg-primary d-flex align-items-center justify-content-center`}
        style={{
          height: "200px",
          overflow: "hidden",
        }}
      >
        {image ? (
          <img
            src={image}
            alt="Section Image"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <h1
            className="h4 fw-bold text-white text-center"
            style={{ maxWidth: "100%" }}
          >
            {price}
          </h1>
        )}
      </div>
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5>
            <span className="badge bg-dark">
              <i className="bi bi-tag"></i>
              <i className="bi bi-currency-dollar"></i>
              {parseFloat(price).toFixed(2)}
            </span>
          </h5>
          <h5 className="card-title">{title}</h5>
        </div>
        <div className="mt-auto text-center">
          <hr />
          {inCart ? (
            <button
              type="button"
              className="btn btn-danger w-100"
              onClick={handleRemove}
            >
              <i className="bi bi-cart-x-fill"></i> Quitar del carrito
            </button>
          ) : (
            <button
              type="button"
              onClick={handleAdd}
              className="btn btn-primary w-100"
            >
              <i className="bi bi-cart-plus-fill"></i> Agregar al carrito
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

CardProducts.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  inCart: PropTypes.bool.isRequired,
};

export default CardProducts;
