import { asset } from '../utils/assetHelper';

/**
 * =========================================================================
 * 💖 JASHMITHA'S BIRTHDAY SURPRISE - CENTRALIZED CONFIG & DATA
 * =========================================================================
 * Customize all names, dates, letters, photos, timeline milestones,
 * secret messages, and music in this single file.
 */

export const BIRTHDAY_DATA = {
  // Person details
  name: 'Jashmitha',
  nickname: 'Jashu',
  petName: 'Bujji',
  specialNickname: 'Bangaaram',
  
  // Target birthday date & exact birth time: September 22, 2026 at 10:45 AM
  birthdayDate: new Date('2026-09-22T10:45:00'),
  birthTime: '10:45 AM',
  birthDateText: 'September 22, 10:45 AM',

  // Intro Loader Message
  introMessage: 'Preparing something magical for Jashu... 💗',

  // Landing Page Copy & Phased Sequence
  landing: {
    step1Intro: 'A little surprise is waiting for someone special...',
    step2Name: ['J', 'A', 'S', 'H', 'M', 'I', 'T', 'H', 'A'],
    step3Greeting: 'Hey Bujji... I have something special for you. 💗',
    notification: '💌 1 special birthday surprise from someone who misses you across the distance...',
    subtitle: 'A magical digital gift crafted with all my love, cherished memories, and heartfelt wishes for my Bangaaram.',
    footerText: 'Made with endless love for Bujji (Jashmitha) • Born on September 22 at 10:45 AM'
  },

  // Interactive YES / NO Question Card
  question: {
    title: 'Are you ready to open your little surprise, Jashu? 🎁',
    yesInitial: 'Yes, I Want a Surprise 🎁',
    noInitial: 'No 🙈',
    // 8 sequential emotional messages when clicking NO
    noMessages: [
      'Are you sure, Jashu? 🥺',
      'Please give my surprise one chance, Bangaaram! 💗',
      'One small surprise from me, please? 🥹',
      'I made this with so much love for you, Jashu 😭💕',
      'Pleaseee, just one click, Bangaaram! 🥺🎁',
      'My heart is waiting for your YES, Jashu 💖',
      'Okay... I am going to cry now 😭',
      'Jashu, please open my little surprise! 🥹❤️'
    ],
    // Dynamic cheer text on YES button as NO is pressed
    yesCheerTexts: [
      'Yes, I Want a Surprise 🎁',
      'Jashu... please say Yes! 🥺💖',
      'Just one click, Bangaaram! 🌸',
      'Open the magic, Jashu! ✨🎁',
      'Jashu... just one little surprise from me? 🥹🎁',
      'Click me, Bangaaram! So much love waiting! 💖',
      'You cannot resist this surprise, Jashu! 🥰✨',
      'YES YES YES! Tap to unlock happiness! 🎉💖'
    ],
    // Mascot mood stages
    mascotMoods: [
      { emoji: '🥺', caption: "Bujji, please don't click No..." },
      { emoji: '🥹', caption: 'Look how much effort went into this, Bangaaram!' },
      { emoji: '🥺', caption: 'Pretty please with sugar on top, Jashu?' },
      { emoji: '😢', caption: 'A tear is rolling down already...' },
      { emoji: '😭', caption: 'Wiping tears with a tiny handkerchief 🤧' },
      { emoji: '💔', caption: 'Heart is melting in sadness...' },
      { emoji: '😭', caption: 'Waaaaah! Jashu, why are you so cruel? 😭' },
      { emoji: '🥺❤️', caption: 'Bujji... I prepared this little surprise just for you! 🥹💗' }
    ]
  },

  // Celebration Banner after YES is clicked
  celebration: {
    heading: 'HAPPY BIRTHDAY, JASHU! 🎉💖',
    subheading: 'September 22nd at 10:45 AM — the world was blessed with you!'
  },

  // Cake & Wish Page
  cake: {
    heading: 'Make a Wish & Blow Your Candles 🎂✨',
    subheading: 'Close your eyes, make the sweetest wish in your heart, and blow out your candles!',
    firstBiteHeading: 'First Sweet Bite is From Me! 🍰',
    firstBitePrompt: 'Open your mouth, Bangaaram... Say Aaaaa~ 🥰',
    hugHeading: 'A Tight Birthday Hug for You! 🤗💖',
    hugText: 'Even though distance separates our homes and colleges, my warmest hug reaches you right now. You are forever treasured and never alone!'
  },

  // Gift Box Reveal Copy
  gift: {
    waitingText: 'Something magical is waiting for you...',
    buttonText: 'Tap to Open Your Surprise Gift 🎁',
    heartNote: 'This box contains a little piece of my heart, endless smiles, and your birthday letter...'
  },

  // Personal Birthday Letter
  letter: {
    badge: 'A Personal Birthday Letter',
    openingCursive: 'Dear Bujji Jashmitha... 💗',
    title: 'Happy Birthday to You! 🎂💖',
    paragraphs: [
      "I am missing you a lot. I wish I could celebrate this birthday with you in person, but I can't because of the long distance between our homes and colleges. So, here is a special surprise from my side. I hope this makes you feel happy and brings the brightest, most beautiful smile to your face.",
      "Even though distance keeps our daily college routines apart, we are never far away from each other in our hearts. Kilometers may separate our classrooms, but our friendship, memories, and late-night laughs will always keep us close.",
      "Born on this wonderful day at 10:45 AM, you have brought so much light, comfort, and boundless joy into my life. Keep smiling, keep shining, and always remember that you are truly one of a kind."
    ],
    middleCursive: '"Distance may separate our homes and colleges, but it cannot separate our hearts."',
    endingCursive: 'Keep smiling, keep shining, and always remember that you are special. 🎂❤️',
    signOff: 'With lots of love and warm wishes,',
    sender: 'Your Best Friend 💕'
  },

  // Jashu's Real Beautiful Moments (Glow of Elegance)
  photos: [
    {
      id: 1,
      title: 'Glow of the Festive Diyas 🪔',
      caption: 'Grace Personified 💕',
      description: 'Your smile shines brighter than a thousand festive lamps. Sitting gracefully beside the flower rangoli!',
      date: 'Festive Radiance',
      image: asset('assets/jashu/jashu-diya-rangoli.jpg'),
      rotation: '-2deg',
      tags: ['DiwaliGlow', 'Elegance', 'Jashu']
    },
    {
      id: 2,
      title: 'Under Fairy Lights & Starlight ✨',
      caption: 'Stunning in Silk 💫',
      description: 'Dressed in embroidered teal & pink lehenga under warm starlight. Like a princess straight out of a royal fairytale!',
      date: 'Magical Evening',
      image: asset('assets/jashu/jashu-fairy-lights.jpg'),
      rotation: '2deg',
      tags: ['PrincessVibes', 'Bangaaram', 'Starlight']
    },
    {
      id: 3,
      title: 'Moments of Pure Elegance 🌸',
      caption: 'Candid & Beautiful 💖',
      description: 'Effortlessly charming in every candid frame, gently adjusting her earring against fairy-lit greenery.',
      date: 'Sweet Moments',
      image: asset('assets/jashu/jashu-candid-earring.jpg'),
      rotation: '-1.5deg',
      tags: ['CandidCharm', 'Smile', 'PureHeart']
    },
    {
      id: 4,
      title: 'Serenity by the Window 🍃',
      caption: 'Peaceful Breeze 🌿',
      description: 'A quiet serene morning looking out at green trees, with dreams as vast and beautiful as the sky.',
      date: 'Serene Thoughts',
      image: asset('assets/jashu/jashu-window-smile.jpg'),
      rotation: '1.5deg',
      tags: ['Peaceful', 'Bujji', 'Dreams']
    },
    {
      id: 5,
      title: 'Family Celebrations & Deepam Glow 🌺',
      caption: 'Blessed Traditions 🕯️',
      description: 'Standing tall with loved ones beside the grand flower rangoli. Rooted in tradition, surrounded by pure love!',
      date: 'Family & Love',
      image: asset('assets/jashu/jashu-rangoli-family.jpg'),
      rotation: '-2deg',
      tags: ['FamilyLove', 'Tradition', 'Joy']
    }
  ],

  // Real Friendship Milestones (Personalized Story)
  timeline: [
    {
      year: 'Chapter 1 · 2021',
      title: 'The Day We First Connected 🌸',
      description: 'The very first conversation that started everything. Who knew a simple hello would blossom into my life’s most treasured friendship?',
      icon: 'sparkle'
    },
    {
      year: 'Chapter 2 · 2022',
      title: 'Late Night Talks & Endless Laughs 🌙',
      description: 'Hours flew by like minutes as we talked about our colleges, funny gossip, deepest dreams, and silly jokes. You became my comfort person.',
      icon: 'heart'
    },
    {
      year: 'Chapter 3 · 2023',
      title: 'Festivals, Blessings & Candid Memories 🪔',
      description: 'Dressing up in traditional silks, celebrating Ganesh Chaturthi, taking selfies with crown filters, and making memories time can never erase.',
      icon: 'star'
    },
    {
      year: 'Chapter 4 · 2024-2026',
      title: 'Through Every Distance & Challenge 🤝',
      description: 'Different colleges, different schedules, miles apart—yet our bond only grew deeper. Distance proved that true friendship has no distance.',
      icon: 'gift'
    },
    {
      year: 'September 22 • 10:45 AM',
      title: 'The Moment My Bangaaram Was Born! 🎂',
      description: 'At 10:45 AM on September 22nd, the world became brighter and sweeter because of Jashu. Celebrating you today and always!',
      icon: 'cake'
    }
  ],

  // Distance Section Copy
  distance: {
    line1: 'Different homes. Different colleges. Different places.',
    line2: 'But one beautiful friendship with my Jashu. 💕',
    subText: 'Distance may keep us apart physically, but our friendship and memories will always keep us close.'
  },

  // Secret Messages (Clickable hidden items)
  secretMessages: [
    {
      id: 'secret-heart',
      type: 'heart',
      hint: 'A secret heart is glowing...',
      message: 'One thing I want you to know, Jashu... You are genuinely the most special friend to me. 💗'
    },
    {
      id: 'secret-star',
      type: 'star',
      hint: 'A secret star is twinkling...',
      message: 'Even when college exams and busy days get overwhelming, always remember you have me in your corner, Bangaaram.'
    },
    {
      id: 'secret-envelope',
      type: 'envelope',
      hint: 'A hidden letter is sealed...',
      message: 'Distance is measured in kilometers, never in hearts. Have the happiest birthday ever, Bujji! ❤️'
    }
  ],

  // Scratch Card Mini Activity
  scratchCard: {
    title: 'A Secret Birthday Wish For You 🪄',
    subtitle: 'Scratch the golden card below with your finger or mouse to reveal a hidden wish!',
    hiddenWish: '🌟 "May your year be as radiant as your smile, filled with peace, boundless joy, academic triumph, and endless love! Happy Birthday, Jashu! 💖🎂"'
  },

  // Feedback & Rating Configuration
  feedback: {
    title: 'How Did This Surprise Feel, Jashu? 💖',
    subtitle: 'Your happiness means everything to me! Rate your feeling and send your feedback directly to my phone 💌',
    mobileNumber: '+919876543210', // Default mobile number (can be edited/customized on UI)
    feelingOptions: [
      { id: 'tears', emoji: '🥹', label: 'Cried happy tears' },
      { id: 'smiling', emoji: '🥰', label: "Can't stop smiling" },
      { id: 'childhood', emoji: '🧸', label: 'Loved childhood memories' },
      { id: 'letter', emoji: '💌', label: 'The letter touched my soul' },
      { id: 'cake', emoji: '🍰', label: 'Loved the cake & tight hug' },
      { id: 'distance', emoji: '🫂', label: 'Miss you so much across distance' }
    ]
  },

  // Final Celebration Section
  finalCelebration: {
    heading: 'Happy Birthday, My Dearest Bujji! 💖',
    message: 'I hope this little surprise brought a huge smile to your face. Thank you for being the most genuine, caring, and wonderful friend. Born at 10:45 AM on September 22nd, you truly make this world brighter. Even though miles separate our daily lives, you are always close to my heart. Keep shining, Bangaaram!'
  },

  // Audio / Music Settings
  music: {
    title: 'Gentle Birthday Lullaby & Friendship Melody',
    audioSrc: asset('music/birthday-song.mp3')
  }
};

