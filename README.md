# 糖尿病预治智能助手

這是一個專為糖尿病患者設計的智能助手應用，提供健康管理、知識科普和專業諮詢服務。

## 功能特色

- 🏥 **專業醫師團隊** - 提供專業的醫療諮詢服務
- 📚 **健康科普** - 豐富的糖尿病相關知識文章
- 🍎 **飲食指南** - 科學的飲食管理建議
- 🤖 **AI 助手** - 智能問答和個性化建議
- 📊 **健康監測** - 血糖、體重等健康數據追蹤

## 技術架構

- **前端框架**: HTML5 + CSS3 + JavaScript (ES6+)
- **樣式框架**: Tailwind CSS 3.4.1
- **圖標庫**: Font Awesome 6.4.0
- **字體**: Google Fonts (Pacifico)
- **API**: 自定義工作流 API

## 項目結構

```
diabetesAssistant/
├── index.html              # 主入口頁面
├── main/                   # 主要頁面
│   ├── main.html          # 首頁
│   ├── diabetes.html      # 糖尿病科普
│   ├── article.html       # 文章詳情
│   └── js/               # 頁面 JavaScript
├── js/                    # 公共 JavaScript
│   ├── api.js            # API 調用模組
│   └── index.js          # 主頁面功能
├── css/                   # 樣式文件
│   └── index.css         # Tailwind CSS 入口
├── dist/                  # 構建輸出
│   └── output.css        # 編譯後的 CSS
├── package.json           # 項目配置
├── tailwind.config.js     # Tailwind 配置
└── postcss.config.js      # PostCSS 配置
```

## 安裝和運行

### 1. 安裝依賴

```bash
npm install
```

### 2. 構建 CSS

開發模式（監聽文件變化）：
```bash
npm run build
```

生產模式（壓縮優化）：
```bash
npm run build:prod
```

### 3. 啟動本地服務器

```bash
# 使用 Python
python -m http.server 8000

# 或使用 Node.js
npx serve .

# 或使用 Live Server (VS Code 擴展)
```

### 4. 訪問應用

打開瀏覽器訪問：`http://localhost:8000`

## 開發指南

### 添加新頁面

1. 在 `main/` 目錄下創建新的 HTML 文件
2. 在 `tailwind.config.js` 的 `content` 數組中添加新文件路徑
3. 重新構建 CSS：`npm run build:prod`

### 修改樣式

1. 編輯 `css/index.css` 文件
2. 運行 `npm run build:prod` 重新構建
3. 刷新瀏覽器查看效果

### API 配置

API 配置位於 `js/api.js` 文件中，包括：
- API 端點：`http://172.16.26.20/v1/workflows/run`
- API 密鑰：`app-Eu4QCGpGJFC8gKw03O9vz97x`

## 瀏覽器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 注意事項

1. 確保在修改樣式後重新構建 CSS 文件
2. API 調用需要網絡連接
3. 建議使用現代瀏覽器以獲得最佳體驗

## 授權

本項目僅供學習和研究使用。 
=======
# diabetesAssistant

#### 介绍
{**以下是 Gitee 平台说明，您可以替换此简介**
Gitee 是 OSCHINA 推出的基于 Git 的代码托管平台（同时支持 SVN）。专为开发者提供稳定、高效、安全的云端软件开发协作平台
无论是个人、团队、或是企业，都能够用 Gitee 实现代码托管、项目管理、协作开发。企业项目请看 [https://gitee.com/enterprises](https://gitee.com/enterprises)}

#### 软件架构
软件架构说明


#### 安装教程

1.  xxxx
2.  xxxx
3.  xxxx

#### 使用说明

1.  xxxx
2.  xxxx
3.  xxxx

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request


#### 特技

1.  使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2.  Gitee 官方博客 [blog.gitee.com](https://blog.gitee.com)
3.  你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解 Gitee 上的优秀开源项目
4.  [GVP](https://gitee.com/gvp) 全称是 Gitee 最有价值开源项目，是综合评定出的优秀开源项目
5.  Gitee 官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6.  Gitee 封面人物是一档用来展示 Gitee 会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)

