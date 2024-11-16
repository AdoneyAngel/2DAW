<%-- 
    Document   : formulario_grupoproblemas
    Created on : 12-oct-2013, 16:06:58
    Author     : Gustavo Adolfo Raya Casero
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>FORMULARIO GRUPO DE PROBLEMAS</title>
    </head>
    <body>
        <form action="gestion_grupoproblemas.jsp" method="get">
            <table align="center" border="0">
                <thead>
                    <tr>
                        <th>
                            <% // Código JSP
                                String accion = request.getParameter("accion");
                                String id = request.getParameter("id");
                                String grupo = request.getParameter("grupo");
                                if (grupo == null) {
                                    grupo = "";
                                }
                            %>
                        </th>
                        <th><br><br><br><br><br>Formulario GRUPO de PROBLEMAS<br></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td align="right">Grupo</td> <!-- Primera celda escribimos Grupo-->
                        <!-- Segunda celda ponemos el Text Input para definir el grupo.-->
                        <td><input type="text" name="grupo" value="<%=grupo%>" size="30" /></td>
                    </tr>
                    <tr> <!-- Segunda fila. -->
                        <!-- Primera celda. Botón Borrar. -->
                        <td><input type="reset" value="borrar" name="borrar" /></td>
                        <td>
                            <input type="submit" name="accion" value="<%=accion%>" />  <!-- Botón submit.  -->
                            <input type="hidden" name="id" value="<%=id%>" /> <!-- Campo hidden.-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </body>
</html>
