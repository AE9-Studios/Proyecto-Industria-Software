import { useState, useEffect } from "react";
import {
  getPermissionsByEmployeeId,
  getVacationsByEmployeeId,
} from "../../api/human-resources.js";
import { useAuth } from "../../context/AuthContext.jsx";

import { useNavigate } from "react-router-dom";
import BottomNavigation from "../../components/BottomNavigation.jsx";

const EmployeeRequestList = () => {
  const list = [
    { title: "Inicio", url: "/employee/home", icon: "bi bi-house-fill" },
    {
      title: "Permisos",
      url: "/employee/permission",
      icon: "bi bi-calendar-check",
    },
    { title: "Solicitudes", url: "/employee/requests", icon: "bi bi-mailbox2" },
  ];
  const [permissions, setPermissions] = useState([]);
  const [vacations, setVacations] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const employeeId = user.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const permissionsResponse = await getPermissionsByEmployeeId(
          employeeId
        );
        const vacationsResponse = await getVacationsByEmployeeId(employeeId);

        setPermissions(permissionsResponse.data.permissions);
        setVacations(vacationsResponse.data.vacations);
        setFilteredItems([
          ...permissionsResponse.data.permissions,
          ...vacationsResponse.data.vacations,
        ]);
      } catch (error) {
        console.error("Error obteniendo los datos:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchChange = (event) => {
    const searchString = event.target.value.toLowerCase();
    setSearchTerm(searchString);

    if (searchString === "") {
      setFilteredItems([...permissions, ...vacations]);
    } else {
      const filtered = [...permissions, ...vacations].filter((item) => {
        const isPermission = "Reason" in item;

        const employeeName = `${item.Employee.Person.First_Name} ${item.Employee.Person.Last_Name}`;
        const state = item.State.toLowerCase();
        const readStatus = item.ReadEmployee ? "leído" : "no leído";
        const days = Math.ceil(
          (new Date(item.End_Date) - new Date(item.Start_Date)) /
            (1000 * 60 * 60 * 24) +
            1
        );
        const type = isPermission ? "Permiso" : "Vacaciones";

        return (
          employeeName.toLowerCase().includes(searchString) ||
          state.includes(searchString) ||
          readStatus.includes(searchString) ||
          days.toString().includes(searchString) ||
          type.toLowerCase().includes(searchString)
        );
      });
      setFilteredItems(filtered);
    }
  };

  const sortedItems = [...filteredItems].sort((a, b) => {
    if ("ReadEmployee" in a && "ReadEmployee" in b) {
      if (a.ReadEmployee === b.ReadEmployee) {
        if (a.State === "PENDIENTE") return -1;
        if (b.State === "PENDIENTE") return 1;
        return 0;
      } else {
        return a.ReadEmployee ? 1 : -1;
      }
    } else {
      return 0;
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const itemsToShow = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  return (
    <div className="mt-4 mb-4 bg-white rounded-4 ">
      <div className="container mx-auto">
        <h2 className="card-title text-center fw-bold mb-4">
          Lista de Permisos y Vacaciones
        </h2>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Buscar permisos y vacaciones..."
            className="form-control"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Solicitud</th>
                <th>Empleado</th>
                <th>Días</th>
                <th>Estado</th>
                <th>
                  <i className="bi bi-bookmarks-fill"></i>
                </th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {itemsToShow.map((item) => (
                <tr
                  key={item.Id}
                  className={item.ReadEmployee ? "" : "table-danger"}
                >
                  <td>
                    {"Reason" in item ? (
                      <span className="badge bg-info text-dark">Permiso</span>
                    ) : (
                      <span className="badge bg-dark">Vacaciones</span>
                    )}
                  </td>
                  <td>
                    {"Person" in item.Employee &&
                      `${item.Employee.Person.First_Name} ${item.Employee.Person.Last_Name}`}
                  </td>

                  <td>
                    {"Start_Date" in item &&
                      Math.ceil(
                        (new Date(item.End_Date) - new Date(item.Start_Date)) /
                          (1000 * 60 * 60 * 24) +
                          1
                      )}
                  </td>
                  <td>
                    {"State" in item && (
                      <span className={`badge ${getBadgeColor(item.State)}`}>
                        {item.State}
                      </span>
                    )}
                  </td>
                  <td>
                    {"ReadEmployee" in item
                      ? item.ReadEmployee
                        ? "Leído"
                        : "No leído"
                      : ""}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() =>
                        navigate(
                          `/employee/${
                            "Reason" in item ? "permission" : "vacation"
                          }/${item.Id}`
                        )
                      }
                    >
                      Gestionar
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
                { length: Math.ceil(filteredItems.length / itemsPerPage) },
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
                  currentPage === Math.ceil(filteredItems.length / itemsPerPage)
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
      <BottomNavigation list={list} />
    </div>
  );
};

export default EmployeeRequestList;
