/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package db_manager;


/**
 *
 * @author David
 */
public class Estudiantes  {
    
    private Integer id;
    private String nombre;
    private String apellidos;
    private String email;
    private String dni;
    private String fecha;
    private int idprob;
    private int idpract;
    private String grupoprob;
    private String grupopract;

    public Estudiantes() {
    }

    public Estudiantes(Integer id) {
        this.id = id;
    }

    public Estudiantes(Integer id, int idprob, int idpract, String dni, String nombre, String apellidos, String email, String grupoprob, String grupopract) {
        this.id = id;
        this.idprob = idprob;
        this.idpract = idpract;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.dni = dni;
        this.email = email;
        this.grupoprob = grupoprob;
        this.grupopract = grupopract;

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public int getIdprob() {
        return idprob;
    }

    public void setIdprob(int idprob) {
        this.idprob = idprob;
    }

    public int getIdpract() {
        return idpract;
    }

    public void setIdpract(int idpract) {
        this.idpract = idpract;
    }

    public String getGrupoprob() {
        return grupoprob;
    }

    public void setGrupoprob(String grupoprob) {
        this.grupoprob = grupoprob;
    }

    public String getGrupopract() {
        return grupopract;
    }

    public void setGrupopract(String grupopract) {
        this.grupopract = grupopract;
    }

    
}
