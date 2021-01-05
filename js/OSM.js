// 路線規劃
// https://ithelp.ithome.com.tw/articles/10237145

// Leaflet 路線規劃
// http://www.liedman.net/leaflet-routing-machine/

$(function () {

/* showPostion函式: 用來去抓取當前位置 */
function showPosition(position) {
  enableHighAccuracy: true;
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  map.setView([latitude, longitude], 14);

  const blueMarker = L.icon.pulse({ iconSize: [20, 20], color: '#2e72f0', fillColor: '#2e72f0' })
  // 設定所在位置的icon
  const selfPos = L.marker([position.coords.latitude, position.coords.longitude], { icon: blueMarker }).bindPopup('目前位置')
  map.addLayer(selfPos)
  const goBackPosition = document.querySelector('.js-goBackPosition')
  goBackPosition.addEventListener('click', () => {
    map.setView([position.coords.latitude, position.coords.longitude], 17)
  })
}

  /* ---- HTML5 ---- */
  // showError(error): 當地圖讀取不到當前位置時，會直接指定到 position的座標位置
  function showError(error) {
    var position = {
      coords: {
        latitude: '22.620894',
        longitude: '120.311859'
      },
      // zoom: 7
    }
    switch (error.code) {
      // 使用者拒絕開啟當前定位位置
      case error.PERMISSION_DENIED:
        alert('讀取不到您目前的位置')
        showPosition(position)
        break
      // 該定位位置讀取不到
      case error.POSITION_UNAVAILABLE:
        alert('讀取不到您目前的位置')
        showPosition(position)
        break
      // 讀取定位位置時間太長
      case error.TIMEOUT:
        alert('讀取位置逾時')
        showPosition(position)
        break
      // 未知的錯誤
      case error.UNKNOWN_ERROR:
        alert('Error')
        showPosition(position)
        break
    }
  }

  // Geolocation.getCurrentPosition(參數1, 參數2, 參數3) 方法用來獲取設備當前的位置。
  // 參數1 - success: 一個回傳函式(callback function) 會被傳入一個Position 的物件。
  // 參數2 - error: 一個選擇性的錯誤回傳函式(callback function)，會被傳入一個 PositionError 的物件。
  // 參數3 - options: 一個選擇性的 PositionOptions 的物件。
  navigator.geolocation.getCurrentPosition(showPosition, showError, {
    enableHighAccuracy: true,
    maximumAge: 5000,
    timeout: 3000
  });

  // 建立 map容器(空間)，之後可以加入 '底圖'、'圖層'、'物件(icon)'
  window.map = new L.Map('map');


  // 設立marker icon
  // -----------------------------------
  // 【參數說明】
  // iconUrl: icon的路徑(必要參數)。
  // iconSize: icon圖片大小(單位-pixel)。
  // iconAnchor: icon尖端的座標(預設為 Null)。
  // PopupAnchor: popup出現的座標點相對於iconAnchor的座標 (預設 [0, 0] )
  // shadowUrl: 製作陰影圖片的路徑(預設為 Null)。
  // shadowSize: 陰影圖片的大小，單位為pixel(預設 Null)。
  var greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41, 41]
  })
  var orangeIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41, 41]
  })
  var greyIcon = new L.Icon({
    iconUrl: 'pics/marker_Monitor.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: '',
    shadowSize: [41, 41]
  })

  // 拿來 show地圖的函式，內容包含地圖的圖層
  function show_Map(){
      // 地圖匯出(底圖)； tileLayer: 以圖磚的方式存取圖層，當網路或是電腦跑比較慢的時候就可以看出一塊一塊的圖片在讀取中。
      // 如果想換樣式-> 連結 : http://leaflet-extras.github.io/leaflet-providers/preview/index.html
      // {s} tile 連結的subdomain，預設為a, b或c其中一個
      // {z} 地圖的zoom等級
      // {y} 圖磚的y座標
      // {x} 圖磚的x座標
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 14, // 預設為14，限制縮放大小；最大限制到 19，最小到 0
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        // 讀取地圖失敗時，會顯現後面連結的圖片
        errorTileUrl: 'http://bpic.588ku.com/element_pic/16/12/07/706f7ff4f15725b17ba1d30d384e6468.jpg'
      }).addTo(map);
    }

  // 呼叫 show_Map函式來將地圖呈現
  show_Map();

  // 設立變數
  var circle;

  // 預設的點選內容
  var click_info = '全部';

  // 使用 MarkerClusterGroup 將各個地點群組化
  var markers = new L.MarkerClusterGroup().addTo(map);

  // 定義一個點點的群組。
  var myGroup = L.layerGroup();

