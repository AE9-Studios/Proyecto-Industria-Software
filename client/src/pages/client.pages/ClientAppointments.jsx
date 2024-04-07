import React, { useEffect, useState } from 'react'
import CardModules from '../../components/CardModules'
import { useAuth } from '../../context/AuthContext';
import { createAppointmentSolicitation, deleteAppointmentSolicitation, getAppointmentToClient, getAppointmentsSolicitationToClient } from '../../api/appointment';

import { Button, Modal } from 'react-bootstrap';

const ClientAppointments = () => {

  const { user } = useAuth();
  const [appointmentsSolicitation, setAppointmentsSolicitation] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const getAppointmentsSolicitation = async () => {
    try {
      const response = await getAppointmentsSolicitationToClient(user.id);
      setAppointmentsSolicitation(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const getAppointments = async () => {
    try {
      const response = await getAppointmentToClient(user.id);
      setAppointments(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const deleteAppointment = async (id) => {
    try {
      const res = await deleteAppointmentSolicitation(id);
      getAppointmentsSolicitation();
      alert('Cita cancelada correctamente');
    } catch (error) {
      alert('Error al cancelar la cita');
      console.error(error);
    }
  }

  const newAppointment = async () => {
    try {
      const res = await createAppointmentSolicitation({
        date: document.getElementById('date-as').value,
        description: document.getElementById('desp-as').value,
        clientId: user.id
      });
      setShowModal(false);
      getAppointmentsSolicitation();
      alert('Cita creada correctamente');
    } catch (error) {
      alert('Error al crear la cita');
      console.error(error);
    }
  }

  console.log(appointments);

  useEffect(() => {
    getAppointmentsSolicitation();
    getAppointments();
  }, [user])
  

  const [currentPageAS, setCurrentPageAS] = useState(1);
  const [itemsPerPageAS, setItemsPerPageAS] = useState(10);
  const indexOfLastItemAS = currentPageAS * itemsPerPageAS;
  const indexOfFirstItemAS = indexOfLastItemAS - itemsPerPageAS;
  const currentItemsAS = appointmentsSolicitation.slice(indexOfFirstItemAS, indexOfLastItemAS);
  const paginateAS = (pageNumber) => setCurrentPageAS(pageNumber);

  const [currentPageA, setCurrentPageA] = useState(1);
  const [itemsPerPageA, setItemsPerPageA] = useState(10);
  const indexOfLastItemA = currentPageA * itemsPerPageA;
  const indexOfFirstItemA = indexOfLastItemA - itemsPerPageA;
  const currentItemsA = appointments.slice(indexOfFirstItemA, indexOfLastItemA);
  const paginateA = (pageNumber) => setCurrentPageA(pageNumber);

  return (
    <div className='pb-4' >
      <div className="container mt-4 bg-white rounded-4 table-responsive" >
        <div className='d-flex justify-content-center align-items-center'>
          <button className='btn btn-primary' onClick={handleShowModal}><i className="bi bi-plus-square-fill"></i> Solicitar Cita</button>

        </div>
        <br />
        <h3>Solicitudes</h3>
        <table className="table wrap-table" >
          <thead>
            <tr>
              <th scope="col">Fecha</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Estado</th>
              <th scope="col">Cancelar</th>
            </tr>
          </thead>
          <tbody>
            {
              currentItemsAS.map((movement, index) => (
                <tr key={index} className={movement.State === 'PENDIENTE' ? 'table-secondary' : movement.State === 'RECHAZADO' ? 'table-danger' : movement.State === 'APROBADO' ? 'table-success' : '' }>

                  <td>{movement.Date.split('T')[0]}</td>
                  <td>{movement.Description}</td>
                  <td>{movement.State}</td>
                  <td><button className={`btn btn-danger ${movement.State !== 'PENDIENTE' ? 'disabled' : ''}`} onClick={()=> deleteAppointment(movement.Id)}  ><i className="bi bi-trash"></i></button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className={`page-item ${currentPageAS === 1 ? 'disabled' : ''}`}>
              <a className="page-link" onClick={() => paginateAS(currentPageAS - 1)}>Anterior</a>
            </li>
            <li className={`page-item ${currentPageAS === Math.ceil(appointmentsSolicitation.length / itemsPerPageAS) ? 'disabled' : ''}`}>
              <a className="page-link" onClick={() => paginateAS(currentPageAS + 1)}>Siguiente</a>
            </li>
          </ul>
        </nav>
        <div className="pagination">

        </div>
      </div>

      <div className="container mt-4 bg-white rounded-4 table-responsive" >
        <h3>Citas</h3>
        <table className="table wrap-table" >
          <thead>
            <tr>
              <th scope="col">Estado</th>
              <th scope="col">Fecha</th>
              <th scope="col">Hora</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Doctor</th>
            </tr>
          </thead>
          <tbody>
            {
              currentItemsA.map((movement, index) => (
                <tr key={index} className={movement.State === 'PENDIENTE' ? 'table-info' : movement.State === 'ATENDIDO' ? 'table-success' : '' }>
                  <td>{movement.State}</td>
                  <td>{movement.Date.split('T')[0]}</td>
                  <td>{movement.Date.split('T')[1].split('.')[0]}</td>
                  <td>{movement.Description}</td>
                  <td>{movement.Employee.Person.First_Name} {movement.Employee.Person.Last_Name}</td>

                </tr>
              ))
            }
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className={`page-item ${currentPageA === 1 ? 'disabled' : ''}`}>
              <a className="page-link" onClick={() => paginateAS(currentPageA - 1)}>Anterior</a>
            </li>
            <li className={`page-item ${currentPageA === Math.ceil(appointments.length / itemsPerPageA) ? 'disabled' : ''}`}>
              <a className="page-link" onClick={() => paginateAS(currentPageA + 1)}>Siguiente</a>
            </li>
          </ul>
        </nav>
        <div className="pagination">

        </div>
      </div>

      

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear nueva Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Fecha</p>
          <input id='date-as' type="date" className="form-control" />
          <br />
          <p>Descripción</p>
          <textarea id='desp-as' type="text" className="form-control" placeholder={`Motivo de la cita`} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={newAppointment}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default ClientAppointments