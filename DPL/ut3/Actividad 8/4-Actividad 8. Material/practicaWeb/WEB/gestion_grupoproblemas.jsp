<%-- 
    Document   : gestion_grupoproblemas
    Created on : 20-oct-2013, 17:07:59
    Author     : Gustavo Adolfo Raya Casero
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"
        import="db_manager.DBGrupoProblemas, db_manager.GrupoProblemas, java.util.ArrayList"
        %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>GESTIÓN GRUPOS DE PROBLEMAS</title>
    </head>
    <body>
        <%

            //GUSTAVO ADOLFO RAYA CASERO.

            //Obtener la información recibida, parámetros: accion, grupo, id

            String accion = request.getParameter("accion");
            String grupo = request.getParameter("grupo");
            String id = request.getParameter("id");



            //Declaracion del objeto para invocar las operaciones de acceso a la tabla grupo_problemas_t
        /*
             * DBGrupoProblemas operacion = new DBGrupoProblemas();
             * operacion es un objeto de la clase DBGrupoProblemas que contiene todas las operaciones
             * para gestionar grupo_problemas_t : 
             * insertar_GrupoProblemas();borrar_GrupoProblemas();
             * actualizar_GrupoProblemas();consultar_GrupoProblemas();
             */
            DBGrupoProblemas operacion = new DBGrupoProblemas();


            //Llamada al método correspondiente para insertar/añadir un registro en la tabla
            if (accion != null && accion.equals("insertar")) {
                if (operacion.insertar_GrupoProblemas(grupo)) {
                    out.print("Datos añadidos a la base de datos.");
                } else {
                    out.print("Error al insertar..");
                }
            }

            //Llamada al método correspondiente para actualizar en la tabla
            if (accion != null && accion.equals("actualizar")) {
                if (operacion.actualizar_GrupoProblemas(Integer.parseInt(id), grupo)) {
                    out.print("Datos actualizados en la base de datos.");
                } else {
                    out.print("Error al actualizar..");
                }

            }

            //Llamada al método correspondiente para eliminar de la tabla
            if (accion != null && accion.equals("borrar")) {
                if (operacion.borrar_GrupoProblemas(Integer.parseInt(id))) {
                    out.print("Datos borrados de la base de datos.");
                } else {
                    out.print("Error al borrar..");
                }


            }


        %>


        <center><br><br><br><br>GESTIÓN GRUPOS DE PROBLEMAS</center>
        
        <!-- Código HTML que implementa el enlace Insertar 
             SE UTILIZA TANTO PARA INSERTAR COMO ACTUALIZAR.
             LE PASAMOS EL PARAMETRO accion=insertar con la instrucción ?accion=insertar
        -->
    <center><a href="formulario_grupoproblemas.jsp?accion=insertar"><br><br>Insertar<br><br></a></center>

        <table align="center" border="0">
            <!--
                <th>contenido de la celda</th> celda cabecera
                En este caso escribimos:
                ID   Grupo   Acciones
            -->
            <th>ID</th><th>Grupo</th><th>Acciones</th>

            <%

                /* Añadimos el código JSP necesario para mostrar los registros de la tabla grupo_problemas_t. 
                 Un registro en cada fila.
                 */

                /* Declaramos el array que es del tipo ArrayList que contiene los objetos 
                 del tipo GrupoProblemas de la tabla grupo_problemas_t.
                 public class ArrayList<E> extends AbstractList<E>
                 implements List<E>, RandomAccess, Cloneable, Serializable
                 Resizable-array implementation of the List interface. 
                 */
                ArrayList<GrupoProblemas> array = new ArrayList<GrupoProblemas>();

                /*
                 * DBGrupoProblemas operacion = new DBGrupoProblemas();
                 * operacion es un objeto de la clase DBGrupoProblemas que contiene todas las operaciones
                 * para gestionar grupo_problemas_t : 
                 * insertar_GrupoProblemas();borrar_GrupoProblemas();
                 * actualizar_GrupoProblemas();consultar_GrupoProblemas();
                 */
                array = operacion.consultar_GrupoProblemas(); //Devuelve toda la grupo_problemas_t Order By Grupo.

                /*
                 * GrupoProblemas es la clase que contiene las variables id; grupo; que describen/definen
                 * a un grupo de problemas con sus métodos correspondientes... getters y setters.
                 */
                GrupoProblemas fila = new GrupoProblemas();

                int i = 0;

                while (array != null && i < array.size()) {

                    fila = array.get(i);//Obtengo cada grupo de prácticas guardado en grupo_problemas_t
                    out.print("<TR><TD>");//Envío etiquetas de <TR>INICIO de FILA<TD>INICIO de COLUMNA
                    out.print(fila.getId());//En la primera celda escribimos la id
                    out.print("</TD><TD>");//Envío las etiquetas de final de primera columna e inicio de segunda columna.
                    out.print(fila.getGrupo());//En la segunda celda escribimos el grupo.
                    out.print("</TD><TD>");//Envío las etiquetas de final de segunda columna e inicio de tercera columna.

                    /*
                     * El enlace Editar se utiliza para acceder al formulario que permite actualizar el
                     * registro al que hace referencia (fichero formulario_grupoproblemas.jsp)
                     */
                    out.print("<a href='formulario_grupoproblemas.jsp?accion=actualizar");
                    /* En la tercera columna enviamos el link a formulario_grupoproblemas.jsp con la
                     * ?accion=actualizar. 
                     */
                    out.print("&id=");//con la ?accion=actualizar&id=
                    out.print(fila.getId());//Enviamos el id que hay que actualizar.
                    out.print("&grupo=");//con la ?accion=actualizar&id=..&grupo=..
                    out.print(fila.getGrupo());//Enviamos el grupo que hay que actualizar.
                    out.print("'>Editar  </a>");//Escribimos y cerramos Editar.

                    //El enlace Eliminar permite borrar el registro al que hace referencia
                    out.print("<a href='gestion_grupoproblemas.jsp?accion=borrar&id=");
                    out.print(fila.getId() + "'>Eliminar</a></TR></TD>");

                    i++;

                }

                //Cerrar operacion
                operacion.closeConexion();

            %>

        </table>
        <!-- Código HTML que implementa el enlace Volver -->
        <center><a href="index.jsp"><br>Volver</a></center>

    </body>
</html>
