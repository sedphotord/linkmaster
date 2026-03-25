'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ChevronDown, Search, CreditCard, Building2, Globe2, Check } from 'lucide-react';
import { BankAccount } from '@/lib/types';

// ========== DOMINICAN REPUBLIC BANKS + INTERNATIONAL PAYMENTS ==========

interface BankOption {
  name: string;
  shortName: string;
  color: string;
  textColor: string;
  category: 'multiple' | 'asociacion' | 'internacional';
}

const DR_BANKS: BankOption[] = [
  // --- Bancos Múltiples ---
  { name: 'Banreservas', shortName: 'BR', color: '#00529B', textColor: '#fff', category: 'multiple' },
  { name: 'Banco Popular Dominicano', shortName: 'BPD', color: '#003087', textColor: '#fff', category: 'multiple' },
  { name: 'BHD León', shortName: 'BHD', color: '#E31937', textColor: '#fff', category: 'multiple' },
  { name: 'Scotiabank', shortName: 'SB', color: '#EC111A', textColor: '#fff', category: 'multiple' },
  { name: 'Banco Santa Cruz', shortName: 'BSC', color: '#1B3A6B', textColor: '#fff', category: 'multiple' },
  { name: 'Banco BDI', shortName: 'BDI', color: '#0055A4', textColor: '#fff', category: 'multiple' },
  { name: 'Banco Caribe', shortName: 'BC', color: '#00A651', textColor: '#fff', category: 'multiple' },
  { name: 'Banco Promerica', shortName: 'PRO', color: '#003DA5', textColor: '#fff', category: 'multiple' },
  { name: 'Banco Vimenca', shortName: 'VIM', color: '#7B2D8E', textColor: '#fff', category: 'multiple' },
  { name: 'Banco Lafise', shortName: 'LAF', color: '#005A30', textColor: '#fff', category: 'multiple' },
  { name: 'Bancamérica', shortName: 'BA', color: '#B8860B', textColor: '#fff', category: 'multiple' },
  { name: 'Banco López de Haro', shortName: 'BLH', color: '#1C1C1C', textColor: '#fff', category: 'multiple' },
  { name: 'Banco Ademi', shortName: 'ADM', color: '#F7941D', textColor: '#fff', category: 'multiple' },
  { name: 'Bellbank', shortName: 'BB', color: '#2E86AB', textColor: '#fff', category: 'multiple' },
  { name: 'Banco Confisa', shortName: 'CON', color: '#C8102E', textColor: '#fff', category: 'multiple' },
  { name: 'Banesco', shortName: 'BAN', color: '#005DA4', textColor: '#fff', category: 'multiple' },

  // --- Asociaciones de Ahorros y Préstamos ---
  { name: 'APAP', shortName: 'APAP', color: '#003399', textColor: '#fff', category: 'asociacion' },
  { name: 'Asociación Cibao', shortName: 'CIB', color: '#FF6B00', textColor: '#fff', category: 'asociacion' },
  { name: 'Asociación La Nacional', shortName: 'LN', color: '#002D72', textColor: '#fff', category: 'asociacion' },
  { name: 'Asociación Duarte', shortName: 'DTE', color: '#006633', textColor: '#fff', category: 'asociacion' },
  { name: 'Asociación Romana', shortName: 'ROM', color: '#8B0000', textColor: '#fff', category: 'asociacion' },
  { name: 'Asociación Mocana', shortName: 'MOC', color: '#2F4F4F', textColor: '#fff', category: 'asociacion' },
  { name: 'Asociación Peravia', shortName: 'PER', color: '#4B0082', textColor: '#fff', category: 'asociacion' },
  { name: 'Asociación La Vega Real', shortName: 'LVR', color: '#228B22', textColor: '#fff', category: 'asociacion' },
  { name: 'Asociación Maguana', shortName: 'MAG', color: '#B22222', textColor: '#fff', category: 'asociacion' },
  { name: 'Asociación Central', shortName: 'CEN', color: '#333333', textColor: '#fff', category: 'asociacion' },
  { name: 'Asociación Bonao', shortName: 'BON', color: '#006400', textColor: '#fff', category: 'asociacion' },

  // --- Pagos Internacionales ---
  { name: 'PayPal', shortName: 'PP', color: '#003087', textColor: '#fff', category: 'internacional' },
  { name: 'Zelle', shortName: 'Z', color: '#6D1ED4', textColor: '#fff', category: 'internacional' },
  { name: 'Wise', shortName: 'W', color: '#9FE870', textColor: '#163300', category: 'internacional' },
  { name: 'Venmo', shortName: 'V', color: '#3D95CE', textColor: '#fff', category: 'internacional' },
  { name: 'Cash App', shortName: '$', color: '#00C244', textColor: '#fff', category: 'internacional' },
  { name: 'Western Union', shortName: 'WU', color: '#FFDD00', textColor: '#000', category: 'internacional' },
  { name: 'MoneyGram', shortName: 'MG', color: '#FF6600', textColor: '#fff', category: 'internacional' },
  { name: 'Remitly', shortName: 'RM', color: '#1B64F2', textColor: '#fff', category: 'internacional' },
];

