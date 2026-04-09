/**
 * Session storage keys
 */
const STORAGE_KEYS = {
  USER_DETAILS: 'user_details',
  MODAL_SHOWN: 'vpa_modal_shown'
};

/**
 * Store utility for managing session-based data
 */
export const store = {
  /**
   * Set user details in session storage
   */
  setUserDetails: (details: any) => {
    if (details) {
      sessionStorage.setItem(STORAGE_KEYS.USER_DETAILS, JSON.stringify(details));
    }
  },

  /**
   * Get user details from session storage
   */
  getUserDetails: () => {
    const details = sessionStorage.getItem(STORAGE_KEYS.USER_DETAILS);
    return details ? JSON.parse(details) : null;
  },

  /**
   * Set flag for VPA modal visibility
   */
  setVpaModalShown: (shown: boolean) => {
    sessionStorage.setItem(STORAGE_KEYS.MODAL_SHOWN, shown.toString());
  },

  /**
   * Check if VPA modal was already shown
   */
  isVpaModalShown: () => {
    return sessionStorage.getItem(STORAGE_KEYS.MODAL_SHOWN) === 'true';
  },

  /**
   * Clear all session data
   */
  clear: () => {
    sessionStorage.removeItem(STORAGE_KEYS.USER_DETAILS);
    sessionStorage.removeItem(STORAGE_KEYS.MODAL_SHOWN);
  }
};
