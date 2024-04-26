import { useState, useEffect } from "react";
import { EmulatorJS } from "react-emulatorjs";
import NavBar from "./NavBar";

function Emulator() {
  const [rom, setRom] = useState(null);

  useEffect(() => {
    const fetchRom = async () => {
      try {
        const response = await fetch("/rom.gba");
        const blob = await response.blob();
        const reader = new FileReader();

        reader.onload = () => {
          const romData = reader.result;
          setRom(romData);
        };

        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Error al cargar el archivo:", error);
      }
    };

    fetchRom();
  }, []);

  return (
    <>
      <NavBar />
      <div className="emulator-container">
        {rom && <EmulatorJS EJS_core="gba" EJS_gameUrl={rom} />}
      </div>
    </>
  );
}

export default Emulator;
