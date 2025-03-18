import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <Link href="/" className="text-primary hover:underline">
            ← ホームに戻る
          </Link>
        </div>
        
        <h1 className="text-2xl font-bold mb-6">プライバシーポリシー</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. 収集する情報</h2>
            <p>Lokiは以下の情報を収集します：</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>アカウント情報（名前、メールアドレス、プロフィール画像）</li>
              <li>位置情報（GPS座標）</li>
              <li>投稿内容</li>
              <li>デバイス情報（ブラウザの種類、IPアドレス）</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">2. 位置情報の利用</h2>
            <p>Lokiは位置情報を以下の目的で使用します：</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>投稿を地図上に表示するため</li>
              <li>近くのユーザーの投稿を表示するため</li>
              <li>位置情報に基づいた機能を提供するため</li>
            </ul>
            <p className="mt-2">
              プライバシー保護のため、位置情報は±50m範囲で調整されます。
              設定からさらに精度を下げることも可能です。
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">3. 情報の保存期間</h2>
            <p>
              位置情報は投稿から30日後に自動的に削除されます。
              アカウント情報はアカウントが削除されるまで保持されます。
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">4. セキュリティ対策</h2>
            <p>Lokiは以下のセキュリティ対策を実施しています：</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>データの暗号化（AES-256）</li>
              <li>HTTPS（TLS1.3）による通信の暗号化</li>
              <li>DDoS対策</li>
              <li>ボット対策</li>
              <li>異常な位置データの検出と警告</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">5. ユーザーの権利</h2>
            <p>ユーザーには以下の権利があります：</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>個人データへのアクセス</li>
              <li>個人データの修正</li>
              <li>個人データの削除</li>
              <li>個人データのエクスポート</li>
              <li>位置情報の精度の調整</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">6. お問い合わせ</h2>
            <p>
              プライバシーに関するご質問やご懸念がある場合は、
              privacy@loki-app.com までご連絡ください。
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">7. ポリシーの変更</h2>
            <p>
              本プライバシーポリシーは変更される場合があります。
              重要な変更がある場合は、アプリ内で通知します。
            </p>
            <p className="mt-2">最終更新日: 2025年3月19日</p>
          </section>
        </div>
      </div>
    </div>
  );
}
