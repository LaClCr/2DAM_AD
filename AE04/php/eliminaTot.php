<?php

// Aquest script fa un TRUNCATE de la taula 'personatges' de la bd.

$servidor = "localhost";
$usuario = "root";
$password = "";
$dbname = "hogwarts";

$conexion = mysqli_connect($servidor, $usuario, $password, $dbname);

if (!$conexion) {
    echo json_encode(["error" => "Error en la conexión a MySQL: " . mysqli_connect_error()]);
    exit();
}

$sql = "TRUNCATE TABLE personatges";
// S'eliminen totes les entrades de la taula 'personatges'

if (mysqli_query($conexion, $sql)) {
    echo json_encode(["mensaje" => "Tabla 'personatges' truncada correctament."]);
} else {
    echo json_encode(["error" => "Error al truncar la tabla 'personatges': " . mysqli_error($conexion)]);
}

mysqli_close($conexion);
?>
