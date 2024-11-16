<%-- 
    Document   : formulario_estudiante
    Created on : 12-oct-2013, 12:45:50
    Author     : Gustavo Adolfo Raya Casero
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"
   import="db_manager.DBGrupoPracticas, db_manager.GrupoPracticas, db_manager.DBGrupoProblemas, db_manager.GrupoProblemas, java.util.ArrayList"      
%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>FORMULARIO ESTUDIANTES</title>
    </head>
    <body>
        <form action="gestion_estudiantes.jsp" method="get">
            <%
                String accion = request.getParameter("accion");
                String id = request.getParameter("id");
                String dni = request.getParameter("dni");
                String nombre = request.getParameter("nombre");
                String apellidos = request.getParameter("apellidos");
                String email = request.getParameter("email");
                String idprob = request.getParameter("idprob");
                String idpract = request.getParameter("idpract");
                if (dni == null) {
                    dni = "";
                }
                if (nombre == null) {
                    nombre = "";
                }
                if (apellidos == null) {
                    apellidos = "";
                }
                if (email == null) {
                    email = "";
                }

            %>
            <!--Insertamos una tabla para alinear mejor la información.
                La tabla tiene una FILA de encabezado con la cebecera Formulario de ESTUDIANTE.
                Además tenemos 7 FILAS con 2 COLUMNAS.
            -->
            <table align="center" border="0">
                <thead>
                    <tr>
                        <th><br><br><br><br>Formulario de ESTUDIANTE</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>D.N.I.</td>
                        <td><input type="text" name="dni" value="<%=dni%>" size="50" /></td>
                    </tr>
                    <tr>
                        <td>NOMBRE</td>
                        <td><input type="text" name="nombre" value="<%=nombre%>" size="50" /></td>
                    </tr>
                    <tr>
                        <td>APELLIDOS</td>
                        <td><input type="text" name="apellidos" value="<%=apellidos%>" size="50" /></td>
                    </tr>
                    <tr>
                        <td>email</td>
                        <td><input type="text" name="email" value="<%=email%>" size="50" /></td>
                    </tr>
                    <tr>
                        <td>Grupo PROBLEMAS</td>
                        <td><select name="idprob">
                                <!--
                                <option>Martes 15-17</option>
                                <option>Viernes 15-17</option>
                                -->
                                <%
                                    DBGrupoProblemas operacionProb = new DBGrupoProblemas();
                                    int i=0;
                                    GrupoProblemas filaProb = new GrupoProblemas();
                                    ArrayList<GrupoProblemas> array = new ArrayList<GrupoProblemas>();
                                    array = operacionProb.consultar_GrupoProblemas();

                                    while (array != null && i < array.size()) {
                                        //si array null no devuelve nada la consulta
                                        filaProb = array.get(i);
                                        out.print("<option value='" + filaProb.getId() + "'"); //+"'>"+fila.getGrupo()+"</option>");
                                        if ((idprob != null) && (filaProb.getId() == Integer.parseInt(idprob))) {
                                            out.print(" selected");
                                        }
                                        out.print(">" + filaProb.getGrupo() + "</option>");
                                        i++;
                                    }
                                    //Cerrar operacion
                                    operacionProb.closeConexion();
                                %>

                            </select></td>
                    </tr>
                    <tr>
                        <td>Grupo PRÁCTICAS</td>
                        <td><select name="idpract">
                                <!--
                                <option>Lunes 19-21</option>
                                <option>Martes 19-21</option>
                                <option>Miércoles 19-21</option>
                                -->
                                <%
                                    DBGrupoPracticas operacionPrac = new DBGrupoPracticas();
                                    GrupoPracticas filaPrac = new GrupoPracticas();
                                    ArrayList<GrupoPracticas> arrayPrac = new ArrayList<GrupoPracticas>();
                                    arrayPrac = operacionPrac.consultar_GrupoPracticas();

                                    i = 0;
                                    while (arrayPrac != null && i < arrayPrac.size()) {//si array null no devuelve nada la consulta

                                        filaPrac = arrayPrac.get(i);
                                        out.print("<option value='" + filaPrac.getId() + "'"); //>"+filaPrac.getGrupo()+"</option>");
                                        if ((idpract != null) && (filaPrac.getId() == Integer.parseInt(idpract))) {
                                            out.print(" selected");
                                        }
                                        out.print(">" + filaPrac.getGrupo() + "</option>");
                                        i++;
                                    }
                                    //Cerrar operacion
                                    operacionPrac.closeConexion();
                                %>                        


                            </select></td>
                    </tr>
                    <tr>
                        <td><br><input type="reset" value="reset" name="borrar" /></td>
                        <td><br><input type="submit" value="<%=accion%>" name="accion" />
                            <br><input type="hidden" name="id" value="<%=id%>" /></td> <!-- Campo hidden.-->
                    </tr>
                </tbody>
            </table>
        </form>
    </body>
</html>
