import React, { useState } from 'react';
import { Heart, Sparkles, ArrowRight, ArrowLeft, Maximize2, X, Baby, Cake, Users, Bike } from 'lucide-react';
import { sfx } from '../utils/soundEffects';

const ALL_CHILDHOOD_PHOTOS = [
  {
    id: 'baby-bed',
    category: 'baby',
    title: 'Little Angel on Floral Blanket 🌸',
    age: 'Baby Jashu • 10:45 AM Miracle',
    caption: 'The sweetest smile in her ruffled pink dress on the floral bedsheet! Look at that tiny bindi and pure innocence!',
    src: './assets/childhood/jashu-baby-bed.jpg',
    tag: 'Little Angel',
    icon: '🌸'
  },
  {
    id: 'big-eyes',
    category: 'baby',
    title: 'Those Innocent Sparkling Eyes ✨',
    age: 'Baby Bangaaram',
    caption: 'Those big, expressive, beautiful eyes and that little bindi! Purest innocence and radiant cuteness!',
    src: './assets/childhood/jashu-big-eyes-portrait.jpg',
    tag: 'Sparkling Eyes',
    icon: '✨'
  },
  {
    id: 'pink-swing',
    category: 'baby',
    title: 'Little Swing Adventures 💕',
    age: 'Toddler Days',
    caption: 'Happily rocking in her pink swing, spreading giggles and sunshine throughout the house!',
    src: './assets/childhood/jashu-pink-swing.jpg',
    tag: 'Joyful Swings',
    icon: '💕'
  },
  {
    id: 'cane-swing',
    category: 'baby',
    title: 'Princess in the Cane Rocker 👑',
    age: 'Sweet Childhood',
    caption: 'Sitting pretty in the wooden cane swing with her ruffled tiered dress! Natural poser since day one!',
    src: './assets/childhood/jashu-cane-swing.jpg',
    tag: 'Little Queen',
    icon: '👑'
  },
  {
    id: 'traditional-pattu',
    category: 'family',
    title: 'Traditional Princess in Pattu Pavada 🌺',
    age: 'Golden Memories',
    caption: 'Dressed up in silk pattu pavada with flower garland in her hair, thoughtfully resting her chin. So cute!',
    src: './assets/childhood/jashu-traditional-pattu.jpg',
    tag: 'Traditional Princess',
    icon: '🌺'
  },
  {
    id: 'birthday-cake-party',
    category: 'birthdays',
    title: 'Childhood Birthday Celebration! 🎂🎈',
    age: 'Grand Birthday Party',
    caption: 'Surrounded by balloons, decorations, and loved ones! Mom feeding the sweetest birthday cake to little Jashu!',
    src: './assets/childhood/jashu-birthday-cake-party.jpg',
    tag: 'Birthday Queen',
    icon: '🎂'
  },
  {
    id: 'mom-cot-babies',
    category: 'family',
    title: "Mom's Endless Warmth & Love 🤱",
    age: 'Baby Days with Mom',
    caption: 'Resting in the comfort of mom’s lap on the wooden cot. Pure maternal love that cradled my Bangaaram!',
    src: './assets/childhood/jashu-mom-cot-babies.jpg',
    tag: "Mother's Love",
    icon: '🤱'
  },
  {
    id: 'family-pattu',
    category: 'family',
    title: 'Twinkling Traditional Charm ✨',
    age: 'Festival Vibes',
    caption: 'Standing proud with mom in radiant silk dresses! Those innocent smiles that brighten any room!',
    src: './assets/childhood/jashu-family-pattu.jpg',
    tag: 'Family Blessings',
    icon: '✨'
  },
  {
    id: 'bicycle-doll',
    category: 'birthdays',
    title: 'Riding Her Red Bicycle with Doll! 🚲🎀',
    age: 'Little Explorer',
    caption: 'Proudly riding her cycle with training wheels and her favorite doll on the handlebars! Adventurous Jashu!',
    src: './assets/childhood/jashu-bicycle-doll.jpg',
    tag: 'Little Cyclist',
    icon: '🚲'
  },
  {
    id: 'childhood-birthday-tv',
    category: 'birthdays',
    title: 'Birthday Cake Cutting at Home 🍰🎉',
    age: 'Home Birthday Joy',
    caption: 'Cutting the delicious birthday cake with family around the coffee table with balloons and smiles!',
    src: './assets/childhood/jashu-childhood-birthday-tv.jpg',
    tag: 'Cake Cutting',
    icon: '🍰'
  }
];