// ========== PROPS ==========

interface BankEditorProps {
  bankAccounts: BankAccount[];
  onAdd: () => void;
  onUpdate: (id: string, updates: Partial<BankAccount>) => void;
  onDelete: (id: string) => void;
}

// ========== BANK SELECTOR COMPONENT ==========

function BankSelector({ value, onChange }: { value: string; onChange: (bankName: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = DR_BANKS.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.shortName.toLowerCase().includes(search.toLowerCase())
  );

  const selectedBank = DR_BANKS.find(b => b.name === value);

  const grouped = {
    multiple: filtered.filter(b => b.category === 'multiple'),
    asociacion: filtered.filter(b => b.category === 'asociacion'),
    internacional: filtered.filter(b => b.category === 'internacional'),
  };

  return (
    <div className="relative">
      <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-2 ml-1 flex items-center gap-2">
        <Building2 size={14} /> Banco / Plataforma
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#F3F3F1] border-transparent rounded-xl py-3 px-4 font-bold text-gray-800 focus:ring-[#502274] focus:border-[#502274] flex items-center gap-3 text-left hover:bg-[#EAEAE8] transition-colors"
      >
        {selectedBank ? (
          <>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 shadow-sm"
              style={{ backgroundColor: selectedBank.color, color: selectedBank.textColor }}
            >
              {selectedBank.shortName}
            </div>
            <span className="truncate">{selectedBank.name}</span>
          </>
        ) : (
          <span className="text-gray-400">Seleccionar banco...</span>
        )}
        <ChevronDown size={16} className={`ml-auto text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden max-h-[400px] flex flex-col"
          >
            {/* Search */}
            <div className="p-3 border-b border-gray-100 sticky top-0 bg-white z-10">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar banco..."
                  className="w-full bg-gray-50 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium focus:ring-[#502274] focus:border-[#502274] border border-gray-100"
                  autoFocus
                />
              </div>
            </div>

            {/* List */}
            <div className="overflow-y-auto flex-1 p-2">
              {grouped.multiple.length > 0 && (
                <div className="mb-2">
                  <div className="flex items-center gap-2 px-3 py-2">
                    <Building2 size={12} className="text-gray-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Bancos Múltiples</span>
                  </div>
                  {grouped.multiple.map(bank => (
                    <BankOptionButton key={bank.name} bank={bank} isSelected={value === bank.name} onSelect={() => { onChange(bank.name); setIsOpen(false); setSearch(''); }} />
                  ))}
                </div>
              )}

              {grouped.asociacion.length > 0 && (
                <div className="mb-2">
                  <div className="flex items-center gap-2 px-3 py-2">
                    <CreditCard size={12} className="text-gray-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Asociaciones</span>
                  </div>
                  {grouped.asociacion.map(bank => (
                    <BankOptionButton key={bank.name} bank={bank} isSelected={value === bank.name} onSelect={() => { onChange(bank.name); setIsOpen(false); setSearch(''); }} />
                  ))}
                </div>
              )}

              {grouped.internacional.length > 0 && (
                <div className="mb-2">
                  <div className="flex items-center gap-2 px-3 py-2">
                    <Globe2 size={12} className="text-gray-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Pagos Internacionales</span>
                  </div>
                  {grouped.internacional.map(bank => (
                    <BankOptionButton key={bank.name} bank={bank} isSelected={value === bank.name} onSelect={() => { onChange(bank.name); setIsOpen(false); setSearch(''); }} />
                  ))}
                </div>
              )}

              {filtered.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-6">No se encontró ningún banco</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click-away overlay */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  );
}

function BankOptionButton({ bank, isSelected, onSelect }: { bank: BankOption; isSelected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${isSelected ? 'bg-[#D2E823]/20' : 'hover:bg-gray-50'}`}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black flex-shrink-0 shadow-sm"
        style={{ backgroundColor: bank.color, color: bank.textColor }}
      >
        {bank.shortName}
      </div>
      <span className="text-sm font-semibold text-gray-700 truncate">{bank.name}</span>
      {isSelected && <Check size={16} className="ml-auto text-[#502274]" />}
    </button>
  );
}

// ========== MAIN BANK EDITOR ==========

export default function BankEditor({ bankAccounts, onAdd, onUpdate, onDelete }: BankEditorProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-4xl font-black tracking-tighter text-[#1e2330]">Bancos</h2>
          <p className="text-gray-500 font-medium">Gestiona tus cuentas de depósito y pagos</p>
        </div>
        <button onClick={onAdd} className="bg-[#502274] text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-[#3d1a59] hover:scale-105 transition-all shadow-lg">
          <Plus size={20} strokeWidth={3} /> Agregar
        </button>
      </div>

      <div className="grid gap-6">
        {bankAccounts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-12 rounded-[2.5rem] border border-dashed border-gray-300 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#F3F3F1] flex items-center justify-center mx-auto mb-4">
              <CreditCard size={28} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-700 mb-1">Sin cuentas bancarias</h3>
            <p className="text-gray-400 text-sm">Agrega una cuenta para recibir pagos de tus clientes</p>
          </motion.div>
        )}

        {bankAccounts.map((account) => {
          const bankInfo = DR_BANKS.find(b => b.name === account.bankName);
          return (
            <motion.div
              key={account.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm relative group hover:border-[#D2E823] transition-colors"
            >
              {/* Bank Color Accent */}
              {bankInfo && (
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 rounded-t-[2rem]"
                  style={{ backgroundColor: bankInfo.color }}
                />
              )}

              {/* Delete Button */}
              <button onClick={() => onDelete(account.id)} className="absolute top-8 right-8 text-gray-300 hover:text-red-500 transition-colors">
                <Trash2 size={20} />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Bank Selector */}
                <div className="sm:col-span-2">
                  <BankSelector
                    value={account.bankName}
                    onChange={(bankName) => onUpdate(account.id, { bankName })}
                  />
                </div>

                {/* Beneficiary */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-2 ml-1">Beneficiario</label>
                  <input
                    type="text"
                    value={account.beneficiary}
                    onChange={(e) => onUpdate(account.id, { beneficiary: e.target.value })}
                    className="w-full bg-[#F3F3F1] border-transparent rounded-xl py-3 px-4 font-bold text-gray-800 focus:ring-[#502274] focus:border-[#502274]"
                    placeholder="Tu Nombre"
                  />
                </div>

                {/* Cédula */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-2 ml-1">Cédula (Opcional)</label>
                  <input
                    type="text"
                    value={account.cedula || ''}
                    onChange={(e) => onUpdate(account.id, { cedula: e.target.value })}
                    className="w-full bg-[#F3F3F1] border-transparent rounded-xl py-3 px-4 font-mono font-medium tracking-wide focus:ring-[#502274] focus:border-[#502274]"
                    placeholder="001-0000000-0"
                  />
                </div>

                {/* Account Type */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-2 ml-1">Tipo de Cuenta</label>
                  <select
                    value={account.accountType || ''}
                    onChange={(e) => onUpdate(account.id, { accountType: e.target.value as any })}
                    className="w-full bg-[#F3F3F1] border-transparent rounded-xl py-3 px-4 font-bold text-gray-800 focus:ring-[#502274] focus:border-[#502274] appearance-none cursor-pointer"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="corriente">Corriente</option>
                    <option value="nomina">Nómina</option>
                  </select>
                </div>

                {/* Account Number */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-2 ml-1">Número de Cuenta</label>
                  <input
                    type="text"
                    value={account.accountNumber}
                    onChange={(e) => onUpdate(account.id, { accountNumber: e.target.value })}
                    className="w-full bg-[#F3F3F1] border-transparent rounded-xl py-3 px-4 font-mono font-medium text-lg tracking-wide focus:ring-[#502274] focus:border-[#502274]"
                    placeholder="0000 0000 0000 0000"
                  />
                </div>

                {/* Currency */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-2 ml-1">Moneda</label>
                  <div className="flex gap-3">
                    {(['DOP', 'USD', 'EUR'] as const).map((curr) => (
                      <button
                        key={curr}
                        type="button"
                        onClick={() => onUpdate(account.id, { currency: curr })}
                        className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${account.currency === curr
                          ? 'bg-[#502274] text-white shadow-lg scale-105'
                          : 'bg-[#F3F3F1] text-gray-600 hover:bg-gray-200'
                          }`}
                      >
                        {curr === 'DOP' ? 'RD$ DOP' : curr === 'USD' ? '$ USD' : '€ EUR'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CLABE / IBAN */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-2 ml-1">CLABE / IBAN / Email (Opcional)</label>
                  <input
                    type="text"
                    value={account.clabe || ''}
                    onChange={(e) => onUpdate(account.id, { clabe: e.target.value })}
                    className="w-full bg-[#F3F3F1] border-transparent rounded-xl py-3 px-4 font-mono font-medium tracking-wide focus:ring-[#502274] focus:border-[#502274]"
                    placeholder="IBAN, CLABE o email de la plataforma"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
