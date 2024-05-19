
## Currency Exchange Service

這是一個簡單的貨幣匯率服務，提供了一個API來根據匯率轉換貨幣。

### 使用方法

#### 構建 Docker 映像

要構建此服務的Docker映像，請使用以下命令：

```bash
docker build -t currency-exchange-service .
```

#### 執行測試
要運行此服務的測試，請執行以下Docker命令：
```bash
docker run -e CI=true currency-exchange-service npm run test
```

#### 運行服務
要在本地運行貨幣匯率服務，請使用以下Docker命令：
```bash
docker run -p 3000:3000 currency-exchange-service
```

#### 轉換匯率API
```bash
http://localhost:3000/exchange?source=<source_currency>&target=<target_currency>&amount=<amount>
```
將 <source_currency> 替換為源貨幣代碼，<target_currency> 替換為目標貨幣代碼，<amount> 替換為要轉換的金額。例如：
```bash
http://localhost:3000/exchange?source=TWD&target=JPY&amount=310.1234
```