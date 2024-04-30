import { useState, useEffect } from "react";
import bowser from "bowser";
import NavBar from "./NavBar";
import introJs from "intro.js";
import "intro.js/introjs.css";
import { useNavigate } from "react-router-dom";

export const BrowserDetector = () => {
  const [browserInfo, setBrowserInfo] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate()
  const isPWA =
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator.standalone &&
      window.navigator.userAgent.includes("Safari"));

  useEffect(() => {
    const detectedBrowser = bowser.getParser(window.navigator.userAgent);
    setBrowserInfo({
      name: detectedBrowser.getBrowserName(),
      version: detectedBrowser.getBrowserVersion(),
      os: detectedBrowser.getOSName(),
    });
  }, []);

  useEffect(() => {
    const hideAlertForever = localStorage.getItem("hideAlertForever");
    if (
      browserInfo &&
      browserInfo.name === "Firefox" &&
      hideAlertForever !== "true" &&
      !isPWA
    ) {
      setShowAlert(true);
    }
  }, [browserInfo, isPWA]);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleHideAlertForever = () => {
    localStorage.setItem("hideAlertForever", "true");
    setShowAlert(false);
  };

  const handleHideAlertForeverA = () => {
    localStorage.setItem("hideAlertForever", "true");
    setTimeout(() => {
      navigate("/tutorial");
    }, 100);
  };

  return (
    <div>
      {showAlert && (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          Desafortunadamente las PWA no son nativamente compatibles con Firefox.
          Para habilitar la instalación necesita descargar una extensión
          específica para Firefox. <br />
          Si está recibiendo este mensaje desde la PWA simplemente presione el
          botón &quot;No volver a mostrar&quot;.
          <br />
          <br />
          <button
            type="button"
            className="btn-close"
            onClick={handleCloseAlert}
          ></button>
          <a
            href="https://addons.mozilla.org/firefox/downloads/file/4252822/pwas_for_firefox-2.11.1.xpi"
            className="btn btn-dark"
            onClick={handleHideAlertForeverA}
          >
            Descargar extensión
          </a>
          {"   "}
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleHideAlertForever}
          >
            No volver a mostrar
          </button>
        </div>
      )}
    </div>
  );
};

export const TutorialPWA = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const detectedBrowser = bowser.getParser(window.navigator.userAgent);

    if (detectedBrowser.getBrowserName().toLowerCase() !== "firefox") {
      navigate("/");
    } else {
      const intro = introJs();
      intro.setOptions({
        steps: [
          {
            intro:
              "Bienvenido al tutorial para instalar PWA en Firefox. Sigue los pasos para completar la instalación.",
          },
          {
            element: document.querySelector(".col-12:nth-child(1)"),
            intro:
              "Paso 1: Aquí se mostrarán los pasos para poder usar la extensión FireFoxPWA.",
            position: "top",
          },
          {
            element: document.querySelector(".col-12:nth-child(2)"),
            intro: "Paso 2: Acepte los términos.",
            position: "top",
          },
          {
            element: document.querySelector(".col-12:nth-child(3)"),
            intro:
              "Paso 3: Instale el conector según la versión de sus sistema operativo",
            position: "top",
          },
          {
            element: document.querySelector(".col-12:nth-child(4)"),
            intro:
              "Paso 4: Una vez que instale el conector ya podrá usar la extensión.",
            position: "top",
          },
          {
            element: document.querySelector(".col-12:nth-child(5)"),
            intro:
              "Paso 5: En la extensión seleccione install current site.",
            position: "top",
          },
          {
            element: document.querySelector(".col-12:nth-child(6)"),
            intro:
              "Paso 6: Presione el botón install web app..",
            position: "top",
          },
          {
            element: document.querySelector(".col-12:nth-child(7)"),
            intro:
              "Paso 7: Ya tendrá instalada la app.",
            position: "top",
          },
          {
            element: document.querySelector(".col-12:nth-child(8)"),
            intro:
              "Paso 8: Ya podrá usar la PWA de nuestra página",
            position: "top",
          },
        ],
      });

      intro.start();

      return () => {
        intro.exit();
      };
    }
  }, []);

  return (
    <>
      <NavBar></NavBar>

      <div className="container">
        <h1 className="text-center">Pasos para instalar PWA en Firefox</h1>
        <div className="row">
          <div className="col-12 mb-4">
            <div className="text-center position-relative">
              <div>Paso 1</div>
              <img src="/tuto1.png" alt="Paso 1" className="img-fluid mb-2" />
            </div>
          </div>
          <div className="col-12 mb-4">
            <div className="text-center position-relative">
              <div>Paso 2</div>
              <img src="/tuto2.png" alt="Paso 2" className="img-fluid mb-2" />
            </div>
          </div>
          <div className="col-12 mb-4">
            <div className="text-center position-relative">
              <div>Paso 3</div>
              <img src="/tuto3.png" alt="Paso 3" className="img-fluid mb-2" />
            </div>
          </div>
          <div className="col-12 mb-4">
            <div className="text-center position-relative">
              <div>Paso 4</div>
              <img src="/tuto4.png" alt="Paso 4" className="img-fluid mb-2" />
            </div>
          </div>
          <div className="col-12 mb-4">
            <div className="text-center position-relative">
              <div>Paso 5</div>
              <img src="/tuto5.png" alt="Paso 5" className="img-fluid mb-2" />
            </div>
          </div>
          <div className="col-12 mb-4">
            <div className="text-center position-relative">
              <div>Paso 6</div>
              <img src="/tuto6.png" alt="Paso 6" className="img-fluid mb-2" />
            </div>
          </div>
          <div className="col-12 mb-4">
            <div className="text-center position-relative">
              <div>Paso 7</div>
              <img src="/tuto7.png" alt="Paso 7" className="img-fluid mb-2" />
            </div>
          </div>
          <div className="col-12 mb-4">
            <div className="text-center position-relative">
              <div>Paso 8</div>
              <img src="/tuto8.png" alt="Paso 8" className="img-fluid mb-2" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
