/**
 * offersService.js
 * ─────────────────────────────────────────────────────────
 * Offers API — not available in current backend.
 * Returns empty data to prevent crashes.
 * ─────────────────────────────────────────────────────────
 */

export async function getOffers() { return []; }
export async function createOffer() { throw new Error('Offers API not available'); }
export async function toggleOffer() { throw new Error('Offers API not available'); }
export async function deleteOffer() { throw new Error('Offers API not available'); }
