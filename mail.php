<?php
    $header  = "MIME-Version: 1.0\r\n"; 
    $header .= "Content-Type: text/html; charset=utf-8\r\n";
    $header .= "From: \"LPEX Landing\" <landing@lpex.ru>";

    $message = '';
    $mymail  = 'formspb@lumolink.co';
    //$mymail  = 'tomaren3@gmail.com';

    foreach ($_POST as $key => $val) {
        $_POST[$key] = htmlspecialchars($val);
    }

    $title = 'Заполнена форма на посадочной странице lpex. '.$_POST['subject'];
//     $message = '<p>Телефон: '.$_POST['phone'].'</p>';

    if($_POST['subject'] == 'callback'){
        $message = '<p>Телефон: '.$_POST['phone'].'</p>';
    }
    
    if($_POST['subject'] == 'online-request'){
        $message = '<p>Имя: '.$_POST['name'].'</p>';
        $message .= '<p>Почта: '.$_POST['email'].'</p>';
        $message .= '<p>Телефон: '.$_POST['phone'].'</p>';
    }
    
    if($_POST['subject'] == 'qwiz'){
        $message = '<p>Количество человек: '.$_POST['peoples'].'</p>';
        $message .= '<p>Город: '.$_POST['city'].'</p>';
        $message .= '<p>Тип аттестации: '.$_POST['attestat'].'</p>';
        $message .= '<p>Даты: '.$_POST['dates'].'</p>';
        $message .= '<p>Метод контроля: '.$_POST['methods_list'].'</p>';
        $message .= '<p>Объект контроля: '.$_POST['objects_list'].'</p>';
        $message .= '<p>Имя: '.$_POST['name'].'</p>';
        $message .= '<p>Почта: '.$_POST['email'].'</p>';
        $message .= '<p>Телефон: '.$_POST['phone'].'</p>';
    }
    
    if($_POST['subject'] == 'online-contract'){
        $message = '<p>Тип услуги: '.$_POST['service'].'</p>';
        $message .= '<p>ИНН: '.$_POST['inn'].'</p>';
        $message .= '<p>Почта: '.$_POST['email'].'</p>';
    }
    
    if($_POST['subject'] == 'questions'){
        $message = '<p>Имя: '.$_POST['name'].'</p>';
        $message .= '<p>Почта: '.$_POST['email'].'</p>';
        $message .= '<p>Телефон: '.$_POST['phone'].'</p>';
    }

    /*
    $message .= '<p>Телефон: '.$_POST['phone'].'</p>';
    $message .= '<p>Имя: '.$_POST['name'].'</p>';
    $message .= '<p>Почта: '.$_POST['email'].'</p>';
    $message .= '<p>Инн: '.$_POST['inn'].'</p>';
    $message .= '<p>Количество человек: '.$_POST['peoples'].'</p>';
    $message .= '<p>Город: '.$_POST['city'].'</p>';
    $message .= '<p>Аттестат: '.$_POST['attestat'].'</p>';
    $message .= '<p>Даты: '.$_POST['dates'].'</p>';
    $message .= '<p>Методы: '.$_POST['methods'].'</p>';
    $message .= '<p>Объекты: '.$_POST['objects'].'</p>';
    */

    mail($mymail, $title, $message, $header);
?>
