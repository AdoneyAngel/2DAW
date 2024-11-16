package db_manager;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.sql.Connection;


public class DBGrupoPracticas {
	protected DBConnection dbconn;
        protected Connection MiConexion;
	/**
	 * Constructor . <br>
	 */
	public DBGrupoPracticas() {
		dbconn = new DBConnection();
                MiConexion = dbconn.getConnection();
                
	}


	/**
	 * Añadir regitro a la tabla <br>
	 * @param nombre
	 * 			grupo de practicas
	 * @return <code>true</code> - operation successfull, <code>false</code> - error
	 */
	public boolean insertar_GrupoPracticas(String nombre) {
		boolean res = false;
		PreparedStatement stmt = null;

		try {
                       /* "INSERT" = Añade nueva fila de datos a la base de datos.
                        * "INSERT INTO nombre_tabla (campo1,campo2...) VALUES ('valor1','valor2'...)"
                        * Ej.
                        * "INSERT INTO articulos (id,titulo,autor,precio) VALUES(‘1’,‘Historia’,‘Matías‘,’7.50’)"
                        */
                        stmt=MiConexion.prepareStatement("INSERT INTO grupo_practicas_t (Grupo) VALUES (?)"); //Añadir sentecia SQL para insertar
                        stmt.setString(1, nombre);
                        stmt.executeUpdate();
                        res=true;
		} catch (SQLException e) {
			System.out.println("insertar_GrupoPracticas exception: "+e.getMessage());
		
		} finally {
			if(stmt != null)
				try {
					stmt.close();
				} catch (SQLException e) {
					System.out.println("insertar_GrupoPracticas exception: "+e.getMessage());
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
	public boolean borrar_GrupoPracticas(int id) {
		boolean res = false;
		PreparedStatement stmt = null;
		try {
			/* "DELETE"=Suprime filas de datos de la base de datos.
                         * "DELETE FROM nombre_tabla WHERE condiciones_de_selección"
                         * Ej.Eliminar el registro con id= 4 de la tabla articulos
                         * "DELETE FROM articulos WHERE id=4"
                         */	
                        stmt=MiConexion.prepareStatement("DELETE FROM grupo_practicas_t WHERE id=?"); //Añadir sentecia SQL para borrar
                        stmt.setInt(1, id);
                        stmt.executeUpdate();
                        res=true;

		} catch (SQLException e) {
			System.out.println("borrar_GrupoPracticas exception: "+e.getMessage());
		
		} finally {
			if(stmt != null)
				try {
					stmt.close();
				} catch (SQLException e) {
					System.out.println("borrar_GrupoPracticas exception: "+e.getMessage());
				} 
		}

		return res;
	}


	/**
	 * Actualizar regitro de la tabla <br>
	 * @param id
	 * 			id del registro
   	 * @param nombre
	 * 			nombre del registro
         *
	 * @return <code>true</code> - operation successfull, <code>false</code> - error
	 */
	public  boolean actualizar_GrupoPracticas(int id, String nombre) {
		boolean res = false;
		PreparedStatement stmt = null;
		try {
			/* "UPDATE" = Modifica datos existentes en la base de datos.
                         * "UPDATE nombre_tabla SET nombre_campo1 = valor_campo1,nombre_campo2 = valor_campo2,… 
                         * WHERE condiciones_de_selección"
                         * Ej. Actualizar el campo autor del registro con id = 5.
                         * "UPDATE articulos SET autor=‘PEPE’ WHERE id=5"
                         */
                        stmt=MiConexion.prepareStatement("UPDATE grupo_practicas_t SET grupo=? WHERE id=?"); //Añadir sentecia SQL para actualizar
                        stmt.setString(1, nombre);
                        stmt.setInt(2, id);
                        stmt.executeUpdate();
                        res=true;
		} catch (SQLException e) {
			System.out.println("actualizar_GrupoPracticas exception: "+e.getMessage());
		} finally {
			if(stmt != null)
				try {
					stmt.close();
				} catch (SQLException e) {
					System.out.println("actualizar_GrupoPracticas exception: "+e.getMessage());
				} 
		}

		return res;
	}



	/**
	 * Consultar la tabla <br>
         * Recupera datos de la base de datos.
	 */
	public  ArrayList<GrupoPracticas> consultar_GrupoPracticas() {
            
            
		ArrayList<GrupoPracticas> array = new ArrayList<GrupoPracticas>();
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
                        stmt=MiConexion.prepareStatement("SELECT * FROM grupo_practicas_t ORDER BY Grupo"); //Añadir sentecia SQL para consultar
                        rs=stmt.executeQuery();
                        while (rs.next()) { //Utilizamos metodo add de la clase ArrayList
                            array.add(new GrupoPracticas(rs.getInt("id"), rs.getString("grupo")));
                        }

		} catch (SQLException e) {
			System.out.println("consultar_GrupoPracticas exception" + e.getMessage());
		} 
		finally {
			if(stmt != null)
				try {
					stmt.close();
				} catch (SQLException e) {
					System.out.println("consultar_GrupoPracticas exception" + e.getMessage());
				}
			if(rs != null)
				try {
					rs.close();
				} catch (SQLException e) {
					System.out.println("consultar_GrupoPracticas exception" + e.getMessage());
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
