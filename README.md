# Valentine's Day Website ❤️

A cute, interactive website to ask "Will you be my Valentine?" featuring a custom "Heart Chaser" game, a photo gallery, and a personal letter.

## 🎨 How to Customize (The Fun Part!)

This website is designed for you to easily swap in your own photos, music, and images. Just replace the files in the `public/assets` folder!

### 1. 🎵 Background Music
- **Location**: `public/assets/music/`
- **File Name**: `bgm.mp3`
- **Action**: Replace the existing file with any `.mp3` song you like.

### 2. 📸 Photo Gallery
- **Location**: `public/assets/photos/`
- **File Names**: `dummy1.jpg`, `dummy2.jpg`, `dummy3.jpg`...
- **Action**: Add your photos here.
- **Update Captions**: Open `src/components/Gallery.jsx` to change the captions for each photo.

### 3. 🎮 "Heart Chaser" Game Assets
Customize the items in the claw machine!
- **Location**: `public/assets/game/`
- **File Names**:
    - `prize.png`: **The Goal!** Use a heart-shaped photo of your face or something special.
    - `decoy.png`: Obstacles to avoid (e.g., chocolates).
    - `flower.png`: Pink flower item (🌸).

> **Tip**: Use transparent PNGs for the best look! If you don't have an image, the game will automatically show a cute emoji instead.

### 5. 💍 Proposal Image
- **Location**: `public/assets/`
- **File Name**: `proposal.png`
- **Action**: Add a photo of you holding flowers (or any sweet photo)!

### 6. 💌 The Letter
- **Location**: `src/components/Letter.jsx`
- **Action**: Open this file and edit the text inside to write your own personal message.

## 🚀 How to Run

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start the Website**:
    ```bash
    npm run dev
    ```
    Open the link shown in the terminal (usually `http://localhost:5173`).

3.  **Build for Sharing**:
    ```bash
    npm run build
    ```
    Deploy the `dist` folder to Vercel, Netlify, or GitHub Pages!

---
Made with ❤️
