# Backend
## Carpetas
 - src para todo el codigo que se va a crear
 - models para los modelos de la BD (Esquema/Estructura de que datos queresmos que guarde)
- routes para las rutas url de la API del backend
- controller para las funciones que se va a ejecutar cuando se acceda a una url
- middlewares para que el backend filtre rutas protegidas para usuarios autenticados o cierto tipo de usuario
- schemas para los esquemas/estructura de los datos que llegan al backend (models es para llegada a la BD con mongoose, schema es para el Backend con zod)
- libs para codigo que se va a importar varias veces

## Archivos

- db.js conexion con la bd
- config.js para variables globales (como secrets tokens, puertos, contraseñas)
- index.js arranque de la aplicacion
- app.js creacion del servidor

## Dependencias iniciales
- Express para el servidor
- pg para la base de datos
- nodemon para no tener que levantar el servidor de nuevo cada vez que se modifique algo
- morgan para ver las peticiones que van llegando al Backend por consola
- bcryptjs para encriptar contraseñas
- cors para arreglar problema por cors (Las peticiones desde el frontend seran rechazadas por defecto por politicas de cors de los navegadores porque el backend no recibe peticiones desde un dominio diferente por seguridad y al estar corriendo el backend y el frontend en puertos distintos los toma como dominios diferentes)
-cookie-parser para el manejo de cookies
- zod validacion de esquemas para el backend

# Frotend
## Carpetas
- api conexion con el backend
- pages paginas que se podran visitar
- components componentes
- context para guardar los contextos entre paginas como el estado del usuario
- vite-plugin-pwa para hacer la aplicacion pwa

## Archivos

## Dependencias
- router-dom para el manejo de paginas
- react hook form para decirle a react que maneje el cambio de estado y la validadcion
- bootstrap no se instalara solo se usara medainte md

# Extensiones que les recomiendo tener para VSCode
- thunder client para peticiones a la api asi no se tiene que instalar postman u otra aplicacion
- docker for VScode asi no se tienen que instalar docker desktop si no quieren
- mithril emmet para auto completados (activar javascriptreact en los settings)
- better coment para comentarios, pueden dejar comentarios para sus compañeros con caracteres especiales y esta extencion los resaltara como alertas por si no entienden algo del codigo o hay un error
- Tabnine una inteligencia artificial que aprende de tu forma de escribir codigo y del codigo que hay en el proyecto y predice que es lo siguiente a escribir asi puedes tipear mas rapidamente. Si quieren tambien pueden probar CodeWhisperer de Amazon
- material icon para que se vean bonita y menos confusa la organizacion de las carpetas

# Nota

Las dependencias son las dependencias iniciales para que el proyecto funcione, usted y sus compañeros irán agregando más conforme el proyecto avance, por eso siempre despues de un pull ejecute el comando npm install tanto en el backend como en el frontend.

# Sobre los puertos al trabajar

Si quiere desarrollar fuera del docker lo puede hacer, solo le recomendaría deje descomentada la base de datos del docker-compose y comente el backEnd, El frontEnd y el servidor nginx.

- base de datos en el puerto 5432
- backend en el puerto 3000
- frontend en el puerto 5173, exepto si trabaja fuera del docker y buildea el proyecto el front correria en el puerto 4173
- pgadmin puerto 8001

El nginx corre en el puerto 80 (puerto por defecto del localhost) y redirige las direcciones tanto al backend como al frontend, por lo que si entra al puerto 80 ira al frontend y al 80/api ira al backend.


# Restaurar los datos de la BD
- corra el comando docker exec -t db pg_dumpall -c -U postgres > dump.sql desde la carpeta proyecto/server para guardar una copia de la base de datos

- corra el comando "type dump.sql | docker exec -i db psql -U postgres" para restaurarla en windows
- "cat dump.sql | docker exec -i db psql -U postgres" en linux (este se usara para produccion)