/**
 * =========================================================================
 * 📸 THE MASTER PHOTO ALBUM — ALL 20 REAL PHOTOS & ARTWORK
 * =========================================================================
 * Consolidates Childhood (10), Friendship (4), Jashu Today (5), and Collage (1)
 * into one seamless browseable collection with full Next / Prev lightbox support!
 */
export const MASTER_ALBUM_PHOTOS = [
  // 10 Childhood Photos
  {
    id: 'ch-1',
    category: 'childhood',
    categoryLabel: 'Childhood Days',
    title: 'Little Angel on Floral Blanket 🌸',
    subtitle: 'Baby Jashu • 10:45 AM Miracle',
    description: 'The sweetest smile in her ruffled pink dress on the floral bedsheet! Look at that tiny bindi and pure innocence!',
    src: asset('assets/childhood/jashu-baby-bed.jpg'),
    tag: 'Little Angel',
    rotation: '-2deg'
  },
  {
    id: 'ch-2',
    category: 'childhood',
    categoryLabel: 'Childhood Days',
    title: 'Those Innocent Sparkling Eyes ✨',
    subtitle: 'Baby Bangaaram',
    description: 'Those big, expressive, beautiful eyes and that little bindi! Purest innocence and radiant cuteness!',
    src: asset('assets/childhood/jashu-big-eyes-portrait.jpg'),
    tag: 'Sparkling Eyes',
    rotation: '1.5deg'
  },
  {
    id: 'ch-3',
    category: 'childhood',
    categoryLabel: 'Childhood Days',
    title: 'Little Swing Adventures 💕',
    subtitle: 'Toddler Days',
    description: 'Happily rocking in her pink swing, spreading giggles and sunshine throughout the house!',
    src: asset('assets/childhood/jashu-pink-swing.jpg'),
    tag: 'Joyful Swings',
    rotation: '-1.5deg'
  },
  {
    id: 'ch-4',
    category: 'childhood',
    categoryLabel: 'Childhood Days',
    title: 'Princess in the Cane Rocker 👑',
    subtitle: 'Sweet Childhood',
    description: 'Sitting pretty in the wooden cane swing with her ruffled tiered dress! Natural poser since day one!',
    src: asset('assets/childhood/jashu-cane-swing.jpg'),
    tag: 'Little Queen',
    rotation: '2deg'
  },
  {
    id: 'ch-5',
    category: 'childhood',
    categoryLabel: 'Childhood Days',
    title: 'Traditional Princess in Pattu Pavada 🌺',
    subtitle: 'Golden Memories',
    description: 'Dressed up in silk pattu pavada with flower garland in her hair, thoughtfully resting her chin. So cute!',
    src: asset('assets/childhood/jashu-traditional-pattu.jpg'),
    tag: 'Traditional Princess',
    rotation: '-2deg'
  },
  {
    id: 'ch-6',
    category: 'childhood',
    categoryLabel: 'Childhood Days',
    title: 'Childhood Birthday Celebration! 🎂🎈',
    subtitle: 'Grand Birthday Party',
    description: 'Surrounded by balloons, decorations, and loved ones! Mom feeding the sweetest birthday cake to little Jashu!',
    src: asset('assets/childhood/jashu-birthday-cake-party.jpg'),
    tag: 'Birthday Queen',
    rotation: '1deg'
  },
  {
    id: 'ch-7',
    category: 'childhood',
    categoryLabel: 'Childhood Days',
    title: "Mom's Endless Warmth & Love 🤱",
    subtitle: 'Baby Days with Mom',
    description: 'Resting in the comfort of mom’s lap on the wooden cot. Pure maternal love that cradled my Bangaaram!',
    src: asset('assets/childhood/jashu-mom-cot-babies.jpg'),
    tag: "Mother's Love",
    rotation: '-1.5deg'
  },
  {
    id: 'ch-8',
    category: 'childhood',
    categoryLabel: 'Childhood Days',
    title: 'Twinkling Traditional Charm ✨',
    subtitle: 'Festival Vibes',
    description: 'Standing proud with mom in radiant silk dresses! Those innocent smiles that brighten any room!',
    src: asset('assets/childhood/jashu-family-pattu.jpg'),
    tag: 'Family Blessings',
    rotation: '2deg'
  },
  {
    id: 'ch-9',
    category: 'childhood',
    categoryLabel: 'Childhood Days',
    title: 'Riding Her Red Bicycle with Doll! 🚲🎀',
    subtitle: 'Little Explorer',
    description: 'Proudly riding her cycle with training wheels and her favorite doll on the handlebars! Adventurous Jashu!',
    src: asset('assets/childhood/jashu-bicycle-doll.jpg'),
    tag: 'Little Cyclist',
    rotation: '-2deg'
  },
  {
    id: 'ch-10',
    category: 'childhood',
    categoryLabel: 'Childhood Days',
    title: 'Birthday Cake Cutting at Home 🍰🎉',
    subtitle: 'Home Birthday Joy',
    description: 'Cutting the delicious birthday cake with family around the coffee table with balloons and smiles!',
    src: asset('assets/childhood/jashu-childhood-birthday-tv.jpg'),
    tag: 'Cake Cutting',
    rotation: '1.5deg'
  },

  // 4 Friendship Photos (Me with Jashu)
  {
    id: 'fr-1',
    category: 'friendship',
    categoryLabel: 'Me & Jashu',
    title: 'Half Heart + Half Heart = Our Love 🫶',
    subtitle: 'Best Friends Forever 💕',
    description: 'Two hands making one complete heart. Distance may separate our homes and colleges, but this heart will forever stay complete!',
    src: asset('assets/friendship/me-and-jashu-heart-sign.jpg'),
    tag: 'Our Heart Sign 🫶',
    rotation: '-1.5deg'
  },
  {
    id: 'fr-2',
    category: 'friendship',
    categoryLabel: 'Me & Jashu',
    title: 'Sparkles & Endless Laughter ✨👑',
    subtitle: 'Queens of Friendship 💖',
    description: 'Two best friends, endless laughs, and a lifetime of inside jokes! My favorite person to take selfies with!',
    src: asset('assets/friendship/me-and-jashu-sparkle-selfie.jpg'),
    tag: 'Pure Joy ✨',
    rotation: '2deg'
  },
  {
    id: 'fr-3',
    category: 'friendship',
    categoryLabel: 'Me & Jashu',
    title: 'Festive Twirls & Golden Days 🌸',
    subtitle: 'Side by Side Always 💫',
    description: 'Dressed up in festive silk lehengas, sitting together and sharing every little secret. Unbreakable bond!',
    src: asset('assets/friendship/me-and-jashu-traditional.jpg'),
    tag: 'Festive Glow 🌸',
    rotation: '-2deg'
  },
  {
    id: 'fr-4',
    category: 'friendship',
    categoryLabel: 'Me & Jashu',
    title: "Blessings by Bappa's Side 🌺🙏",
    subtitle: 'Prayers for You 🌟',
    description: 'Standing together in front of the grand Vinayaka pandal, wishing for your eternal happiness, health, and success!',
    src: asset('assets/friendship/me-and-jashu-ganesh-pandal.jpg'),
    tag: 'Bappa Blessings 🌺',
    rotation: '1.5deg'
  },

  // 5 Jashu Today Photos
  {
    id: 'ja-1',
    category: 'jashu',
    categoryLabel: 'Jashu Today',
    title: 'Glow of the Festive Diyas 🪔',
    subtitle: 'Grace Personified 💕',
    description: 'Your smile shines brighter than a thousand festive lamps. Sitting gracefully beside the flower rangoli!',
    src: asset('assets/jashu/jashu-diya-rangoli.jpg'),
    tag: 'Diwali Glow',
    rotation: '-2deg'
  },
  {
    id: 'ja-2',
    category: 'jashu',
    categoryLabel: 'Jashu Today',
    title: 'Under Fairy Lights & Starlight ✨',
    subtitle: 'Stunning in Silk 💫',
    description: 'Dressed in embroidered teal & pink lehenga under warm starlight. Like a princess straight out of a royal fairytale!',
    src: asset('assets/jashu/jashu-fairy-lights.jpg'),
    tag: 'Fairy Lights',
    rotation: '2deg'
  },
  {
    id: 'ja-3',
    category: 'jashu',
    categoryLabel: 'Jashu Today',
    title: 'Moments of Pure Elegance 🌸',
    subtitle: 'Candid & Beautiful 💖',
    description: 'Effortlessly charming in every candid frame, gently adjusting her earring against fairy-lit greenery.',
    src: asset('assets/jashu/jashu-candid-earring.jpg'),
    tag: 'Candid Charm',
    rotation: '-1.5deg'
  },
  {
    id: 'ja-4',
    category: 'jashu',
    categoryLabel: 'Jashu Today',
    title: 'Serenity by the Window 🍃',
    subtitle: 'Peaceful Breeze 🌿',
    description: 'A quiet serene morning looking out at green trees, with dreams as vast and beautiful as the sky.',
    src: asset('assets/jashu/jashu-window-smile.jpg'),
    tag: 'Serene Smile',
    rotation: '1.5deg'
  },
  {
    id: 'ja-5',
    category: 'jashu',
    categoryLabel: 'Jashu Today',
    title: 'Family Celebrations & Deepam Glow 🌺',
    subtitle: 'Blessed Traditions 🕯️',
    description: 'Standing tall with loved ones beside the grand flower rangoli. Rooted in tradition, surrounded by pure love!',
    src: asset('assets/jashu/jashu-rangoli-family.jpg'),
    tag: 'Family Blessings',
    rotation: '-2deg'
  },

  // 1 Scrapbook Collage Artwork
  {
    id: 'art-1',
    category: 'scrapbook',
    categoryLabel: 'Scrapbook Artwork',
    title: 'Cherished Memories Scrapbook Collage 🎨',
    subtitle: 'Handmade Memory Board 💖',
    description: 'A loving visual montage celebrating precious snapshots, birthday wishes, and our unforgettable friendship journey!',
    src: asset('assets/scrapbook-collage.png'),
    tag: 'Artwork Collage',
    rotation: '1deg'
  }
];

export const BIRTHDAY_CONFIG = BIRTHDAY_DATA;

