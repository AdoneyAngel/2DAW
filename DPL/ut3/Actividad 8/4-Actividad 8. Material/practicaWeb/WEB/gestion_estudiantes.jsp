<%-- 
    Document   : gestion_estudiantes
    Created on : 20-oct-2013, 17:42:04
    Author     : Gustavo Adolfo Raya Casero
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"
        import="db_manager.DBEstudiantes, db_manager.Estudiantes, java.util.ArrayList"
%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>GESTIÓN ESTUDIANTES</title>
    </head>

    <body>
        <%
            //Obtener la información recibida, parámetros: accion, id, dni, nombre, ...
            String accion = request.getParameter("accion");
            String id = request.getParameter("id");
            String dni = request.getParameter("dni");
            String nombre = request.getParameter("nombre");
            String apellidos = request.getParameter("apellidos");
            String email = request.getParameter("email");
            String idprob = request.getParameter("idprob");
            String idpract = request.getParameter("idpract");

            //Declaracion del objeto para invocar las operaciones de acceso a la tabla estudiante_t
            DBEstudiantes operacion = new DBEstudiantes();

            //Llamada al método correspondiente para insertar en la tabla
            if (accion != null && accion.equals("insertar")) {
                if (operacion.insertar_Estudiantes(dni, nombre, apellidos, email, Integer.parseInt(idprob), Integer.parseInt(idpract))) {
                    out.print("Datos añadidos a la base de datos");
                } else {
                    out.print("Error al insertar los datos...");
                }

            }

            //Llamada al método correspondiente para actualizar en la tabla
            if (accion != null && accion.equals("actualizar")) {
                if (operacion.actualizar_Estudiantes(Integer.parseInt(id), dni, nombre, apellidos, email, Integer.parseInt(idprob), Integer.parseInt(idpract))) //if (operacion.actualizar_Estudiantes(1, "44713799M", "Gustavo", "Raya Casero", "g_raycas@hotmail.com", 1, 2))          
                {
                    out.print("Datos actualizados en la base de datos");
                } else {
                    out.print("Error al actualizar los datos...");
                }
            }

            //Llamada al método correspondiente para eliminar de la tabla
            if (accion != null && accion.equals("borrar")) {
                if (operacion.borrar_Estudiantes(Integer.parseInt(id))) {
                    out.print("Datos eliminados de la base de datos");
                } else {
                    out.print("Error al eliminar los datos...");
                }
            }


        %>

        
    <center><br><br><br><br>GESTIÓN ESTUDIANTES</center>
        
    <!-- Código HTML que implemente el enlace.
    Insertar SE UTILIZA TANTO PARA INSERTAR COMO ACTUALIZAR.
    LE PASO¡AMOS UN PARAMETRO accion 
    -->
    <center><a href="formulario_estudiante.jsp?accion=insertar"><br><br>Insertar<br><br></a> </center>
    
        <table align="center" border="0">
            <tr>
                <th>ID</th><th>DNI</th><th>Nombre</th><th>Apellidos</th><th>Email</th><th>Grupo Prob</th><th>Grupo Pract</th><th>Acciones</th>
            </tr>

            <%

                // Añadir el código necesario para mostrar los registros de la tabla estudiantes_t. 
                // Un registro en cada fila

                int i=0;
                Estudiantes fila = new Estudiantes();
                ArrayList<Estudiantes> array = new ArrayList<Estudiantes>();
                array = operacion.consultar_Estudiantes();

                while (array != null && i < array.size()) {
                //Si array está vacio la consulta devuelve null.

                    fila = array.get(i);
                    out.print("<tr><td>");
                    out.print(fila.getId());
                    out.print("</td><td>");
                    out.print(fila.getDni());
                    out.print("</td><td>");
                    out.print(fila.getNombre());
                    out.print("</td><td>");
                    out.print(fila.getApellidos());
                    out.print("</td><td>");
                    out.print(fila.getEmail());
                    out.print("</td><td>");
                    out.print(fila.getGrupoprob());
                    out.print("</td><td>");
                    out.print(fila.getGrupopract());
                    out.print("</td><td>");
                    
                    /*
                     * El enlace Editar se utiliza para acceder al formulario que permite actualizar el
                     * registro al que hace referencia (fichero formulario_grupopracticas.jsp)
                     */
                    out.print("<a href='formulario_estudiante.jsp?accion=actualizar&id=" + fila.getId() + 
                              "&dni=" + fila.getDni());
                    out.print("&nombre=" + fila.getNombre() + "&apellidos=" + fila.getApellidos() + 
                              "&email=" + fila.getEmail() + "&idprob=" + fila.getIdprob() + "&idpract=" + 
                               fila.getIdpract());
                    out.print("'>Editar</a> ");//Escribimos y cerramos Editar.
                    
                    //El enlace Eliminar permite borrar el registro al que hace referencia fila en cada momento.
                    out.print("<a href='gestion_estudiantes.jsp?accion=borrar&id="+fila.getId() + "'>Eliminar</a></tr></td>");
                    
                    
                    i++;

                }
               //Cerrar operacion
                operacion.closeConexion();
            %>
        </table>

        <!-- Código HTML que implemente el enlace Volver -->
        <center><a href="index.jsp"><br>Volver</a> </center>
</body>
</html>
