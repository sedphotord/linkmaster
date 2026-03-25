'use client';

import React, { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import { useRouter } from 'next/navigation';
import { useProfiles } from '@/contexts/ProfileContext';
import BankEditor from '@/components/dashboard/BankEditor';
import CryptoEditor from '@/components/dashboard/CryptoEditor';

export default function BankPage() {
    const router = useRouter();
    const { activeProfile, updateProfile } = useProfiles();

    const handleLogout = () => {
        router.push('/');
    };

    if (!activeProfile) {
        return null;
    }

    const [activeTab, setActiveTab] = useState<'bank' | 'crypto'>('bank');

    const handleAddBankAccount = () => {
        const newAccount: any = { // Using any to avoid type complexity with BankAccount
            id: Date.now().toString(),
            bankName: '',
            accountNumber: '',
            beneficiary: activeProfile.name,
            clabe: '',
            active: true
        };
        updateProfile(activeProfile.id, {
            bankAccounts: [...activeProfile.bankAccounts, newAccount]
        });
    };

    const handleUpdateBankAccount = (accountId: string, updates: any) => {
        const updatedAccounts = activeProfile.bankAccounts.map(account =>
            account.id === accountId ? { ...account, ...updates } : account
        );
        updateProfile(activeProfile.id, { bankAccounts: updatedAccounts });
    };

    const handleDeleteBankAccount = (accountId: string) => {
        updateProfile(activeProfile.id, {
            bankAccounts: activeProfile.bankAccounts.filter(a => a.id !== accountId)
        });
    };

    // Crypto Handlers
    const handleUpdateCrypto = (wallets: any[]) => {
        updateProfile(activeProfile.id, { cryptoWallets: wallets });
    };

    return (
        <Dashboard
            onLogout={handleLogout}
            customContent={
                <div className="space-y-6">
                    {/* Tabs */}
                    <div className="flex p-1 bg-gray-100 rounded-xl w-fit">
                        <button
                            onClick={() => setActiveTab('bank')}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'bank' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Cuentas Bancarias
                        </button>
                        <button
                            onClick={() => setActiveTab('crypto')}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'crypto' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Crypto Wallets
                        </button>
                    </div>

                    {activeTab === 'bank' ? (
                        <BankEditor
                            bankAccounts={activeProfile.bankAccounts}
                            onAdd={handleAddBankAccount}
                            onUpdate={handleUpdateBankAccount}
                            onDelete={handleDeleteBankAccount}
                        />
                    ) : (
                        <CryptoEditor
                            wallets={activeProfile.cryptoWallets || []}
                            onUpdate={handleUpdateCrypto}
                        />
                    )}
                </div>
            }
        />
    );
}
