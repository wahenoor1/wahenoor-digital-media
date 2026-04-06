import React from 'react';
import { Shield, Mail, Phone } from 'lucide-react';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-[#0A1628] pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-6">
                        <Shield className="w-8 h-8 text-blue-400" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Privacy Policy</h1>
                    <p className="text-gray-400 text-sm">Last updated: April 2026</p>
                </div>

                <div className="prose prose-invert max-w-none space-y-8">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
                        <h2 className="text-xl font-semibold text-white mb-4">1. Introduction</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Wahenoor Digital Media ("we," "our," or "us") is committed to protecting your personal information and your right to privacy. This Privacy Policy applies to all information collected through our website, affiliate platform, and RCS (Rich Communication Services) messaging campaigns operated by us or on behalf of our advertising partners.
                        </p>
                        <p className="text-gray-400 leading-relaxed mt-3">
                            By using our services or engaging with our RCS messages, you agree to the collection and use of information in accordance with this policy.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
                        <h2 className="text-xl font-semibold text-white mb-4">2. Information We Collect</h2>
                        <p className="text-gray-400 leading-relaxed mb-3">We may collect the following types of information:</p>
                        <ul className="space-y-2 text-gray-400">
                            <li className="flex gap-2"><span className="text-blue-400 mt-1">•</span><span><strong className="text-gray-300">Identity & Contact Data:</strong> Name, email address, phone number, and messaging identifiers used for RCS communication.</span></li>
                            <li className="flex gap-2"><span className="text-blue-400 mt-1">•</span><span><strong className="text-gray-300">Campaign Interaction Data:</strong> Click-throughs, conversions, message open rates, and engagement metrics from RCS campaigns.</span></li>
                            <li className="flex gap-2"><span className="text-blue-400 mt-1">•</span><span><strong className="text-gray-300">Device & Technical Data:</strong> IP address, device type, operating system, browser type, and network carrier information relevant to RCS delivery.</span></li>
                            <li className="flex gap-2"><span className="text-blue-400 mt-1">•</span><span><strong className="text-gray-300">Affiliate & Publisher Data:</strong> Publisher IDs, traffic sources, KPIs, payout records, and campaign performance data.</span></li>
                            <li className="flex gap-2"><span className="text-blue-400 mt-1">•</span><span><strong className="text-gray-300">Usage Data:</strong> How you interact with our platform, pages visited, and features used.</span></li>
                        </ul>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
                        <h2 className="text-xl font-semibold text-white mb-4">3. RCS Messaging – Specific Disclosures</h2>
                        <p className="text-gray-400 leading-relaxed mb-3">
                            As a participant in RCS (Rich Communication Services) campaigns, the following applies:
                        </p>
                        <ul className="space-y-2 text-gray-400">
                            <li className="flex gap-2"><span className="text-blue-400 mt-1">•</span><span><strong className="text-gray-300">Opt-In Consent:</strong> We only send RCS messages to users who have explicitly opted in. Your consent is required before any promotional RCS message is delivered.</span></li>
                            <li className="flex gap-2"><span className="text-blue-400 mt-1">•</span><span><strong className="text-gray-300">Opt-Out:</strong> You can opt out of RCS messages at any time by replying <strong>STOP</strong> to any message. Opt-outs are processed within 24 hours.</span></li>
                            <li className="flex gap-2"><span className="text-blue-400 mt-1">•</span><span><strong className="text-gray-300">Message Frequency:</strong> Message frequency varies by campaign. Standard message and data rates may apply.</span></li>
                            <li className="flex gap-2"><span className="text-blue-400 mt-1">•</span><span><strong className="text-gray-300">No Sensitive Data:</strong> We do not collect sensitive personal data (financial, health, biometric) through RCS interactions.</span></li>
                            <li className="flex gap-2"><span className="text-blue-400 mt-1">•</span><span><strong className="text-gray-300">Third-Party Advertisers:</strong> RCS campaigns may be executed on behalf of third-party advertisers. Their data use is governed by their own privacy policies.</span></li>
                        </ul>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
                        <h2 className="text-xl font-semibold text-white mb-4">4. How We Use Your Information</h2>
                        <ul className="space-y-2 text-gray-400">
                            <li className="flex gap-2"><span className="text-blue-400 mt-1">•</span><span>Delivering RCS campaigns and affiliate offers to opted-in recipients.</span></li>
                            <li className="flex gap-2"><span className="text-blue-400 mt-1">•</span><span>Tracking campaign performance, conversions, and payouts for publishers and advertisers.</span></li>
                            <li className="flex gap-2"><span className="text-blue-400 mt-1">•</span><span>Improving our platform, services, and campaign targeting.</span></li>
                            <li className="flex gap-2"><span className="text-blue-400 mt-1">•</span><span>Complying with legal obligations and resolving disputes.</span></li>
                            <li className="flex gap-2"><span className="text-blue-400 mt-1">•</span><span>Communicating updates, policy changes, and account notifications.</span></li>
                        </ul>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
                        <h2 className="text-xl font-semibold text-white mb-4">5. Data Sharing & Third Parties</h2>
                        <p className="text-gray-400 leading-relaxed mb-3">We do not sell your personal data. We may share data with:</p>
                        <ul className="space-y-2 text-gray-400">
                            <li className="flex gap-2"><span className="text-blue-400 mt-1">•</span><span><strong className="text-gray-300">Advertising Partners:</strong> Aggregated/anonymized campaign performance data only.</span></li>
                            <li className="flex gap-2"><span className="text-blue-400 mt-1">•</span><span><strong className="text-gray-300">Technology Providers:</strong> RCS platform operators (e.g., Google RCS Business Messaging, carrier aggregators) as needed for message delivery.</span></li>
                            <li className="flex gap-2"><span className="text-blue-400 mt-1">•</span><span><strong className="text-gray-300">Legal Authorities:</strong> When required by law, court order, or governmental regulation.</span></li>
                        </ul>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
                        <h2 className="text-xl font-semibold text-white mb-4">6. Data Retention</h2>
                        <p className="text-gray-400 leading-relaxed">
                            We retain personal data only as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Campaign interaction data is retained for up to 24 months. Opt-out records are retained indefinitely to ensure compliance.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
                        <h2 className="text-xl font-semibold text-white mb-4">7. Your Rights</h2>
                        <p className="text-gray-400 leading-relaxed mb-3">Depending on your jurisdiction, you may have the right to:</p>
                        <ul className="space-y-2 text-gray-400">
                            <li className="flex gap-2"><span className="text-blue-400 mt-1">•</span><span>Access, correct, or delete your personal data.</span></li>
                            <li className="flex gap-2"><span className="text-blue-400 mt-1">•</span><span>Withdraw consent to RCS messaging at any time (reply STOP).</span></li>
                            <li className="flex gap-2"><span className="text-blue-400 mt-1">•</span><span>Object to or restrict certain processing activities.</span></li>
                            <li className="flex gap-2"><span className="text-blue-400 mt-1">•</span><span>Lodge a complaint with a data protection authority.</span></li>
                        </ul>
                        <p className="text-gray-400 leading-relaxed mt-3">To exercise your rights, contact us at <a href="mailto:info@wahenoormedia.com" className="text-blue-400 hover:underline">info@wahenoormedia.com</a>.</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
                        <h2 className="text-xl font-semibold text-white mb-4">8. Security</h2>
                        <p className="text-gray-400 leading-relaxed">
                            We implement industry-standard security measures to protect your data, including SSL encryption, access controls, and regular security audits. However, no method of transmission over the Internet is 100% secure.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
                        <h2 className="text-xl font-semibold text-white mb-4">9. Contact Us</h2>
                        <p className="text-gray-400 leading-relaxed mb-4">For privacy-related questions or requests:</p>
                        <div className="flex flex-col gap-3">
                            <a href="mailto:info@wahenoormedia.com" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300">
                                <Mail className="w-4 h-4" /> info@wahenoormedia.com
                            </a>
                            <a href="tel:+917009039292" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300">
                                <Phone className="w-4 h-4" /> +91-7009039292
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}