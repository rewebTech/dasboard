'use client';

import { useState, useEffect } from 'react';
import { useBusinessProfile } from '@/hooks/useBusinessProfile';
import { useToast } from '@/components/ui/Toast';
import Card, { CardHeader, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input, { Textarea } from '@/components/ui/Input';
import { CardSkeleton } from '@/components/ui/Skeleton';
import DashboardLayout from '@/components/shared/DashboardLayout';

export default function BusinessProfilePage() {
  const { profile, loading, saving, updateProfile } = useBusinessProfile();
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: '', category: '', description: '',
    phone: '', website: '', address: '', hours: '',
  });

  // Populate form when profile loads
  useEffect(() => {
    if (profile) {
      setForm({
        name:        profile.name        || '',
        category:    profile.category    || '',
        description: profile.description || '',
        phone:       profile.contact?.phone   || '',
        website:     profile.contact?.website || '',
        address:     profile.contact?.address || '',
        hours:       profile.contact?.hours   || '',
      });
    }
  }, [profile]);

  const handleSave = async () => {
    const res = await updateProfile({
      name:        form.name,
      category:    form.category,
      description: form.description,
      contact: {
        phone:   form.phone,
        website: form.website,
        address: form.address,
        hours:   form.hours,
      },
    });
    res.success
      ? toast.success('Profile updated successfully')
      : toast.error(res.error || 'Failed to save profile');
  };

  const update = (key) => (e) => setForm(p => ({ ...p, [key]: e.target.value }));

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">Business Profile</h1>
          <p className="text-sm text-dark-400">Manage your business information and visibility.</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            <CardSkeleton lines={3} />
            <div className="grid grid-cols-[1fr_260px] gap-4">
              <CardSkeleton lines={6} />
              <CardSkeleton lines={6} />
            </div>
          </div>
        ) : (
          <>
            {/* Cover banner */}
            <Card className="mb-4 overflow-hidden">
              <div className="h-44 bg-gradient-to-br from-[#3a3000] to-[#111100] relative">
                <button className="absolute bottom-3 right-4 flex items-center gap-1.5 bg-black/50 text-white text-xs px-3 py-1.5 rounded hover:bg-black/70 transition-colors">
                  <CameraIcon /> Change Cover
                </button>
              </div>
              <div className="flex items-center gap-3.5 px-5 py-4 border-t border-dark-800">
                <div className="w-12 h-12 rounded bg-dark-700 border-2 border-dark-600 flex items-center justify-center text-dark-400 flex-shrink-0">
                  <CameraIcon />
                </div>
                <div>
                  <p className="text-md font-bold text-white">{profile?.name || 'Your Business'}</p>
                  <p className="text-xs text-dark-400">{profile?.category} · Active since {profile?.activeSince}</p>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-[1fr_260px] gap-4">
              {/* Basic Info */}
              <Card>
                <CardHeader title="Basic Information" />
                <CardBody className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Business Name" value={form.name} onChange={update('name')} />
                    <Input label="Category" value={form.category} onChange={update('category')} />
                  </div>
                  <Textarea label="Description" value={form.description} onChange={update('description')} rows={3} />
                </CardBody>

                {/* Gallery */}
                <div className="px-5 pb-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-white">Gallery</p>
                    <Button variant="outline" size="sm" icon={<CameraIcon />}>Upload Images</Button>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="aspect-square bg-dark-800 rounded border border-dashed border-dark-700 flex items-center justify-center text-dark-600">
                        <CameraIcon />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Contact */}
              <Card className="self-start">
                <CardHeader title="Contact Details" />
                <CardBody className="space-y-3">
                  {[
                    { label: 'Phone',   key: 'phone',   icon: <PhoneIcon />,    placeholder: '+1 (555) 000-0000' },
                    { label: 'Website', key: 'website', icon: <GlobeIcon />,    placeholder: 'www.example.com' },
                    { label: 'Address', key: 'address', icon: <PinIcon />,      placeholder: '123 Main St' },
                    { label: 'Hours',   key: 'hours',   icon: <ClockIcon />,    placeholder: 'Mon-Sat 9AM-7PM' },
                  ].map(f => (
                    <div key={f.key} className="flex items-start gap-2.5">
                      <span className="text-dark-500 w-4 h-4 mt-2 flex-shrink-0">{f.icon}</span>
                      <input
                        className="flex-1 bg-transparent border-b border-dark-800 text-sm text-dark-300 pb-1.5 outline-none focus:border-dark-600 placeholder-dark-600 transition-colors"
                        placeholder={f.placeholder}
                        value={form[f.key]}
                        onChange={update(f.key)}
                      />
                    </div>
                  ))}
                </CardBody>
              </Card>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-5">
              <Button variant="outline">Cancel</Button>
              <Button loading={saving} onClick={handleSave}>Save Changes</Button>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

function CameraIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>; }
function PhoneIcon()  { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.36 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>; }
function GlobeIcon()  { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>; }
function PinIcon()    { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>; }
function ClockIcon()  { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>; }
