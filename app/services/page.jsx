'use client';

import { useState } from 'react';
import { useServices } from '@/hooks/useServices';
import { useToast } from '@/components/ui/Toast';
import Card, { CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import { TableRowSkeleton } from '@/components/ui/Skeleton';
import { formatNumber, capitalize } from '@/lib/helpers';
import DashboardLayout from '@/components/shared/DashboardLayout';

export default function ServicesPage() {
  const { data, loading, error, addService, removeService, refresh } = useServices();
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm]           = useState({ name: '', price: '', duration: '' });
  const [saving, setSaving]       = useState(false);

  const services = data?.items || data || [];
  const stats    = data?.stats;

  const handleAdd = async () => {
    if (!form.name || !form.price) return;
    setSaving(true);
    const res = await addService(form);
    setSaving(false);
    if (res.success) {
      toast.success('Service added successfully');
      setModalOpen(false);
      setForm({ name: '', price: '', duration: '' });
    } else {
      toast.error(res.error || 'Failed to add service');
    }
  };

  const handleRemove = async (id) => {
    const res = await removeService(id);
    res.success ? toast.success('Service removed') : toast.error(res.error || 'Failed to remove');
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        {/* Header row */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Services</h1>
            <p className="text-sm text-dark-400">Manage your service offerings.</p>
          </div>
          <Button icon={<PlusIcon />} onClick={() => setModalOpen(true)}>Add Service</Button>
        </div>

        {/* Mini stats */}
        {stats && (
          <div className="grid grid-cols-3 gap-4 mb-5">
            {[
              { label: 'Avg. Price',       value: stats.avgPrice,                  icon: <DollarIcon />, green: false },
              { label: 'Active Services',  value: stats.activeServices,            icon: <ClockIcon />,  green: true  },
              { label: 'Total Bookings',   value: formatNumber(stats.totalBookings), icon: <DollarIcon />, green: false },
            ].map(s => (
              <div key={s.label} className="bg-surface border border-dark-800 rounded p-4 flex items-center gap-3">
                <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${s.green ? 'bg-status-success-muted text-status-success' : 'bg-accent-muted text-accent'}`}>
                  {s.icon}
                </div>
                <div>
                  <p className="text-xs text-dark-500 mb-0.5">{s.label}</p>
                  <p className="text-xl font-bold text-white">{s.value}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-800">
                  {['Service', 'Price', 'Duration', 'Bookings', 'Status', ''].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-2xs font-semibold uppercase tracking-wider text-dark-500">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} cols={6} />)
                ) : error ? (
                  <tr><td colSpan={6} className="px-4 py-8 text-center text-dark-400 text-sm">{error}</td></tr>
                ) : services.length === 0 ? (
                  <tr><td colSpan={6} className="px-4 py-10 text-center text-dark-400 text-sm">No services yet. Add your first service.</td></tr>
                ) : (
                  services.map((svc) => (
                    <tr key={svc.id} className="border-b border-dark-800 last:border-0 hover:bg-dark-800/40 transition-colors">
                      <td className="px-4 py-3.5 text-sm font-semibold text-white">{svc.name}</td>
                      <td className="px-4 py-3.5 text-sm text-dark-300">{svc.price}</td>
                      <td className="px-4 py-3.5 text-sm text-dark-300">{svc.duration}</td>
                      <td className="px-4 py-3.5 text-sm text-dark-300">{formatNumber(svc.bookings)}</td>
                      <td className="px-4 py-3.5">
                        <Badge label={capitalize(svc.status)} variant={svc.status} />
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <button
                          onClick={() => handleRemove(svc.id)}
                          className="w-7 h-7 flex items-center justify-center rounded text-dark-500 hover:bg-dark-700 hover:text-dark-300 transition-colors ml-auto text-sm"
                          title="More actions"
                        >
                          ⋯
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Add Service Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add New Service"
        footer={
          <>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button loading={saving} onClick={handleAdd}>Add Service</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Service Name"
            placeholder="e.g. Hair Cut - Men"
            value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price"
              placeholder="$25"
              value={form.price}
              onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
            />
            <Input
              label="Duration"
              placeholder="30 min"
              value={form.duration}
              onChange={e => setForm(p => ({ ...p, duration: e.target.value }))}
            />
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}

function PlusIcon()   { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>; }
function DollarIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>; }
function ClockIcon()  { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>; }
