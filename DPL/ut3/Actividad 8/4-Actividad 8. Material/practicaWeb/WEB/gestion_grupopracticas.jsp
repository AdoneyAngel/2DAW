

<%@page contentType="text/html" pageEncoding="UTF-8"
        import="db_manager.DBGrupoPracticas, db_manager.GrupoPracticas, java.util.ArrayList"
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>GESTIÓN GRUPOS DE PRÁCTICAS</title>
    </head>
    <body>
        <%
            
        //GUSTAVO ADOLFO RAYA CASERO.
            
        //Obtener la información recibida, parámetros: accion, grupo, id
        
        String accion = request.getParameter("accion");
        String grupo = request.getParameter("grupo");
        String id = request.getParameter("id");

		
		
        //Declaracion del objeto para invocar las operaciones de acceso a la tabla grupo_practicas_t
        /*
         * DBGrupoPracticas operacion = new DBGrupoPracticas();
         * operacion es un objeto de la clase DBGrupoPracticas que contiene todas las operaciones
         * para gestionar grupo_practicas_t : 
         * insertar_GrupoPracticas();borrar_GrupoPracticas();
         * actualizar_GrupoPracticas();consultar_GrupoPracticas();
         */
        DBGrupoPracticas operacion = new DBGrupoPracticas();
		

        //Llamada al método correspondiente para insertar/añadir un registro en la tabla
        if (accion!=null && accion.equals("insertar")) {
            if (operacion.insertar_GrupoPracticas(grupo))
                out.print("Datos añadidos a la base de datos.");
            else
                out.print("Error al insertar..");
        }

        //Llamada al método correspondiente para actualizar en la tabla
        if (accion!=null && accion.equals("actualizar")) {
            if (operacion.actualizar_GrupoPracticas(Integer.parseInt(id),grupo))
                out.print("Datos actualizados en la base de datos.");
            else
                out.print("Error al actualizar..");
        
	}

        //Llamada al método correspondiente para eliminar de la tabla
        if (accion!=null && accion.equals("borrar")) {
            if (operacion.borrar_GrupoPracticas(Integer.parseInt(id)))
                out.print("Datos borrados de la base de datos.");
            else
                out.print("Error al borrar..");

		
        }
        
        
        %>

        <center><br><br><br><br>GESTIÓN GRUPOS DE PRÁCTICAS</center>
        
        
        <!-- Código HTML que implementa el enlace Insertar 
             SE UTILIZA TANTO PARA INSERTAR COMO ACTUALIZAR.
             LE PASAMOS EL PARAMETRO accion=insertar con la instrucción ?accion=insertar
        -->
        <center><a href="formulario_grupopracticas.jsp?accion=insertar"><br><br>Insertar<br><br></a></center>


        <table align="center" border="0">
            <!--
                <th>contenido de la celda</th> celda cabecera
                En este caso escribimos:
                ID  Grupo   Acciones
            -->
            <th>ID</th><th>Grupo</th><th>Acciones</th>

        <%

        /* Añadimos el código JSP necesario para mostrar los registros de la tabla grupo_practicas_t. 
           Un registro en cada fila.
        */
        
        /* Declaramos el array que es del tipo ArrayList que contiene los objetos 
           del tipo GrupoPracticas de la tabla grupo_practicas_t.
           public class ArrayList<E> extends AbstractList<E>
           implements List<E>, RandomAccess, Cloneable, Serializable
           Resizable-array implementation of the List interface. 
        */
        ArrayList<GrupoPracticas> array = new ArrayList<GrupoPracticas>();  
        
        /*
         * DBGrupoPracticas operacion = new DBGrupoPracticas();
         * operacion es un objeto de la clase DBGrupoPracticas que contiene todas las operaciones
         * para gestionar grupo_practicas_t : 
         * insertar_GrupoPracticas();borrar_GrupoPracticas();
         * actualizar_GrupoPracticas();consultar_GrupoPracticas();
         */
        array = operacion.consultar_GrupoPracticas(); //Devuelve toda la grupo_practicas_t Order By Grupo.
        
        /*
         * GrupoPracticas es la clase que contiene las variables id; grupo; que describen/definen
         * a un grupo de prácticas con sus métodos correspondientes... getters y setters.
         */
        GrupoPracticas fila = new GrupoPracticas();
        
        int i=0;
        
        while (array!=null && i< array.size()){
            
            fila = array.get(i);//Obtengo cada grupo de prácticas guardado en grupo_practicas_t
            out.print("<TR><TD>");//Envío etiquetas de <TR>INICIO de FILA<TD>INICIO de COLUMNA
            out.print(fila.getId());//En la primera celda escribimos la id
            out.print("</TD><TD>");//Envío las etiquetas de final de primera columna e inicio de segunda columna.
            out.print(fila.getGrupo());//En la segunda celda escribimos el grupo.
            out.print("</TD><TD>");//Envío las etiquetas de final de segunda columna e inicio de tercera columna.
            
            /*
             * El enlace Editar se utiliza para acceder al formulario que permite actualizar el
             * registro al que hace referencia (fichero formulario_grupopracticas.jsp)
             */
            out.print("<a href='formulario_grupopracticas.jsp?accion=actualizar");
            /* En la tercera columna enviamos el link a formulario_grupopracticas.jsp con la
             * ?accion=actualizar. 
             */
            out.print("&id=");//con la ?accion=actualizar&id=
            out.print(fila.getId());//Enviamos el id que hay que actualizar.
            out.print("&grupo=");//con la ?accion=actualizar&id=..&grupo=..
            out.print(fila.getGrupo());//Enviamos el grupo que hay que actualizar.
            out.print("'>Editar  </a>");//Escribimos y cerramos Editar.
            
            //El enlace Eliminar permite borrar el registro al que hace referencia
            out.print("<a href='gestion_grupopracticas.jsp?accion=borrar&id=");
            out.print(fila.getId()+"'>Eliminar</a></TR></TD>");
            
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
