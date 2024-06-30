<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if (isset($_POST['enviar'])) {
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];
    $ayuda = $_POST['ayuda'];

    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp-mail.outlook.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'codelinksupiicsa@outlook.com';
        $mail->Password = 'Ajrh971224<3';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('codelinksupiicsa@outlook.com', 'CODE-LINKS');
        $mail->addAddress('ajrh.dev@gmail.com', 'Admin');
        $mail->Subject = 'Nuevo mensaje desde el formulario de contacto';

        $mail->isHTML(true);
        $mail->Body = "
            <p><strong>Nombre:</strong> $nombre</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Teléfono:</strong> $telefono</p>
            <p><strong>Mensaje:</strong> $ayuda</p>
        ";

        $mail->send();
        echo "<script>alert('El mensaje se envió correctamente.');</script>";
    } catch (Exception $e) {
        echo "<script>alert('Error al enviar el mensaje: {$mail->ErrorInfo}');</script>";
    }
} else {
    echo "<script>alert('No se pudo enviar el mensaje. Por favor, intenta nuevamente más tarde.');</script>";
}
