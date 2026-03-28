'use client';

import { useState } from 'react';
import { useOffers } from '@/hooks/useOffers';
import { useToast } from '@/components/ui/Toast';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Toggle from '@/components/ui/Toggle';
import { TableRowSkeleton } from '@/components/ui/Skeleton';
import { capitalize } from '@/lib/helpers';
import DashboardLayout from '@/components/shared/DashboardLayout';

export default function OffersPage() {
  const { data, loading, error, addOffer, toggle, remove } = useOffers();
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [saving,    setSaving]    = useState(false);
  const [form, setForm] = useState({ name: '', discount: '', appliesTo: '', validUntil: '' });

  const handleToggle = async (id, enabled) => {
    const res = await toggle(id, enabled);
    if (!res.success) toast.error(res.error || 'Failed to update');
  };

  const handleCreate = async () => {
    if (!form.name || !form.discount) return;
    setSaving(true);
    const res = await addOffer(form);
    setSaving(false);
    if (res.success) {
      toast.success('Offer created');
      setModalOpen(false);
      setForm({ name: '', discount: '', appliesTo: '', validUntil: '' });
    } else {
      toast.error(res.error || 'Failed to create offer');
    }
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Offers</h1>
            <p className="text-sm text-dark-400">Create and manage promotional offers.</p>
          </div>
          <Button icon={<PlusIcon />} onClick={() => setModalOpen(true)}>Create Offer</Button>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-800">
                  {['Offer', 'Discount', 'Applies To', 'Valid Until', 'Status', 'Enabled', ''].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-2xs font-semibold uppercase tracking-wider text-dark-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => <TableRowSkeleton key={i} cols={7} />)
                ) : error ? (
                  <tr><td colSpan={7} className="px-4 py-8 text-center text-dark-400 text-sm">{error}</td></tr>
                ) : data.length === 0 ? (
                  <tr><td colSpan={7} className="px-4 py-10 text-center text-dark-400 text-sm">No offers yet.</td></tr>
                ) : (
                  data.map((offer) => (
                    <tr key={offer.id} className="border-b border-dark-800 last:border-0 hover:bg-dark-800/40 transition-colors">
                      <td className="px-4 py-3.5 text-sm font-semibold text-white">{offer.name}</td>
                      <td className="px-4 py-3.5 text-sm font-semibold text-accent">{offer.discount}</td>
                      <td className="px-4 py-3.5 text-sm text-dark-300">{offer.appliesTo}</td>
                      <td className="px-4 py-3.5 text-sm text-dark-300">{offer.validUntil}</td>
                      <td className="px-4 py-3.5">
                        <Badge label={capitalize(offer.status)} variant={offer.status} />
                      </td>
                      <td className="px-4 py-3.5">
                        <Toggle
                          checked={offer.enabled}
                          onChange={(v) => handleToggle(offer.id, v)}
                          disabled={offer.status === 'expired'}
                        />
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <button className="w-7 h-7 flex items-center justify-center rounded text-dark-500 hover:bg-dark-700 hover:text-dark-300 transition-colors ml-auto text-sm">⋯</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create Offer"
        footer={
          <>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button loading={saving} onClick={handleCreate}>Create Offer</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Offer Name" placeholder="e.g. Summer Special" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Discount" placeholder="20%" value={form.discount} onChange={e => setForm(p => ({ ...p, discount: e.target.value }))} />
            <Input label="Applies To" placeholder="All Services" value={form.appliesTo} onChange={e => setForm(p => ({ ...p, appliesTo: e.target.value }))} />
          </div>
          <Input label="Valid Until" type="date" value={form.validUntil} onChange={e => setForm(p => ({ ...p, validUntil: e.target.value }))} />
        </div>
      </Modal>
    </DashboardLayout>
  );
}

function PlusIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>; }
