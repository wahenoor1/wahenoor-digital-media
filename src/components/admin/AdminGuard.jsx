import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Shield, LogIn, AlertCircle } from 'lucide-react';

export default function AdminGuard({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const currentUser = await base44.auth.me();
            setUser(currentUser);
            setIsAdmin(currentUser.role === 'admin');
        } catch (error) {
            setUser(null);
            setIsAdmin(false);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = () => {
        base44.auth.redirectToLogin(window.location.pathname);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Checking authentication...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
                <div className="max-w-md w-full">
                    <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8 text-center">
                        <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <LogIn className="w-10 h-10 text-blue-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-3">Admin Access Required</h2>
                        <p className="text-gray-400 mb-8">
                            Please login to access the admin panel
                        </p>
                        <Button 
                            onClick={handleLogin}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-6 text-lg rounded-xl"
                        >
                            <LogIn className="w-5 h-5 mr-2" />
                            Login to Continue
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
                <div className="max-w-md w-full">
                    <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-red-500/20 p-8 text-center">
                        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertCircle className="w-10 h-10 text-red-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-3">Access Denied</h2>
                        <p className="text-gray-400 mb-6">
                            You don't have admin privileges to access this section.
                        </p>
                        <div className="bg-white/5 rounded-xl p-4 mb-6">
                            <p className="text-sm text-gray-400">Logged in as:</p>
                            <p className="text-white font-semibold">{user.email}</p>
                            <p className="text-xs text-gray-500 mt-1">Role: {user.role}</p>
                        </div>
                        <div className="flex gap-3">
                            <Button 
                                onClick={() => window.location.href = '/'}
                                variant="outline"
                                className="flex-1 border-white/20 text-white hover:bg-white/10"
                            >
                                Go Home
                            </Button>
                            <Button 
                                onClick={() => base44.auth.logout()}
                                variant="outline"
                                className="flex-1 border-red-500/20 text-red-400 hover:bg-red-500/10"
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Admin Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-white font-bold text-lg">Admin Panel</h1>
                                <p className="text-blue-100 text-xs">Wahenoor Digital Media</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-white text-sm font-medium">{user.full_name || user.email}</p>
                                <p className="text-blue-100 text-xs">Admin Access</p>
                            </div>
                            <Button 
                                onClick={() => base44.auth.logout('/')}
                                variant="outline"
                                size="sm"
                                className="border-white/20 text-white hover:bg-white/10"
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Admin Navigation */}
            <div className="bg-gray-900 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-1 overflow-x-auto">
                        <a
                            href="/AdminOffers"
                            className="px-6 py-4 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors whitespace-nowrap border-b-2 border-transparent hover:border-blue-500"
                        >
                            Manage Offers
                        </a>
                        <a
                            href="/AdminGallery"
                            className="px-6 py-4 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors whitespace-nowrap border-b-2 border-transparent hover:border-blue-500"
                        >
                            Manage Gallery
                        </a>
                        <a
                            href="/"
                            className="px-6 py-4 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors whitespace-nowrap border-b-2 border-transparent hover:border-blue-500"
                        >
                            View Website
                        </a>
                    </div>
                </div>
            </div>

            {/* Admin Content */}
            <div>
                {children}
            </div>
        </div>
    );
}