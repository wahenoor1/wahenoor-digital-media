import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Pencil, Trash2, Search, TrendingUp, Upload } from 'lucide-react';
import { toast } from 'sonner';
import AdminGuard from '@/components/admin/AdminGuard';

const verticals = ['CPL', 'CPA', 'CPS', 'CPD', 'CPM', 'Health Insurance', 'Home Improvement', 'Fintech', 'Sweepstakes', 'Crypto', 'AI'];

export default function AdminOffers() {
    return (
        <AdminGuard>
            <AdminOffersContent />
        </AdminGuard>
    );
}

function AdminOffersContent() {
    const [showForm, setShowForm] = useState(false);
    const [editingOffer, setEditingOffer] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterVertical, setFilterVertical] = useState('all');
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        campaign_name: '',
        campaign_logo: '',
        vertical: '',
        sub_vertical: '',
        geo: '',
        kpi: '',
        payout_type: 'fixed',
        payout: '',
        payout_currency: 'INR',
        platform: 'Both',
        daily_cap: '',
        traffic_sources: [],
        description: '',
        status: 'active'
    });

    const queryClient = useQueryClient();

    const { data: offers = [], isLoading } = useQuery({
        queryKey: ['offers'],
        queryFn: () => base44.entities.Offer.list('-created_date'),
    });

    const createMutation = useMutation({
        mutationFn: (data) => base44.entities.Offer.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['offers'] });
            resetForm();
            toast.success('Offer created successfully!');
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => base44.entities.Offer.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['offers'] });
            resetForm();
            toast.success('Offer updated successfully!');
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => base44.entities.Offer.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['offers'] });
            toast.success('Offer deleted!');
        },
    });

    const resetForm = () => {
        setShowForm(false);
        setEditingOffer(null);
        setFormData({
            campaign_name: '',
            campaign_logo: '',
            vertical: '',
            sub_vertical: '',
            geo: '',
            kpi: '',
            payout_type: 'fixed',
            payout: '',
            payout_currency: 'INR',
            platform: 'Both',
            daily_cap: '',
            traffic_sources: [],
            description: '',
            status: 'active'
        });
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const { file_url } = await base44.integrations.Core.UploadFile({ file });
            setFormData(prev => ({ ...prev, campaign_logo: file_url }));
            toast.success('Logo uploaded successfully!');
        } catch (error) {
            toast.error('Failed to upload logo');
        } finally {
            setUploading(false);
        }
    };

    const handleEdit = (offer) => {
        setEditingOffer(offer);
        setFormData(offer);
        setShowForm(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.campaign_name || !formData.vertical || !formData.payout) {
            toast.error('Please fill in required fields');
            return;
        }

        const data = {
            ...formData,
            payout: parseFloat(formData.payout),
            daily_cap: formData.daily_cap ? parseFloat(formData.daily_cap) : null
        };

        if (editingOffer) {
            updateMutation.mutate({ id: editingOffer.id, data });
        } else {
            createMutation.mutate(data);
        }
    };

    const filteredOffers = offers.filter(offer => {
        const matchesSearch = offer.campaign_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            offer.sub_vertical?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesVertical = filterVertical === 'all' || offer.vertical === filterVertical;
        return matchesSearch && matchesVertical;
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Offers Management</h1>
                        <p className="text-gray-600 mt-1">Manage campaigns and offers across all verticals</p>
                    </div>
                    <Button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        {showForm ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                        {showForm ? 'Cancel' : 'Add New Offer'}
                    </Button>
                </div>

                {showForm && (
                    <Card className="mb-8 shadow-lg">
                        <CardHeader>
                            <CardTitle>{editingOffer ? 'Edit Offer' : 'Add New Offer'}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Campaign Logo Upload */}
                                <div className="space-y-2">
                                    <Label>Campaign Logo</Label>
                                    <div className="flex items-center gap-4">
                                        <label className="cursor-pointer">
                                            <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                                <Upload className="w-4 h-4" />
                                                <span>{uploading ? 'Uploading...' : 'Upload Logo'}</span>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileUpload}
                                                className="hidden"
                                                disabled={uploading}
                                            />
                                        </label>
                                        {formData.campaign_logo && (
                                            <div className="relative w-20 h-20 rounded-lg overflow-hidden border bg-white p-2">
                                                <img src={formData.campaign_logo} alt="Logo Preview" className="w-full h-full object-contain" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="campaign_name">Campaign Name *</Label>
                                        <Input
                                            id="campaign_name"
                                            value={formData.campaign_name}
                                            onChange={(e) => setFormData(prev => ({ ...prev, campaign_name: e.target.value }))}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="vertical">Vertical *</Label>
                                        <Select
                                            value={formData.vertical}
                                            onValueChange={(value) => setFormData(prev => ({ ...prev, vertical: value }))}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select vertical" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {verticals.map(v => (
                                                    <SelectItem key={v} value={v}>{v}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="sub_vertical">Sub Vertical</Label>
                                        <Input
                                            id="sub_vertical"
                                            value={formData.sub_vertical}
                                            onChange={(e) => setFormData(prev => ({ ...prev, sub_vertical: e.target.value }))}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="geo">Geo/Location</Label>
                                        <Input
                                            id="geo"
                                            value={formData.geo}
                                            onChange={(e) => setFormData(prev => ({ ...prev, geo: e.target.value }))}
                                            placeholder="e.g., India, USA, Global"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="kpi">KPI</Label>
                                        <Input
                                            id="kpi"
                                            value={formData.kpi}
                                            onChange={(e) => setFormData(prev => ({ ...prev, kpi: e.target.value }))}
                                            placeholder="e.g., Lead, Sale, Install"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="payout_type">Payout Type *</Label>
                                        <Select
                                            value={formData.payout_type}
                                            onValueChange={(value) => setFormData(prev => ({ ...prev, payout_type: value }))}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="fixed">Fixed Payout</SelectItem>
                                                <SelectItem value="revenue_share">Revenue Share (%)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="payout">
                                            {formData.payout_type === 'revenue_share' ? 'Revenue Share (%) *' : 'Payout Amount *'}
                                        </Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="payout"
                                                type="number"
                                                step="0.01"
                                                value={formData.payout}
                                                onChange={(e) => setFormData(prev => ({ ...prev, payout: e.target.value }))}
                                                required
                                                className="flex-1"
                                                placeholder={formData.payout_type === 'revenue_share' ? 'e.g., 30' : 'e.g., 500'}
                                            />
                                            {formData.payout_type === 'fixed' ? (
                                                <Select
                                                    value={formData.payout_currency}
                                                    onValueChange={(value) => setFormData(prev => ({ ...prev, payout_currency: value }))}
                                                >
                                                    <SelectTrigger className="w-24">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="INR">INR</SelectItem>
                                                        <SelectItem value="USD">USD</SelectItem>
                                                        <SelectItem value="EUR">EUR</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            ) : (
                                                <div className="w-12 flex items-center justify-center text-gray-500 text-lg font-semibold">
                                                    %
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="platform">Platform</Label>
                                        <Select
                                            value={formData.platform}
                                            onValueChange={(value) => setFormData(prev => ({ ...prev, platform: value }))}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Mobile">Mobile</SelectItem>
                                                <SelectItem value="Web">Web</SelectItem>
                                                <SelectItem value="Both">Both</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="daily_cap">Daily Cap</Label>
                                        <Input
                                            id="daily_cap"
                                            type="number"
                                            value={formData.daily_cap}
                                            onChange={(e) => setFormData(prev => ({ ...prev, daily_cap: e.target.value }))}
                                            placeholder="Optional"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="traffic_sources">Allowed Traffic Sources</Label>
                                    <Textarea
                                        id="traffic_sources"
                                        value={formData.traffic_sources.join(', ')}
                                        onChange={(e) => setFormData(prev => ({ 
                                            ...prev, 
                                            traffic_sources: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                                        }))}
                                        placeholder="Enter allowed traffic sources separated by commas. E.g., Facebook Ads, Google Ads, Email Marketing, Native Ads, Push Notifications, SEO, Social Media, Influencer Marketing, YouTube, TikTok"
                                        rows={3}
                                    />
                                    <p className="text-xs text-gray-500">
                                        Common sources: Facebook Ads, Google Ads, Email, Native Ads, Push Notifications, SEO, Social Media, Influencer, YouTube, TikTok, Display Ads
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                        rows={3}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        value={formData.status}
                                        onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="paused">Paused</SelectItem>
                                            <SelectItem value="ended">Ended</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex justify-end gap-3">
                                    <Button type="button" variant="outline" onClick={resetForm}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                                        {editingOffer ? 'Update Offer' : 'Create Offer'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Filters */}
                <Card className="mb-6">
                    <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    placeholder="Search campaigns..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={filterVertical} onValueChange={setFilterVertical}>
                                <SelectTrigger className="w-full sm:w-48">
                                    <SelectValue placeholder="Filter by vertical" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Verticals</SelectItem>
                                    {verticals.map(v => (
                                        <SelectItem key={v} value={v}>{v}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Offers List */}
                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="text-gray-600">Loading offers...</div>
                    </div>
                ) : filteredOffers.length === 0 ? (
                    <Card className="text-center py-12">
                        <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">No offers found</p>
                        <Button onClick={() => setShowForm(true)}>Create Your First Offer</Button>
                    </Card>
                ) : (
                    <div className="grid gap-4">
                        {filteredOffers.map((offer) => (
                            <Card key={offer.id} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-start gap-4 mb-3">
                                                {offer.campaign_logo && (
                                                    <div className="w-16 h-16 rounded-lg overflow-hidden border bg-white p-2 flex-shrink-0">
                                                        <img src={offer.campaign_logo} alt={offer.campaign_name} className="w-full h-full object-contain" />
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{offer.campaign_name}</h3>
                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        <Badge className="bg-blue-100 text-blue-800">{offer.vertical}</Badge>
                                                        {offer.sub_vertical && (
                                                            <Badge variant="outline">{offer.sub_vertical}</Badge>
                                                        )}
                                                        <Badge className={
                                                            offer.status === 'active' ? 'bg-green-100 text-green-800' :
                                                            offer.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-gray-100 text-gray-800'
                                                        }>
                                                            {offer.status}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                <div>
                                                    <span className="text-gray-500">Payout:</span>
                                                    <p className="font-semibold text-green-600">
                                                        {offer.payout_type === 'revenue_share' ? (
                                                            <>{offer.payout}%</>
                                                        ) : (
                                                            <>{offer.payout_currency} {offer.payout}</>
                                                        )}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {offer.payout_type === 'revenue_share' ? 'Revenue Share' : 'Fixed'}
                                                    </p>
                                                </div>
                                                {offer.geo && (
                                                    <div>
                                                        <span className="text-gray-500">Geo:</span>
                                                        <p className="font-medium">{offer.geo}</p>
                                                    </div>
                                                )}
                                                {offer.platform && (
                                                    <div>
                                                        <span className="text-gray-500">Platform:</span>
                                                        <p className="font-medium">{offer.platform}</p>
                                                    </div>
                                                )}
                                                {offer.daily_cap && (
                                                    <div>
                                                        <span className="text-gray-500">Daily Cap:</span>
                                                        <p className="font-medium">{offer.daily_cap}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleEdit(offer)}
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => {
                                                    if (confirm('Delete this offer?')) {
                                                        deleteMutation.mutate(offer.id);
                                                    }
                                                }}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}