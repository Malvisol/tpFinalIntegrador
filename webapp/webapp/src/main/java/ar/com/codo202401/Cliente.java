package ar.com.codo202401;

import java.sql.Date;

public class Cliente {

    private String nombre;
    private String apellido;
    private String email;
    private String contrasenia;
    private Date fecha_de_nacimiento;
    private String pais;

    public  Cliente(String nombre, String apellido, String email, String contrasenia, Date fecha_de_nacimiento, String pais){
        this.nombre=nombre;
        this.apellido=apellido;
        this.email=email;
        this.contrasenia=contrasenia;
        this.fecha_de_nacimiento=fecha_de_nacimiento;
        this.pais=pais;
    }

}
