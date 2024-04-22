import { useState, useEffect } from "react";
import { getAllSchedules, deleteSchedule } from "../../api/human-resources.js";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import BottomNavigation from "../../components/BottomNavigation.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const AdminScheduleList = () => {
  const { user } = useAuth();
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const itemsPerPage = 10;

  let list = [];
  if (user.role === "ADMINISTRADOR") {
    list = [
      {
        title: "Volver",
        url: "/admin/human-resources",
        icon: "bi bi-arrow-left-circle-fill",
      },
      { title: "Inicio", url: "/admin/home", icon: "bi bi-house-fill" },
    ];
  } else {
    list = [
      { title: "Inicio", url: "/employee/home", icon: "bi bi-house-fill" },
      {
        title: "Permisos",
        url: "/employee/permission",
        icon: "bi bi-calendar-check",
      },
      {
        title: "Solicitudes",
        url: "/employee/requests",
        icon: "bi bi-mailbox2",
      },
    ];
  }

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await getAllSchedules();
        setSchedules(response.data);
        setFilteredSchedules(response.data);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    fetchSchedules();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    const filtered = schedules.filter((schedule) =>
      schedule.ScheduleName.toLowerCase().includes(
        event.target.value.toLowerCase()
      )
    );
    setFilteredSchedules(filtered.slice(0, 20));
  };

  const handleDeleteSchedule = async () => {
    try {
      await deleteSchedule(selectedScheduleId);
      setSchedules(
        schedules.filter((schedule) => schedule.Id !== selectedScheduleId)
      );
      setFilteredSchedules(
        filteredSchedules.filter(
          (schedule) => schedule.Id !== selectedScheduleId
        )
      );
      setShowDeleteModal(false);
      setSelectedScheduleId(null);
    } catch (error) {
      console.error("Error deleting schedule:", error);
      setShowDeleteModal(false);
      setErrorMessage(
        "No se puede eliminar este horario porque está asociado a un empleado."
      );
      setShowErrorModal(true);
    }
  };

  const handleOpenDeleteModal = (scheduleId) => {
    setSelectedScheduleId(scheduleId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedScheduleId(null);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSchedules.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className=" mt-4 mb-4 bg-white rounded-4 ">
      <div className="container">
        <h2 className="card-title text-center fw-bold mb-4">
          Lista de Horarios
        </h2>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Buscar coincidencias..."
            className="form-control"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Detalles</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((schedule) => (
                <tr key={schedule.Id}>
                  <td>{schedule.ScheduleName}</td>
                  <td>
                    <ul>
                      {schedule.Schedule.set.map((day) => (
                        <li key={day.day}>
                          {day.start} — {day.end} —{" "}
                          {day.day.charAt(0).toUpperCase() + day.day.slice(1)}{" "}
                          {"  "}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() =>
                        navigate(
                          `/admin/human-resources/schedules/${schedule.Id}`
                        )
                      }
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>{" "}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleOpenDeleteModal(schedule.Id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage - 1)}
                >
                  Anterior
                </button>
              </li>
              {Array.from(
                { length: Math.ceil(filteredSchedules.length / itemsPerPage) },
                (_, i) => (
                  <li
                    style={{ zIndex: 0 }}
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                    key={i}
                    onClick={() => paginate(i + 1)}
                  >
                    <button className="page-link">{i + 1}</button>
                  </li>
                )
              )}
              <li
                className={`page-item ${
                  currentPage ===
                  Math.ceil(filteredSchedules.length / itemsPerPage)
                    ? "disabled"
                    : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage + 1)}
                >
                  Siguiente
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres eliminar este horario?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteSchedule}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Error Modal */}
      <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseErrorModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <BottomNavigation list={list} style={{ zIndex: 1000 }} />
    </div>
  );
};

export default AdminScheduleList;
