/**
 * INFORMACION SOBRE CUANDO USAR LOS CODIGOS DE ERROR SEGUN EL CASO
 * 
 * -> Los 200 son de exito
 * 
 * - 200 solicitud procesada con exito el servidor envia respuesta, es el por defecto en el res.send()
 * 
 * - 204 solicitud procesada con exito el servidor el servidor no envia respuesta, se usa para peticiones que no devuelven nada
 * 
 * -> Los 300 son de redireccion
 * 
 * - 301 se usa para redirigir el tráfico de una URL a otra.
 * - 302 se usa para redirigir el tráfico de una URL a otra, pero la redirección es temporal. (no se usa mucho, el recurso se ha movido temporalmente de url)
 * 
 * -> Los 400 son de error de cliente
 * - 400 se usa cuando el navegador web o el cliente envían 
 * datos incorrectos al servidor web.
 * - 401 se usa para indicar que el usuario debe iniciar sesión en 
 * una cuenta antes de que la solicitud pueda ser procesada.
 * - 403 se usa para indicar que la solicitud era válida pero que 
 * el servidor web se niega a procesarla. A menudo se usa para 
 * indicar que un usuario no tiene permisos suficientes para 
 * ejecutar una acción en una aplicación web.
 * - 404 se usa para indicar que el recurso solicitado no se 
 * encontró en el servidor web.

* -> Los 500 son de error de servidor
- 500 Internal Server Error es el status más utilizado, representa 
un error en el servidor y no da más detalles, esto se suele hacer 
por razones de seguridad en servidores de producción


 * 
 * 
 */

export const http500 = (err, req, res) => {
    console.error(err.stack);
    res.status(500).json(['Error inesperado en el servidor, intentelo mas tarde']);
}

export const http401 = (err, req, res) => {
    console.error(err.stack);
    res.status(500).json(['Inicio de sesión requrido']);
}

export const http403 = (err, req, res) => {
    console.error(err.stack);
    res.status(500).json(['No Autorizado']);
}

