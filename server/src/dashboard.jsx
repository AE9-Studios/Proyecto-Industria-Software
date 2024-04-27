import React from 'react'
import Cookies from 'js-cookie'

const dashboard = () => {

  const logout = async () => {
    try {
      Cookies.remove('token')
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px',
    }}>
      <div style={{
        marginBottom: '20px',
      }}>
        <h1 style={{
          textAlign: 'center',
          fontSize: '2em',
          padding: '10px',
          textWrap: 'wrap',
          color: 'black',
          fontWeight: 'bold',
        }}>Bienvenido al panel crud de administrador</h1>
        <p style={{
          color: 'black',
          padding: '10px',
        }}>Aquí podrás gestionar los registros de la base de datos haciendo click en "prisma" en la barra lateral podras observar todos las tablas de la base de datos, haciendo click en un modelo podras observar los registros actuales</p>
      </div>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
        <a 
          // href='http://localhost:5173/admin/home' //dev
          href='https://classic-vision.alhanisespinal.tech/admin/home' //deploy
          style={{
            margin: '10px',
            textDecoration: 'none',
            color: 'black',
            backgroundColor: 'white',
            padding: '10px',
            // border: '1px solid black',
            borderRadius: '5px',
            height: '100px',
            width: '400px',
            boxShadow: '0px 0px 10px 0px lightgrey',
          }}
        >
          <div style={{
            padding: '10px',

          }}>
            <h5 style={{
              color: 'black',
              fontWeight: 'bold',
              textAlign: 'center',
              textJustify: 'center',
            }}>Volver al Home </h5>
            <p>Click aquí para volver al panel anterior para ver todas las funciones del administrador</p>
          </div>
        </a>
        <a onClick={logout}
          // href='http://localhost:5173/login' //dev
          href='https://classic-vision.alhanisespinal.tech/login' //deploy
          style={{
            margin: '10px',
            textDecoration: 'none',
            color: 'black',
            backgroundColor: 'white',
            padding: '10px',
            // border: '1px solid black',
            borderRadius: '5px',
            height: '100px',
            width: '400px',
            boxShadow: '0px 0px 10px 0px lightgrey',
          }}
        >
          <div style={{
            padding: '10px',

          }}>
            <h5 style={{
              color: 'black',
              fontWeight: 'bold',
              textAlign: 'center',
              textJustify: 'center',
            }}>Salir </h5>
            <p>Click aquí para cerrar tu sesión</p>

          </div>
        </a>

      </div>
    </div>
  );
};


export default dashboard
