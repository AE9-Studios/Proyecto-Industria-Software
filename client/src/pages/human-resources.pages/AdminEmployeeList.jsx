import { useState, useEffect } from "react";
import { getEmployees } from "../../api/human-resources.js";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "../../components/BottomNavigation.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { calculateColumnWidths } from "../../libs/utils.js";
import { utils, writeFile } from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const AdminEmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { user } = useAuth();
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
    const fetchEmployees = async () => {
      try {
        const response = await getEmployees();
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      } catch (error) {
        console.error("Error listando los empleados:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = employees.filter(
      (employee) =>
        employee.User.Email.toLowerCase().includes(searchTerm) ||
        employee.Person.First_Name.toLowerCase().includes(searchTerm) ||
        employee.Person.Last_Name.toLowerCase().includes(searchTerm) ||
        employee.Person.DNI.toLowerCase().includes(searchTerm) ||
        employee.Position.toLowerCase().includes(searchTerm) ||
        (employee.Schedule_Employee[0]?.Schedule.ScheduleName &&
          employee.Schedule_Employee[0]?.Schedule.ScheduleName.toLowerCase().includes(
            searchTerm
          ))
    );
    setFilteredEmployees(filtered);
  };

  const formatPosition = (position) => {
    switch (position) {
      case "MEDICO":
        return "Médico";
      case "ENFERMERO":
        return "Enfermero";
      case "ADMINISTRATIVO":
        return "Administrativo";
      case "LIMPIEZA":
        return "Limpieza";
      case "SEGURIDAD":
        return "Seguridad";
      default:
        return position;
    }
  };

  const currentDate = new Date().getTime();
  const fileName = `empleados_${currentDate}`;

  const handleExportExcel = () => {
    const employeeData = filteredEmployees.map((employee) => {
      const activeSalary = employee.Salary.find((salary) => salary.State);
      return {
        DNI: employee.Person.DNI,
        "Nombre Completo": `${employee.Person.First_Name} ${employee.Person.Last_Name}`,
        "Correo Institucional": employee.User.Email,
        Cargo: formatPosition(employee.Position),
        "Fecha de Inicio": employee.Start_Date,
        "Días Trabajados": employee.Days_Spent,
        Estado: employee.State,
        Teléfono: employee.Person.Phone_Number,
        Dirección: employee.Person.Address,
        Género: employee.Person.Gender,
        "Salario Actual": activeSalary
          ? activeSalary.Amount
          : "Sin salario activo",
        Horario:
          employee.Schedule_Employee[0]?.Schedule?.ScheduleName ||
          "Este empleado no tiene los campos actualizados",
      };
    });

    const wscols = calculateColumnWidths(employeeData);

    const ws = utils.json_to_sheet(employeeData);

    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Empleados");
    ws["!autofilter"] = { ref: ws["!ref"] };
    ws["!cols"] = wscols;

    writeFile(wb, `${fileName}.xlsx`);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
    });
    doc.autoTable({
      head: [
        ["DNI", "Nombre Completo", "Correo Institucional", "Cargo", "Horario"],
      ],
      body: filteredEmployees.map((employee) => [
        employee.Person.DNI,
        `${employee.Person.First_Name} ${employee.Person.Last_Name}`,
        employee.User.Email,
        formatPosition(employee.Position),
        employee.Schedule_Employee[0]?.Schedule.ScheduleName ||
          "Este empleado no tiene los campos actualizados",
      ]),
    });
    doc.save(`${fileName}.pdf`);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mt-4 bg-white rounded-4">
      <div className="container">
        <h2 className="card-title text-center fw-bold mb-4">
          Lista de Empleados
        </h2>
        <div className="d-flex justify-content-end">
          <button
            className="mb-3 mx-2 btn btn-sm button-pdf"
            onClick={handleExportPDF}
            disabled={filteredEmployees.length === 0}
          >
            Exportar a PDF <i className="bi bi-file-earmark-pdf-fill"></i>
          </button>
          <button
            className="mb-3 mx-2 btn btn-sm button-excel"
            onClick={handleExportExcel}
            disabled={filteredEmployees.length === 0}
          >
            Exportar a Excel <i className="bi bi-file-earmark-excel-fill"></i>
          </button>
        </div>
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
                <th>DNI</th>
                <th>Nombre Completo</th>
                <th>Correo Institucional</th>
                <th>Cargo</th>
                <th>Horario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((employee) => (
                  <tr key={employee.Id}>
                    <td>{employee.Person.DNI}</td>
                    <td>
                      {employee.Person.First_Name} {employee.Person.Last_Name}
                    </td>
                    <td>{employee.User.Email}</td>
                    <td>{formatPosition(employee.Position)}</td>
                    <td>
                      {employee.Schedule_Employee[0]?.Schedule.ScheduleName ||
                        "Este empleado no tiene los campos actualizados"}
                    </td>
                    <td>
                      {employee.Schedule_Employee[0]?.Schedule.ScheduleName && (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() =>
                            navigate(
                              `/admin/human-resources/employees/${employee.Id}`
                            )
                          }
                        >
                          Editar
                        </button>
                      )}
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
                { length: Math.ceil(filteredEmployees.length / itemsPerPage) },
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
                  Math.ceil(filteredEmployees.length / itemsPerPage)
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

export default AdminEmployeeList;
