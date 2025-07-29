<?php
    function generateHash($data, $prevHash = '') {
    return hash('sha256', $prevHash . json_encode($data));
    }
?>