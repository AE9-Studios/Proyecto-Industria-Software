import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import {
  getEmployeeByUserId,
  saveVacationRequest,
} from "../../api/human-resources";
import BottomNavigation from "../../components/BottomNavigation";

export const EmployeeVacationCreate = () => {
  const list = [
    { title: "Inicio", url: "/employee/home", icon: "bi bi-house-fill" },
  ];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm();

  const { user } = useAuth();
  const id = user.id;

  const [employeeData, setEmployeeData] = useState(null);
  const [availableVacationDays, setAvailableVacationDays] = useState(0);
  const [selectedDays, setSelectedDays] = useState(null);
  const [errorDate, setErrorDate] = useState(false);
  const [exceedsVacationDays, setExceedsVacationDays] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const successMessage = "Solicitud enviada";
  const [backendError, setBackendError] = useState("");

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const { data } = await getEmployeeByUserId(id);
        setEmployeeData(data.employee);
        const { Start_Date, Days_Spent } = data.employee;

        const availableDays = calculateVacationDays(Start_Date, Days_Spent);
        setAvailableVacationDays(availableDays);
      } catch (error) {
        console.error("Error obteniendo los datos del empleado:", error);
      }
    };

    fetchEmployeeData();
  }, [id]);

  const calculateVacationDays = (Start_Date, Days_Spent) => {
    const currentDate = new Date();
    const startYear = new Date(Start_Date).getFullYear();
    const currentYear = currentDate.getFullYear();
    const yearsOfWork = currentYear - startYear;
    let totalVacationDays = 0;

    for (let i = 1; i <= yearsOfWork; i++) {
      if (i === 1) {
        totalVacationDays += 10;
      } else if (i < 5) {
        totalVacationDays += 12 + (i - 2) * 2;
      } else {
        totalVacationDays += 20;
      }
    }

    return totalVacationDays - Days_Spent;
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
      if (!errorDate && !exceedsVacationDays) {
        const formData = {
          ...values,
          id,
        };

        await saveVacationRequest(formData);
        reset();
        setShowSuccessMessage(true);
        setTimeout(() => {
          setSelectedDays(null);
          setBackendError("");
          setShowSuccessMessage(false);
        }, 3000);
      }
    } catch (error) {
      setBackendError(error.response.data.error);
    }
  });

  const handleDateChange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      setErrorDate(true);
      setSelectedDays(0);
      setExceedsVacationDays(false);
      return;
    } else {
      setErrorDate(false);
    }

    let count = 0;

    while (start <= end) {
      const day = start.getDay();
      if (day !== 5 && day !== 6) {
        count++;
      }
      start.setDate(start.getDate() + 1);
    }

    setSelectedDays(count);
    setExceedsVacationDays(count > availableVacationDays);
  };

  return (
    <div className="mb-3">
      <form
        className="mx-auto  mt-3 mx-auto rounded-4 bg-white"
        style={{ maxWidth: "700px" }}
        onSubmit={onSubmit}
      >


        <div className=" pt-3 pb-5">
          <div className="d-flex flex-column align-items-center p-5">
            <h2 className="text-center mb-3">Solicitud de Vacaciones</h2>

            {employeeData && (
              <h5>
                <span className="badge bg-warning text-dark">
                  <div>
                    Días de vacaciones disponibles: {availableVacationDays}
                  </div>
                </span>
              </h5>
            )}

            <br />
            <div className="container d-flex flex-column">
              <div className="p-2 mb-3 container">
                <label className="form-label">Fecha de inicio</label>

                <input
                  className="form-control"
                  type="date"
                  {...register("StartDate", { required: true })}
                  onChange={(e) =>
                    handleDateChange(
                      e.target.value,
                      e.target.form.EndDate.value
                    )
                  }
                />
                {formErrors.StartDate && (
                  <span className="text-danger">
                    La fecha de inicio es requerida.
                  </span>
                )}
              </div>
              <div className="p-2 mb-3 container">
                <label className="form-label">Fecha de finalización</label>
                <input
                  className="form-control"
                  type="date"
                  {...register("EndDate", { required: true })}
                  onChange={(e) =>
                    handleDateChange(
                      e.target.form.StartDate.value,
                      e.target.value
                    )
                  }
                />
                {formErrors.EndDate && (
                  <span className="text-danger">
                    La fecha de finalización es requerida.
                  </span>
                )}
                {errorDate && (
                  <span className="text-danger">
                    <br />
                    La fecha de finalización debe ser posterior a la fecha de
                    inicio.
                  </span>
                )}
                {selectedDays !== null && (
                  <p style={{ color: "green" }}>
                    <br />
                    Está solicitando {selectedDays}{" "}
                    {selectedDays === 1 ? "día" : "días"} de vacaciones.
                  </p>
                )}
                {exceedsVacationDays && (
                  <span className="text-danger">
                    <br />
                    La cantidad de días seleccionados excede los días
                    disponibles de vacaciones.
                  </span>
                )}
              </div>
              <div className="p-2 mb-3 container"></div>
              <div className="container d-flex flex-column">
                <button
                  className="btn btn-primary mt-3 py-2 px-5 rounded-4"
                  type="submit"
                >
                  Enviar solicitud
                </button>
                <br></br>
                {backendError && (
                  <div className="alert alert-danger" role="alert">
                    {backendError}
                  </div>
                )}
                {showSuccessMessage && (
                  <div className="alert alert-success" role="alert">
                    {successMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
      <BottomNavigation list={list} />
    </div>
  );
};

export default EmployeeVacationCreate;
