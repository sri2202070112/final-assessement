/**
 * Application Configuration
 * All values are pulled from .env for security and flexibility.
 * Vite requires 'VITE_' prefix for client-side environment variables.
 */

export const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;
export const PASS_KEY = import.meta.env.VITE_PASS_KEY;

export const FETCH_USER_BY_ID = import.meta.env.VITE_FETCH_USER_BY_ID;
export const FETCH_ALL_LANGUAGE = import.meta.env.VITE_FETCH_ALL_LANGUAGE;
export const FETCH_CURRENT_LANGUAGE = import.meta.env.VITE_FETCH_CURRENT_LANGUAGE;
export const FETCH_REPORT = import.meta.env.VITE_FETCH_REPORT;
export const UPDATE_LANGUAGE = import.meta.env.VITE_UPDATE_LANGUAGE;
export const QR_BASE_64 = import.meta.env.VITE_QR_BASE_64;