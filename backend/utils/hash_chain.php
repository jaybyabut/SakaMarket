<?php
    function generateHash($data, $prevHash = '') {
        ksort($data); // Sort array by key to ensure consistent order
        return hash('sha256', $prevHash . json_encode($data));
    }
?>