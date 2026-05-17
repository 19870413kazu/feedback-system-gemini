# 🎯 AI評価フィードバックシステム

子どもの成長をAIが6つのカテゴリで分析し、個別フィードバックを提供するシステムです。

## 🌐 本番サイト

### **アクセスURL**
```
https://feedback-system-gemini.vercel.app
```

**セキュリティ:** URLを知っている人のみアクセス可能です。

### **ワンクリックデプロイ**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/19870413kazu/feedback-system-gemini&env=GOOGLE_API_KEY&envDescription=Google%20Generative%20AI%20API%20Key&envLink=https://makersuite.google.com/app/apikey)

または、ローカルでデプロイ：

```bash
npm install -g vercel
vercel --prod
```

---

## ✨ 主な機能

### 📝 スコア入力
- 6つのカテゴリでお子さんの能力をスコア化（0-100点）
  - 非認知能力
  - 自己管理能力
  - 課題解決能力
  - 協調性
  - リーダーシップ
  - 援助・礼儀

### 📊 フィードバック生成
- 入力したスコアから、AIが総合評価を自動生成
- 本人向け/保護者向けの2つのモード
- 強み・課題・アドバイスを提供

### 💬 チャット機能
- フィードバックについてAIに質問可能
- 詳しい説明やアドバイスを受け取れます

---

## 🚀 ローカル開発環境

### 前提条件
- Node.js 14以上
- npm 6以上

### セットアップ手順

```bash
# 1. リポジトリをクローン
git clone https://github.com/19870413kazu/feedback-system-gemini.git
cd feedback-system-gemini

# 2. 依存パッケージをインストール
npm install

# 3. 環境変数ファイルを作成
# .env ファイルを作成し、以下の内容を記載:
# GOOGLE_API_KEY=（使用するAPIキー）
# PORT=3000

# 4. ローカルサーバーを起動
npm start

# 5. ブラウザでアクセス
# http://localhost:3000
```

---

## 📁 ファイル構成

```
feedback-system-gemini/
├── server.js           # Node.js バックエンドサーバー
├── index.html          # フロントエンドUI（HTML/CSS/JavaScript）
├── package.json        # npm パッケージ管理
├── .env                # 環境変数設定（ローカル用）
├── vercel.json         # Vercel デプロイ設定
├── .gitignore          # Git除外ファイル設定
└── README.md           # このファイル
```

---

## 🔧 主要な技術スタック

| 技術 | 用途 |
|------|------|
| **Express.js** | Node.js フレームワーク |
| **CORS** | クロスオリジンリソース共有 |
| **Google Generative AI** | AI フィードバック生成（実装時） |
| **HTML5 / CSS3 / JavaScript** | フロントエンドUI |

---

## 🌐 本番環境（Vercel）

### デプロイ情報
- **ホスティング:** Vercel
- **自動デプロイ:** GitHubプッシュ時に自動更新
- **URL:** https://feedback-system-gemini.vercel.app
- **SSL/HTTPS:** 自動対応

### 環境変数設定（Vercel）
Vercelダッシュボードで以下を設定：
- `GOOGLE_API_KEY` - Google Generative AI API キー

---

## 📋 APIエンドポイント

### POST `/api/feedback/generate`
スコアからフィードバックを生成

**リクエスト:**
```json
{
  "scores": {
    "non_cognitive": 80,
    "self_management": 75,
    "problem_solving": 70,
    "collaboration": 85,
    "leadership": 65,
    "courtesy": 90
  },
  "mode": "child" // or "parent"
}
```

**レスポンス:**
```json
{
  "success": true,
  "feedback": "（生成されたフィードバック）",
  "average_score": 78,
  "scores": { ... }
}
```

### POST `/api/feedback/chat`
フィードバックについての質問に回答

**リクエスト:**
```json
{
  "message": "質問内容",
  "scores": { ... },
  "feedback": "元のフィードバック",
  "mode": "child"
}
```

### GET `/health`
ヘルスチェック

---

## 🛠️ トラブルシューティング

### Q. `npm: command not found`
**A:** Node.jsがインストールされていません。
https://nodejs.org/ からLTS版をダウンロード・インストールしてください。

### Q. ポート3000が既に使用されている
**A:** 別のポート番号で起動してください：
```bash
PORT=3001 npm start
```

### Q. API キーが設定されていない
**A:** `.env` ファイルに `GOOGLE_API_KEY` を設定してください。

---

## 👨‍💻 開発者向け情報

### コミット履歴
```bash
# 現在のコミット確認
git log --oneline

# ブランチ確認
git branch -a
```

### ローカルで修正後のデプロイ
```bash
# 修正を加えてコミット
git add .
git commit -m "修正内容の説明"

# GitHubにプッシュ（自動的にVercelにデプロイされます）
git push origin main
```

---

## 📞 サポート

問題が発生した場合は、GitHubのIssuesセクションで報告してください。

---

## 📄 ライセンス

ISC License

---

**最終更新:** 2026年5月18日
