import { motion } from 'motion/react';
import { Shield, Lock, FileText, CheckCircle2, Sliders } from 'lucide-react';
import { AnimatedBlob } from '../components/AnimatedBlob';
import { openCookiePreferences } from '../components/CookieConsent';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <AnimatedBlob />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-brand-50 text-brand-700 px-4 py-2 rounded-full mb-8 text-[10px] font-bold tracking-widest uppercase border border-brand-100"
          >
            <Shield className="w-4 h-4" />
            <span>Data Protection & Privacy Policy</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight mb-8 text-slate-900 leading-[1.1] text-balance"
          >
            How we protect your <span className="text-brand-500">Privacy.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto"
          >
            Last Updated: August 2026. Forward Surge Consultants is committed to transparency, data minimization, and upholding the highest standards under the EU General Data Protection Regulation (GDPR) and the Kenya Data Protection Act.
          </motion.p>
        </div>
      </section>

      <section className="py-20 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-slate prose-headings:font-display prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-brand-600 hover:prose-a:text-brand-500 prose-img:rounded-2xl mx-auto space-y-10">
            
            <div>
              <h2>1. Data Controller Identification</h2>
              <p>
                The Data Controller responsible for the processing of your personal data is:
              </p>
              <div className="not-prose bg-slate-50 border border-slate-200 rounded-2xl p-6 text-sm text-slate-700 space-y-1 font-medium">
                <p className="font-bold text-slate-900 text-base">Forward Surge Consultants Ltd</p>
                <p>Nairobi, Kenya</p>
                <p>Data Protection Contact: <a href="mailto:privacy@forwardsurge.com" className="text-brand-600 font-semibold hover:underline">privacy@forwardsurge.com</a> / <a href="mailto:info@forwardsurge.org" className="text-brand-600 font-semibold hover:underline">info@forwardsurge.org</a></p>
                <p>Phone: +254 703 868 689 / +254 704 868 689</p>
              </div>
            </div>

            <div>
              <h2>2. Information We Collect & Lawful Bases (GDPR Article 6)</h2>
              <p>
                We only process personal data where there is a clear, specific legal basis under Article 6 of the GDPR:
              </p>
              <div className="not-prose space-y-4 my-6">
                <div className="p-5 border border-slate-200 rounded-xl bg-white shadow-sm">
                  <h3 className="font-bold text-slate-900 text-sm mb-1">A. Consultation & Advisory Inquiries</h3>
                  <p className="text-xs text-slate-600 mb-2"><strong>Data:</strong> Full name, corporate email, phone number, company name, leadership stage, business challenge.</p>
                  <p className="text-xs text-brand-700 font-semibold bg-brand-50 border border-brand-100 px-3 py-1.5 rounded-lg inline-block">
                    Lawful Basis: Art. 6(1)(b) — Steps prior to entering into a contract at the request of the data subject.
                  </p>
                </div>

                <div className="p-5 border border-slate-200 rounded-xl bg-white shadow-sm">
                  <h3 className="font-bold text-slate-900 text-sm mb-1">B. Thought Leadership & Newsletter Subscriptions</h3>
                  <p className="text-xs text-slate-600 mb-2"><strong>Data:</strong> Email address.</p>
                  <p className="text-xs text-brand-700 font-semibold bg-brand-50 border border-brand-100 px-3 py-1.5 rounded-lg inline-block">
                    Lawful Basis: Art. 6(1)(a) — Freely given, specific, informed consent (withdrawable at any time).
                  </p>
                </div>

                <div className="p-5 border border-slate-200 rounded-xl bg-white shadow-sm">
                  <h3 className="font-bold text-slate-900 text-sm mb-1">C. Gated Strategic Resources & Playbooks</h3>
                  <p className="text-xs text-slate-600 mb-2"><strong>Data:</strong> Full name, corporate email, phone number.</p>
                  <p className="text-xs text-brand-700 font-semibold bg-brand-50 border border-brand-100 px-3 py-1.5 rounded-lg inline-block">
                    Lawful Basis: Art. 6(1)(a) — Explicit consent & Art. 6(1)(f) — Legitimate interest in delivering proprietary executive frameworks.
                  </p>
                </div>

                <div className="p-5 border border-slate-200 rounded-xl bg-white shadow-sm">
                  <h3 className="font-bold text-slate-900 text-sm mb-1">D. Website Security & Telemetry</h3>
                  <p className="text-xs text-slate-600 mb-2"><strong>Data:</strong> Anonymized IP addresses, browser user agent, session timestamps, firewall events.</p>
                  <p className="text-xs text-brand-700 font-semibold bg-brand-50 border border-brand-100 px-3 py-1.5 rounded-lg inline-block">
                    Lawful Basis: Art. 6(1)(f) — Legitimate interest in maintaining web application security, preventing denial of service, and mitigating security threats.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2>3. Data Retention Schedules</h2>
              <p>
                We do not retain personal information longer than necessary for the purposes for which it was collected:
              </p>
              <ul>
                <li><strong>Consultation Requests:</strong> Retained for 24 months following the last interaction, or for the duration of the commercial engagement plus statutory limitation periods (up to 7 years).</li>
                <li><strong>Newsletter Subscriptions:</strong> Retained until consent is withdrawn (unsubscribed). Upon unsubscribing, contact data is removed from active mailing lists immediately and purged within 30 days.</li>
                <li><strong>Security & Server Logs:</strong> Stored for up to 90 days for forensic and DDoS prevention purposes, after which they are permanently overwritten.</li>
              </ul>
            </div>

            <div>
              <h2>4. Data Subject Rights (GDPR Articles 15–22)</h2>
              <p>
                Under the GDPR and applicable privacy legislation, you have enforceable statutory rights regarding your personal data:
              </p>
              <ul>
                <li><strong>Right of Access (Art. 15):</strong> Request confirmation and a copy of personal data we hold about you.</li>
                <li><strong>Right to Rectification (Art. 16):</strong> Request correction of inaccurate or incomplete personal data.</li>
                <li><strong>Right to Erasure (Art. 17):</strong> Request deletion of your personal data ("Right to be Forgotten") where retention is no longer justified.</li>
                <li><strong>Right to Restriction of Processing (Art. 18):</strong> Request temporary suspension of data processing under certain conditions.</li>
                <li><strong>Right to Data Portability (Art. 20):</strong> Receive your personal data in a structured, machine-readable format.</li>
                <li><strong>Right to Object (Art. 21):</strong> Object to processing based on legitimate interests or direct marketing.</li>
                <li><strong>Right to Withdraw Consent (Art. 7(3)):</strong> Withdraw previously granted consent at any time without affecting prior lawful processing.</li>
              </ul>
              <p>
                To exercise any of these rights, submit a Data Subject Access Request (DSAR) to <a href="mailto:privacy@forwardsurge.com">privacy@forwardsurge.com</a>. We respond within 30 calendar days as required by Article 12(3) of the GDPR.
              </p>
            </div>

            <div>
              <h2>5. Cookie Preferences & Tracking</h2>
              <p>
                We employ cookies to deliver essential site features, analyze visitor traffic, and provide relevant thought leadership. You have complete control over optional cookies:
              </p>
              <div className="not-prose my-6">
                <button
                  type="button"
                  onClick={openCookiePreferences}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 hover:bg-brand-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
                >
                  <Sliders className="w-4 h-4" />
                  Manage Cookie Settings
                </button>
              </div>
            </div>

            <div>
              <h2>6. International Data Transfers (Chapter V)</h2>
              <p>
                Where data is transferred outside the European Economic Area (EEA) or Kenya, we ensure appropriate safeguards are maintained pursuant to GDPR Chapter V, including Standard Contractual Clauses (SCCs), certified processors, and robust TLS 1.3 in-transit encryption.
              </p>
            </div>

            <div>
              <h2>7. Right to Lodge a Complaint</h2>
              <p>
                If you believe our processing of your personal data infringes data protection laws, you have the right to lodge a complaint with a supervisory authority:
              </p>
              <ul>
                <li><strong>Kenya:</strong> Office of the Data Protection Commissioner (ODPC) — <a href="https://www.odpc.go.ke" target="_blank" rel="noopener noreferrer">odpc.go.ke</a></li>
                <li><strong>European Union:</strong> The Data Protection Authority (DPA) in the EU member state of your habitual residence or workplace.</li>
              </ul>
            </div>

            <div>
              <h2>8. Contact Us</h2>
              <p>
                For questions, clarifications, or privacy inquiries:
              </p>
              <p>
                <strong>Forward Surge Consultants</strong><br />
                Email: <a href="mailto:privacy@forwardsurge.com">privacy@forwardsurge.com</a><br />
                General Inquiries: <a href="mailto:info@forwardsurge.org">info@forwardsurge.org</a>
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