// 透過按鈕來點擊執行 Ajax
$("button#js-searchBtn").click(function(){
  // 定義一個變數來取得下拉選單的值
  var click_info = $("#js-maskTypeOpt").val();

  // 用一個陣列來去紀錄我們抓取到點點，在ajax中會用到
  var layers = [];

  // 彈跳框顯示
  alert('您現在搜尋的分類為：' + click_info);

  // 將先前一次的點點群組們(myGroup)給 remove掉
  map.removeLayer(myGroup);

// Ajax開始
    $.ajax({
      url: "OSM.php",
      data: {
        action: 'getdata', //(action)使用 php的function需post資料過去php作判別要使用哪個function
        select_info: click_info  // 為點擊的值，將資料 post到 OSM.php中
      },
      type: "post",
      dataType: "json",

      // 當成功從 php回傳 json結果(result)的話
      success: function (result) {
        // console.log(result);

        // 透過迴圈一一將 result的資料融入到各個變數中
        for (var i = 0; i < result['markerPoint'].length; i++) {
          var info_SignName = result['sign'][i]['sign_name'];
          var info_Address = result['sign'][i]['sign_address'];
          var info_Date = result['sign'][i]['sign_date'];
          var info_Time = result['sign'][i]['sign_time'];
          var info_Department = result['sign'][i]['sign_department'];

          // 緯度
          var info_Latitude = result['markerPoint'][i]['latitude'];

          // 經度
          var info_Longitude = result['markerPoint'][i]['longitude'];

          // 透過 Switch來分類種類
          switch (result['sign'][i]['category']) {
            case "強盜地點":
              // Circle物件設定 BindPopup且一些屬性透過 addTo到 map中
                circle = L.circle([info_Latitude, info_Longitude], {
                color: 'blue',
                fillColor: '#0033ff',
                fillOpacity: 0.5,
                radius: 500
              })
                .bindPopup(
                  '<h1>' + info_SignName + '</h1>' +
                  '<h2>' + info_Address + '</h2>' +
                  '<h3>日期：' + info_Date + '</h3>' +
                  '<h3>時間：' + info_Time + '</h3>').addTo(map)
              break;

            case "警察局地點":
              // markers群組 addLayer 物件marker設定BindPopup且一些屬性透過 addTo到 map中
              markers.addLayer(L.marker([info_Latitude, info_Longitude], {
                icon: greenIcon
              })
                .bindPopup(
                  '<h1>' + info_SignName + '</h1>' +
                  '<h2>部門:' + info_Department + '</h2>' +
                  '<h2>' + info_Address + '</h2>' +
                  '<h3>經度：' + info_Longitude + '</h3>' +
                  '<h3>緯度：' + info_Latitude + '</h3>')).addTo(map)
              break;

            case "搶奪地點":
                circle = L.circle([info_Latitude, info_Longitude], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 500
              })
                .bindPopup(
                  '<h1>' + info_SignName + '</h1>' +
                  '<h2>' + info_Address + '</h2>' +
                  '<h3>日期：' + info_Date + '</h3>' +
                  '<h3>時間：' + info_Time + '</h3>').addTo(map)
              break;
            case "監視器地點":
              markers.addLayer(L.marker([info_Latitude, info_Longitude], {
                icon: greyIcon
              })
                .bindPopup(
                  '<h1>編號:' + info_SignName + '</h1>' +
                  '<h2>部門:' + info_Department + '</h2>' +
                  '<h2>地址:' + info_Address + '</h2>' +
                  '<h3>經度：' + info_Longitude + '</h3>' +
                  '<h3>緯度：' + info_Latitude + '</h3>')).addTo(map)
              break;
          }

          // 透過在上面寫的陣列 layers將資料一筆一筆
          layers.push(circle);
        }

        // console.log(layers);

        // 這是點點(marker)，將上述迴圈得到的markers匯入到 map中
        map.addLayer(markers);

        /* 這是圈圈(circle)  */
        // 清除點點:  https://www.itdaan.com/tw/614c2c2833be1b670c40fc0507e531a2
        myGroup = L.layerGroup(layers);
        map.addLayer(myGroup);

      },
      // 當Ajax請求失敗
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest);
        console.log(textStatus);
        console.log(errorThrown);
      }

    });
});




});