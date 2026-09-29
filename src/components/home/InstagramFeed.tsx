'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Heart, 
  MessageCircle, 
  Share2, 
  ArrowUpRight, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight, 
  X,
  CheckCircle2,
  Tv,
  LayoutGrid
} from 'lucide-react';
import { InstagramFeedItem } from '@/app/api/instagram/route';

export function InstagramFeed() {
  const [items, setItems] = useState<InstagramFeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'reels' | 'posts'>('all');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [unmutedCardId, setUnmutedCardId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'interactive' | 'embeds'>('interactive');
  
  // Modal / Story Reel Viewer state
  const [activeModalItem, setActiveModalItem] = useState<InstagramFeedItem | null>(null);
  const [useOfficialEmbedInModal, setUseOfficialEmbedInModal] = useState(true);
  const [modalVideoPlaying, setModalVideoPlaying] = useState(true);
  const [modalSoundOn, setModalSoundOn] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [likesCount, setLikesCount] = useState<Record<string, number>>({});
  const [copiedLink, setCopiedLink] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const cardVideoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  // 1. Fetch latest posts from API
  const fetchFeed = async (filter = activeFilter, isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const res = await fetch(`/api/instagram?type=${filter}`);
      if (res.ok) {
        const json = await res.json();
        setItems(json.data || []);
        
        // Initialize likes count
        const initialLikes: Record<string, number> = {};
        json.data.forEach((p: InstagramFeedItem) => {
          initialLikes[p.id] = p.likes;
        });
        setLikesCount(initialLikes);
      }
    } catch (err) {
      console.error('Failed to load Instagram feed:', err);
    } finally {
      setLoading(false);
      if (isManual) {
        setTimeout(() => setRefreshing(false), 500);
      }
    }
  };

  useEffect(() => {
    fetchFeed(activeFilter);
  }, [activeFilter]);

  // 2. Play/Pause card video on hover
  const handleMouseEnter = (item: InstagramFeedItem) => {
    setHoveredCardId(item.id);
    if (item.type === 'REEL' && item.videoUrl) {
      const vid = cardVideoRefs.current[item.id];
      if (vid) {
        vid.muted = unmutedCardId !== item.id;
        vid.play().catch(() => {});
      }
    }
  };

  const handleMouseLeave = (item: InstagramFeedItem) => {
    setHoveredCardId(null);
    if (item.type === 'REEL' && item.videoUrl) {
      const vid = cardVideoRefs.current[item.id];
      if (vid && unmutedCardId !== item.id) {
        vid.pause();
      }
    }
  };

  // 3. Sound toggle for a specific card
  const toggleCardSound = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newSoundId = unmutedCardId === id ? null : id;
    setUnmutedCardId(newSoundId);

    const vid = cardVideoRefs.current[id];
    if (vid) {
      vid.muted = newSoundId !== id;
      if (newSoundId === id) {
        vid.play().catch(() => {});
      }
    }
  };

  // 4. Modal Like toggle
  const toggleLike = (id: string) => {
    setLikedPosts((prev) => {
      const isLiked = !prev[id];
      setLikesCount((cnt) => ({
        ...cnt,
        [id]: (cnt[id] || 0) + (isLiked ? 1 : -1),
      }));
      return { ...prev, [id]: isLiked };
    });
  };

  // 5. Scroll container controls
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = 330;
      const amount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  // 6. Navigate stories in modal
  const navigateModal = (direction: 'prev' | 'next') => {
    if (!activeModalItem) return;
    const currentIndex = items.findIndex((i) => i.id === activeModalItem.id);
    if (direction === 'prev' && currentIndex > 0) {
      setActiveModalItem(items[currentIndex - 1]);
    } else if (direction === 'next' && currentIndex < items.length - 1) {
      setActiveModalItem(items[currentIndex + 1]);
    }
  };

  // 7. Share link
  const handleShare = () => {
    if (activeModalItem) {
      navigator.clipboard.writeText(activeModalItem.instagramUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-[#0d0c0a] text-[#fbf9f5] border-t border-[#24201a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div>
            {/* Kicker: — FROM THE ROAD */}
            <div className="flex items-center gap-2 mb-4 text-[11px] font-mono uppercase tracking-[0.25em] text-[#c48c58]">
              <span className="w-5 h-[1.5px] bg-[#c48c58]" />
              <span>FROM THE ROAD</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-tight mb-5">
              Wish you <em className="italic font-normal text-[#f4ece1]">were here.</em>
            </h2>

            {/* Follow Instagram Pill & Actions */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="https://www.instagram.com/hightrip.experiences/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#181512] hover:bg-[#231f1a] border border-[#383127] hover:border-[#c48c58] text-stone-200 hover:text-white transition-all duration-300 text-xs sm:text-sm font-medium shadow-xs group cursor-pointer"
              >
                {/* Instagram 4-grid glyph icon */}
                <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5 opacity-80 group-hover:opacity-100 transition-opacity">
                  <span className="w-1.5 h-1.5 rounded-[1px] bg-stone-300 group-hover:bg-[#c48c58]" />
                  <span className="w-1.5 h-1.5 rounded-[1px] bg-stone-300 group-hover:bg-[#c48c58]" />
                  <span className="w-1.5 h-1.5 rounded-[1px] bg-stone-300 group-hover:bg-[#c48c58]" />
                  <span className="w-1.5 h-1.5 rounded-[1px] bg-stone-300 group-hover:bg-[#c48c58]" />
                </div>
                <span>Follow @hightrip.experiences</span>
              </a>

              {/* View Switcher: Interactive Cards vs Real Embeds */}
              <div className="inline-flex p-1 rounded-full bg-[#161310] border border-[#2b251f]">
                <button
                  type="button"
                  onClick={() => setViewMode('interactive')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                    viewMode === 'interactive'
                      ? 'bg-[#c48c58] text-[#14110e] font-bold shadow-xs'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <LayoutGrid className="w-3 h-3" />
                  <span>Interactive Cards</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('embeds')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                    viewMode === 'embeds'
                      ? 'bg-[#c48c58] text-[#14110e] font-bold shadow-xs'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Tv className="w-3 h-3" />
                  <span>Real Instagram Embeds</span>
                </button>
              </div>

              {/* Refresh Feed Button */}
              <button
                type="button"
                onClick={() => fetchFeed(activeFilter, true)}
                disabled={refreshing}
                title="Fetch latest posts from Instagram"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-stone-800 hover:border-stone-600 bg-[#14120f] text-stone-400 hover:text-stone-200 text-xs font-mono transition-all cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 text-[#c48c58] ${refreshing ? 'animate-spin' : ''}`} />
                <span>{refreshing ? 'Syncing...' : 'Sync Feed'}</span>
              </button>
            </div>
          </div>

          {/* Carousel Arrow Controls */}
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              aria-label="Previous stories"
              className="w-10 h-10 rounded-full border border-stone-800 bg-[#161310] text-stone-300 hover:border-[#c48c58] hover:text-[#c48c58] transition-all flex items-center justify-center cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              aria-label="Next stories"
              className="w-10 h-10 rounded-full border border-stone-800 bg-[#161310] text-stone-300 hover:border-[#c48c58] hover:text-[#c48c58] transition-all flex items-center justify-center cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* VIEW MODE 1: Interactive Hover & Video Player Cards      */}
        {/* ======================================================== */}
        {viewMode === 'interactive' && (
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-6 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0"
            style={{ scrollBehavior: 'smooth' }}
          >
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="snap-start flex-none w-[280px] sm:w-[310px] aspect-[9/14] rounded-3xl bg-[#181512] animate-pulse border border-stone-800"
                />
              ))
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  onMouseEnter={() => handleMouseEnter(item)}
                  onMouseLeave={() => handleMouseLeave(item)}
                  onClick={() => setActiveModalItem(item)}
                  className="snap-start flex-none w-[280px] sm:w-[305px] md:w-[315px] relative aspect-[9/14] rounded-3xl overflow-hidden bg-[#181512] border border-[#2b251f] hover:border-[#c48c58]/80 transition-all duration-500 shadow-lg hover:shadow-2xl hover:-translate-y-2 cursor-pointer group"
                >
                  {/* 1. Underlying Cover Image */}
                  <Image
                    src={item.image}
                    alt={item.captionTitle || 'High Trip Instagram Post'}
                    fill
                    sizes="(max-width: 640px) 280px, 315px"
                    className={`object-cover transition-opacity duration-500 ${
                      hoveredCardId === item.id && item.videoUrl ? 'opacity-0' : 'opacity-100 group-hover:scale-105 transition-transform duration-700'
                    }`}
                  />

                  {/* 2. Embedded Video on Hover */}
                  {item.videoUrl && (
                    <video
                      ref={(el) => {
                        cardVideoRefs.current[item.id] = el;
                      }}
                      src={item.videoUrl}
                      loop
                      muted={unmutedCardId !== item.id}
                      playsInline
                      preload="metadata"
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                        hoveredCardId === item.id || unmutedCardId === item.id ? 'opacity-100 scale-100' : 'opacity-0'
                      }`}
                    />
                  )}

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-white text-[#181512] shadow-md">
                      {item.type}
                    </span>

                    {item.type === 'REEL' && (
                      <button
                        type="button"
                        onClick={(e) => toggleCardSound(item.id, e)}
                        title={unmutedCardId === item.id ? 'Mute' : 'Play with Sound'}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 text-[11px] font-mono text-stone-200 transition-all cursor-pointer shadow-md hover:border-[#c48c58]"
                      >
                        <Play className="w-2.5 h-2.5 fill-current text-stone-200" />
                        <span>Sound</span>
                        {unmutedCardId === item.id ? (
                          <span className="flex items-end gap-0.5 h-3 ml-0.5">
                            <span className="w-0.5 h-3 bg-[#c48c58] rounded-full animate-bounce" />
                            <span className="w-0.5 h-2 bg-[#c48c58] rounded-full animate-bounce [animation-delay:0.15s]" />
                            <span className="w-0.5 h-3.5 bg-[#c48c58] rounded-full animate-bounce [animation-delay:0.3s]" />
                          </span>
                        ) : (
                          <span className="flex items-end gap-0.5 h-2.5 ml-0.5 opacity-60">
                            <span className="w-0.5 h-1.5 bg-stone-300 rounded-full" />
                            <span className="w-0.5 h-2.5 bg-stone-300 rounded-full" />
                            <span className="w-0.5 h-1 bg-stone-300 rounded-full" />
                          </span>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Center Branding for Item 3 */}
                  {item.isBrandPost && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 bg-black/40 backdrop-blur-[2px]">
                      <div className="relative w-20 h-16 mb-4 filter drop-shadow-md">
                        <Image
                          src="/brand/logo.png"
                          alt="High Trip Holidays"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="font-serif text-sm tracking-widest uppercase text-white/90 font-medium">
                        HIGH TRIP HOLIDAYS
                      </div>
                      <div className="text-[9px] font-mono tracking-wider uppercase text-[#c48c58] mt-0.5">
                        TRAVEL. EXPLORE. EXPERIENCE.
                      </div>
                    </div>
                  )}

                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-5 left-5 right-5 z-10 text-center">
                    {item.captionTitle && (
                      <div
                        className={`${
                          item.id === 'ig-reel-1'
                            ? 'text-xs text-stone-200/90 font-mono italic'
                            : 'font-serif text-lg sm:text-xl font-medium tracking-wide text-white drop-shadow-md'
                        }`}
                      >
                        {item.captionTitle}
                      </div>
                    )}
                    {item.captionSub && (
                      <div
                        className={`${
                          item.id === 'ig-reel-2'
                            ? 'font-serif italic text-2xl sm:text-3xl text-[#c48c58] -mt-1 font-light'
                            : item.isBrandPost
                            ? 'font-serif italic text-3xl sm:text-4xl text-amber-300 drop-shadow-md font-light'
                            : 'text-xs font-mono tracking-[0.2em] text-[#c48c58] uppercase mt-1'
                        }`}
                      >
                        {item.captionSub}
                      </div>
                    )}

                    {/* Hover Click Hint */}
                    <div className="mt-3 flex items-center justify-center gap-3 text-[11px] font-mono text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[#c48c58] underline underline-offset-4 flex items-center gap-1">
                        <span>Watch Real Reel</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW MODE 2: Real Live Official Instagram Embeds         */}
        {/* ======================================================== */}
        {viewMode === 'embeds' && (
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-6 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0"
            style={{ scrollBehavior: 'smooth' }}
          >
            {items.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="snap-start flex-none w-[310px] sm:w-[330px] rounded-3xl overflow-hidden bg-[#14120f] border border-[#2b251f] shadow-xl p-2"
              >
                <div className="relative aspect-[9/15] w-full rounded-2xl overflow-hidden bg-black">
                  <iframe
                    src={item.embedUrl || `https://www.instagram.com/reel/${item.shortcode}/embed/`}
                    className="w-full h-full border-0 rounded-2xl"
                    allowTransparency={true}
                    allow="encrypted-media"
                    scrolling="no"
                  />
                </div>
                <div className="p-3 text-center">
                  <a
                    href={item.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#c48c58] hover:underline"
                  >
                    <span>Open in Instagram App</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* Interactive Full-Screen Reel & Post Viewer Modal         */}
      {/* ======================================================== */}
      {activeModalItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-md p-4 sm:p-6"
          onClick={() => setActiveModalItem(null)}
        >
          {/* Modal Container */}
          <div
            className="relative w-full max-w-4xl bg-[#14120f] border border-[#2b251f] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black/90 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Embed or Video Player */}
            <div className="relative w-full md:w-[56%] aspect-[9/14] md:aspect-auto bg-black flex items-center justify-center overflow-hidden">
              {useOfficialEmbedInModal && activeModalItem.embedUrl ? (
                // Official Instagram Embed Iframe Player
                <iframe
                  src={activeModalItem.embedUrl}
                  className="w-full h-full min-h-[500px] sm:min-h-[580px] border-0"
                  allowTransparency={true}
                  allow="encrypted-media"
                  scrolling="no"
                />
              ) : activeModalItem.videoUrl ? (
                // High-def Custom Video Player
                <div className="relative w-full h-full flex items-center justify-center">
                  <video
                    ref={modalVideoRef}
                    src={activeModalItem.videoUrl}
                    autoPlay
                    loop
                    muted={!modalSoundOn}
                    playsInline
                    className="w-full h-full object-cover"
                  />

                  {/* Sound & Play Controls on Video */}
                  <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (modalVideoRef.current) {
                          if (modalVideoPlaying) modalVideoRef.current.pause();
                          else modalVideoRef.current.play();
                          setModalVideoPlaying(!modalVideoPlaying);
                        }
                      }}
                      className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors cursor-pointer"
                    >
                      {modalVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setModalSoundOn(!modalSoundOn)}
                      className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors cursor-pointer"
                    >
                      {modalSoundOn ? <Volume2 className="w-3.5 h-3.5 text-[#c48c58]" /> : <VolumeX className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={activeModalItem.image}
                    alt={activeModalItem.captionTitle || 'High Trip Post'}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Prev / Next Modal Arrows */}
              <button
                type="button"
                onClick={() => navigateModal('prev')}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => navigateModal('next')}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Right Details Column */}
            <div className="w-full md:w-[44%] p-6 sm:p-7 flex flex-col justify-between overflow-y-auto">
              <div>
                {/* Profile Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#2b251f]">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#c48c58] p-0.5">
                      <Image
                        src="/brand/logo.png"
                        alt="High Trip"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
                        <span>hightrip.experiences</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c48c58] fill-current" />
                      </div>
                      <div className="text-[11px] font-mono text-stone-400">High Trip Holidays</div>
                    </div>
                  </div>

                  <a
                    href="https://www.instagram.com/hightrip.experiences/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-[#c48c58] text-[#14110e] hover:bg-[#b07844] transition-colors"
                  >
                    Follow
                  </a>
                </div>

                {/* Player Mode Switcher in Modal */}
                {activeModalItem.embedUrl && (
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setUseOfficialEmbedInModal(true)}
                      className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer ${
                        useOfficialEmbedInModal
                          ? 'bg-[#c48c58] text-[#14110e] font-bold'
                          : 'bg-[#1e1a15] text-stone-400 hover:text-white'
                      }`}
                    >
                      Official Reel Player
                    </button>
                    <button
                      type="button"
                      onClick={() => setUseOfficialEmbedInModal(false)}
                      className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer ${
                        !useOfficialEmbedInModal
                          ? 'bg-[#c48c58] text-[#14110e] font-bold'
                          : 'bg-[#1e1a15] text-stone-400 hover:text-white'
                      }`}
                    >
                      Cinema Player
                    </button>
                  </div>
                )}

                {/* Caption & Story Context */}
                <div className="py-4 space-y-3">
                  <div className="text-xs font-mono text-[#c48c58] uppercase tracking-wider">
                    {activeModalItem.type} · {activeModalItem.timestamp}
                  </div>
                  <p className="text-sm text-stone-200 leading-relaxed font-light">
                    {activeModalItem.captionFull}
                  </p>
                </div>
              </div>

              {/* Action Buttons & Like Counter */}
              <div className="pt-4 border-t border-[#2b251f] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Interactive Like Button */}
                    <button
                      type="button"
                      onClick={() => toggleLike(activeModalItem.id)}
                      className="flex items-center gap-1.5 text-sm font-mono cursor-pointer transition-transform active:scale-125"
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors ${
                          likedPosts[activeModalItem.id]
                            ? 'text-rose-500 fill-current'
                            : 'text-stone-300 hover:text-rose-400'
                        }`}
                      />
                      <span className="font-semibold text-stone-200">
                        {(likesCount[activeModalItem.id] || activeModalItem.likes).toLocaleString()}
                      </span>
                    </button>

                    {/* Comment Count */}
                    <div className="flex items-center gap-1.5 text-sm font-mono text-stone-300">
                      <MessageCircle className="w-5 h-5" />
                      <span>{activeModalItem.comments}</span>
                    </div>

                    {/* Share Button */}
                    <button
                      type="button"
                      onClick={handleShare}
                      title="Copy link"
                      className="text-stone-300 hover:text-white cursor-pointer transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    {copiedLink && (
                      <span className="text-[11px] font-mono text-emerald-400">Copied!</span>
                    )}
                  </div>

                  {/* Direct Link to Instagram */}
                  <a
                    href={activeModalItem.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-[#c48c58] hover:text-amber-300 underline underline-offset-4"
                  >
                    <span>View on Instagram</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
