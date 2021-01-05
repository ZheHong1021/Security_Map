<?php

$server = 'localhost';
$dbname = '109p2';
$user = 'root';
$passwd = '123456';

$select_info = isset($_POST['select_info']) ? $_POST['select_info'] : "";


try {
    $conn = new PDO("mysql:host=" . $server . ";dbname=" . $dbname, $user, $passwd);
    $conn->exec("SET CHARACTER SET utf8");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    "Connection failed: " . $e->getMessage();
}

if (isset($_POST['action']) && !empty($_POST['action'])) //判別使用哪個function
{
    $action = $_POST['action'];
    switch ($action) {
        case 'getdata':
            getdata();
            break;
            // ...etc...
    }
}

function getdata()
{
    global $conn;
    global $select_info;
    $position = [];

    if ($select_info == '強盜') {
        $sql = "SELECT * FROM robber";
    } elseif ($select_info == '搶奪') {
        $sql = "SELECT * FROM snatch";
    } else {
        $sql = "SELECT * FROM robber UNION SELECT * FROM police_station UNION SELECT * FROM monitor UNION SELECT * FROM snatch ";
    }

    $stmt = $conn->query($sql);
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);;
    $count = 0;

    // 透過迴圈將資料庫資料都丟入到position陣列中，最後透過json_decode將結果傳回給 js
    foreach ($rows as $key => $value) {
        $position['sign'][$count]['sign_name'] = $value['name'];
        $position['sign'][$count]['sign_address'] = $value['address'];
        $position['sign'][$count]['sign_date'] = $value['date'];
        $position['sign'][$count]['sign_time'] = $value['time'];
        $position['sign'][$count]['sign_department'] = $value['department'];
        $position['sign'][$count]['category'] = $value['category'];
        $position['markerPoint'][$count]['longitude'] = $value['longitude'];
        $position['markerPoint'][$count]['latitude'] = $value['latitude'];

        $count++;
    }

    echo json_encode($position);
}
