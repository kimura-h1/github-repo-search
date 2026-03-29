## 概要

GitHub APIを利用してリポジトリを検索できるアプリです。  
検索結果の一覧表示、ページネーション、詳細ページ表示に対応しています。  
URLに検索条件を保持することで、詳細画面へ遷移した後も検索状態を維持できるようにしています。


## 使用技術

- Next.js
- TypeScript
- Tailwind CSS
- GitHub REST API
- Jest
- MSW


## 主な機能

- GitHubリポジトリ検索
- 検索結果一覧表示
- ページネーション
- リポジトリ詳細表示
- URLによる検索状態保持
- descriptionの文字数制限

## フォルダ構成

```text
src
├── app
│   ├── api
│   │   └── github
│   │       └── search
│   │           ├── route.ts            # GitHubリポジトリ検索API
│   │           └── repo
│   │               └── route.ts        # リポジトリ詳細API
│   │
│   ├── repos
│   │   └── [owner]
│   │       └── [repo]
│   │           └── page.tsx            # リポジトリ詳細ページ
│   │
│   ├── Home.tsx
│   ├── Home.test.tsx
│   ├── HomePage.test.tsx
│   ├── layout.tsx
│   ├── page.tsx                        # トップページ
│   ├── globals.css
│   └── favicon.ico
│
├── components
│   ├── RepoList.tsx                    # 検索結果一覧
│   ├── SearchForm.tsx                  # 検索フォーム
│   └── SearchForm.test.tsx             # SearchFormテスト
│
├── lib
│   ├── github.ts                       # GitHub API型定義
│   └── validators.ts                   # バリデーション
│
├── test
│   ├── msw.ts                          # MSWハンドラー
│   └── setup-msw.ts                    # MSW初期化
│
└── types
│   └── jest-dom.d.ts                   # jest-dom型定義
│
├── jest.setup.js                   # Jest セットアップ
├── jest.config.js                  # Jest 設定
├── package.json
└── README.md
```


## 工夫した点

### ① GitHub APIのレート制限対応
- Personal Access Tokenを使用して認証付きリクエストに対応
- 403（rate limit）および401エラーへの対策を実施

### ② URLによる状態管理
- 検索条件（q）とページ番号（page）をURLで管理
- 詳細ページ遷移後も検索状態を維持できるように設計

### ③ ページ遷移時の状態保持
- 一覧 → 詳細 → 一覧の遷移でも検索結果が保持されるように実装
- クエリパラメータを引き継ぐことでUXを改善

### ④ データ整形（descriptionの制御）
- descriptionを100文字に制限し、レイアウト崩れを防止
- HTMLタグが混入するケースに対応し表示を整形

### ⑤ エラーハンドリング
- APIエラー時にユーザーへ分かりやすいメッセージを表示


## セットアップ方法

```bash
git clone https://github.com/kimura-h1/github-repo-search.git
cd github-repo-search
npm install
npm run dev



---

## 🔐 環境変数

```md
## 環境変数

GitHub APIの利用にはトークンが必要です。  
以下のように `.env.local` を作成してください。

```bash
GITHUB_TOKEN=your_token_here



---

## 🧪 テスト

```md
## テスト

JestとMSWを使用してテストを実装しています。

```bash
npm run test



---

## 📌 今後の改善

```md
## 今後の改善

- スケルトンローディングの実装
- キャッシュ機構の導入（SWR / React Query）
- 検索条件の拡張（language, stars など）
- UI/UXの改善