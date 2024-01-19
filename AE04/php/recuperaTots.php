<?php
// Aquest script fa una petició a la bd per recuperar tots els personatges i els retorna en format JSON.

$servidor = "localhost";
$usuario = "root";
$password = "";
$dbname = "hogwarts";

$conexion = mysqli_connect($servidor, $usuario, $password, $dbname);

if (!$conexion) {
    echo json_encode(["error" => "Error en la conexión a MySQL: " . mysqli_connect_error()]);
    exit();
}

$sql = "SELECT * FROM personatges";
$resultados = mysqli_query($conexion, $sql);

if ($resultados) {
    $personajes = [];

    while ($fila = mysqli_fetch_assoc($resultados)) {
        //Afegim la fila a l'array de personatges
        $personajes[] = $fila;
    }

    echo json_encode(["personajes" => $personajes]);
} else {
    echo json_encode(["error" => "Error: " . $sql . "<br>" . mysqli_error($conexion)]);
}

mysqli_close($conexion);
?>
