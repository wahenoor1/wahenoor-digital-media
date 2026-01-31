import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function WishlistCampaignDialog({ open, onOpenChange }) {
    const [formData, setFormData] = useState({
        campaign_name: '',
        vertical: '',
        description: '',
        target_geo: '',
        expected_payout: '',
        contact_name: '',
        contact_email: '',
        contact_phone: '',
        telegram_username: '',
        preferred_contact: 'email'
    });

    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: (data) => base44.entities.CampaignRequest.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['campaign-requests'] });
            toast.success('Campaign request submitted! We will contact you soon.');
            setFormData({
                campaign_name: '',
                vertical: '',
                description: '',
                target_geo: '',
                expected_payout: '',
                contact_name: '',
                contact_email: '',
                contact_phone: '',
                telegram_username: '',
                preferred_contact: 'email'
            });
            onOpenChange(false);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.campaign_name || !formData.contact_name || !formData.contact_email) {
            toast.error('Please fill in required fields');
            return;
        }
        createMutation.mutate(formData);
    };

    const whatsappNumber = formData.contact_phone?.replace(/\D/g, '');
    const whatsappLink = whatsappNumber ? `https://wa.me/${whatsappNumber}` : null;
    const telegramLink = formData.telegram_username ? `https://t.me/${formData.telegram_username.replace('@', '')}` : null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#0F172A] border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Request Custom Campaign</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Can't find what you're looking for? Tell us about your campaign needs and we'll connect you with the right advertisers.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="campaign_name">Campaign Name *</Label>
                                <Input
                                    id="campaign_name"
                                    value={formData.campaign_name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, campaign_name: e.target.value }))}
                                    placeholder="e.g., Health Insurance Lead Gen"
                                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="vertical">Vertical/Category</Label>
                                <Input
                                    id="vertical"
                                    value={formData.vertical}
                                    onChange={(e) => setFormData(prev => ({ ...prev, vertical: e.target.value }))}
                                    placeholder="e.g., Health Insurance, Fintech"
                                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Campaign Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Describe your campaign requirements, target audience, and any specific needs..."
                                rows={3}
                                className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="target_geo">Target Geography</Label>
                                <Input
                                    id="target_geo"
                                    value={formData.target_geo}
                                    onChange={(e) => setFormData(prev => ({ ...prev, target_geo: e.target.value }))}
                                    placeholder="e.g., India, USA, Global"
                                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="expected_payout">Expected Payout Range</Label>
                                <Input
                                    id="expected_payout"
                                    value={formData.expected_payout}
                                    onChange={(e) => setFormData(prev => ({ ...prev, expected_payout: e.target.value }))}
                                    placeholder="e.g., $50-100 per lead"
                                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-6 space-y-4">
                        <h3 className="text-lg font-semibold">Contact Information</h3>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="contact_name">Your Name *</Label>
                                <Input
                                    id="contact_name"
                                    value={formData.contact_name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, contact_name: e.target.value }))}
                                    placeholder="Full name"
                                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="contact_email">Email *</Label>
                                <Input
                                    id="contact_email"
                                    type="email"
                                    value={formData.contact_email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, contact_email: e.target.value }))}
                                    placeholder="your@email.com"
                                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="contact_phone">WhatsApp Number</Label>
                                <Input
                                    id="contact_phone"
                                    value={formData.contact_phone}
                                    onChange={(e) => setFormData(prev => ({ ...prev, contact_phone: e.target.value }))}
                                    placeholder="+91 1234567890"
                                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="telegram_username">Telegram Username</Label>
                                <Input
                                    id="telegram_username"
                                    value={formData.telegram_username}
                                    onChange={(e) => setFormData(prev => ({ ...prev, telegram_username: e.target.value }))}
                                    placeholder="@username"
                                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="preferred_contact">Preferred Contact Method</Label>
                            <Select
                                value={formData.preferred_contact}
                                onValueChange={(value) => setFormData(prev => ({ ...prev, preferred_contact: value }))}
                            >
                                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="email">Email</SelectItem>
                                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                                    <SelectItem value="telegram">Telegram</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {whatsappLink && (
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <MessageCircle className="w-4 h-4" />
                                <span>Or contact us directly on</span>
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-400 hover:text-green-300 underline"
                                >
                                    WhatsApp
                                </a>
                            </div>
                        )}

                        {telegramLink && (
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Send className="w-4 h-4" />
                                <span>Or reach us on</span>
                                <a
                                    href={telegramLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 underline"
                                >
                                    Telegram
                                </a>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1 border-white/20 text-white hover:bg-white/10">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={createMutation.isPending} className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                            {createMutation.isPending ? 'Submitting...' : 'Submit Request'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}