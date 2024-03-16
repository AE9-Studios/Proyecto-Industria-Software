import { useState, useEffect } from "react";
import {
  getPermissionById,
  getPermissionAttachedFile,
} from "../../api/human-resources";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const EmployeePermissionDetails = () => {
  const [fileUrl, setFileUrl] = useState("");
  const [permission, setPermission] = useState("");
  const params = useParams();
  const { user } = useAuth();

  const getBadgeColor = (state) => {
    switch (state) {
      case "PENDIENTE":
        return "bg-warning text-dark";
      case "APROBADO":
        return "bg-success";
      case "RECHAZADO":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  useEffect(() => {
    const loadFile = async () => {
      try {
        const res = await getPermissionById(user.role, params.id);
        setPermission(res.data.permission);

        const response = await getPermissionAttachedFile(params.id);

        const url = URL.createObjectURL(response.data);
        setFileUrl(url);
      } catch (error) {
        console.error("Error al cargar el archivo:", error);
      }
    };

    loadFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return (
    <div className="container-sm mb-3">
      <div
        className="mx-auto shadow mt-3 mx-auto rounded-4 bg-white"
        style={{ maxWidth: "700px" }}
      >
        <div className="px-4 pt-3">
          <a
            href="/employee/requests"
            className="py-2 px-4 rounded-3 btn btn-primary text-decoration-none text-white"
          >
            <i className="bi bi-escape"></i>
          </a>
        </div>
        <div className=" pt-3 pb-5">
          <div className="d-flex flex-column align-items-center p-5">
            <h2 className="text-center mb-3">Detalles del Permiso</h2>
            <h4>
              <span className={`badge ${getBadgeColor(permission.State)}`}>
                {permission.State}
              </span>
            </h4>
            <div className="container d-flex flex-column">
              {permission && (
                <>
                  <div className="p-2 mb-3 container">
                    <label className="form-label">
                      <strong>Fecha de Inicio:</strong>
                    </label>
                    <span className="badge-detail">
                      {permission.Start_Date}
                    </span>
                  </div>

                  <div className="p-2 mb-3 container">
                    <label className="form-label">
                      <strong>Fecha Final:</strong>
                    </label>
                    <span className="badge-detail">{permission.End_Date}</span>
                  </div>
                  <div className="p-2 mb-3 container">
                    <label className="form-label">
                      <strong>Cantidad de días:</strong>
                    </label>
                    <span className="badge-detail">
                      {Math.ceil(
                        (new Date(permission.End_Date) -
                          new Date(permission.Start_Date)) /
                          (1000 * 60 * 60 * 24) +
                          1
                      )}
                    </span>
                  </div>
                  <div className="p-2 mb-3 container">
                    <label className="form-label">
                      {" "}
                      <strong>Razón:</strong>{" "}
                    </label>
                    <span className="badge-detail">{permission.Reason}</span>
                  </div>

                  <div className="p-2 mb-3 container">
                    <label className="form-label">
                      {" "}
                      <strong>Descripción:</strong>{" "}
                    </label>
                    <span className="badge-detail">
                      {permission.Description}
                    </span>
                  </div>

                  {permission.Answer && (
                    <div className="p-2 mb-3 container">
                      <label className="form-label">
                        <strong>Respuesta:</strong>
                      </label>
                      <span className="badge-detail-gold">
                        {permission.Answer}
                      </span>
                    </div>
                  )}
                  <div className="container d-flex flex-column">
                    {fileUrl ? (
                      <>
                        <a
                          href={fileUrl}
                          download="archivo_adjunto"
                          className="btn btn-success mt-3 py-2 px-5 rounded-4"
                        >
                          Descargar archivo adjunto
                        </a>
                      </>
                    ) : (
                      <span className="form-text text-danger">
                        No se adjuntó un archivo de justificación.
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePermissionDetails;
