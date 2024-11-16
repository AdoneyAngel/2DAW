<%-- 
    Document   : index
    Created on : 12-oct-2013, 11:51:12
    Author     : Gustavo Adolfo Raya Casero
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <!-- A continuación insertamos los tres Link a los tres ficheros de 
             gestión de cada una de las tablas de nuestra base de datos -->
        <!-- Insertamos los tres hipervínculos en una tabla con 4 filas
             y una columna. La primera primera fila tiene un encabezado y
             saltos de línea. La tabla está centrada.-->
        <table border="0" align="center">
            <tbody>
                <tr>
                    <td>
                       <br><br><br><br>
                       REDES Y SERVICIOS TELEMÁTICOS.<br>
                       GESTIÓN DE ESTUDIANTES/GRUPOS.<br><br>
                    </td>
                </tr> <!-- Final de la primera fila-->
                <tr><!--Primera fila -->
                    <!-- Primer Link-->
                    <td><a href="gestion_estudiantes.jsp">Gestión de ESTUDIANTES<br></a><br></td>
                </tr>
                
                <tr><!--Segunda fila -->
                    <!-- Segundo Link-->
                    <td><a href="gestion_grupopracticas.jsp">Gestión GRUPO de PRÁCTICAS<br></a><br></td>
                </tr>
                
                <tr><!--Tercera fila -->
                    <!-- Tercer Link-->
                    <td><a href="gestion_grupoproblemas.jsp">Gestión GRUPO de PROBLEMAS<br></a><br></td>
                </tr>
            </tbody>
        </table>

    </body>
</html>

