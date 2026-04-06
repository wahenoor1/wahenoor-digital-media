import React from 'react';
import { FileText, Mail, Phone } from 'lucide-react';

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-[#0A1628] pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-6">
                        <FileText className="w-8 h-8 text-purple-400" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Terms of Service</h1>
                    <p className="text-gray-400 text-sm">Last updated: April 2026</p>
                </div>

                <div className="prose prose-invert max-w-none space-y-8">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
                        <h2 className="text-xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                        <p className="text-gray-400 leading-relaxed">
                            By accessing or using the services of Wahenoor Digital Media ("Company," "we," "us," or "our"), including our affiliate marketing platform, website, and RCS (Rich Communication Services) messaging campaigns, you ("User," "Publisher," "Advertiser") agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
                        <h2 className="text-xl font-semibold text-white mb-4">2. Services Description</h2>
                        <p className="text-gray-400 leading-relaxed mb-3">Wahenoor Digital Media provides:</p>
                        <ul className="space-y-2 text-gray-400">
                            <li className="flex gap-2"><span className="text-purple-400 mt-1">•</span><span>Affiliate marketing network services connecting advertisers and publishers.</span></li>
                            <li className="flex gap-2"><span className="text-purple-400 mt-1">•</span><span>Performance-based campaign management (CPA, CPL, CPI models).</span></li>
                            <li className="flex gap-2"><span className="text-purple-400 mt-1">•</span><span>RCS (Rich Communication Services) business messaging campaigns for advertisers.</span></li>
                            <li className="flex gap-2"><span className="text-purple-400 mt-1">•</span><span>Traffic monetization, lead generation, and digital marketing solutions.</span></li>
                        </ul>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
                        <h2 className="text-xl font-semibold text-white mb-4">3. RCS Messaging Terms</h2>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            Advertisers and publishers engaging with our RCS messaging services must comply with the following:
                        </p>

                        <h3 className="text-lg font-medium text-gray-200 mb-3">3.1 Compliance Requirements</h3>
                        <ul className="space-y-2 text-gray-400 mb-4">
                            <li className="flex gap-2"><span className="text-purple-400 mt-1">•</span><span>All RCS campaigns must comply with applicable laws including TRAI regulations (India), TCPA (USA), GDPR (EU), and carrier/operator guidelines.</span></li>
                            <li className="flex gap-2"><span className="text-purple-400 mt-1">•</span><span>Advertisers must obtain proper opt-in consent from recipients before any RCS message is sent on their behalf.</span></li>
                            <li className="flex gap-2"><span className="text-purple-400 mt-1">•</span><span>All RCS messages must clearly identify the sending brand/business and include opt-out instructions.</span></li>
                            <li className="flex gap-2"><span className="text-purple-400 mt-1">•</span><span>RCS campaigns must follow Google RCS Business Messaging policies and carrier guidelines.</span></li>
                        </ul>

                        <h3 className="text-lg font-medium text-gray-200 mb-3">3.2 Prohibited RCS Content</h3>
                        <p className="text-gray-400 leading-relaxed mb-2">The following content is strictly prohibited in RCS campaigns:</p>
                        <ul className="space-y-2 text-gray-400 mb-4">
                            <li className="flex gap-2"><span className="text-red-400 mt-1">✕</span><span>Adult, explicit, or sexually suggestive content.</span></li>
                            <li className="flex gap-2"><span className="text-red-400 mt-1">✕</span><span>Phishing, scam, or fraudulent messages.</span></li>
                            <li className="flex gap-2"><span className="text-red-400 mt-1">✕</span><span>Gambling or lottery promotions (unless legally licensed in the target jurisdiction).</span></li>
                            <li className="flex gap-2"><span className="text-red-400 mt-1">✕</span><span>Misleading claims, false urgency, or deceptive call-to-actions.</span></li>
                            <li className="flex gap-2"><span className="text-red-400 mt-1">✕</span><span>Unsolicited messages to users who have not opted in.</span></li>
                            <li className="flex gap-2"><span className="text-red-400 mt-1">✕</span><span>Content targeting minors.</span></li>
                        </ul>

                        <h3 className="text-lg font-medium text-gray-200 mb-3">3.3 Opt-Out Handling</h3>
                        <p className="text-gray-400 leading-relaxed">
                            All opt-out requests (STOP replies) must be honored within 24 hours. Advertisers are responsible for maintaining and respecting opt-out lists. Continued messaging to opted-out users is a material breach of these Terms.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
                        <h2 className="text-xl font-semibold text-white mb-4">4. Publisher Obligations</h2>
                        <ul className="space-y-2 text-gray-400">
                            <li className="flex gap-2"><span className="text-purple-400 mt-1">•</span><span>Publishers must only use approved traffic sources disclosed during registration.</span></li>
                            <li className="flex gap-2"><span className="text-purple-400 mt-1">•</span><span>Fraudulent traffic, bot traffic, incentivized clicks (unless approved), and click injection are strictly prohibited.</span></li>
                            <li className="flex gap-2"><span className="text-purple-400 mt-1">•</span><span>Publishers must not run campaigns on behalf of the Company without explicit written authorization.</span></li>
                            <li className="flex gap-2"><span className="text-purple-400 mt-1">•</span><span>Publishers must comply with all applicable laws in geographies they target.</span></li>
                        </ul>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
                        <h2 className="text-xl font-semibold text-white mb-4">5. Advertiser Obligations</h2>
                        <ul className="space-y-2 text-gray-400">
                            <li className="flex gap-2"><span className="text-purple-400 mt-1">•</span><span>Advertisers must provide accurate campaign briefs, creatives, and tracking links.</span></li>
                            <li className="flex gap-2"><span className="text-purple-400 mt-1">•</span><span>Advertisers are responsible for ensuring their landing pages and offers comply with applicable laws.</span></li>
                            <li className="flex gap-2"><span className="text-purple-400 mt-1">•</span><span>Advertisers must honor agreed payouts and KPIs. Unilateral changes to campaign terms require 7 days prior notice.</span></li>
                            <li className="flex gap-2"><span className="text-purple-400 mt-1">•</span><span>For RCS campaigns, advertisers must provide proof of opt-in consent records.</span></li>
                        </ul>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
                        <h2 className="text-xl font-semibold text-white mb-4">6. Payments & Payouts</h2>
                        <ul className="space-y-2 text-gray-400">
                            <li className="flex gap-2"><span className="text-purple-400 mt-1">•</span><span>Payouts are processed on agreed payment cycles (weekly/monthly) after verification.</span></li>
                            <li className="flex gap-2"><span className="text-purple-400 mt-1">•</span><span>The Company reserves the right to withhold payouts pending fraud investigations.</span></li>
                            <li className="flex gap-2"><span className="text-purple-400 mt-1">•</span><span>Disputed conversions must be raised within 30 days of the reporting period.</span></li>
                            <li className="flex gap-2"><span className="text-purple-400 mt-1">•</span><span>Currency conversions are based on prevailing rates at the time of payment.</span></li>
                        </ul>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
                        <h2 className="text-xl font-semibold text-white mb-4">7. Intellectual Property</h2>
                        <p className="text-gray-400 leading-relaxed">
                            All content, branding, platform features, and materials on this website are the property of Wahenoor Digital Media. You may not reproduce, distribute, or create derivative works without our prior written consent. Campaign creatives shared by advertisers remain the property of the respective advertiser.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
                        <h2 className="text-xl font-semibold text-white mb-4">8. Termination</h2>
                        <p className="text-gray-400 leading-relaxed">
                            We reserve the right to suspend or terminate any account or campaign at our sole discretion, particularly in cases of fraud, policy violations, or non-compliance with RCS messaging guidelines. Upon termination, outstanding payouts for valid conversions will be settled per the payment cycle, subject to fraud review.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
                        <h2 className="text-xl font-semibold text-white mb-4">9. Limitation of Liability</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Wahenoor Digital Media shall not be liable for indirect, incidental, or consequential damages arising from use of our platform or RCS services. Our total liability in any matter shall not exceed the amounts paid to us in the preceding 3 months.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
                        <h2 className="text-xl font-semibold text-white mb-4">10. Governing Law</h2>
                        <p className="text-gray-400 leading-relaxed">
                            These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Amritsar, Punjab, India.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
                        <h2 className="text-xl font-semibold text-white mb-4">11. Contact Us</h2>
                        <p className="text-gray-400 leading-relaxed mb-4">For questions regarding these Terms:</p>
                        <div className="flex flex-col gap-3">
                            <a href="mailto:info@wahenoormedia.com" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300">
                                <Mail className="w-4 h-4" /> info@wahenoormedia.com
                            </a>
                            <a href="tel:+917009039292" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300">
                                <Phone className="w-4 h-4" /> +91-7009039292
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}