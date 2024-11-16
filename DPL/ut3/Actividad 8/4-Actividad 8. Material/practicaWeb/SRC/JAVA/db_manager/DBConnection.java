package db_manager;

import java.sql.Connection;
import java.sql.DriverManager;


public class DBConnection {
	private static final String JDBC_DRIVER_CLASS = "com.mysql.jdbc.Driver";
	private static final String JDBC_CONN_STRING = "jdbc:mysql://localhost/practica_rst";
	private static final String JDBC_USER = "root";
	private static final String JDBC_PASSWD = "root";
	protected Connection con = null;

        /**
	 * Constructor  <br>
	 */
	protected DBConnection() {

	}
	/**
	 * El método devuelve la conexión a la BD MySQL. <br>
	 *
         */
	public Connection getConnection() {
		try {
			if (con != null && !con.isClosed())
				return con;
			else {
                                Class.forName(JDBC_DRIVER_CLASS);
        			con = DriverManager.getConnection(
						JDBC_CONN_STRING,
                                                JDBC_USER,
						JDBC_PASSWD);

				return con;
                            
			}
		} catch (Exception e) {
			System.out.println("Error en la conexion: " + e);
			con = null;
			return null;
		}

	}
        
}
