'use client';

import Dashboard from '@/components/Dashboard';
import { useRouter } from 'next/navigation';
import { useProfiles } from '@/contexts/ProfileContext';
import CatalogEditor from '@/components/dashboard/CatalogEditor';
import { CatalogConfig } from '@/lib/types';
import { useState } from 'react';

export default function CatalogPage() {
    const router = useRouter();
    const { activeProfile, updateProfile } = useProfiles();
    const [loadingProduct, setLoadingProduct] = useState<string | null>(null);

    const handleLogout = () => {
        router.push('/');
    };

    if (!activeProfile) {
        return null;
    }

    const catalogActive = activeProfile.catalogActive !== false; // default true

    const handleToggleCatalog = (active: boolean) => {
        updateProfile(activeProfile.id, { catalogActive: active });
    };

    const handleUpdateConfig = (config: CatalogConfig) => {
        updateProfile(activeProfile.id, { catalogConfig: config });
    };

    const handleAddProduct = () => {
        const newProduct = {
            id: Date.now().toString(),
            name: 'Nuevo Producto',
            price: '$0.00',
            description: '',
            image: '',
            active: true
        };
        updateProfile(activeProfile.id, {
            products: [...activeProfile.products, newProduct]
        });
    };

    const handleUpdateProduct = (productId: string, field: string, value: any) => {
        const updatedProducts = activeProfile.products.map(product =>
            product.id === productId ? { ...product, [field]: value } : product
        );
        updateProfile(activeProfile.id, { products: updatedProducts });
    };

    const handleDeleteProduct = (productId: string) => {
        updateProfile(activeProfile.id, {
            products: activeProfile.products.filter(p => p.id !== productId)
        });
    };

    const handleOptimizeProduct = async (productId: string) => {
        const product = activeProfile.products.find(p => p.id === productId);
        if (!product) return;

        setLoadingProduct(productId);
        try {
            const response = await fetch('/api/gemini/product', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productName: product.name,
                    currentDescription: product.description
                })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.description) {
                    handleUpdateProduct(productId, 'description', data.description);
                }
            }
        } catch (error) {
            console.error('Error optimizing product:', error);
        } finally {
            setLoadingProduct(null);
        }
    };

    return (
        <Dashboard
            onLogout={handleLogout}
            customContent={
                <CatalogEditor
                    products={activeProfile.products}
                    catalogActive={catalogActive}
                    catalogConfig={activeProfile.catalogConfig}
                    onToggleCatalog={handleToggleCatalog}
                    onUpdateConfig={handleUpdateConfig}
                    onAddProduct={handleAddProduct}
                    onUpdateProduct={handleUpdateProduct}
                    onDeleteProduct={handleDeleteProduct}
                    onOptimizeProduct={handleOptimizeProduct}
                    loadingProductId={loadingProduct}
                />
            }
        />
    );
}
