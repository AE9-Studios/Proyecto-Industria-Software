import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { recoveryPassword, resetPassword } from "../api/auth";
import { useParams, useNavigate } from "react-router-dom";

export const AccountRecovery = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [registerErrors, setRegisterErrors] = useState([]);
  const [submited, setSubmited] = useState(false);
  const [recoveryResponse, setRecoveryResponse] = useState("");

  const onSubmit = handleSubmit(async (values) => {
    try {
      const response = await recoveryPassword(values);
      setSubmited(true);
      setRecoveryResponse(response.data[0]);
      setRegisterErrors([]);
    } catch (error) {
      setRegisterErrors(error.response.data);
      setSubmited(false);
    }
  });

  return (
    <>
      <div className="container-sm mb-3">
        <form
          className="mx-auto mt-3 mx-auto rounded-4 bg-white"
          style={{ maxWidth: "500px" }}
          onSubmit={onSubmit}
        >
          <div className="px-3 pt-3">
            <a
              href="/"
              className="py-2 px-4 rounded-3 btn btn-primary text-decoration-none text-white"
            >
              <i className="bi bi-house-door-fill"></i>
            </a>
            <p className="text-center fw-bold">Recuperar contraseña</p>
          </div>

          <div className="pt-3 pb-5">
            <div className="d-flex flex-column align-items-center p-5">
              <h2 className="text-center mb-3">
                Ingresa el correo eléctronico asociado a tu cuenta
              </h2>
              <br />
              <div className="container d-flex flex-column">
                <div className="p-2 mb-3">
                  <label className="form-label">Correo eléctronico</label>
                  <input
                    placeholder="example@example.com"
                    className="form-control"
                    type="email"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="form-text text-danger">
                      El correo es requerido
                    </span>
                  )}
                </div>
              </div>

              <div className="container d-flex flex-column">
                <button
                  className="btn btn-primary mt-3 py-2 px-5 rounded-4 "
                  type="submit"
                >
                  Enviar
                </button>
              </div>

              <br />
              {submited && (
                <div
                  className={`alert ${
                    recoveryResponse ? "alert-success" : "alert-danger"
                  }`}
                  role="alert"
                >
                  {recoveryResponse
                    ? recoveryResponse
                    : "Error al enviar el correo electrónico de confirmación"}
                </div>
              )}
              {registerErrors.length !== 0 &&
                registerErrors.map((error, i) => (
                  <div key={i} className="alert alert-danger" role="alert">
                    {error}
                  </div>
                ))}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export const ResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [registerErrors, setRegisterErrors] = useState([]);
  const [submited, setSubmited] = useState(false);
  const { token } = useParams();
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);
  const [require, setRequire] = useState(Array(5).fill(true));
  const [redirectCount, setRedirectCount] = useState(5);

  const navigate = useNavigate();

  const checkPasswordSecurity = (password) => {
    const minLength = 8;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_-]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);

    setRequire([
      password.length >= 8,
      hasSpecialChar,
      hasNumber,
      hasUpperCase,
      hasLowerCase,
    ]);

    return (
      password.length >= minLength &&
      hasSpecialChar &&
      hasNumber &&
      hasUpperCase &&
      hasLowerCase
    );
  };

  const onSubmit = handleSubmit(async (values) => {
    values.token = token.replace(/%/g, ".");
    setSecurePassword(false);
    setPasswordMatchError(false);

    const newSecurePassword = checkPasswordSecurity(values.password);
    setSecurePassword(newSecurePassword);

    if (!newSecurePassword) {
      setSecurePassword(false);
      return;
    }

    if (values.password !== values.confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    try {
      await resetPassword(values);
      setSubmited(true);
      setRegisterErrors([]);
    } catch (error) {
      setRegisterErrors(error.response.data);
      setSubmited(false);
    }
  });

  useEffect(() => {
    if (submited) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 5000);

      const countdown = setInterval(() => {
        setRedirectCount((prevCount) => prevCount - 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(countdown);
      };
    }
  }, [submited, navigate]);

  return (
    <>
      <div className="d-flex flex-row">
        <div className="container-sm mb-3">
          <form
            className="mx-auto mt-3 mx-auto rounded-4 bg-white"
            style={{ maxWidth: "500px" }}
            onSubmit={onSubmit}
          >
            <div className="px-3 pt-3">
              <a
                href="/"
                className="py-2 px-4 rounded-3 btn btn-primary text-decoration-none text-white"
              >
                <i className="bi bi-house-door-fill"></i>
              </a>
              <p className="text-center fw-bold">Restablecer contraseña</p>
            </div>

            <div className="pt-3 pb-5">
              <div className="d-flex flex-column align-items-center p-5">
                <h2 className="text-center mb-3">
                  Ingresa la nueva contraseña
                </h2>
                <br />
                <div className="container d-flex flex-column">
                  <div className="p-2 mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                      id="password1"
                      className="form-control"
                      placeholder="8 dígitos, mayúsculas, minúsculas, número y caracter especial"
                      type="password"
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <p className="alert alert-warning mt-2" role="alert">
                        La contraseña es requerida
                      </p>
                    )}
                    {!securePassword && (
                      <div className="alert alert-warning mt-2" role="alert">
                        <p>
                          La contraseña no cumple con los criterios de
                          seguridad:
                        </p>
                        <ul>
                          {!require[0] && <li>Al menos 8 caracteres</li>}
                          {!require[1] && (
                            <li>Al menos un carácter especial</li>
                          )}
                          {!require[2] && <li>Al menos un número</li>}
                          {!require[3] && (
                            <li>Al menos una letra mayúscula </li>
                          )}
                          {!require[4] && <li>Al menos una letra minúscula</li>}
                        </ul>
                      </div>
                    )}
                    <br />
                    <label className="form-label">
                      Confirmar contraseña
                    </label>
                    <input
                      id="password2"
                      className="form-control"
                      placeholder="Ingrese la contraseña nuevamente"
                      type="password"
                      {...register("confirmPassword", { required: true })}
                    />
                    {errors.confirmPassword && (
                      <p className="alert alert-warning mt-2" role="alert">
                        La contraseña es requerida
                      </p>
                    )}
                    {passwordMatchError && (
                      <p className="alert alert-warning mt-2" role="alert">
                        Las contraseñas no coinciden
                      </p>
                    )}
                    <br />
                  </div>
                </div>

                <div className="container d-flex flex-column">
                  <button
                    className="btn btn-primary mt-3 py-2 px-5 rounded-4 "
                    type="submit"
                  >
                    Restablecer contraseña
                  </button>
                </div>

                <br />

                {submited && (
                  <div className="alert alert-success" role="alert">
                    Se ha restablecido la contraseña correctamente.
                    <br />
                    Serás redireccionado a la página principal en{" "}
                    {redirectCount} segundos...
                  </div>
                )}
                {registerErrors.length !== 0 &&
                  registerErrors.map((error, i) => (
                    <div key={i} className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
