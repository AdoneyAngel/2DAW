package db_manager;

import db_manager.Estudiantes;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.sql.Connection;
import java.sql.Timestamp;
import java.util.Date;

public class DBEstudiantes {
	protected DBConnection dbconn;
        protected Connection MiConexion;
	/**
	 * Constructor . <br>
	 */
	public DBEstudiantes() {
		dbconn = new DBConnection();
                MiConexion = dbconn.getConnection();
	}


	/**
	 * Añadir regitro a la tabla <br>
	 * @param nombre, apellidos,email,idprob,idpract
	 * 			
	 * @return <code>true</code> - operation successfull, <code>false</code> - error
	 */
	public boolean insertar_Estudiantes(String dni, String nombre, String apellidos, String email, int idprob, int idpract) {
		boolean res = false;
		PreparedStatement stmt = null; //stmt==objeto para crear sentencia SQL.
                Date fecha = new Date();
                Timestamp stamp = new Timestamp (fecha.getTime());
		try {
                       /* "INSERT" = Añade nueva fila de datos a la base de datos.
                        * "INSERT INTO nombre_tabla (campo1,campo2...) VALUES ('valor1','valor2'...)"
                        * Ej.
                        * "INSERT INTO articulos (id,titulo,autor,precio) VALUES(‘1’,‘Historia’,‘Matías‘,’7.50’)"
                        */
                        stmt=MiConexion.prepareStatement("INSERT INTO estudiantes_t (nombre, apellidos, email, idprob, idpract, fecha, dni) VALUES (?,?,?,?,?,?,?)");
                        stmt.setString(1, nombre);
                        stmt.setString(2, apellidos);
                        stmt.setString(3, email);
                        stmt.setInt(4, idprob);
                        stmt.setInt(5, idpract);
                        stmt.setTimestamp(6, stamp);
                        stmt.setString(7, dni);
                        stmt.executeUpdate(); // Escribimos los datos del nuevo estudiante en la tabla estudiantes_t.
                        res=true;

                } catch (SQLException e) {
			System.out.println("insertar_Estudiantes exception: "+e.getMessage());
		
		} finally {
			if(stmt != null)
				try {
					stmt.close();
				} catch (SQLException e) {
					System.out.println("insertar_Estudiantes exception: "+e.getMessage());
				}
		}

		return res;
	}

	/**
	 * Eliminar regitro de la tabla <br>
	 * @param id
	 * 			id del registro
         *
	 * @return <code>true</code> - operation successfull, <code>false</code> - error
	 */
	public boolean borrar_Estudiantes(int id) {
		boolean res = false;
		PreparedStatement stmt = null;
		try {
			/* "DELETE"=Suprime filas de datos de la base de datos.
                         * "DELETE FROM nombre_tabla WHERE condiciones_de_selección"
                         * Ej.Eliminar el registro con id= 4 de la tabla articulos
                         * "DELETE FROM articulos WHERE id=4"
                         */	
                        stmt=MiConexion.prepareStatement("DELETE FROM estudiantes_t WHERE id=?");  //Añadir sentecia SQL para eliminar
                        // Añadir el valor del parámetro ID
			stmt.setInt(1, id);			
                        stmt.executeUpdate();
                        res=true;


		} catch (SQLException e) {
			System.out.println("borrar_Estudiantes exception: "+e.getMessage());
		
		} finally {
			if(stmt != null)
				try {
					stmt.close();
				} catch (SQLException e) {
					System.out.println("borrar_Estudiantes exception: "+e.getMessage());
				} 
		}

		return res;
	}


