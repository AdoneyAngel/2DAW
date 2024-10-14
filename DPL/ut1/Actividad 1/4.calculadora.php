<!DOCTYPE html> 
<html> 
<head><title>CALCULADORA</title></head> 
 <body bgcolor=#22C33> 
         <br>
         <form method="post" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>">
Número 1: <input type="number" name="numero1" value="0">
Número 2: <input type="number" name="numero2" value="0"> 
         <br>
         <br>Operación:<br>
         <input type="radio" name="operacion" value="suma" checked>suma<br>
         <input type="radio" name="operacion" value="resta">resta<br>
         <br>
         <input type="submit" name="submit" value="CALCULAR">
         </form>
         <hr>

         <?php 
                    if($_SERVER['REQUEST_METHOD']=="POST"){
                          //Lee los valores introducidos en el formulario
                          $numero1=$_POST['numero1'];
                          $numero2=$_POST['numero2'];
                          $operacion=$_POST['operacion'];
 
                          //Realiza el calculo solicitado
                          $resultado=0;
                          $operador="";

                          if ($operacion=="suma"){
                               $resultado=$numero1+$numero2;
                               $operador="+";
                               }
                          if ($operacion=="resta"){
                               $resultado=$numero1-$numero2;
                               $operador="-";
                               }
                          //Escribe el resultado en el documento html
                          echo "<br>";
                          echo "Resultado : ";
                          echo $numero1 . " " . $operador . " " . $numero2 . " " . "=" . $resultado; 
                      }
       ?>
</body>
</html>
