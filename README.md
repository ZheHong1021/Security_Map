# Security_Map

### 【要下載檔案的話】
#### Code ➡ Download Zip 
---

## 【檔案說明】
### 【根目錄】
* main.php
為前端介面，連接著各個 CDN以及我們自己寫的 CSS/JavaScript。

* OSM.php
為後端資料庫設定，當中透過 js/OSM.js的Ajax，Post值到OSM.php中，在從資料庫將資料給撈出來，最後透過json_encode把資料以Json形式回傳給前端

### 【Pics】
為圖片資料夾，放置一些 icon的圖片

<br>
###【CSS】
* L.icon.Pulse.css
為顯示目前位置icon的外匯插件

* map.css
為我們自己寫的 CSS內容
<br>

### 【js】
* L.icon.Pulse.js
同上，為顯示目前位置icon的外匯插件
* OSM.js
包含Ajax、按鈕事件、地圖顯現。
