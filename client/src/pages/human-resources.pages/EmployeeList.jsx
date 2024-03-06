import { useState, useEffect } from 'react';
import { employeeList } from '../../api/human-resources.js';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await employeeList();
        setEmployees(response.data);
        console.log(response.data);
        setFilteredEmployees(response.data.slice(0, 20));
      } catch (error) {
        console.error('Error listando los empleados:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    const filtered = employees.filter(
      (employee) =>
        employee.User.Email.toLowerCase().includes(event.target.value.toLowerCase()) ||
        employee.Person.First_Name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        employee.Person.Last_Name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        employee.Person.DNI.toLowerCase().includes(event.target.value.toLowerCase()) ||
        employee.Position.toLowerCase().includes(event.target.value.toLowerCase()) ||
        employee.Schedule_Employee[0].Schedule.ScheduleName.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredEmployees(filtered.slice(0, 20));
  };

  const formatPosition = (position) => {
    switch (position) {
      case 'MEDICO':
        return 'Médico';
      case 'ENFERMERO':
        return 'Enfermero';
      case 'ADMINISTRATIVO':
        return 'Administrativo';
      case 'LIMPIEZA':
        return 'Limpieza';
      case 'SEGURIDAD':
        return 'Seguridad';
      default:
        return position;
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container-fluid mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm">
            <div className="card-body">
              <a href="/admin/human-resources" className="py-2 px-4 rounded-3 btn btn-primary text-decoration-none text-white">
                <i className="bi bi-escape"></i>
              </a>
              <h2 className="card-title text-center fw-bold mb-4">Lista de Empleados</h2>
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
                <table className="table table-bordered table-hover">
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
                    {filteredEmployees.map((employee) => (
                      <tr key={employee.Id}>
                        <td>{employee.Person.DNI}</td>
                        <td>
                          {employee.Person.First_Name} {employee.Person.Last_Name}
                        </td>
                        <td>{employee.User.Email}</td>
                        <td>{formatPosition(employee.Position)}</td>
                        <td>{employee.Schedule_Employee[0].Schedule.ScheduleName}</td>
                        <td>
                          <button className="btn btn-primary btn-sm" onClick={() => navigate(`/admin/human-resources/employee/${employee.Id}`)}>
                            Editar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                      Anterior
                    </button>
                  </li>
                  {Array.from({ length: Math.ceil(filteredEmployees.length / itemsPerPage) }, (_, i) => (
                    <li className={`page-item ${currentPage === i + 1 ? 'active' : ''}`} key={i} onClick={() => paginate(i + 1)}>
                      <button className="page-link">{i + 1}</button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === Math.ceil(filteredEmployees.length / itemsPerPage) ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                      Siguiente
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
