

<?php

$method = $_SERVER['REQUEST_METHOD'];

//Script Foreach
$c = true;
$project_name = "Iscelenie";
$admin_email  = trim('mail@galamtor.pro');
$form_subject = 'Новая заявка с сайта Iscelenie';
if ( $method === 'POST' ) {
    foreach ( $_POST as $key => $value ) {
        if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {
            $message .= "
			" . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
				<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
				<td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
			</tr>
			";
            $telegram .= $key . ' : ' . $value . "\n";
        }
    }
} else if ( $method === 'GET' ) {


    foreach ( $_GET as $key => $value ) {
        if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {
            $message .= "
			" . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
				<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
				<td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
			</tr>
			";
            $telegram .= $key . ' : ' . $value . "\n";
        }
    }
}

$message = "<table style='width: 100%;'>$message</table>";

function adopt($text) {
    return '=?UTF-8?B?'.Base64_encode($text).'?=';
}

$headers = "MIME-Version: 1.0" . PHP_EOL .
    "Content-Type: text/html; charset=utf-8" . PHP_EOL .
    'From: '.adopt($project_name).' <'.$admin_email.'>' . PHP_EOL .
    'Reply-To: '.$admin_email.'' . PHP_EOL;

mail($admin_email, adopt($form_subject), $message, $headers );


function sendMessage($chatID, $messaggio, $token) {

    $url = "https://api.telegram.org/bot" . $token . "/sendMessage?chat_id=" . $chatID;
    $url = $url . "&text=" . urlencode($messaggio);
    $ch = curl_init();
    $optArray = array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true
    );
    curl_setopt_array($ch, $optArray);
    $result = curl_exec($ch);
    curl_close($ch);
    return $result;
}


$token = "1909873839:AAHgTlIa2SAmVlgRmBpvL7m1YxEerVhSA3U";
$chatid = "-1001814921764";
sendMessage($chatid, $telegram, $token);
?>