<?php

// Aquest script fa una inserció a la bd del personatge proporcionat.

if(isset($_POST["nombre"])){ 
    
    //Recollim les dades que ens arriben per POST
    $nombre = $_POST["nombre"]; 
    $genero = $_POST["genero"]; 
    $es_magico = $_POST["es_magico"]; 
    $casa = $_POST["casa"];
    $fecha_nacimiento = $_POST["fecha_nacimiento"];
    $patronus = $_POST["patronus"];
    $actor = $_POST["actor"];
    $imagen_url = $_POST["imagen_url"]; 

    $servidor = "localhost";
    $usuario = "root";
    $password = "";
    $dbname = "hogwarts";

    $conexion = mysqli_connect($servidor, $usuario, $password, $dbname);

    if (!$conexion) {
        echo "Error en la conexión a MySQL: " . mysqli_connect_error();
        exit();
    }

    //Comprovem que el personatge no existeixi ja a la bd

    $sqlComprova = "SELECT * FROM personatges WHERE nom LIKE '$nombre'";

    $resultados = mysqli_query($conexion, $sqlComprova);
    $numRows = mysqli_num_rows($resultados);

    if($numRows > 0){
        echo "Error: El personatje ja existeix.";
    } else {

        //Si no existeix, l'insertem a la bd
        
        $sql = "INSERT INTO personatges (nom, genere, es_magic, casa, data_naixement, patronus, actor, url_imatge) VALUES ('$nombre', '$genero', '$es_magico', '$casa', '$fecha_nacimiento', '$patronus', '$actor', '$imagen_url')";

        if (mysqli_query($conexion, $sql)) {
            echo "Personatje insertat correctament.";
        } else {
            echo "Error: " . $sql . "<br>" . mysqli_error($conexion);
        }
    }   

    mysqli_close($conexion);
}
?>
