import { useState, useEffect } from "react";
import { getActivityLogs } from "../../api/log-activity.js";
import BottomNavigation from "../../components/BottomNavigation.jsx";

const ActivityLog = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const list = [
    {
        title: 'Panel',
        url: '/admin/home',
        icon: 'bi bi-house-fill',
    },
    {
      title: "Bitácora",
      url: "/admin/logbook",
      icon: "bi bi-journal-bookmark-fill",
    },
  ];

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await getActivityLogs();
        const sortedLogs = response.data.sort((a, b) => new Date(b.Date) - new Date(a.Date)); // Ordena los registros por fecha de más reciente a más antiguo
        setLogs(sortedLogs);
        setFilteredLogs(sortedLogs);
      } catch (error) {
        console.error("Error obteniendo registros de actividad:", error);
      }
    };

    fetchLogs();
  }, []);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = logs.filter(
      (log) =>
        log.name.toLowerCase().includes(searchTerm) ||
        log.Description.toLowerCase().includes(searchTerm) ||
        log.Date.toLowerCase().includes(searchTerm)
    );
    setFilteredLogs(filtered);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLogs.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mt-4 bg-white rounded-4">
      <div className="container">
        <h2 className="card-title text-center fw-bold mb-4">
          Registro de Actividad
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
                <th>Actividad</th>
                <th>Descripción</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((log) => (
                <tr key={log.Id}>
                  <td>{log.name}</td>
                  <td>{log.Description}</td>
                  <td>{log.Date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                Anterior
              </button>
            </li>
            {Array.from({ length: Math.ceil(filteredLogs.length / itemsPerPage) }, (_, i) => (
              <li
              style={{ zIndex: 0 }}
                key={i}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => paginate(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === Math.ceil(filteredLogs.length / itemsPerPage) ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                Siguiente
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <BottomNavigation list={list} style={{ zIndex: 1000 }} />
    </div>
  );
};

export default ActivityLog;
