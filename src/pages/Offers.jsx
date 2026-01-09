import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, TrendingUp, Globe, Smartphone, DollarSign, Target, ExternalLink, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const verticals = ['CPL', 'CPA', 'CPS', 'CPD', 'CPM', 'Health Insurance', 'Home Improvement', 'Fintech', 'Sweepstakes', 'Crypto', 'AI'];

export default function Offers() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterVertical, setFilterVertical] = useState('all');
    const [filterGeo, setFilterGeo] = useState('all');
    const [filterPlatform, setFilterPlatform] = useState('all');
    const [selectedOffer, setSelectedOffer] = useState(null);

    const { data: offers = [], isLoading } = useQuery({
        queryKey: ['offers'],
        queryFn: () => base44.entities.Offer.filter({ status: 'active' }, '-created_date'),
    });

    const filteredOffers = offers.filter(offer => {
        const matchesSearch = offer.campaign_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            offer.sub_vertical?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesVertical = filterVertical === 'all' || offer.vertical === filterVertical;
        const matchesGeo = filterGeo === 'all' || offer.geo?.toLowerCase().includes(filterGeo.toLowerCase());
        const matchesPlatform = filterPlatform === 'all' || offer.platform === filterPlatform;
        return matchesSearch && matchesVertical && matchesGeo && matchesPlatform;
    });

    const uniqueGeos = [...new Set(offers.map(o => o.geo).filter(Boolean))].sort();

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0A1628] to-[#0F172A] py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Available
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Offers </span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Browse our high-converting campaigns across all verticals
                    </p>
                </motion.div>

                {/* Filters */}
                <Card className="mb-8 bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardContent className="p-6">
                        <div className="grid gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    placeholder="Search campaigns..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <Select value={filterVertical} onValueChange={setFilterVertical}>
                                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                        <SelectValue placeholder="All Verticals" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Verticals</SelectItem>
                                        {verticals.map(v => (
                                            <SelectItem key={v} value={v}>{v}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                
                                <Select value={filterGeo} onValueChange={setFilterGeo}>
                                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                        <SelectValue placeholder="All Geographies" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Geographies</SelectItem>
                                        {uniqueGeos.map(geo => (
                                            <SelectItem key={geo} value={geo}>{geo}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                
                                <Select value={filterPlatform} onValueChange={setFilterPlatform}>
                                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                        <SelectValue placeholder="All Devices" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Devices</SelectItem>
                                        <SelectItem value="Mobile">Mobile</SelectItem>
                                        <SelectItem value="Web">Web</SelectItem>
                                        <SelectItem value="Both">Both</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Offers List */}
                {isLoading ? (
                    <div className="text-center py-12 text-gray-400">Loading offers...</div>
                ) : filteredOffers.length === 0 ? (
                    <Card className="text-center py-12 bg-white/5 border-white/10">
                        <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400 mb-4">No offers found</p>
                    </Card>
                ) : (
                    <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Campaign</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Category</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Payout</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Location</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Status</th>
                                        <th className="text-right py-4 px-6 text-sm font-semibold text-gray-400"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOffers.map((offer, index) => (
                                        <motion.tr
                                            key={offer.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3, delay: index * 0.02 }}
                                            onClick={() => setSelectedOffer(offer)}
                                            className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
                                        >
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    {offer.campaign_logo && (
                                                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/20 bg-white p-1.5 flex-shrink-0">
                                                            <img src={offer.campaign_logo} alt={offer.campaign_name} className="w-full h-full object-contain" />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="text-white font-medium">{offer.campaign_name}</p>
                                                        {offer.sub_vertical && (
                                                            <p className="text-xs text-gray-400">{offer.sub_vertical}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                                                    {offer.vertical}
                                                </Badge>
                                            </td>
                                            <td className="py-4 px-6">
                                                <p className="text-green-400 font-semibold">
                                                    {offer.payout_type === 'revenue_share' ? (
                                                        <>{offer.payout}%</>
                                                    ) : (
                                                        <>{offer.payout_currency} {offer.payout}</>
                                                    )}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {offer.payout_type === 'revenue_share' ? 'RevShare' : 'Fixed'}
                                                </p>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-1.5 text-gray-300">
                                                    <Globe className="w-3.5 h-3.5" />
                                                    <span className="text-sm">{offer.geo || 'Global'}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                                                    Active
                                                </Badge>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}

                {/* Offer Detail Modal */}
                <Dialog open={!!selectedOffer} onOpenChange={() => setSelectedOffer(null)}>
                    <DialogContent className="bg-[#0F172A] border-white/10 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
                        {selectedOffer && (
                            <>
                                <DialogHeader>
                                    <div className="flex items-start gap-4 mb-4">
                                        {selectedOffer.campaign_logo && (
                                            <div className="w-20 h-20 rounded-lg overflow-hidden border border-white/20 bg-white p-2 flex-shrink-0">
                                                <img src={selectedOffer.campaign_logo} alt={selectedOffer.campaign_name} className="w-full h-full object-contain" />
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <DialogTitle className="text-2xl text-white mb-2">{selectedOffer.campaign_name}</DialogTitle>
                                            <div className="flex flex-wrap gap-2">
                                                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                                                    {selectedOffer.vertical}
                                                </Badge>
                                                {selectedOffer.sub_vertical && (
                                                    <Badge variant="outline" className="border-white/20 text-gray-300">
                                                        {selectedOffer.sub_vertical}
                                                    </Badge>
                                                )}
                                                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                                                    Active
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </DialogHeader>

                                <div className="space-y-6">
                                    {selectedOffer.description && (
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-400 mb-2">Description</h3>
                                            <p className="text-gray-300">{selectedOffer.description}</p>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                            <div className="flex items-center gap-2 mb-2">
                                                <DollarSign className="w-5 h-5 text-green-400" />
                                                <span className="text-sm text-gray-400">Payout</span>
                                            </div>
                                            <p className="text-xl font-bold text-green-400">
                                                {selectedOffer.payout_type === 'revenue_share' ? (
                                                    <>{selectedOffer.payout}% RevShare</>
                                                ) : (
                                                    <>{selectedOffer.payout_currency} {selectedOffer.payout}</>
                                                )}
                                            </p>
                                        </div>

                                        {selectedOffer.geo && (
                                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Globe className="w-5 h-5 text-blue-400" />
                                                    <span className="text-sm text-gray-400">Geography</span>
                                                </div>
                                                <p className="text-xl font-bold text-white">{selectedOffer.geo}</p>
                                            </div>
                                        )}

                                        {selectedOffer.platform && (
                                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Smartphone className="w-5 h-5 text-purple-400" />
                                                    <span className="text-sm text-gray-400">Platform</span>
                                                </div>
                                                <p className="text-xl font-bold text-white">{selectedOffer.platform}</p>
                                            </div>
                                        )}

                                        {selectedOffer.kpi && (
                                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Target className="w-5 h-5 text-orange-400" />
                                                    <span className="text-sm text-gray-400">KPI</span>
                                                </div>
                                                <p className="text-xl font-bold text-white">{selectedOffer.kpi}</p>
                                            </div>
                                        )}

                                        {selectedOffer.daily_cap && (
                                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <TrendingUp className="w-5 h-5 text-yellow-400" />
                                                    <span className="text-sm text-gray-400">Daily Cap</span>
                                                </div>
                                                <p className="text-xl font-bold text-white">{selectedOffer.daily_cap}</p>
                                            </div>
                                        )}
                                    </div>

                                    {selectedOffer.traffic_sources && selectedOffer.traffic_sources.length > 0 && (
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-400 mb-3">Allowed Traffic Sources</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedOffer.traffic_sources.map((source, idx) => (
                                                    <Badge key={idx} variant="outline" className="border-white/20 text-gray-300">
                                                        {source}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <a
                                        href="https://wahenoor.offer18.com/m/login"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                    >
                                        <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-6 text-lg">
                                            Apply to This Offer
                                            <ExternalLink className="w-5 h-5 ml-2" />
                                        </Button>
                                    </a>
                                </div>
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}