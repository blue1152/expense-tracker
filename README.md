# 老爸的私房錢

利用 Node.js 跟 Express 建立簡單的伺服器，使用 mongoDB 作為資料庫，並搭配 Bootstrap 打造出簡易的記帳軟體

## 本專案所使用的套件

- express
- express-handlebars
- body-parser
- mongoose
- method-override
- express-session
- passport
- passport-local
- connect-flash
- nodemon

## 如何啟動本專案

### 從伺服器上取得本專案的 Repository

打開終端機，輸入以下指令：

```
$ git clone https://github.com/blue1152/expense-tracker.git
```

### 安裝 Node.js，並透過 npm 來安裝 package.json 檔案所定義的相依套件

1. 在 expense-tracker 目錄下，透過 nvm 來安裝 Node.js 最新版本(10.15.0)：

```
$ nvm install 10.15.0
```

2. 到 package.json 所在的目錄下，輸入：

```
$ npm install
```

### 建立資料庫中的種子資料

打開終端機，在 models/seeds 目錄下，執行 Seeders.js 來建立資料庫中的種子資料：

```
$ nodemon Seeders.js
```

### 透過 nodemon 來啟動伺服器

打開終端機，輸入以下指令，並在瀏覽器檢視伺服器的回應：

```
$ nodemon app.js
```

