/**
 * urlBuilder.js
 * ─────────────────────────────────────────────────────────
 * Utility to build full API URLs dynamically.
 * Supports:
 *   - Path params (via endpoint functions in endpoints.js)
 *   - Query string generation from plain objects
 *   - Pagination helpers
 * ─────────────────────────────────────────────────────────
 */

import { BASE_URL } from './endpoints';

/**
 * Build a full URL from an endpoint path + optional query params.
 *
 * @param {string} endpoint   - Path like '/services' or '/services/123'
 * @param {object} [params]   - Query params e.g. { page: 1, limit: 20 }
 * @returns {string}          - Full URL string
 *
 * @example
 *   buildUrl(ENDPOINTS.SERVICES.LIST, { page: 2, status: 'active' })
 *   // → 'http://localhost:4000/api/services?page=2&status=active'
 */
export function buildUrl(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);

  // Append only defined, non-null, non-empty values
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.append(key, value);
    }
  });

  return url.toString();
}

/**
 * Build pagination query params object.
 *
 * @param {number} page
 * @param {number} limit
 * @returns {{ page: number, limit: number }}
 */
export function paginationParams(page = 1, limit = 20) {
  return { page, limit };
}

/**
 * Build sort query params object.
 *
 * @param {string} field
 * @param {'asc'|'desc'} direction
 * @returns {{ sortBy: string, sortDir: string }}
 */
export function sortParams(field, direction = 'desc') {
  return { sortBy: field, sortDir: direction };
}

/**
 * Merge multiple param objects into one.
 * Useful for combining pagination + filters + sort.
 *
 * @param {...object} paramObjects
 * @returns {object}
 *
 * @example
 *   mergeParams(paginationParams(2), sortParams('createdAt'), { status: 'active' })
 */
export function mergeParams(...paramObjects) {
  return Object.assign({}, ...paramObjects);
}
