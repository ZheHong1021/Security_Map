<!--程式碼範例-->
<html>

<head>
  <!-- 網頁編碼為萬國碼 UTF-8  	【也可以簡寫成這樣】<meta charset="UTF-8"> -->
  <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />

  <!-- 網頁相容性 -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  <!-- RWD響應式 -->
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- 網頁標題 -->
  <title>台北市治安</title>

  <!-- 網頁的title_icon -->
  <link rel="shortcut icon" type="text/css" href="pics/marker_O.png">

  <!-- Leaflet官網的 CDN -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin="" />

  <!-- MarkerCluster Plugin CSS CDN-->
  <!-- 使用方法: https://ithelp.ithome.com.tw/articles/10229982 -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.4.1/MarkerCluster.css">
  </link>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.4.1/MarkerCluster.Default.css">
  </link>

  <!-- 用來顯示當前位置的icon -->
  <!-- 來源： https://github.com/mapshakers/leaflet-icon-pulse -->
  <link rel="stylesheet" href="css/L.Icon.Pulse.css">

  <!-- Custom CSS -->
  <link rel="stylesheet" href="css/map.css">

  <!-- Jquery CDN: 沒有這行就不能執行 javascript的指令 -->
  <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>

  <!-- Font Awesome CDN: 一次載入所有的圖示 (建議放在<head></head>中) -->
  <!-- 使用方法連結： https://pjchender.blogspot.com/2017/12/5-fontawesome-5.html -->
  <script defer src="https://use.fontawesome.com/releases/v5.0.0/js/all.js"></script>

</head>


<body style="margin:0px;">

  <!-- 搜尋區 -->
  <div class="Sidebar"">
    <div class=" input-city-div">
    <label class="input-city-label" for=" exampleInputPassword1">搜尋位置</label><br>
    <input type="text" class="form-control" id="js-searchBlock" placeholder="請輸入所在縣市、鄉鎮"><br>
  </div>
  <div class=" select-category-div">
    <label class="select-category-label" for="exampleFormControlSelect1">犯罪類別</label><br>
    <select class="form-control Sidebar" id="js-maskTypeOpt">
      <option>全部</option>
      <option>強盜</option>
      <option>搶奪</option>
    </select>
  </div>

  <button class="btn-primary btn-search" id="js-searchBtn">搜尋</button>
  </div>

  <!-- 地圖展示區 -->
  <div class="Map-container">
    <div id="map"></div>
    <a class="goBackPosition js-goBackPosition">
      <i class="fas fa-crosshairs" style="color:rgb(82, 81, 81)"></i>
    </a>
  </div>
  <div class="Footer"> Copyright © 2020 高科大 資訊管理系 E527實驗室 版權所有 | Design by Alex</div>
  </div>

</body>


<!-- Leaflet官網的 CDN -->
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>

<!-- 用來顯示當前位置的icon -->
<!-- 來源： https://github.com/mapshakers/leaflet-icon-pulse -->
<script src="js/L.Icon.Pulse.js"></script>

<!-- MarkerCluster Plugin JavaScript CDN-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.4.1/leaflet.markercluster.js"></script>

<!-- Custom Javascript -->
<script src="js/OSM.js"></script>

</html>