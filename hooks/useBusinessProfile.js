/**
 * useBusinessProfile.js
 * ─────────────────────────────────────────────────────────
 * Hook for business profile CRUD.
 * Gets business_id from session, fetches/updates via API.
 * ─────────────────────────────────────────────────────────
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { getUserSession } from '@/lib/helpers';
import { getBusinessById, createBusiness, updateBusiness } from '@/services/businessService';

export function useBusinessProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const session = getUserSession();
      const businessId = session.dashboard?.business_id;
      if (businessId) {
        const data = await getBusinessById(businessId);
        setProfile(data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  const saveProfile = useCallback(async (formData, isNew = false) => {
    setSaving(true);
    try {
      const result = isNew
        ? await createBusiness(formData)
        : await updateBusiness(formData);
      setProfile(result);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setSaving(false);
    }
  }, []);

  return { profile, loading, saving, error, saveProfile, refresh: fetchProfile };
}
