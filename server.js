const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== ミドルウェア設定 =====
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ===== Google Gemini API 初期化 =====
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

// ===== ヘルスチェック =====
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// ===== フィードバック生成エンドポイント =====
app.post('/api/feedback/generate', async (req, res) => {
    try {
        const { scores, mode } = req.body;

        if (!scores) {
            return res.status(400).json({ error: 'Scores are required' });
        }

        const averageScore = Math.round(
            (scores.non_cognitive + scores.self_management + scores.problem_solving +
                scores.collaboration + scores.leadership + scores.courtesy) / 6
        );

        // デモンストレーション用のダミーフィードバック
        const feedbackText = `## 総合評価
${averageScore}点という結果から見える、あなたの全体的な成長段階についてです。これは素晴らしい成績です！(2-3文)

## 特に優れている領域（3つまで）
**援助・礼儀 (${scores.courtesy}点)**: 他者への思いやりと丁寧さが非常に優れています。この強みを活かして、リーダーシップの場面でも他者を支援してください。

**協調性 (${scores.collaboration}点)**: チーム活動での貢献度が高く、友人との関係構築が得意です。この力を発揮して、より大きなプロジェクトに携わってみましょう。

**非認知能力 (${scores.non_cognitive}点)**: 感情管理と社会性が発達しており、様々な状況への適応力が高いです。

## 次に伸ばしたい領域（2-3個）
**リーダーシップ (${scores.leadership}点)**: 今後のリーダーシップ育成の為に、小さなグループでの主導経験を増やしましょう。他者の意見を尊重しながら、自分の考えを示す練習が大切です。

**自己管理能力 (${scores.self_management}点)**: 日々のスケジュール管理と目標設定の習慣をつけることで、さらに自信が生まれます。毎日の振り返りを習慣化してみてください。

## 全体的なメッセージ
${mode === 'child' 
    ? 'あなたの現在の頑張りは素晴らしいです！このまま継続して、苦手な領域に少しずつ挑戦していってください。大人になったとき、あなたはきっと素敵な人になっています！' 
    : 'お子さんの成長が感じられる成績です。今後は、得意な領域をさらに伸ばしつつ、課題のある領域では親子で一緒に改善方法を考えることをお勧めします。'}`;

        console.log('✅ フィードバック生成成功（デモモード）');
        res.json({
            success: true,
            feedback: feedbackText,
            average_score: averageScore,
            scores: scores
        });

    } catch (error) {
        console.error('❌ フィードバック生成エラー:', error);
        res.status(500).json({
            error: 'Failed to generate feedback',
            message: error.message
        });
    }
});

// ===== チャットエンドポイント =====
app.post('/api/feedback/chat', async (req, res) => {
    try {
        const { message, scores, feedback, mode } = req.body;

        if (!message || !scores || !feedback) {
            return res.status(400).json({
                error: 'Message, scores, and feedback are required'
            });
        }

        // デモンストレーション用のダミー応答
        let chatResponse = '';
        
        if (message.includes('リーダーシップ') || message.includes('leader')) {
            chatResponse = 'リーダーシップを伸ばすためには、まず小さなグループでリーダー役を経験することが大切です。友人との活動で主導的な立場を取ることから始めましょう。失敗を恐れず、まずは挑戦してみることが重要です。';
        } else if (message.includes('自己管理') || message.includes('管理')) {
            chatResponse = '自己管理能力は毎日の小さな習慣から始まります。朝起きる時間、勉強の時間、休息の時間を決めて、その予定を守ることを意識してください。スケジュール帳に書いて、親子で確認し合うのも効果的です。';
        } else if (message.includes('協調性') || message.includes('友人')) {
            chatResponse = 'あなたの協調性は既に優れています。この強みを活かして、さらに多くの人間関係を広げていくことをお勧めします。異なる背景を持つ人との交流を大切にしましょう。';
        } else if (message.includes('成績') || message.includes('点数') || message.includes('スコア')) {
            const avg = Math.round(
                (scores.non_cognitive + scores.self_management + scores.problem_solving +
                    scores.collaboration + scores.leadership + scores.courtesy) / 6
            );
            chatResponse = `平均スコアは${avg}点です。特に協調性と援助・礼儀が高く、リーダーシップと課題解決能力に伸びしろがあります。まずは得意な領域をさらに活かしながら、苦手な領域への挑戦を少しずつ増やしていきましょう。`;
        } else {
            chatResponse = 'よい質問ですね。あなたの成長を支援するために、まずは得意な領域でさらに自信を深め、その後に課題領域への挑戦を始めることをお勧めします。親子で一緒に頑張ってください。';
        }

        console.log('✅ チャット返答成功（デモモード）');
        res.json({
            success: true,
            response: chatResponse
        });

    } catch (error) {
        console.error('❌ チャットエラー:', error);
        res.status(500).json({
            error: 'Failed to process chat',
            message: error.message
        });
    }
});

// ===== ルートエンドポイント =====
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ===== サーバー起動 =====
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════╗
║   AI個別フィードバック サーバー起動                      ║
╚════════════════════════════════════════════════════════╝

✅ サーバーが実行中: http://localhost:${PORT}

📡 利用可能なエンドポイント:
   POST /api/feedback/generate    フィードバック生成
   POST /api/feedback/chat        チャット
   GET  /health                   ヘルスチェック

🔑 APIキー設定確認: ${process.env.GOOGLE_API_KEY ? '✓ 設定済み' : '✗ 未設定'}

🛑 終了: Ctrl+C を押してください
    `);
});
