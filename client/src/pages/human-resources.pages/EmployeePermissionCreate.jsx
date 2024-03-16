import { useState } from "react";
import { useForm } from "react-hook-form";
import { savePermissionRequest } from "../../api/human-resources";
import { useAuth } from "../../context/AuthContext";

export const EmployeePermissionCreate = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm();

  const [attachedFile, setAttachedFile] = useState(null);
  const { user } = useAuth();
  const Id = user.id;

  // eslint-disable-next-line no-unused-vars
  const [daysDifference, setDaysDifference] = useState(null);
  const [errorDate, setErrorDate] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const successMessage = "Solicitud enviada";
  const [backendError, setBackendError] = useState("");

  const calculateDaysDifference = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(startDate);
    const secondDate = new Date(endDate);
    if (firstDate > secondDate) {
      setErrorDate(true);
      setDaysDifference(null);
    } else {
      setErrorDate(false);
      const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
      setDaysDifference(diffDays + 1);
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
      if (!errorDate) {
        const formData = {
          ...values,
          Id,
          attachedFile,
        };

        await savePermissionRequest(formData);
        reset();

        setDaysDifference(null);
        setBackendError("");
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      }
    } catch (error) {
      setBackendError(error.response.data.error);
    }
  });

  return (
    <div className="container-sm mb-3">
      <form
        className="mx-auto shadow mt-3 mx-auto rounded-4 bg-white"
        style={{ maxWidth: "700px" }}
        onSubmit={onSubmit}
        encType="multipart/form-data"
      >
        <div className="px-4 pt-3">
          <a
            href="/employee/home"
            className="py-2 px-4 rounded-3 btn btn-primary text-decoration-none text-white"
          >
            <i className="bi bi-escape"></i>
          </a>{" "}
        </div>

        <div className=" pt-3 pb-5">
          <div className="d-flex flex-column align-items-center p-5">
            <h2 className="text-center mb-3">Solicitud de Permiso</h2>
            <div className="container d-flex flex-column">
              <div className="p-2 mb-3 container">
                <label className="form-label">Razón</label>
                <input
                  className="form-control"
                  type="text"
                  {...register("Reason", { required: true })}
                />
                {formErrors.Reason && (
                  <span className="text-danger">La razón es requerida.</span>
                )}
              </div>
              <div className="p-2 mb-3 container">
                <label className="form-label">Descripción</label>
                <textarea
                  className="form-control"
                  {...register("Description", { required: true })}
                />
                {formErrors.Description && (
                  <span className="text-danger">
                    La descripción es requerida.
                  </span>
                )}
              </div>
              <div className="p-2 mb-3 container">
                <label className="form-label">Fecha de inicio</label>
                <input
                  className="form-control"
                  type="date"
                  {...register("StartDate", { required: true })}
                  onChange={(e) =>
                    calculateDaysDifference(
                      e.target.value,
                      e.target.form.EndDate.value
                    )
                  }
                />
                {formErrors.StartDate && (
                  <span className="text-danger">
                    La fecha de inicio es requerida.
                  </span>
                )}
              </div>
              <div className="p-2 mb-3 container">
                <label className="form-label">Fecha de finalización</label>
                <input
                  className="form-control"
                  type="date"
                  {...register("EndDate", { required: true })}
                  onChange={(e) =>
                    calculateDaysDifference(
                      e.target.form.StartDate.value,
                      e.target.value
                    )
                  }
                />
                {formErrors.EndDate && (
                  <span className="text-danger">
                    La fecha de finalización es requerida.
                  </span>
                )}
                {errorDate && (
                  <span className="text-danger">
                    <br />
                    La fecha de finalización debe ser posterior a la fecha de
                    inicio.
                  </span>
                )}
                <>
                  {daysDifference !== null &&
                    daysDifference >= 0 &&
                    !errorDate && (
                      <p style={{ color: "green" }}>
                        <br />
                        Está solicitando {daysDifference}{" "}
                        {daysDifference === 1 ? "día" : "días"} de permiso.
                      </p>
                    )}
                </>
              </div>
              <div className="p-2 mb-3 container">
                <label className="form-label">Adjuntar archivo</label>
                <input
                  className="form-control"
                  type="file"
                  name="attachedFile"
                  accept=".pdf, .png, .jpg"
                  onChange={(e) => setAttachedFile(e.target.files[0])}
                />
              </div>
              <div className="container d-flex flex-column">
                <button
                  className="btn btn-primary mt-3 py-2 px-5 rounded-4"
                  type="submit"
                >
                  Enviar solicitud
                </button>
                <br></br>
                {backendError && (
                  <div className="alert alert-danger" role="alert">
                    {backendError}
                  </div>
                )}
                {showSuccessMessage && (
                  <div className="alert alert-success" role="alert">
                    {successMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmployeePermissionCreate;
