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