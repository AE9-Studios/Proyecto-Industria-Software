import { useState, useEffect } from "react";
import {
  getPermissionById,
  updatePermissionStateById,
  getPermissionAttachedFile,
} from "../../api/human-resources";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import BottomNavigation from "../../components/BottomNavigation";

const AdminPermissionDetails = () => {
  
  const [fileUrl, setFileUrl] = useState(null);
  const [permission, setPermission] = useState(null);
  const [person, setPerson] = useState(null);
  const [newState, setNewState] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [daysBetween, setDaysBetween] = useState(null);
  const [responseSent, setResponseSent] = useState(false);
  const params = useParams();
  const { user } = useAuth();

  let list = []
  if (user.role === "ADMINISTRADOR") {
    list = [
      { title: 'Volver', url: '/admin/human-resources', icon: 'bi bi-arrow-left-circle-fill' },
      { title: "Inicio", url: "/admin/home", icon: "bi bi-house-fill" },
    ];
  } else {
    list = [
      { title: "Inicio", url: "/employee/home", icon: "bi bi-house-fill" },
      { title: "Permisos", url: "/employee/permission", icon: "bi bi-calendar-check" },
      { title: "Solicitudes", url: "/employee/requests", icon: "bi bi-mailbox2" },
    ];
  }

  useEffect(() => {
    const loadFile = async () => {
      try {
        const res = await getPermissionById(user.role, params.id);
        setPermission(res.data.permission);
        setNewState(res.data.permission.State);

        const response = await getPermissionAttachedFile(params.id);
        const contentType = response.headers["content-type"];
        const isImage =
          contentType === "image/jpg" || contentType === "image/png";
        if (isImage) {
          const url = URL.createObjectURL(response.data);
          setFileUrl(url);
        } else {
          const url = URL.createObjectURL(response.data);
          setFileUrl(url);
        }
      } catch (error) {
        console.error("Error al cargar el archivo:", error);
        setError("Error al cargar el archivo");
      }
    };

    loadFile();
  }, [params.id, user.role]);

  useEffect(() => {
    if (permission && permission.Start_Date) {
      const startDate = new Date(permission.Start_Date);
      const endDate = new Date(permission.End_Date);
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) + 1);
      setDaysBetween(diffDays);
    }
  }, [permission]);

  useEffect(() => {
    if (permission && permission.Employee && permission.Employee.Person) {
      setPerson(permission.Employee.Person);
    }
  }, [permission]);

  const handleStateChange = async () => {
    try {
      if (!newState) {
        setError("Debe seleccionar una opción antes de actualizar el estado.");
        return;
      } else {
        setError("");
      }

      const response = await updatePermissionStateById(params.id, {
        state: newState,
        comment,
      });
      setPermission((prevPermission) => ({
        ...prevPermission,
        State: response.data.updatedPermission.State,
      }));
      setResponseSent(true);

      setTimeout(() => {
        setResponseSent(false);
      }, 3000);
    } catch (error) {
      console.error("Error al actualizar el estado del permiso:", error);
      setError("Error al actualizar el estado del permiso");
    }
  };

  return (
    <div className="container-sm mb-3">
      <div
        className="mx-auto  mt-3 mx-auto rounded-4 bg-white"
        style={{ maxWidth: "700px" }}
      >


        <div className=" pt-3 pb-5">
          <div className="d-flex flex-column align-items-center p-5">
            <h2 className="text-center mb-3">Responder Solicitud</h2>
            <div className="container d-flex flex-column">
              {permission && (
                <>
                  <div className="p-2 mb-3 container">
                    <label className="form-label">
                      {" "}
                      <strong>DNI:</strong>{" "}
                    </label>
                    <span className="badge-detail">{person && person.DNI}</span>
                  </div>

                  <div className="p-2 mb-3 container">
                    <label className="form-label">
                      {" "}
                      <strong>Nombre:</strong>{" "}
                    </label>

                    <span className="badge-detail">
                      {person && `${person.First_Name} ${person.Last_Name}`}
                    </span>
                  </div>

                  <div className="p-2 mb-3 container">
                    <label className="form-label">
                      {" "}
                      <strong>Cargo:</strong>{" "}
                    </label>
                    <span className="badge-detail">
                      {permission.Employee && permission.Employee.Position}
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

                  <div className="p-2 mb-3 container">
                    <label className="form-label">
                      {" "}
                      <strong>Estado:</strong>{" "}
                    </label>
                    <span className="badge-detail">{permission.State}</span>
                  </div>

                  <div className="p-2 mb-3 container">
                    <label className="form-label">
                      {" "}
                      <strong>Fecha Inicial:</strong>{" "}
                    </label>
                    <span className="badge-detail">
                      {permission.Start_Date}
                    </span>
                  </div>
                  <div className="p-2 mb-3 container">
                    <label className="form-label">
                      {" "}
                      <strong>Fecha Final:</strong>{" "}
                    </label>
                    <span className="badge-detail">{permission.End_Date}</span>
                  </div>
                  <div className="p-2 mb-3 container">
                    <label className="form-label">
                      {" "}
                      <strong>Cantidad de días:</strong>{" "}
                    </label>
                    <span className="badge-detail">{daysBetween}</span>
                  </div>

                  <div className="p-2 mb-3 container">
                    <label className="form-label">
                      {" "}
                      <strong>Seleccione un estado:</strong>{" "}
                    </label>
                    <select
                      className="form-select"
                      value={newState}
                      onChange={(e) => setNewState(e.target.value)}
                    >
                      <option value="" hidden defaultValue>
                        Seleccione un estado
                      </option>
                      <option value="PENDIENTE">Pendiente</option>
                      <option value="APROBADO">Aprobado</option>
                      <option value="RECHAZADO">Rechazado</option>
                    </select>
                  </div>
                  <div className="p-2 mb-3 container">
                    <label className="form-label">
                      {" "}
                      <strong>Ingrese un comentario:</strong>{" "}
                    </label>
                    <textarea
                      className="form-control"
                      placeholder="Comentario (Opcional)"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                  <div className="container d-flex flex-column">
                    <button
                      className="btn btn-primary mt-3 py-2 px-5 rounded-4"
                      onClick={handleStateChange}
                      disabled={!newState || newState === permission.State}
                    >
                      Enviar Respuesta
                    </button>
                    <br />

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

                    <br />
                    {error && (
                      <span className="form-text text-danger">{error}</span>
                    )}

                    {responseSent && (
                      <div className="alert alert-success" role="alert">
                        Respuesta enviada exitosamente
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation list={list} />
    </div>
  );
};

export default AdminPermissionDetails;
