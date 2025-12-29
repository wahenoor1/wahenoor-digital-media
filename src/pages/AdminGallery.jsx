import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Upload, X, Calendar, Image as ImageIcon } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import AdminGuard from '@/components/admin/AdminGuard';

export default function AdminGallery() {
    return (
        <AdminGuard>
            <AdminGalleryContent />
        </AdminGuard>
    );
}

function AdminGalleryContent() {
    const [showForm, setShowForm] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        images: [],
        event_date: '',
        category: 'other'
    });

    const queryClient = useQueryClient();

    const { data: gallery = [], isLoading } = useQuery({
        queryKey: ['gallery'],
        queryFn: () => base44.entities.Gallery.list('-created_date'),
    });

    const createMutation = useMutation({
        mutationFn: (data) => base44.entities.Gallery.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gallery'] });
            setShowForm(false);
            setFormData({ title: '', description: '', images: [], event_date: '', category: 'other' });
            toast.success('Gallery item added successfully!');
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => base44.entities.Gallery.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gallery'] });
            toast.success('Gallery item deleted!');
        },
    });

    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        if (formData.images.length + files.length > 10) {
            toast.error('Maximum 10 images allowed per event');
            return;
        }

        setUploading(true);
        try {
            const uploadPromises = files.map(file => 
                base44.integrations.Core.UploadFile({ file })
            );
            const results = await Promise.all(uploadPromises);
            const newImageUrls = results.map(r => r.file_url);
            
            setFormData(prev => ({ 
                ...prev, 
                images: [...prev.images, ...newImageUrls]
            }));
            toast.success(`${files.length} image(s) uploaded successfully!`);
        } catch (error) {
            toast.error('Failed to upload images');
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || formData.images.length === 0) {
            toast.error('Please add at least one image');
            return;
        }
        createMutation.mutate(formData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
                        <p className="text-gray-600 mt-1">Manage event photos and gallery items</p>
                    </div>
                    <Button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        {showForm ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                        {showForm ? 'Cancel' : 'Add New Item'}
                    </Button>
                </div>

                {showForm && (
                    <Card className="mb-8 shadow-lg">
                        <CardHeader>
                            <CardTitle>Add Gallery Item</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Title *</Label>
                                        <Input
                                            id="title"
                                            value={formData.title}
                                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                            placeholder="Event title"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="event_date">Event Date</Label>
                                        <Input
                                            id="event_date"
                                            type="date"
                                            value={formData.event_date}
                                            onChange={(e) => setFormData(prev => ({ ...prev, event_date: e.target.value }))}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                        placeholder="Event description"
                                        rows={3}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select
                                        value={formData.category}
                                        onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="conference">Conference</SelectItem>
                                            <SelectItem value="meetup">Meetup</SelectItem>
                                            <SelectItem value="workshop">Workshop</SelectItem>
                                            <SelectItem value="award">Award</SelectItem>
                                            <SelectItem value="networking">Networking</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Images * (Up to 10 images)</Label>
                                    <div className="space-y-4">
                                        <label className="cursor-pointer">
                                            <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 w-fit">
                                                <Upload className="w-4 h-4" />
                                                <span>{uploading ? 'Uploading...' : `Upload Images (${formData.images.length}/10)`}</span>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={handleFileUpload}
                                                className="hidden"
                                                disabled={uploading || formData.images.length >= 10}
                                            />
                                        </label>
                                        
                                        {formData.images.length > 0 && (
                                            <div className="grid grid-cols-5 gap-3">
                                                {formData.images.map((img, index) => (
                                                    <div key={index} className="relative group">
                                                        <img src={img} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded-lg border" />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeImage(index)}
                                                            className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3">
                                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={createMutation.isPending || uploading}>
                                        {createMutation.isPending ? 'Adding...' : 'Add to Gallery'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="text-gray-600">Loading gallery...</div>
                    </div>
                ) : gallery.length === 0 ? (
                    <Card className="text-center py-12">
                        <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">No gallery items yet</p>
                        <Button onClick={() => setShowForm(true)}>Add Your First Item</Button>
                    </Card>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {gallery.map((item) => (
                            <Card key={item.id} className="group relative overflow-hidden">
                                <div className="aspect-square relative">
                                    <img 
                                        src={item.images?.[0] || item.image_url} 
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                    {item.images?.length > 1 && (
                                        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded-full">
                                            +{item.images.length - 1} more
                                        </div>
                                    )}
                                </div>
                                <CardContent className="p-3">
                                    <h3 className="font-semibold text-sm mb-1 truncate">{item.title}</h3>
                                    {item.event_date && (
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <Calendar className="w-3 h-3" />
                                            {format(new Date(item.event_date), 'MMM d, yyyy')}
                                        </div>
                                    )}
                                </CardContent>
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => {
                                        if (confirm('Delete this item?')) {
                                            deleteMutation.mutate(item.id);
                                        }
                                    }}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}