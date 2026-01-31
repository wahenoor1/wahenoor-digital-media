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
import { Search, Plus, X, Pencil, Trash2, Tag } from 'lucide-react';
import { toast } from 'sonner';
import AdminGuard from '@/components/admin/AdminGuard';

const iconOptions = [
    'Tag', 'Shield', 'Leaf', 'Heart', 'Sun', 'Newspaper', 'Briefcase', 'Home', 'DollarSign',
    'TrendingUp', 'Users', 'Zap', 'Globe', 'Lock', 'Award', 'Star', 'Target', 'CheckCircle'
];

const colorOptions = [
    { value: 'from-blue-500 to-indigo-500', label: 'Blue to Indigo' },
    { value: 'from-purple-500 to-pink-500', label: 'Purple to Pink' },
    { value: 'from-green-500 to-emerald-500', label: 'Green to Emerald' },
    { value: 'from-orange-500 to-red-500', label: 'Orange to Red' },
    { value: 'from-yellow-500 to-orange-500', label: 'Yellow to Orange' },
    { value: 'from-teal-500 to-cyan-500', label: 'Teal to Cyan' },
    { value: 'from-rose-500 to-pink-500', label: 'Rose to Pink' },
    { value: 'from-indigo-500 to-purple-500', label: 'Indigo to Purple' }
];

export default function AdminCategories() {
    return (
        <AdminGuard>
            <AdminCategoriesContent />
        </AdminGuard>
    );
}

function AdminCategoriesContent() {
    const [showForm, setShowForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        icon_name: 'Tag',
        color: 'from-blue-500 to-indigo-500',
        status: 'active'
    });

    const queryClient = useQueryClient();

    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => base44.entities.Category.list('-created_date'),
    });

    const createMutation = useMutation({
        mutationFn: (data) => base44.entities.Category.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            resetForm();
            toast.success('Category created!');
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => base44.entities.Category.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            resetForm();
            toast.success('Category updated!');
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => base44.entities.Category.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast.success('Category deleted!');
        },
    });

    const resetForm = () => {
        setShowForm(false);
        setEditingCategory(null);
        setFormData({
            name: '',
            description: '',
            icon_name: 'Tag',
            color: 'from-blue-500 to-indigo-500',
            status: 'active'
        });
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setFormData(category);
        setShowForm(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name) {
            toast.error('Please enter category name');
            return;
        }

        if (editingCategory) {
            updateMutation.mutate({ id: editingCategory.id, data: formData });
        } else {
            createMutation.mutate(formData);
        }
    };

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Manage Categories</h1>
                        <p className="text-gray-600 mt-1">Create and edit product categories</p>
                    </div>
                    <Button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        {showForm ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                        {showForm ? 'Cancel' : 'Add Category'}
                    </Button>
                </div>

                {/* Category Form */}
                {showForm && (
                    <Card className="mb-8 shadow-lg">
                        <CardHeader>
                            <CardTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Category Name *</Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                            placeholder="e.g., Health Insurance"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="icon_name">Icon</Label>
                                        <Select
                                            value={formData.icon_name}
                                            onValueChange={(value) => setFormData(prev => ({ ...prev, icon_name: value }))}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {iconOptions.map(icon => (
                                                    <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                        rows={3}
                                        placeholder="Brief description of the category"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="color">Color Gradient</Label>
                                        <Select
                                            value={formData.color}
                                            onValueChange={(value) => setFormData(prev => ({ ...prev, color: value }))}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {colorOptions.map(color => (
                                                    <SelectItem key={color.value} value={color.value}>
                                                        <div className="flex items-center gap-2">
                                                            <div className={`w-4 h-4 rounded bg-gradient-to-r ${color.value}`}></div>
                                                            {color.label}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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

                                <div className="flex justify-end gap-3">
                                    <Button type="button" variant="outline" onClick={resetForm}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">
                                        {editingCategory ? 'Update Category' : 'Create Category'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Search */}
                <Card className="mb-6">
                    <CardContent className="p-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                placeholder="Search categories..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Categories List */}
                {isLoading ? (
                    <div className="text-center py-12">Loading categories...</div>
                ) : filteredCategories.length === 0 ? (
                    <Card className="text-center py-12">
                        <Tag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">No categories found</p>
                        <Button onClick={() => setShowForm(true)}>Create Your First Category</Button>
                    </Card>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCategories.map((category) => (
                            <Card key={category.id} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center text-white`}>
                                            <Tag className="w-6 h-6" />
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleEdit(category)}
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => {
                                                    if (confirm('Delete this category?')) {
                                                        deleteMutation.mutate(category.id);
                                                    }
                                                }}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                                    {category.description && (
                                        <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <Badge className={category.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                            {category.status}
                                        </Badge>
                                        <Badge variant="outline" className="text-xs">
                                            {category.icon_name}
                                        </Badge>
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