	/**
	 * Actualizar regitro de la tabla <br>
	 * @param id, nombre, apellidos,email,idprob,idpract
	 * 		         *
	 * @return <code>true</code> - operation successfull, <code>false</code> - error
	 */
	public  boolean actualizar_Estudiantes(int id, String dni, String nombre, String apellidos, String email, int idprob, int idpract) {
		boolean res = false;
		PreparedStatement stmt = null;
                Date fecha = new Date();
                Timestamp stamp = new Timestamp (fecha.getTime());
		try {
			/* "UPDATE" = Modifica datos existentes en la base de datos.
                         * "UPDATE nombre_tabla SET nombre_campo1 = valor_campo1,nombre_campo2 = valor_campo2,… 
                         * WHERE condiciones_de_selección"
                         * Ej. Actualizar el campo autor del registro con id = 5.
                         * "UPDATE articulos SET autor=‘PEPE’ WHERE id=5"
                         */
                        stmt=MiConexion.prepareStatement("UPDATE estudiantes_t SET dni=?, nombre=?, apellidos=?, email=?, idprob=?, idpract=?, fecha=? WHERE id=?");  // //Añadir sentecia SQL para actualizar
                        // Añadir los valores de 8 parámetros a la consulta actualizar
                        
                        stmt.setString(1, dni);
                        stmt.setString(2, nombre);
                        stmt.setString(3, apellidos);
                        stmt.setString(4, email);
                        stmt.setInt(5, idprob);
                        stmt.setInt(6, idpract);
                        stmt.setTimestamp(7, stamp);
                        stmt.setInt(8, id);
						
                        stmt.executeUpdate();
                        res=true;

		} catch (SQLException e) {
			System.out.println("actualizar_Estudiantes exception: "+e.getMessage());
		} finally {
			if(stmt != null)
				try {
					stmt.close();
				} catch (SQLException e) {
					System.out.println("actualizar_Estudiantes exception: "+e.getMessage());
				} 
		}

		return res;
	}



	/**
	 * Consultar la tabla <br>

	 */
	public  ArrayList<Estudiantes> consultar_Estudiantes() {
            
		ArrayList<Estudiantes> array = new ArrayList<Estudiantes>();
		PreparedStatement stmt = null;
		ResultSet rs = null;
		try {
                    /* "SELECT" = Recupera datos de la base de datos.
                     * "SELECT campos FROM nombre_tabla [WHERE condiciones_de_selección] [ORDER BY campos]"
                     * Ejs.
                     * Consultar todos los campos de la tabla articulos: "SELECT * FROM articulos"
                     * Consultar los campos titulo y autor: "SELECT titulo, autor FROM articulos"
                     * Consultar los campos titulo y autor con id = 3: "SELECT titulo, autor FROM articulos WHERE id=3"
                     * Consultar los campos titulo y autor ordenados por autor: "SELECT titulo, autor FROM articulos ORDER BY autor"
                     * 
                     * CONSULTAR VARIAS TABLAS A LA VEZ
                     * "SELECT campos FROM tabla1 INNERJOIN tabla2 ON tabla1.campo1 relacion tabla2.campo2 
                     * [WHERE condiciones_de_selección][ORDERBY campos]"
                     * campo 1, campo2 = Son los nombres de los campos que relacionan las tablas. Deben ser del mismo tipo.
                     * relacion = Cualquier operador de comparación relacional: =, <,<>, <=, =>, ó >
                     * Ej.
                     * "SELECT facturas.*, clientes.nombre, clientes.apellidos FROM facturas 
                     * INNERJOIN clientes ON facturas.codigo_cliente=clientes.codigo_cliente WHERE clientes.codigo_cliente=10"
                     */
                        stmt=MiConexion.prepareStatement("SELECT estudiantes_t.*,grupo_practicas_t.grupo as grupo_pract,grupo_problemas_t.grupo as grupo_prob From estudiantes_t Inner Join grupo_practicas_t ON grupo_practicas_t.id = estudiantes_t.idpract Inner Join grupo_problemas_t ON grupo_problemas_t.id = estudiantes_t.idprob");
                        rs=stmt.executeQuery();
                        while (rs.next()) {//Utilizar metodo add de la clase ArrayList
                            array.add(new Estudiantes(rs.getInt("id"), rs.getInt("idprob"),rs.getInt("idpract"),rs.getString("dni"),rs.getString("nombre"), rs.getString("apellidos"), rs.getString("email"), rs.getString("grupo_prob"), rs.getString("grupo_pract")));
                        }


		} catch (SQLException e) {
			System.out.println("consultar_Estudiantes exception" + e.getMessage());
		} 
		finally {
			if(stmt != null)
				try {
					stmt.close();
				} catch (SQLException e) {
					System.out.println("consultar_Estudiantes exception" + e.getMessage());
				}
			if(rs != null)
				try {
					rs.close();
				} catch (SQLException e) {
					System.out.println("consultar_Estudiantes exception" + e.getMessage());
				}
		}
		return array;
	}
	

	/**
	 * Cerrar la conexi�n <br>

	 */
	public void closeConexion() {
            try {
                MiConexion.close();
            }
             catch (SQLException e) {
			System.out.println("Close exception: "+e.getMessage());
             }
        }

}
