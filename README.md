# My PNB Merchant Project Journey 🚀

I wanted to write down how I actually built this app. Honestly, when I started, I was pretty overwhelmed with all the bank terminology and encryption stuff, but I’m really proud of how it turned out. It looks super professional, but I kept the code clean and commented so I don't forget how I did it!

---

### First thing I had to handle: The "Secret Coder" (Security)
The biggest challenge was security. Since this is for a bank, you can't just send information around in plain text. I used a tool called `Crypto-JS` to "scramble" (encrypt) everything. Every time my app talks to the server, it puts the data through this secret coder so only the bank can understand it. 

I also had to deal with an "Access Token." Think of it like a digital key that the server gives me when I log in. I made sure the app "holds onto" this key so I don't have to keep logging back in every time I switch pages.

### Keeping the keys safe 🗝️
I learned the hard way that you should **never** put secret keys or server addresses directly in your code. So, I used two special files:
*   **The `.env` file:** This is like my locked safe. I keep the really secret stuff here, like the encryption keys.
*   **The `config.ts` file:** This is my "Master of Keys." It goes into the safe, grabs the secrets, and lets the rest of the app use them. If I ever need to move to a new server, I only change it once in the safe!

### Making it look "PNB" Official
I used a few custom images to make the app feel real:
*   The **pnb-logo** is at the top of the sidebar so merchants know they're in the right place.
*   I added a custom **Avatar** (a cool Memoji with braids and glasses) for the user profile. It just makes the dashboard feel more like a personal app rather than a boring bank tool.
*   I also used a small **Blur background** logo for when the sidebar is closed up—it keeps things looking tidy.

### The Dashboard: Where everything happens 📈
This was my favorite part to build! It looks simple, but it’s doing a lot:
*   **Fetching the Shops:** I wrote code that takes the user's phone number and asks the bank for all the shops (VPAs) associated with them.
*   **Doing the Math:** Once I get the transaction list, I wrote a loop to add up all the amounts and count how many payments were made today. It's cool to see real numbers show up on the screen!

### The "Flicker" problem and how I fixed it (Skeletons)
One thing that really bugged me was how the screen would look empty for a split second while waiting for the data. I fixed this by adding **Skeletons**. 

Instead of a blank white box, you see a grey, shimmering shape that looks like the data is about to arrive. I also made sure they shimmer for at least **800 milliseconds**—I found that if they disappear too fast, it looks glitchy. Now, everything stays in place and "resolves" together perfectly. It feels much more premium now.

### Reports and Language Updates 🌍
*   **Reports:** I built a big table that shows every single payment. I even added a download button so the merchant can get a CSV file for their records.
*   **Language Update:** This was tricky because I had to talk directly to the terminal machine. If the update is still processing, I made the status icon turn **Yellow**, and if it's done, it turns **Green**. 

### The "Global Notebook"
I used something called a "Global Store" (and some `localStorage`) to make the app remember things. For example, if you pick a specific shop on the dashboard and then refresh the page, the app "remembers" it in its notebook so you don't have to pick it again.

---

**What I used to build this:**
*   **React & Vite:** These are the main engines that make the app run fast.
*   **Material UI (MUI):** This gave me all the cool buttons, inputs, and the shimmering skeletons.
*   **Lucide & Ant Design Icons:** For all the professional-looking icons.
*   **Crypto-JS:** My secret weapon for the encryption part.

I'm really happy with how this project came together! If I can build this, I feel like I'm finally starting to get the hang of React. 💻🎉
