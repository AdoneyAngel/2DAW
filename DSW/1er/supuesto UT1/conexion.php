<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Conexion</title>
</head>
<body>
    <?php 
    
    $cadenaConexion = 'mysql:dbname=Adoney_Tejera_DB_Desarrollo;host=localhost;port=3306';
    $usuario = 'phpmyadmin';
    $clave = '1234';
    try {
        $bd = new PDO($cadenaConexion, $usuario, $clave);
        $sql = 'SELECT * FROM Alumno';
        $alumnos = $bd->query($sql);

        $result = $alumnos->fetchAll(PDO::FETCH_ASSOC);

        foreach($result as $user) {
            echo "</br>";
            
            echo "[Id:".$user['ID']."] [Nombre:";
            echo $user['Nombre']."] [Apellidos:";
            echo $user['Apellidos']."] [Email:";
            echo $user['Email']."] [Token:";
            echo $user['Token']."] [Estado:";
            echo $user['Estado']."]";
        }


    } catch (PDOException $e) {
        echo 'Error con la base de datos: ' . $e->getMessage();
    }

    ?>
</body>
</html>