import { useState, useEffect } from "react";
import {
  getAllPermissions,
  getAllVacations,
} from "../../api/human-resources.js";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "../../components/BottomNavigation.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { calculateColumnWidths } from "../../libs/utils.js";
import { utils, writeFile } from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const AdminRequestList = () => {
  const { user } = useAuth();
  const [permissions, setPermissions] = useState([]);
  const [vacations, setVacations] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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
    const fetchData = async () => {
      try {
        const permissionsResponse = await getAllPermissions();
        const vacationsResponse = await getAllVacations();

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
        const readStatus = item.Read ? "leído" : "no leído";
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
    if ("Read" in a && "Read" in b) {
      if (a.Read === b.Read) {
        if (a.State === "PENDIENTE") return -1;
        if (b.State === "PENDIENTE") return 1;
        return 0;
      } else {
        return a.Read ? 1 : -1;
      }
    } else {
      return 0;
    }
  });

  const calculateDaysWithoutWeekends = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let count = 0;

    while (start <= end) {
      if (start.getDay() !== 6 && start.getDay() !== 0) {
        count++;
      }
      start.setDate(start.getDate() + 1);
    }

    return count;
  };

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

  const currentDate = new Date().getTime();
  const fileName = `permisos_vacaciones_${currentDate}`;

  const handleExportExcel = () => {
    const permissionData = permissions.map((permission) => ({
      Tipo: "Permiso",
      Estado: permission.State,
      "Fecha de inicio": permission.Start_Date,
      "Fecha de fin": permission.End_Date,
      Empleado: `${permission.Employee.Person.First_Name} ${permission.Employee.Person.Last_Name}`,
      Cargo: permission.Employee.Position,
    }));

    const vacationData = vacations.map((vacation) => ({
      Tipo: "Vacaciones",
      Estado: vacation.State,
      "Fecha de inicio": vacation.Start_Date,
      "Fecha de fin": vacation.End_Date,
      Empleado: `${vacation.Employee.Person.First_Name} ${vacation.Employee.Person.Last_Name}`,
      Cargo: vacation.Employee.Position,
    }));

    const allData = [...permissionData, ...vacationData];

    const wscols = calculateColumnWidths(allData);

    const ws = utils.json_to_sheet(allData);

    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Permisos y Vacaciones");
    ws["!autofilter"] = { ref: ws["!ref"] };
    ws["!cols"] = wscols;

    writeFile(wb, `${fileName}.xlsx`);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
    });

    const tableBody = permissions.concat(vacations).map((item) => {
      return [
        item.State,
        item.Start_Date,
        item.End_Date,
        `${item.Employee.Person.First_Name} ${item.Employee.Person.Last_Name}`,
        item.Employee.Position,
      ];
    });

    doc.autoTable({
      head: [
        ["Estado", "Fecha de inicio", "Fecha de fin", "Empleado", "Cargo"],
      ],
      body: tableBody,
    });

    doc.save(`${fileName}.pdf`);
  };

  return (
    <div className=" mt-4 mb-4 bg-white rounded-4 ">
      <div className="container m-auto">
        <h2 className="card-title text-center fw-bold mb-4">
          Lista de Permisos y Vacaciones
        </h2>
        <div className="d-flex justify-content-end">
          <button
            className="mb-3 mx-2 btn btn-sm button-pdf"
            onClick={handleExportPDF}
            disabled={itemsToShow.length === 0}
          >
            Exportar a PDF <i className="bi bi-file-earmark-pdf-fill"></i>
          </button>
          <button
            className="mb-3 mx-2 btn btn-sm button-excel"
            onClick={handleExportExcel}
            disabled={itemsToShow.length === 0}
          >
            Exportar a Excel <i className="bi bi-file-earmark-excel-fill"></i>
          </button>
        </div>
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
              {itemsToShow.map((item, index) => (
                <tr key={index} className={item.Read ? "" : "table-danger"}>
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
                    {"Reason" in item
                      ? "Start_Date" in item &&
                        Math.ceil(
                          (new Date(item.End_Date) -
                            new Date(item.Start_Date)) /
                            (1000 * 60 * 60 * 24) +
                            1
                        )
                      : calculateDaysWithoutWeekends(
                          item.Start_Date,
                          item.End_Date
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
                    {"Read" in item ? (item.Read ? "Leído" : "No leído") : ""}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() =>
                        navigate(
                          `/admin/human-resources/${
                            "Reason" in item ? "permissions" : "vacations"
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
      <BottomNavigation list={list} style={{ zIndex: 1000 }} />
    </div>
  );
};

export default AdminRequestList;
