import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <Link href="/" className="text-primary hover:underline">
            ← ホームに戻る
          </Link>
        </div>
        
        <h1 className="text-2xl font-bold mb-6">利用規約</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. はじめに</h2>
            <p>
              本利用規約（以下「本規約」）は、Loki（以下「当サービス」）の利用条件を定めるものです。
              ユーザーは本規約に同意の上、当サービスを利用するものとします。
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">2. アカウント</h2>
            <p>ユーザーは以下の事項に同意するものとします：</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>正確かつ完全な情報を提供すること</li>
              <li>アカウント情報の機密性を維持すること</li>
              <li>アカウントの不正使用があった場合は直ちに通知すること</li>
              <li>13歳未満の方は利用できません</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">3. 禁止事項</h2>
            <p>ユーザーは以下の行為を行わないものとします：</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>当サービスの運営を妨害する行為</li>
              <li>他のユーザーに迷惑をかける行為</li>
              <li>他人になりすます行為</li>
              <li>当サービスが明示的に許可していない方法での自動化されたアクセス</li>
              <li>虚偽の情報を投稿する行為</li>
              <li>位置情報を偽装する行為</li>
              <li>知的財産権を侵害する行為</li>
              <li>プライバシーを侵害する行為</li>
              <li>差別的発言や暴力的な表現を含む投稿</li>
              <li>性的なコンテンツや露骨な表現を含む投稿</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">4. 位置情報</h2>
            <p>
              当サービスは位置情報に基づいたサービスです。
              投稿するには位置情報の許可が必要です。
              位置情報の取り扱いについては、プライバシーポリシーをご確認ください。
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">5. コンテンツの所有権</h2>
            <p>
              ユーザーが投稿したコンテンツの所有権はユーザーに帰属します。
              ただし、当サービスに投稿することにより、当サービスに対して、
              世界的、非独占的、無償、サブライセンス可能かつ譲渡可能な
              使用、複製、配布、派生著作物の作成、表示および実行のライセンスを付与するものとします。
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">6. 免責事項</h2>
            <p>
              当サービスは「現状有姿」で提供され、明示または黙示を問わず、
              いかなる種類の保証も行いません。
              当サービスの利用により生じた損害について、当社は一切の責任を負いません。
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">7. サービスの変更・終了</h2>
            <p>
              当社は、ユーザーに通知することなく、当サービスの内容を変更したり、
              当サービスの提供を中断または終了したりすることができます。
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">8. 本規約の変更</h2>
            <p>
              当社は、必要と判断した場合には、ユーザーに通知することなく、
              本規約を変更することができます。
              変更後の利用規約は、当サービス上に表示された時点で効力を生じるものとします。
            </p>
            <p className="mt-2">最終更新日: 2025年3月19日</p>
          </section>
        </div>
      </div>
    </div>
  );
}
