/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package db_manager;


/**
 *
 * @author David
 */
public class GrupoProblemas  {
    private Integer id;
    private String grupo;

    public GrupoProblemas() {
    }

    public GrupoProblemas(Integer id, String grupo) {
        this.id = id;
        this.grupo = grupo;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getGrupo() {
        return grupo;
    }

    public void setGrupo(String grupo) {
        this.grupo = grupo;
    }

    
}
