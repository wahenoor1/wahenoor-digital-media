import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, TrendingUp, Globe, Smartphone, DollarSign, Target, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const verticals = ['CPL', 'CPA', 'CPS', 'CPD', 'CPM', 'Health Insurance', 'Home Improvement', 'Fintech', 'Sweepstakes', 'Crypto', 'AI'];

export default function Offers() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterVertical, setFilterVertical] = useState('all');
    const [filterGeo, setFilterGeo] = useState('all');
    const [filterPlatform, setFilterPlatform] = useState('all');

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

                {/* Offers Grid */}
                {isLoading ? (
                    <div className="text-center py-12 text-gray-400">Loading offers...</div>
                ) : filteredOffers.length === 0 ? (
                    <Card className="text-center py-12 bg-white/5 border-white/10">
                        <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400 mb-4">No offers found</p>
                    </Card>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {filteredOffers.map((offer, index) => (
                            <motion.div
                                key={offer.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                <Card className="h-full bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all">
                                    <CardHeader>
                                        <div className="flex items-start gap-4 mb-3">
                                            {offer.campaign_logo && (
                                                <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/20 bg-white p-2 flex-shrink-0">
                                                    <img src={offer.campaign_logo} alt={offer.campaign_name} className="w-full h-full object-contain" />
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <CardTitle className="text-xl text-white mb-2">{offer.campaign_name}</CardTitle>
                                                <div className="flex flex-wrap gap-2">
                                                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                                                        {offer.vertical}
                                                    </Badge>
                                                    {offer.sub_vertical && (
                                                        <Badge variant="outline" className="border-white/20 text-gray-300">
                                                            {offer.sub_vertical}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        {offer.description && (
                                            <p className="text-gray-400 text-sm mb-4">{offer.description}</p>
                                        )}
                                        
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="w-4 h-4 text-green-400" />
                                                <div>
                                                    <p className="text-xs text-gray-500">Payout</p>
                                                    <p className="text-green-400 font-bold">
                                                        {offer.payout_type === 'revenue_share' ? (
                                                            <>{offer.payout}% RevShare</>
                                                        ) : (
                                                            <>{offer.payout_currency} {offer.payout}</>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            {offer.geo && (
                                                <div className="flex items-center gap-2">
                                                    <Globe className="w-4 h-4 text-blue-400" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">Geography</p>
                                                        <p className="text-gray-300 text-sm">{offer.geo}</p>
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {offer.platform && (
                                                <div className="flex items-center gap-2">
                                                    <Smartphone className="w-4 h-4 text-purple-400" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">Platform</p>
                                                        <p className="text-gray-300 text-sm">{offer.platform}</p>
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {offer.kpi && (
                                                <div className="flex items-center gap-2">
                                                    <Target className="w-4 h-4 text-orange-400" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">KPI</p>
                                                        <p className="text-gray-300 text-sm">{offer.kpi}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {offer.traffic_sources && offer.traffic_sources.length > 0 && (
                                            <div className="mb-4">
                                                <p className="text-xs text-gray-500 mb-2">Allowed Traffic Sources:</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {offer.traffic_sources.map((source, idx) => (
                                                        <Badge key={idx} variant="outline" className="text-xs border-white/20 text-gray-400">
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
                                        >
                                            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                                                Apply Now
                                                <ExternalLink className="w-4 h-4 ml-2" />
                                            </Button>
                                        </a>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}