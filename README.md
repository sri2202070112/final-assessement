# PNB Merchant Dashboard 🚀

The **PNB Merchant Dashboard** is a comprehensive, secure web application designed for merchants to manage their business operations efficiently. This platform allows merchants to monitor real-time transaction data, generate dynamic payment QR codes, manage multiple VPA IDs, and remotely update terminal machine settings (such as language) directly from the browser.

Built with a focus on security and high-fidelity user experience, this dashboard streamlines the interaction between merchants and their payment infrastructure.

---

## 🛠️ Tech Stack

*   **React & Vite:** The core framework for a high-performance, reactive user interface.
*   **TypeScript:** Type-safety throughout the codebase to ensure reliability and catch errors during development.
*   **Material UI (MUI):** A comprehensive component library used for professional buttons, cards, and shimmer skeletons.
*   **Lucide React:** A versatile collection of modern icons for enhanced visual cues.
*   **Crypto-JS:** Robust encryption and decryption tools to secure sensitive banking data.
*   **React OIDC Context:** Secure implementation of OpenID Connect for merchant authentication.

---

## 🗝️ System Security

Security is integrated at every level of the application:

1.  **Environment Configuration (`.env`):** Critical encryption keys and sensitive endpoints are stored in an environment file, ensuring they are excluded from version control.
2.  **Centralized Config (`config.ts`):** A centralized configuration manager handles secret retrieval and provides them to the application securely.

**Data Encryption:** All outbound data is encrypted using `Crypto-JS` before reaching the server. This ensures that even if data is intercepted, it remains unreadable to unauthorized parties.

---

## 📺 Page-by-Page Breakdown

### 1. The Dashboard (The "At a Glance" View)
This is the first thing a merchant sees.
*   **What's happening:** It shows the total number of payments and the total money earned today.
*   **API Interactions 📡:** 
    *   `VITE_FETCH_USER_BY_ID`: Retrieves all shop variants (VPA IDs) registered to the merchant's mobile number.
    *   `VITE_FETCH_REPORT`: Retrieves the transaction list for today/yesterday to calculate the summary metrics.
*   **UI Logic ✨:** 
    *   **VPA Selector:** A custom dropdown to switch between different shops.
    *   **Shimmer Effect:** Skeletons are utilized with a controlled 800ms duration to ensure a smooth loading experience while awaiting server responses.

### 2. Transaction Reports (The "History Book")
A comprehensive table for merchants to track every single payment.
*   **What's happening:** Merchants can filter payments by date (Today/Monthly/Custom Range).
*   **API Interaction 📡:** 
    *   `VITE_FETCH_REPORT`: Fetches a comprehensive list of payments based on selected start and end dates.
*   **UI Logic ✨:** 
    *   **Pagination:** To handle large datasets efficiently, the system displays 10 records per page with navigable controls.
    *   **CSV Download:** A dedicated utility exports the current data view into a compatible Excel/CSV format.

### 3. Language Update (The "Remote Control")
This page allows merchants to view the current terminal language and remotely initiate updates to the device.
*   **API Interactions 📡:** 
    *   `VITE_FETCH_CURRENT_LANGUAGE`: Retrieves the current language setting of the terminal using its serial number.
    *   `VITE_FETCH_ALL_LANGUAGE`: Fetches the list of all languages supported by the terminal device.
    *   `VITE_UPDATE_LANGUAGE`: Sends a secure command to remotely change the device language.
*   **UI Logic ✨:** 
    *   **Status Indicators:** If the update is "Success," you see a green circle. If the server says it's "Going on," you see a yellow circle.
    *   **Read-only Fields:** Serial Number and VPA fields are configured as read-only to prevent accidental modification during the language update process.

### 4. QR Details (The "Payment Generator")
This page allows merchants to view and generate UPI-compliant QR codes for their storefronts.
*   **What's happening:** Merchants can choose between a **Static QR** (general storefront payment) or a **Dynamic QR** (pre-configured for a specific transaction amount).
*   **API Interactions 📡:** 
    *   `VITE_QR_BASE_64`: Converts a constructed UPI intent string (containing VPA, Name, and Transaction IDs) into a secure base64-encoded image.
*   **UI Logic ✨:** 
    *   **Live Data Sync:** The Static QR is automatically generated using real merchant data (VPA and Name) from the session store.
    *   **Validation & Expiry:** Dynamic QRs include amount validation (capped at ₹ 1,00,000) and a real-time 5-minute countdown timer for session security.
    *   **Base64 Rendering:** The system handles raw base64 image data from the API to display high-resolution QR codes without external image dependencies.

---

## 💾 Data Persistence (Global Store)

The application uses a centralized store (`store.ts`) combined with `localStorage` to maintain state across sessions:
*   **Persistent Selection:** Merchant preferences, such as the selected VPA ID, are remembered when navigating between the Dashboard and Reports.
*   **Session Continuity:** The application checks local storage upon reload to maintain active authentication and state.

---

## 🚀 UX & Performance Implementation

*   **Optimized Loading:** To prevent jarring UI shifts, shimmering skeletons are implemented with a controlled 800ms fade-out, providing a premium feel.
*   **End-to-End Security:** Complete request-response encryption ensures data integrity is never compromised.

---

**PNB Merchant Dashboard - Efficient. Secure. Seamless.**
