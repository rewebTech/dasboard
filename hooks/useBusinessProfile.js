'use client';

import { useState, useEffect, useCallback } from 'react';
import { getBusinessProfile, updateBusinessProfile } from '@/services/businessService';

export function useBusinessProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getBusinessProfile();
      setProfile(res);
    } catch (err) {
      setError(err.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  const updateProfile = useCallback(async (data) => {
    setSaving(true);
    try {
      const res = await updateBusinessProfile(data);
      setProfile(res);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setSaving(false);
    }
  }, []);

  return { profile, loading, saving, error, updateProfile, refresh: fetchProfile };
}
