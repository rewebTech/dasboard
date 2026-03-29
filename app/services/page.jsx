/**
 * app/services/page.jsx
 * ─────────────────────────────────────────────────────────
 * Services page — list and create services.
 * ─────────────────────────────────────────────────────────
 */

'use client';

import { useState } from 'react';
import { useServices } from '@/hooks/useServices';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input, { Textarea } from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { TableRowSkeleton } from '@/components/ui/Skeleton';
import { formatCurrency } from '@/lib/helpers';
import { useToast } from '@/components/ui/Toast';
import DashboardLayout from '@/components/shared/DashboardLayout';

export default function ServicesPage() {
  const { data: services, loading, error, refresh, create } = useServices();
  const { toast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Service name is required';
    if (!formData.price || parseFloat(formData.price) <= 0) errors.price = 'Valid price is required';
    if (!formData.duration.trim()) errors.duration = 'Duration is required';
    return errors;
  };

  const handleCreateService = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsCreating(true);
    try {
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        duration: formData.duration.trim(),
      };

      await create(payload);
      toast.success('Service created successfully!');
      setFormData({ name: '', description: '', price: '', duration: '' });
      setFormErrors({});
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.message || 'Failed to create service');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Services</h1>
            <p className="text-sm text-dark-400">Your business service offerings.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              + Create Service
            </Button>
            <Button variant="outline" onClick={refresh}>Refresh</Button>
          </div>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-800">
                  {['Service', 'Description', 'Price', 'Duration'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-2xs font-semibold uppercase tracking-wider text-dark-500">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => <TableRowSkeleton key={i} cols={4} />)
                ) : error ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-dark-400 text-sm">
                      {error}
                      <br />
                      <Button variant="outline" size="sm" onClick={refresh} className="mt-2">Retry</Button>
                    </td>
                  </tr>
                ) : services.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center text-dark-400 text-sm">
                      No services found. Create your first service to get started.
                    </td>
                  </tr>
                ) : (
                  services.map((svc) => (
                    <tr key={svc.id} className="border-b border-dark-800 last:border-0 hover:bg-dark-800/40 transition-colors">
                      <td className="px-4 py-3.5 text-sm font-semibold text-white">{svc.name}</td>
                      <td className="px-4 py-3.5 text-sm text-dark-300">{svc.description || '—'}</td>
                      <td className="px-4 py-3.5 text-sm text-dark-300">{svc.price ? formatCurrency(svc.price) : '—'}</td>
                      <td className="px-4 py-3.5 text-sm text-dark-300">{svc.duration || '—'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Create Service Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => !isCreating && setIsModalOpen(false)}
        title="Create New Service"
        size="lg"
        footer={
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateService}
              loading={isCreating}
            >
              Create Service
            </Button>
          </div>
        }
      >
        <div className="px-5 py-4 space-y-4">
          <Input
            label="Service Name"
            name="name"
            placeholder="e.g. Professional Haircut"
            value={formData.name}
            onChange={handleInputChange}
            error={formErrors.name}
            disabled={isCreating}
          />

          <Textarea
            label="Description"
            name="description"
            placeholder="Describe your service (optional)"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            disabled={isCreating}
          />

          <Input
            label="Price"
            name="price"
            type="number"
            placeholder="e.g. 500"
            value={formData.price}
            onChange={handleInputChange}
            error={formErrors.price}
            disabled={isCreating}
            step="0.01"
            min="0"
          />

          <Input
            label="Duration"
            name="duration"
            placeholder="e.g. 30 mins"
            value={formData.duration}
            onChange={handleInputChange}
            error={formErrors.duration}
            disabled={isCreating}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
}