export default function ChildhoodGallery({ onProceedToScrapbook }) {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'baby' | 'birthdays' | 'family'
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [loveCount, setLoveCount] = useState(1);
  const [floatingHearts, setFloatingHearts] = useState([]);

  // Filtered photos
  const filteredPhotos = activeFilter === 'all'
    ? ALL_CHILDHOOD_PHOTOS
    : ALL_CHILDHOOD_PHOTOS.filter(p => p.category === activeFilter);

  // Safely get current photo
  const currentPhoto = filteredPhotos[Math.min(activeIndex, filteredPhotos.length - 1)] || filteredPhotos[0];

  const handleNext = () => {
    sfx.playChimeChord();
    setActiveIndex((prev) => (prev + 1) % filteredPhotos.length);
  };

  const handlePrev = () => {
    sfx.playChimeChord();
    setActiveIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const handleFilterChange = (filterId) => {
    sfx.playChimeChord();
    setActiveFilter(filterId);
    setActiveIndex(0);
  };

  const handleSendLove = () => {
    sfx.playChimeChord();
    setLoveCount((prev) => prev + 1);
    const id = Date.now();
    const newHeart = { id, x: Math.random() * 80 - 40 };
    setFloatingHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== id));
    }, 1200);
  };

  return (
    <section style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.8rem',
      position: 'relative',
      zIndex: 10,
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      <div className="glass-card" style={{
        maxWidth: '880px',
        width: '100%',
        maxHeight: '94vh',
        padding: 'clamp(1rem, 3vw, 1.8rem)',
        borderRadius: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        background: 'rgba(255, 255, 255, 0.96)',
        boxShadow: '0 20px 50px rgba(244, 114, 182, 0.28)',
        border: '2px solid rgba(251, 207, 232, 0.95)',
        overflowY: 'auto'
      }}>
        {/* Top Header Badge & Love Button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '4px'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '3px 14px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #fdf2f8, #fef3c7)',
            border: '1.5px solid #fbcfe8',
            color: '#db2777',
            fontSize: '12px',
            fontWeight: 700
          }}>
            <Baby size={15} />
            <span>Little Jashu's Memories • 10 Nostalgic Photos 🧸</span>
            <Sparkles size={13} />
          </div>

          <button
            onClick={handleSendLove}
            style={{
              background: '#fdf2f8',
              border: '1px solid #fbcfe8',
              borderRadius: '999px',
              padding: '4px 14px',
              color: '#db2777',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(244, 114, 182, 0.2)'
            }}
          >
            <Heart size={14} fill="#f472b6" />
            <span>Send Love ({loveCount})</span>
          </button>
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '2px' }}>
          <h2 className="font-serif" style={{
            fontSize: 'clamp(1.3rem, 3.2vw, 1.85rem)',
            color: '#831843',
            fontWeight: 700,
            margin: '0 0 2px 0'
          }}>
            Little Jashu's Childhood Memory Album 👶💖
          </h2>
          <p style={{ fontSize: '11px', color: '#9333ea', fontWeight: 600, margin: 0 }}>
            Born at 10:45 AM on September 22nd — the cutest memories of my Bangaaram growing up!
          </p>
        </div>

        {/* Filter Tabs */}
        <div style={{
          display: 'flex',
          gap: '6px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          margin: '4px 0'
        }}>
          {[
            { id: 'all', label: 'All Photos (10)', icon: '🌟' },
            { id: 'baby', label: 'Baby Days (4)', icon: '👶' },
            { id: 'birthdays', label: 'Birthdays & Play (3)', icon: '🎂' },
            { id: 'family', label: 'Family & Tradition (3)', icon: '🌸' }
          ].map(tab => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleFilterChange(tab.id)}
                style={{
                  padding: '3px 12px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: isActive ? '1.5px solid #db2777' : '1px solid #fbcfe8',
                  background: isActive ? 'linear-gradient(135deg, #f472b6, #db2777)' : '#ffffff',
                  color: isActive ? '#ffffff' : '#6b7280',
                  boxShadow: isActive ? '0 3px 10px rgba(219, 39, 119, 0.25)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>{tab.icon} {tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Central Polaroid Photo Showcase */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(8px, 2.5vw, 20px)',
          width: '100%',
          margin: '4px 0'
        }}>
          {/* Prev Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous Photo"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#ffffff',
              border: '1.5px solid #fbcfe8',
              color: '#db2777',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(244, 114, 182, 0.25)',
              transition: 'transform 0.2s ease',
              flexShrink: 0
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <ArrowLeft size={16} />
          </button>

          {/* Active Polaroid Card */}
          <div
            onClick={() => setIsZoomed(true)}
            style={{
              position: 'relative',
              background: '#ffffff',
              padding: '8px 8px 12px 8px',
              borderRadius: '16px',
              boxShadow: '0 12px 30px rgba(219, 39, 119, 0.22), 0 2px 8px rgba(0,0,0,0.08)',
              border: '2px solid #fce7f3',
              maxWidth: '340px',
              width: '100%',
              cursor: 'pointer',
              textAlign: 'center',
              animation: 'fadeIn 0.3s ease-out'
            }}
            title="Click to view full screen!"
          >
            {/* Tag Badge */}
            <span style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              background: 'rgba(219, 39, 119, 0.9)',
              color: '#ffffff',
              fontSize: '10px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '999px',
              backdropFilter: 'blur(4px)',
              zIndex: 2
            }}>
              {currentPhoto.tag}
            </span>

            {/* Enlarge Hint */}
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '50%',
              width: '26px',
              height: '26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#db2777',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              zIndex: 2
            }}>
              <Maximize2 size={12} />
            </div>

            {/* Photo Container */}
            <div style={{
              width: '100%',
              height: '220px',
              borderRadius: '10px',
              overflow: 'hidden',
              backgroundColor: '#fce7f3',
              marginBottom: '6px'
            }}>
              <img
                src={currentPhoto.src}
                alt={currentPhoto.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>

            {/* Photo Title & Age */}
            <h3 className="font-serif" style={{ fontSize: '1.05rem', color: '#831843', fontWeight: 700, margin: '0 0 1px 0' }}>
              {currentPhoto.title}
            </h3>
            <span style={{ fontSize: '11px', color: '#9333ea', fontWeight: 600 }}>
              {currentPhoto.age} • ({activeIndex + 1} of {filteredPhotos.length})
            </span>

            {/* Floating Hearts */}
            {floatingHearts.map((h) => (
              <div
                key={h.id}
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: `calc(50% + ${h.x}px)`,
                  fontSize: '22px',
                  pointerEvents: 'none',
                  animation: 'gentleFloat 1.2s ease-out forwards'
                }}
              >
                🥰
              </div>
            ))}
          </div>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            aria-label="Next Photo"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#ffffff',
              border: '1.5px solid #fbcfe8',
              color: '#db2777',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(244, 114, 182, 0.25)',
              transition: 'transform 0.2s ease',
              flexShrink: 0
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Caption */}
        <p style={{
          fontSize: '12px',
          color: '#374151',
          maxWidth: '580px',
          textAlign: 'center',
          margin: '2px auto',
          lineHeight: '1.45',
          fontStyle: 'italic'
        }}>
          "{currentPhoto.caption}"
        </p>

        {/* Thumbnail Filmstrip (All 10 photos) */}
        <div style={{
          display: 'flex',
          gap: '6px',
          justifyContent: 'flex-start',
          alignItems: 'center',
          maxWidth: '100%',
          overflowX: 'auto',
          padding: '4px 2px',
          scrollbarWidth: 'thin'
        }}>
          {filteredPhotos.map((p, idx) => {
            const isSel = idx === activeIndex;
            return (
              <button
                key={p.id}
                onClick={() => {
                  sfx.playChimeChord();
                  setActiveIndex(idx);
                }}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: isSel ? '2px solid #db2777' : '1px solid #fbcfe8',
                  transform: isSel ? 'scale(1.12)' : 'scale(1)',
                  boxShadow: isSel ? '0 3px 10px rgba(219, 39, 119, 0.4)' : 'none',
                  cursor: 'pointer',
                  padding: 0,
                  background: '#ffffff',
                  flexShrink: 0,
                  transition: 'all 0.2s ease'
                }}
                title={p.title}
              >
                <img
                  src={p.src}
                  alt={p.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </button>
            );
          })}
        </div>

        {/* Footer & Next Stage Action */}
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
          paddingTop: '6px',
          borderTop: '1px dashed #fbcfe8'
        }}>
          <p className="handwriting-accent" style={{ fontSize: '1.15rem', color: '#9333ea', margin: 0 }}>
            "From this cute baby to the most precious friend in my life... Always my Bujji! 💕"
          </p>

          <button
            onClick={onProceedToScrapbook}
            className="btn-yes"
            style={{
              padding: '8px 18px',
              fontSize: '13px',
              borderRadius: '999px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>Our Friendship Scrapbook 📸</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX FOR CHILDHOOD PHOTO */}
      {isZoomed && (
        <div className="lightbox-backdrop" onClick={() => setIsZoomed(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '92vw',
              maxHeight: '92vh',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ffffff',
              padding: '16px'
            }}
          >
            <button
              onClick={() => setIsZoomed(false)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                zIndex: 20,
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.6)',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={20} />
            </button>

            <img
              src={currentPhoto.src}
              alt={currentPhoto.title}
              style={{
                maxWidth: '85vw',
                maxHeight: '75vh',
                objectFit: 'contain',
                borderRadius: '12px'
              }}
            />

            <div style={{ marginTop: '12px', textAlign: 'center' }}>
              <h4 className="font-serif" style={{ fontSize: '1.3rem', color: '#831843', margin: 0 }}>
                {currentPhoto.title} ({currentPhoto.age})
              </h4>
              <p style={{ fontSize: '13px', color: '#4b5563', margin: '4px 0 0 0' }}>
                {currentPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
