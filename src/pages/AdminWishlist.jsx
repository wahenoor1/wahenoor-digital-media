import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Heart, Trash2, Mail, MessageCircle, Send, Eye, Plus, X, Pencil, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import AdminGuard from '@/components/admin/AdminGuard';

const verticals = ['CPL', 'CPA', 'CPS', 'CPD', 'CPM', 'Health Insurance', 'Home Improvement', 'Fintech', 'Sweepstakes', 'Crypto', 'AI'];

export default function AdminWishlist() {
    return (
        <AdminGuard>
            <AdminWishlistContent />
        </AdminGuard>
    );
}

function AdminWishlistContent() {
    const [activeTab, setActiveTab] = useState('offers');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showOfferForm, setShowOfferForm] = useState(false);
    const [editingOffer, setEditingOffer] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [offerFormData, setOfferFormData] = useState({
        campaign_name: '',
        campaign_logo: '',
        vertical: '',
        sub_vertical: '',
        target_geo: '',
        payout_type: 'fixed',
        payout: '',
        payout_currency: 'INR',
        description: '',
        requirements: '',
        status: 'active'
    });

    const queryClient = useQueryClient();

    const { data: requests = [], isLoading: loadingRequests } = useQuery({
        queryKey: ['campaign-requests'],
        queryFn: () => base44.entities.CampaignRequest.list('-created_date'),
    });

    const { data: wishlistOffers = [], isLoading: loadingOffers } = useQuery({
        queryKey: ['wishlist-offers'],
        queryFn: () => base44.entities.WishlistOffer.list('-created_date'),
    });

    const updateRequestMutation = useMutation({
        mutationFn: ({ id, data }) => base44.entities.CampaignRequest.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['campaign-requests'] });
            toast.success('Status updated!');
            setSelectedRequest(null);
        },
    });

    const deleteRequestMutation = useMutation({
        mutationFn: (id) => base44.entities.CampaignRequest.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['campaign-requests'] });
            toast.success('Request deleted!');
        },
    });

    const createOfferMutation = useMutation({
        mutationFn: (data) => base44.entities.WishlistOffer.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist-offers'] });
            resetOfferForm();
            toast.success('Wishlist offer created!');
        },
    });

    const updateOfferMutation = useMutation({
        mutationFn: ({ id, data }) => base44.entities.WishlistOffer.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist-offers'] });
            resetOfferForm();
            toast.success('Wishlist offer updated!');
        },
    });

    const deleteOfferMutation = useMutation({
        mutationFn: (id) => base44.entities.WishlistOffer.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist-offers'] });
            toast.success('Wishlist offer deleted!');
        },
    });

    const resetOfferForm = () => {
        setShowOfferForm(false);
        setEditingOffer(null);
        setOfferFormData({
            campaign_name: '',
            campaign_logo: '',
            vertical: '',
            sub_vertical: '',
            target_geo: '',
            payout_type: 'fixed',
            payout: '',
            payout_currency: 'INR',
            description: '',
            requirements: '',
            status: 'active'
        });
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const { file_url } = await base44.integrations.Core.UploadFile({ file });
            setOfferFormData(prev => ({ ...prev, campaign_logo: file_url }));
            toast.success('Logo uploaded!');
        } catch (error) {
            toast.error('Failed to upload logo');
        } finally {
            setUploading(false);
        }
    };

    const handleEditOffer = (offer) => {
        setEditingOffer(offer);
        setOfferFormData(offer);
        setShowOfferForm(true);
    };

    const handleSubmitOffer = (e) => {
        e.preventDefault();
        if (!offerFormData.campaign_name || !offerFormData.vertical) {
            toast.error('Please fill in required fields');
            return;
        }

        const data = {
            ...offerFormData,
            payout: offerFormData.payout ? parseFloat(offerFormData.payout) : null
        };

        if (editingOffer) {
            updateOfferMutation.mutate({ id: editingOffer.id, data });
        } else {
            createOfferMutation.mutate(data);
        }
    };

    const filteredRequests = requests.filter(req => {
        const matchesSearch = req.campaign_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            req.contact_name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const filteredOffers = wishlistOffers.filter(offer => {
        const matchesSearch = offer.campaign_name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || offer.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const statusColors = {
        pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
        contacted: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        in_progress: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        completed: 'bg-green-500/20 text-green-300 border-green-500/30',
        rejected: 'bg-red-500/20 text-red-300 border-red-500/30',
        active: 'bg-green-500/20 text-green-300 border-green-500/30',
        inactive: 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    };

    const whatsappLink = (phone) => phone ? `https://wa.me/${phone.replace(/\D/g, '')}` : null;
    const telegramLink = (username) => username ? `https://t.me/${username.replace('@', '')}` : null;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Wishlist Management</h1>
                        <p className="text-gray-600 mt-1">Manage wishlist offers and advertiser requests</p>
                    </div>
                    {activeTab === 'offers' && (
                        <Button
                            onClick={() => setShowOfferForm(!showOfferForm)}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            {showOfferForm ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                            {showOfferForm ? 'Cancel' : 'Add Wishlist Offer'}
                        </Button>
                    )}
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-6 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('offers')}
                        className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
                            activeTab === 'offers'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Wishlist Offers ({wishlistOffers.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('requests')}
                        className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
                            activeTab === 'requests'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Advertiser Requests ({requests.length})
                    </button>
                </div>

                {/* Offer Form */}
                {activeTab === 'offers' && showOfferForm && (
                    <Card className="mb-8 shadow-lg">
                        <CardHeader>
                            <CardTitle>{editingOffer ? 'Edit Wishlist Offer' : 'Add New Wishlist Offer'}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmitOffer} className="space-y-6">
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
                                        {offerFormData.campaign_logo && (
                                            <div className="w-20 h-20 rounded-lg overflow-hidden border bg-white p-2">
                                                <img src={offerFormData.campaign_logo} alt="Logo" className="w-full h-full object-contain" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="campaign_name">Campaign Name *</Label>
                                        <Input
                                            id="campaign_name"
                                            value={offerFormData.campaign_name}
                                            onChange={(e) => setOfferFormData(prev => ({ ...prev, campaign_name: e.target.value }))}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="vertical">Vertical *</Label>
                                        <Select
                                            value={offerFormData.vertical}
                                            onValueChange={(value) => setOfferFormData(prev => ({ ...prev, vertical: value }))}
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
                                            value={offerFormData.sub_vertical}
                                            onChange={(e) => setOfferFormData(prev => ({ ...prev, sub_vertical: e.target.value }))}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="target_geo">Target Geography</Label>
                                        <Input
                                            id="target_geo"
                                            value={offerFormData.target_geo}
                                            onChange={(e) => setOfferFormData(prev => ({ ...prev, target_geo: e.target.value }))}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="payout_type">Payout Type</Label>
                                        <Select
                                            value={offerFormData.payout_type}
                                            onValueChange={(value) => setOfferFormData(prev => ({ ...prev, payout_type: value }))}
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
                                        <Label htmlFor="payout">Payout</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="payout"
                                                type="number"
                                                step="0.01"
                                                value={offerFormData.payout}
                                                onChange={(e) => setOfferFormData(prev => ({ ...prev, payout: e.target.value }))}
                                                className="flex-1"
                                            />
                                            {offerFormData.payout_type === 'fixed' && (
                                                <Select
                                                    value={offerFormData.payout_currency}
                                                    onValueChange={(value) => setOfferFormData(prev => ({ ...prev, payout_currency: value }))}
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
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={offerFormData.description}
                                        onChange={(e) => setOfferFormData(prev => ({ ...prev, description: e.target.value }))}
                                        rows={3}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="requirements">Requirements</Label>
                                    <Textarea
                                        id="requirements"
                                        value={offerFormData.requirements}
                                        onChange={(e) => setOfferFormData(prev => ({ ...prev, requirements: e.target.value }))}
                                        rows={3}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        value={offerFormData.status}
                                        onValueChange={(value) => setOfferFormData(prev => ({ ...prev, status: value }))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex justify-end gap-3">
                                    <Button type="button" variant="outline" onClick={resetOfferForm}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">
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
                                    placeholder={activeTab === 'offers' ? 'Search offers...' : 'Search requests...'}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={filterStatus} onValueChange={setFilterStatus}>
                                <SelectTrigger className="w-full sm:w-48">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    {activeTab === 'offers' ? (
                                        <>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                        </>
                                    ) : (
                                        <>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="contacted">Contacted</SelectItem>
                                            <SelectItem value="in_progress">In Progress</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="rejected">Rejected</SelectItem>
                                        </>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Wishlist Offers List */}
                {activeTab === 'offers' && (
                    <>
                        {loadingOffers ? (
                            <div className="text-center py-12">Loading offers...</div>
                        ) : filteredOffers.length === 0 ? (
                            <Card className="text-center py-12">
                                <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 mb-4">No wishlist offers found</p>
                                <Button onClick={() => setShowOfferForm(true)}>Create Your First Offer</Button>
                            </Card>
                        ) : (
                            <div className="grid gap-4">
                                {filteredOffers.map((offer) => (
                                    <Card key={offer.id} className="hover:shadow-lg transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex items-start gap-4 flex-1">
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
                                                            <Badge className={statusColors[offer.status]}>
                                                                {offer.status}
                                                            </Badge>
                                                        </div>
                                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                                            {offer.payout && (
                                                                <div>
                                                                    <span className="text-gray-500">Payout:</span>
                                                                    <p className="font-semibold text-green-600">
                                                                        {offer.payout_type === 'revenue_share' ? 
                                                                            `${offer.payout}%` : 
                                                                            `${offer.payout_currency} ${offer.payout}`
                                                                        }
                                                                    </p>
                                                                </div>
                                                            )}
                                                            {offer.target_geo && (
                                                                <div>
                                                                    <span className="text-gray-500">Geo:</span>
                                                                    <p className="font-medium">{offer.target_geo}</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleEditOffer(offer)}
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => {
                                                            if (confirm('Delete this offer?')) {
                                                                deleteOfferMutation.mutate(offer.id);
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
                    </>
                )}

                {/* Advertiser Requests List */}
                {activeTab === 'requests' && (
                    <>
                        {loadingRequests ? (
                            <div className="text-center py-12">Loading requests...</div>
                        ) : filteredRequests.length === 0 ? (
                            <Card className="text-center py-12">
                                <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600">No requests found</p>
                            </Card>
                        ) : (
                            <Card className="overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr className="border-b border-gray-200">
                                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Campaign</th>
                                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Contact</th>
                                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Method</th>
                                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Date</th>
                                                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredRequests.map((request) => (
                                                <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                                    <td className="py-4 px-6">
                                                        <div>
                                                            <p className="font-medium text-gray-900">{request.campaign_name}</p>
                                                            {request.vertical && (
                                                                <p className="text-xs text-gray-500">{request.vertical}</p>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div>
                                                            <p className="text-sm text-gray-900">{request.contact_name}</p>
                                                            <p className="text-xs text-gray-500">{request.contact_email}</p>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center gap-2">
                                                            {request.preferred_contact === 'email' && <Mail className="w-4 h-4 text-gray-400" />}
                                                            {request.preferred_contact === 'whatsapp' && <MessageCircle className="w-4 h-4 text-green-500" />}
                                                            {request.preferred_contact === 'telegram' && <Send className="w-4 h-4 text-blue-500" />}
                                                            <span className="text-sm text-gray-600 capitalize">{request.preferred_contact}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <Badge className={statusColors[request.status]}>
                                                            {request.status.replace('_', ' ')}
                                                        </Badge>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <p className="text-sm text-gray-600">
                                                            {format(new Date(request.created_date), 'MMM d, yyyy')}
                                                        </p>
                                                    </td>
                                                    <td className="py-4 px-6 text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => setSelectedRequest(request)}
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </Button>
                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() => {
                                                                    if (confirm('Delete this request?')) {
                                                                        deleteRequestMutation.mutate(request.id);
                                                                    }
                                                                }}
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        )}
                    </>
                )}

                {/* Request Detail Modal */}
                <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                        {selectedRequest && (
                            <>
                                <DialogHeader>
                                    <DialogTitle className="text-2xl">{selectedRequest.campaign_name}</DialogTitle>
                                </DialogHeader>

                                <div className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-500 mb-1">Vertical</h3>
                                            <p className="text-gray-900">{selectedRequest.vertical || 'Not specified'}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-500 mb-1">Target Geo</h3>
                                            <p className="text-gray-900">{selectedRequest.target_geo || 'Not specified'}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-500 mb-1">Expected Payout</h3>
                                            <p className="text-gray-900">{selectedRequest.expected_payout || 'Not specified'}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-500 mb-1">Status</h3>
                                            <Select
                                                value={selectedRequest.status}
                                                onValueChange={(value) => updateRequestMutation.mutate({ 
                                                    id: selectedRequest.id, 
                                                    data: { ...selectedRequest, status: value } 
                                                })}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="pending">Pending</SelectItem>
                                                    <SelectItem value="contacted">Contacted</SelectItem>
                                                    <SelectItem value="in_progress">In Progress</SelectItem>
                                                    <SelectItem value="completed">Completed</SelectItem>
                                                    <SelectItem value="rejected">Rejected</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    {selectedRequest.description && (
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-500 mb-2">Description</h3>
                                            <p className="text-gray-700 leading-relaxed">{selectedRequest.description}</p>
                                        </div>
                                    )}

                                    <div className="border-t pt-6">
                                        <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-500 mb-1">Name</h4>
                                                <p className="text-gray-900">{selectedRequest.contact_name}</p>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-500 mb-1">Email</h4>
                                                <a href={`mailto:${selectedRequest.contact_email}`} className="text-blue-600 hover:underline">
                                                    {selectedRequest.contact_email}
                                                </a>
                                            </div>
                                            {selectedRequest.contact_phone && (
                                                <div>
                                                    <h4 className="text-sm font-semibold text-gray-500 mb-1">WhatsApp</h4>
                                                    <a href={whatsappLink(selectedRequest.contact_phone)} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline flex items-center gap-1">
                                                        <MessageCircle className="w-4 h-4" />
                                                        {selectedRequest.contact_phone}
                                                    </a>
                                                </div>
                                            )}
                                            {selectedRequest.telegram_username && (
                                                <div>
                                                    <h4 className="text-sm font-semibold text-gray-500 mb-1">Telegram</h4>
                                                    <a href={telegramLink(selectedRequest.telegram_username)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                                                        <Send className="w-4 h-4" />
                                                        {selectedRequest.telegram_username}
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}