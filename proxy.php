<?php
	$session = curl_init($_GET['url']);                    // Open the Curl session
	curl_setopt($session, CURLOPT_HEADER, false);          // Don't return HTTP headers
	curl_setopt($session, CURLOPT_RETURNTRANSFER, true);   // Do return the contents of the call
	$xml_string = curl_exec($session);                            // Make the call
	header("Access-Control-Allow-Origin: *");                  // Set the content type appropriately
	header("Content-Type: application/json");                  // Set the content type appropriately
	$xml = simplexml_load_string($xml_string);
	echo json_encode($xml);        // Spit out the json
	curl_close($session);
?>