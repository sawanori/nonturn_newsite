'use client'

import { motion } from 'framer-motion'
import { MainLayout } from '@/components/layout/MainLayout'

export default function Terms() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-wider uppercase">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent eng-only">
                TERMS OF SERVICE
              </span>
            </h1>
            <p className="text-xl text-gray-300">利用規約</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-yellow-400/20 p-8 md:p-12 relative overflow-hidden"
          >
            <div className="prose prose-lg prose-invert max-w-none">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-8"
              >
                <p className="text-gray-300 leading-relaxed mb-6">
                  この利用規約（以下「本規約」）は、NonTurn.LLC（以下「当社」）が提供するサービス（以下「本サービス」）の利用条件を定めるものです。お客様（以下「利用者」）には、本規約に同意いただいた上で、本サービスをご利用いただきます。
                </p>
                <p className="text-gray-400 text-sm">制定日：2024年7月1日</p>
              </motion.div>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">第1条（適用）</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  本規約は、利用者と当社との間の本サービスの利用に関わる一切の関係に適用されるものとします。
                </p>
                <p className="text-gray-300 leading-relaxed">
                  当社は、本サービスに関し、本規約のほか、ご利用にあたってのルール等、各種の定めをすることがあります。これらの定めも、名称のいかんに関わらず、本規約の一部を構成するものとします。
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">第2条（利用者の責任）</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  利用者は、自己の責任において本サービスを利用するものとし、本サービスにおいて行った一切の行為およびその結果について一切の責任を負うものとします。
                </p>
                <p className="text-gray-300 leading-relaxed">
                  利用者は、本サービスの利用に際し、以下の行為をしてはなりません：
                </p>
                <ul className="text-gray-300 space-y-2 ml-6 mt-4">
                  <li>• 法令または公序良俗に違反する行為</li>
                  <li>• 犯罪行為に関連する行為</li>
                  <li>• 当社、本サービスの他の利用者、または第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
                  <li>• 当社のサービスの運営を妨害するおそれのある行為</li>
                  <li>• 他の利用者に関する個人情報等を収集または蓄積する行為</li>
                  <li>• 不正アクセスをし、またはこれを試みる行為</li>
                  <li>• 他の利用者に成りすます行為</li>
                  <li>• 当社のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
                  <li>• その他、当社が不適切と判断する行為</li>
                </ul>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">第3条（本サービスの提供の停止等）</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  当社は、以下のいずれかの事由があると判断した場合、利用者に事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします：
                </p>
                <ul className="text-gray-300 space-y-2 ml-6">
                  <li>• 本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
                  <li>• 地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
                  <li>• コンピュータまたは通信回線等が事故により停止した場合</li>
                  <li>• その他、当社が本サービスの提供が困難と判断した場合</li>
                </ul>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">第4条（著作権）</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  利用者は、自ら著作権等の必要な知的財産権を有するか、または必要な権利者の許諾を得た内容のみ、本サービスを利用し、投稿または編集することができるものとします。
                </p>
                <p className="text-gray-300 leading-relaxed">
                  本サービスに関する著作権その他の知的財産権は、当社または当社にその利用を許諾した権利者に帰属し、利用者は無断で複製、譲渡、貸与、翻訳、改変、転載、公衆送信、送信可能化、利用許諾、再利用許諾、販売、出版その他の利用や第三者への利用許諾をすることはできません。
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">第5条（利用制限および利用契約の解除）</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  当社は、利用者が以下のいずれかに該当する場合には、事前の通知なく、利用者に対して、本サービスの全部もしくは一部の利用を制限し、または利用契約を解除することができるものとします：
                </p>
                <ul className="text-gray-300 space-y-2 ml-6">
                  <li>• 本規約のいずれかの条項に違反した場合</li>
                  <li>• 登録事項に虚偽の事実があることが判明した場合</li>
                  <li>• 料金等の支払債務の不履行があった場合</li>
                  <li>• 当社からの連絡に対し、一定期間返答がない場合</li>
                  <li>• 本サービスについて、最後の利用から一定期間利用がない場合</li>
                  <li>• その他、当社が本サービスの利用を適当でないと判断した場合</li>
                </ul>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">第6条（保証の否認および免責事項）</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  当社は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
                </p>
                <p className="text-gray-300 leading-relaxed">
                  当社は、本サービスに起因してユーザーに生じたあらゆる損害について、当社の故意又は重過失による場合を除き、一切の責任を負いません。ただし、本サービスに関する当社とユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">第7条（サービス内容の変更等）</h2>
                <p className="text-gray-300 leading-relaxed">
                  当社は、利用者への事前の告知をもって、本サービスの内容を変更、追加または廃止することがあり、利用者はこれに同意するものとします。
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.0 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">第8条（利用規約の変更）</h2>
                <p className="text-gray-300 leading-relaxed">
                  当社は、必要と判断した場合には、利用者に通知することなくいつでも本規約を変更することができるものとします。なお、本規約の変更後、本サービスの利用を開始した場合には、当該利用者は変更後の規約に同意したものとみなします。
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.2 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">第9条（個人情報の取扱い）</h2>
                <p className="text-gray-300 leading-relaxed">
                  当社は、本サービスの利用によって取得する個人情報については、当社「プライバシーポリシー」に従い適切に取り扱うものとします。
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.4 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">第10条（通知または連絡）</h2>
                <p className="text-gray-300 leading-relaxed">
                  利用者と当社との間の通知または連絡は、当社の定める方法によって行うものとします。当社は、利用者から、当社が別途定める方式に従った変更届け出がない限り、現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い、これらは、発信時に利用者へ到達したものとみなします。
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.6 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">第11条（権利義務の譲渡の禁止）</h2>
                <p className="text-gray-300 leading-relaxed">
                  利用者は、当社の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.8 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">第12条（準拠法・裁判管轄）</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  本規約の解釈にあたっては、日本法を準拠法とします。
                </p>
                <p className="text-gray-300 leading-relaxed">
                  本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意管轄とします。
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 3.0 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">お問い合わせ先</h2>
                <div className="text-gray-300 leading-relaxed">
                  <p className="mb-2">本規約に関するお問い合わせは、下記までご連絡ください。</p>
                  <div className="bg-black/30 p-4 rounded border border-yellow-400/20 mt-4">
                    <p className="font-semibold text-yellow-400 mb-2">NonTurn.LLC</p>
                    <p>〒220-0012</p>
                    <p>神奈川県横浜市西区みなとみらい3-7-1</p>
                    <p>オーシャンゲートみなとみらい8F</p>
                    <p className="mt-2">
                      Email: <a href="mailto:n.sawada@non-turn.com" className="text-yellow-400 hover:text-yellow-300 transition-colors">n.sawada@non-turn.com</a>
                    </p>
                  </div>
                </div>
              </motion.section>
            </div>

            {/* Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/5 to-yellow-400/0 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-12"
          >
            <motion.a
              href="/"
              className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors duration-300 font-medium"
              whileHover={{ x: -5 }}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              ホームに戻る
            </motion.a>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  )
}