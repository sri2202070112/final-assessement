# My PNB Merchant Project Diary (Final Version)

I wanted to write down exactly how I built this project so anyone . I tried to make it look very high-end the code underneath is where the magic happens.

---

### Phase 1: The Secret Key (Security and Login)
Everything starts with security. Since we are dealing with bank stuff, we can't just send information in plain English!

*   **Encryption (The Secret Coder):** I used a special tool called `Crypto-JS`. Every time our app wants to talk to the bank's server, it "scrambles" the data using a secret key. This way, if a hacker tries to peek, they only see gibberish!
*   **The Access Token:** When you log in, the server gives us a "Digital Key" (Access Token). I made the app remember this key so we don't have to ask for a password every single time we click a new page.

---

### Phase 2: Hiding Our Secrets (.env and config.ts)
I learned that you should never put secret passwords or server addresses directly in your code. If you do, everyone can see them! 

*   **The `.env` File (The Locked Safety Box):** I created a special file called `.env`. Think of this like a locked box where I keep my secret encryption keys and the addresses of the bank's servers. This file is kept private and safe.
*   **The `config.ts` File (The Key Master):** This file acts as the bridge. It goes to the `.env` box, grabs the keys, and gives them to the rest of the project. This way, if I ever need to change a server address, I only have to change it once in the `.env` box!

---

### Phase 3: Our Pictures and Branding (The PNGs)
To make the app look professional, I used some important images in the `src/assets` folder:

*   **`logo.png`:** This is the official PNB logo you see at the top of the sidebar. It makes the app look official!
*   **`avatar.png`:** I added a custom Memoji with glasses and braids as the user's profile picture. It makes the dashboard feel more personal and friendly.
*   **`blurbg.png`:** I used this small image for the sidebar when it is closed (collapsed). It helps keep the design clean even when things are small.

---

### Phase 4: The Dashboard (My Main Control Center)
This is where the merchant lands first. It looks simple, but there's a lot of API work here!

*   **Finding the Shop (API is Real):** I used a real API called `FETCH_USER_BY_ID`. It takes the merchant's mobile number and asks the bank, "Hey, which shops belong to this person?". The bank replies back with a list of VPA IDs. 
*   **Calculating the Money (API is Real):** Once we know the shop, we use the `FETCH_REPORT` API. I wrote code to look through all the transactions the bank sends us and add them all up to show the "Total Amount" and "Count". 

---

### Phase 5: Transaction Reports (The Payment List)
This page is for merchants who want to see every single payment in detail.

*   **The Big Table (API is Real):** This uses the same `FETCH_REPORT` API as the dashboard. But here, instead of just adding up the total, I show every payment as a row in a clean, white table. 

---

### Phase 6: QR Details (Making Payments Easy)
This page is for when a customer wants to pay by scanning a code.

*   **The QR Image (Dummy):** Right now, the actual QR image you see is a "dummy" placeholder from the internet. It's there to show exactly where the real one will go soon!
*   **Generating and Timer (UI Logic):** I coded a fun feature where you can type an amount, and it makes a QR just for that price with a 5-minute countdown timer. This is mostly UI logic for now.

---

### Phase 7: Language Update (Talking to the Machine)
This is actually one of the most technical parts I did!

*   **Checking Current Status (API is Real):** We use the `FETCH_CURRENT_LANGUAGE` API to ask the terminal machine what language it is using right now.
*   **The Big Update (API is Real):** When you pick a new language and hit "Update", we send a real command using `UPDATE_LANGUAGE`. 
*   **The Status Modal:** I built a special popup for this. If the bank says "Update is going on," I made the icon turn **Yellow**. If it says "Successful," it turns **Green**. 

---

### Phase 8: The Profile and Global Store
I used a "Global Store" and some `localStorage` (like a small notebook in your browser) to help the app remember things like which VPA you picked, even if you refresh the page!

---

**Tech Stack:**
1. **React & Vite:** The main engine.
2. **Material UI (MUI):** For the buttons, inputs boosters, and boxes.
3. **Lucide-React:** For the pretty icons you see everywhere.
4. **Crypto-JS:** For the scrambling (encryption) part.
