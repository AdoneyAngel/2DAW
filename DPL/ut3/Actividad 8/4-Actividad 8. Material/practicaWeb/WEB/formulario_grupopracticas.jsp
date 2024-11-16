<%-- 
    Document   : formulario_grupopracticas
    Created on : 12-oct-2013, 13:34:42
    Author     : Gustavo Adolfo Raya Casero
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>FORMULARIO GRUPOS DE PRÁCTICAS</title>
    </head>
    <body>
        <form action="gestion_grupopracticas.jsp" method="get">
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
                        <th><br><br><br><br><br>Formulario GRUPO de PRÁCTICAS.<br></th>
                    </tr>
                </thead>
                <tbody>
                    <tr> <!-- Primera fila-->
                        <td align="right"> Grupo</td> <!-- Primera celda escribimos Grupo-->
                        <!-- Segunda celda ponemos el Text Input para definir el grupo.-->
                        <td><input type="text" name="grupo" value="<%=grupo%>" size="30" /></td>
                    </tr>
                    <tr> <!-- Segunda fila. -->
                        <!-- Primera celda. Botón Borrar. -->
                        <td><input type="reset" value="borrar" name="borrar" /></td>
                        <td> <!-- Segunda celda. -->
                            <input type="submit" name="accion" value="<%=accion%>" />  <!-- Botón submit.  -->                      
                            <input type="hidden" name="id" value="<%=id%>" /> <!-- Campo hidden.-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </body>
</html>
