import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X, Pencil, Trash2, Upload, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import AdminGuard from '@/components/admin/AdminGuard';

export default function AdminProducts() {
    return (
        <AdminGuard>
            <AdminProductsContent />
        </AdminGuard>
    );
}

function AdminProductsContent() {
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        description: '',
        url: '',
        image: '',
        icon_name: 'Shield',
        color: 'from-blue-500 to-indigo-500',
        status: 'active'
    });

    const queryClient = useQueryClient();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => base44.entities.Product.list('-created_date'),
    });

    const createMutation = useMutation({
        mutationFn: (data) => base44.entities.Product.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            resetForm();
            toast.success('Product added successfully!');
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => base44.entities.Product.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            resetForm();
            toast.success('Product updated successfully!');
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => base44.entities.Product.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Product deleted!');
        },
    });

    const resetForm = () => {
        setShowForm(false);
        setEditingProduct(null);
        setFormData({
            name: '',
            category: '',
            description: '',
            url: '',
            image: '',
            icon_name: 'Shield',
            color: 'from-blue-500 to-indigo-500',
            status: 'active'
        });
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData(product);
        setShowForm(true);
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const { file_url } = await base44.integrations.Core.UploadFile({ file });
            setFormData(prev => ({ ...prev, image: file_url }));
            toast.success('Image uploaded successfully!');
        } catch (error) {
            toast.error('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.category || !formData.url) {
            toast.error('Please fill in required fields');
            return;
        }

        if (editingProduct) {
            updateMutation.mutate({ id: editingProduct.id, data: formData });
        } else {
            createMutation.mutate(formData);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
                        <p className="text-gray-600 mt-1">Manage your product portfolio</p>
                    </div>
                    <Button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        {showForm ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                        {showForm ? 'Cancel' : 'Add Product'}
                    </Button>
                </div>

                {showForm && (
                    <Card className="mb-8 shadow-lg">
                        <CardHeader>
                            <CardTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Product Name *</Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category *</Label>
                                        <Input
                                            id="category"
                                            value={formData.category}
                                            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                            placeholder="e.g., Insurance, E-commerce"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="url">Website URL *</Label>
                                        <Input
                                            id="url"
                                            type="url"
                                            value={formData.url}
                                            onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                                            placeholder="https://example.com"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={formData.description}
                                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                            rows={3}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="icon_name">Icon Name</Label>
                                        <Input
                                            id="icon_name"
                                            value={formData.icon_name}
                                            onChange={(e) => setFormData(prev => ({ ...prev, icon_name: e.target.value }))}
                                            placeholder="Shield, Leaf, Heart, Sun, Newspaper"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="color">Gradient Color</Label>
                                        <Input
                                            id="color"
                                            value={formData.color}
                                            onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                                            placeholder="from-blue-500 to-indigo-500"
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
                                                <SelectItem value="inactive">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Product Image</Label>
                                    <div className="flex items-center gap-4">
                                        <label className="cursor-pointer">
                                            <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                                <Upload className="w-4 h-4" />
                                                <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileUpload}
                                                className="hidden"
                                                disabled={uploading}
                                            />
                                        </label>
                                        {formData.image && (
                                            <div className="relative w-24 h-24 rounded-lg overflow-hidden border">
                                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3">
                                    <Button type="button" variant="outline" onClick={resetForm}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                                        {editingProduct ? 'Update Product' : 'Add Product'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {isLoading ? (
                    <div className="text-center py-12 text-gray-600">Loading products...</div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <Card key={product.id} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    {product.image && (
                                        <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900 mb-1">{product.name}</h3>
                                            <p className="text-sm text-blue-600">{product.category}</p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {product.status}
                                        </span>
                                    </div>
                                    {product.description && (
                                        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                                    )}
                                    <a href={product.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-4">
                                        <ExternalLink className="w-3 h-3" />
                                        {product.url}
                                    </a>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit(product)}
                                            className="flex-1"
                                        >
                                            <Pencil className="w-4 h-4 mr-2" />
                                            Edit
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => {
                                                if (confirm('Delete this product?')) {
                                                    deleteMutation.mutate(product.id);
                                                }
                                            }}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
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