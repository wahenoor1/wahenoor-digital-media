import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Heart, Trash2, Mail, Phone, MessageCircle, Send, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import AdminGuard from '@/components/admin/AdminGuard';

export default function AdminWishlist() {
    return (
        <AdminGuard>
            <AdminWishlistContent />
        </AdminGuard>
    );
}

function AdminWishlistContent() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedRequest, setSelectedRequest] = useState(null);

    const queryClient = useQueryClient();

    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['campaign-requests'],
        queryFn: () => base44.entities.CampaignRequest.list('-created_date'),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => base44.entities.CampaignRequest.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['campaign-requests'] });
            toast.success('Status updated!');
            setSelectedRequest(null);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => base44.entities.CampaignRequest.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['campaign-requests'] });
            toast.success('Request deleted!');
        },
    });

    const filteredRequests = requests.filter(req => {
        const matchesSearch = req.campaign_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            req.contact_name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const statusColors = {
        pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
        contacted: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        in_progress: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        completed: 'bg-green-500/20 text-green-300 border-green-500/30',
        rejected: 'bg-red-500/20 text-red-300 border-red-500/30'
    };

    const whatsappLink = (phone) => phone ? `https://wa.me/${phone.replace(/\D/g, '')}` : null;
    const telegramLink = (username) => username ? `https://t.me/${username.replace('@', '')}` : null;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Wishlist Campaign Requests</h1>
                    <p className="text-gray-600 mt-1">Manage custom campaign requests from advertisers</p>
                </div>

                {/* Filters */}
                <Card className="mb-6">
                    <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    placeholder="Search campaigns or contacts..."
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
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="contacted">Contacted</SelectItem>
                                    <SelectItem value="in_progress">In Progress</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Requests List */}
                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="text-gray-600">Loading requests...</div>
                    </div>
                ) : filteredRequests.length === 0 ? (
                    <Card className="text-center py-12">
                        <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">No wishlist requests found</p>
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
                                                                deleteMutation.mutate(request.id);
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

                {/* Detail Modal */}
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
                                                onValueChange={(value) => updateMutation.mutate({ 
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