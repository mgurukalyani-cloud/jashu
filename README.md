# 🎁 Jashmitha's Master Birthday Surprise Website 💖

A premium, emotional, highly interactive birthday surprise website built especially for **Jashmitha (*Bujji / Bangaaram*)** using React + Vite + JavaScript.

---

## 🌟 20 Feature Highlights

1. **🎨 Premium Visual Design System**:
   - Pastel pink, lavender, white, rose, and warm golden palette.
   - Soft gradients, glassmorphism, rounded cards, smooth shadows.
   - Poppins + Playfair Display + Dancing Script fonts.
   - Light (Day Dream) and Dark (Night Sky) themes with reduced-motion support.

2. **⏳ Intro Loading Experience**:
   - Glowing heart indicator with *"Preparing something special for Bujji... 💗"* and smooth fade.

3. **💌 Animated Landing Page**:
   - Welcome text: *"Hey Bujji... I have something special for you 💗"*.
   - Animated name reveal: `J · A · S · H · M · I · T · H · A`.
   - Fake notification badge: *"💌 You have received 1 special surprise from someone who misses you..."*.
   - Teaser live countdown to September 22, 2026.

4. **✨ Interactive YES / NO Surprise Question**:
   - Question: *"Jashmitha, do you want to open your special surprise? 🎁"*.
   - 8 sequential emotional messages on NO click (*"Are you sure, Bujji? 🥺"*, *"Please give my surprise one chance! 💗"*, etc.).
   - NO button smoothly shrinks; YES button grows with glowing pulse and dynamic cheers.
   - Animated mascot wiping tears with a tiny handkerchief and falling teardrop particles.
   - Reset interaction button.

5. **🎂 Interactive Birthday Cake & Candle Blowing**:
   - Multi-tier strawberry-chocolate cake with 3 flickering candles.
   - *"Make a Wish & Blow Candles 🕯️💨"* button (or tap candles directly).
   - Realistic smoke puffs and confetti burst.
   - **First Bite from My Side 🍰**: Cake slice on fork (*"Say Aaaaa~ 🥰"*) with interactive bite.
   - **Birthday Wishes & A Warm Tight Hug 🤗**: Animated warm embrace with hearts.

6. **🎁 Magical 3D Gift Box Reveal**:
   - Glowing 3D gift box with moving silk ribbon and light rays.
   - *"Tap to Open Your Gift 🎁"*.
   - Lid animates open with golden sunburst rays and confetti.

7. **📜 Personal Birthday Letter**:
   - Parchment card with wax seal and typewriter animation.
   - Handwritten cursive signature.
   - *"Read Instantly"* and *"Replay letter"* controls.

8. **📸 Scrapbook Photo Memories Gallery**:
   - Polaroid-style cards with scrapbook rotations (`-2deg`, `3deg`, etc.).
   - Interactive heart reaction button on each card (pops floating hearts!).
   - Full-screen Lightbox with Next/Previous navigation and keyboard controls.

9. **🌟 Friendship Timeline**:
   - Vertical timeline milestones: *First Memory*, *Special Moment*, *Beautiful Memory*, *Today*, *Future*.

10. **🌌 Distance & Friendship Constellation**:
    - Symbolic glowing constellation connecting two distant points (Home & College) with an animated pulsing heart line.
    - *"Different homes. Different colleges. Different places. But one beautiful friendship. 💕"*.

11. **⏳ Official Countdown Timer**:
    - Live countdown to September 22, 2026.
    - Celebration banner on arrival: *"Today is your special day! 🎂💖"*.

12. **🎵 Floating Background Music Player**:
    - Spinning vinyl disc, animated equalizer bars, Play/Pause, Mute, Volume slider.
    - Dual audio engine: Plays `/music/birthday-song.mp3` or falls back to built-in Web Audio API music-box acoustic melody.
    - Synthesized sound effects for candle blow, chime chord, and gift opening.

13. **🎆 Fireworks & Confetti Shower**:
    - Full-screen canvas particle fireworks on milestones and celebration header.

14. **🪄 Interactive Mini Activities**:
    - **Virtual Scratch-to-Reveal Card**: Interactive canvas scratch card revealing a hidden secret wish!
    - **Pop the Heart Game**: Floating hearts that reveal sweet compliments when tapped.

15. **🤫 Secret Message Easter Eggs**:
    - Hidden clickable floating stars and hearts revealing private whispers (*"You are genuinely special to me 💗"*, etc.).

16. **💖 Final Birthday Celebration**:
    - Closing card: *"Happy Birthday, My Dearest Bujji! ❤️"*, with confetti blast and *"Replay Entire Surprise Journey ↺"*.

17. **🌗 Day / Night Theme Switcher**:
    - Switch between Pastel Day Dream and Romantic Starry Night Sky.

18. **📱 Responsive Mobile Design**:
    - 100% touch-friendly, zero horizontal overflow, beautiful on all screen sizes.

19. **⚙️ Centralized Data File**:
    - All names, dates, letters, photos, captions, and timeline milestones are located in [`src/data/birthdayData.js`](src/data/birthdayData.js).

20. **🚀 Zero Setup Friction**:
    - Runs out of the box with standard `npm install` and `npm run dev`.

---

## 🚀 How to Run the Website

```bash
# Start development server
npm run dev
```

Open **`http://localhost:5173/`** in your browser.

---

## 🎨 How to Customize

1. **Change Photos**:
   - Save your photos in `public/memories/` (e.g. `bujji1.jpg`).
   - Open [`src/data/birthdayData.js`](src/data/birthdayData.js) and update the `photos` array.

2. **Add Custom Song (MP3)**:
   - Place any MP3 named `birthday-song.mp3` inside `public/music/birthday-song.mp3`.
   - The player will automatically play your custom song!

3. **Edit Letter or Names**:
   - Open [`src/data/birthdayData.js`](src/data/birthdayData.js) to customize any names, messages, or paragraphs.
