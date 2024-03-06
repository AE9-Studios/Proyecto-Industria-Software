import { useState } from "react";
import { useForm } from "react-hook-form";
import { employeeRequest } from "../../api/human-resources";
import { useAuth } from '../../context/AuthContext'

export const EmployeeRequest = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();
  const [attachedFile, setAttachedFile] = useState(null);
  const { user } = useAuth()
  const Id = user.id;
console.log(user)
  const onSubmit = handleSubmit(async (values) => {
    const formData = {
      ...values,
      Id,
      attachedFile,
    };
    await employeeRequest(formData);
  });

  return (
    <div className="container-sm mb-3">
      <form
        className="mx-auto shadow mt-3 mx-auto rounded-4 bg-white"
        style={{ maxWidth: "700px" }}
        onSubmit={onSubmit}
        encType="multipart/form-data"
      >
                                <a
              href="/employee/home"
              className="py-2 px-4 rounded-3 btn btn-primary text-decoration-none text-white"
            >
              <i className="bi bi-escape"></i>
            </a> {'NOTA: limpiar form, recuperar request desde el admin'}
        <div className="px-4 pt-3">
          <h2 className="text-center fw-bold">Solicitud de permiso</h2>
        </div>
        <div className="pt-3 pb-5">
          <div className="p-2 mb-3 container">
            <label className="form-label">Razón</label>
            <input
              className="form-control"
              type="text"
              {...register("Reason", { required: true })}
            />
            {formErrors.Reason && (
              <span className="form-text text-danger">
                La razón es requerida
              </span>
            )}
          </div>
          <div className="p-2 mb-3 container">
            <label className="form-label">Descripción</label>
            <textarea
              className="form-control"
              {...register("Description", { required: true })}
            />
            {formErrors.Description && (
              <span className="form-text text-danger">
                La descripción es requerida
              </span>
            )}
          </div>
          <div className="p-2 mb-3 container">
            <label className="form-label">Adjuntar archivo</label>
            <input
              className="form-control"
              type="file"
              name="attachedFile"
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
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmployeeRequest;
