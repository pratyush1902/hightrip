'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  ArrowUpRight, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Heart
} from 'lucide-react';
import { InstagramFeedItem } from '@/app/api/instagram/route';

function InstagramIcon({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

interface ReelCardProps {
  item: InstagramFeedItem;
}

function ReelCard({ item }: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showPlayIcon, setShowPlayIcon] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(item.likes || 1200);

  // Autoplay video on load & handle visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start playing muted
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Fallback if browser requires interaction
          setIsPlaying(false);
        });
    }

    // Pause when scrolled out of view to save resources
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (video.paused && !userPausedRef.current) {
              video.play().then(() => setIsPlaying(true)).catch(() => {});
            }
          } else {
            if (!video.paused) {
              video.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const userPausedRef = useRef(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
      userPausedRef.current = false;
    } else {
      video.pause();
      setIsPlaying(false);
      userPausedRef.current = true;
    }

    setShowPlayIcon(true);
    setTimeout(() => setShowPlayIcon(false), 700);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (liked) {
      setLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
    }
  };

  return (
    <div 
      className="snap-start flex-none w-[300px] sm:w-[340px] md:w-[360px] aspect-[9/16] rounded-[28px] overflow-hidden bg-[#12100d] border border-[#2d261e] hover:border-[#c48c58]/80 transition-all duration-500 shadow-2xl relative group select-none cursor-pointer flex flex-col justify-between"
      onClick={togglePlay}
    >
      {/* Background Autoplaying Video */}
      {item.videoUrl ? (
        <video
          ref={videoRef}
          src={item.videoUrl}
          poster={item.image}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.01] transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <img
          src={item.image}
          alt={item.captionTitle || 'High Trip Reel'}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Top and Bottom Gradient Vignettes */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />

      {/* Play/Pause Animated Center Icon */}
      {showPlayIcon && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 animate-scale-in">
          <div className="w-16 h-16 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-2xl">
            {isPlaying ? <Play className="w-8 h-8 fill-white ml-1" /> : <Pause className="w-8 h-8 fill-white" />}
          </div>
        </div>
      )}

      {/* Top Header Floating Controls */}
      <div className="relative z-20 p-5 flex items-center justify-between gap-3">
        {/* Profile Pill */}
        <a
          href={item.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:border-[#c48c58] text-white transition-all text-xs font-medium group/author"
        >
          <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center p-[1px]">
            <InstagramIcon className="w-2.5 h-2.5 text-white" />
          </div>
          <span className="font-mono text-[11px] tracking-wide text-stone-200 group-hover/author:text-white">
            @hightrip.experiences
          </span>
        </a>

        {/* Audio Mute/Unmute Toggle */}
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:border-white/40 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-stone-300" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#c48c58]" />
          )}
        </button>
      </div>

      {/* Bottom Info Overlay */}
      <div className="relative z-20 p-5 pt-0 space-y-3">
        {/* Location & Title */}
        <div className="space-y-1">
          {item.captionSub && (
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-[#e0a66d] bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-md border border-[#c48c58]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c48c58] animate-pulse" />
              <span>{item.captionSub}</span>
            </div>
          )}

          <h3 className="text-xl sm:text-2xl font-serif text-white tracking-tight drop-shadow-md leading-snug">
            {item.captionTitle || 'Himalayan Wonder'}
          </h3>

          <p className="text-xs text-stone-300 font-sans line-clamp-2 leading-relaxed opacity-90 drop-shadow-sm">
            {item.captionFull}
          </p>
        </div>

        {/* Footer Actions: Like count & Watch on Instagram CTA */}
        <div className="pt-2 flex items-center justify-between border-t border-white/10">
          <button
            type="button"
            onClick={handleLike}
            className="inline-flex items-center gap-1.5 text-xs text-stone-300 hover:text-rose-400 transition-colors cursor-pointer group/like"
          >
            <Heart 
              className={`w-4 h-4 transition-transform group-hover/like:scale-125 ${
                liked ? 'fill-rose-500 text-rose-500' : 'text-stone-300'
              }`} 
            />
            <span className="font-mono text-[11px] font-medium">{likesCount.toLocaleString()}</span>
          </button>

          <a
            href={item.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#c48c58] hover:bg-[#b07b49] text-black font-semibold text-[11px] tracking-wide uppercase transition-all shadow-md hover:shadow-[#c48c58]/30 cursor-pointer"
          >
            <span>Watch Reel</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>
        </div>
      </div>
    </div>
  );
}

export function InstagramFeed() {
  const [items, setItems] = useState<InstagramFeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch posts from API
  const fetchFeed = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const res = await fetch(`/api/instagram?type=all`);
      if (res.ok) {
        const json = await res.json();
        setItems(json.data || []);
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
    fetchFeed();
  }, []);

  // Scroll container controls
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = 360;
      const amount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-[#0c0a08] text-[#fbf9f5] border-t border-[#24201a] overflow-hidden relative">
      {/* Subtle ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#c48c58]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

            {/* Subtitle */}
            <p className="text-stone-400 text-sm sm:text-base max-w-xl mb-6 font-sans font-light leading-relaxed">
              Unfiltered moments from our travelers exploring hidden Himalayan passes, private retreats, and unchartered roads.
            </p>

            {/* Follow Instagram Pill & Actions */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="https://www.instagram.com/hightrip.experiences/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#181512] hover:bg-[#231f1a] border border-[#383127] hover:border-[#c48c58] text-stone-200 hover:text-white transition-all duration-300 text-xs sm:text-sm font-medium shadow-xs group cursor-pointer"
              >
                <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center p-[1px]">
                  <InstagramIcon className="w-2.5 h-2.5 text-white" />
                </div>
                <span>Follow @hightrip.experiences</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#c48c58] transition-colors" />
              </a>

              {/* Refresh Feed Button */}
              <button
                type="button"
                onClick={() => fetchFeed(true)}
                disabled={refreshing}
                title="Fetch latest posts from Instagram"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full border border-stone-800 hover:border-stone-600 bg-[#14120f] text-stone-400 hover:text-stone-200 text-xs font-mono transition-all cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-[#c48c58] ${refreshing ? 'animate-spin' : ''}`} />
                <span>{refreshing ? 'Syncing...' : 'Sync Feed'}</span>
              </button>
            </div>
          </div>

          {/* Carousel Arrow Controls */}
          <div className="flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              aria-label="Previous reels"
              className="w-11 h-11 rounded-full border border-stone-800 bg-[#161310] text-stone-300 hover:border-[#c48c58] hover:text-[#c48c58] transition-all flex items-center justify-center cursor-pointer active:scale-95 shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              aria-label="Next reels"
              className="w-11 h-11 rounded-full border border-stone-800 bg-[#161310] text-stone-300 hover:border-[#c48c58] hover:text-[#c48c58] transition-all flex items-center justify-center cursor-pointer active:scale-95 shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Autoplaying Reels Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-8 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollBehavior: 'smooth' }}
        >
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="snap-start flex-none w-[300px] sm:w-[340px] md:w-[360px] aspect-[9/16] rounded-[28px] bg-[#181512] animate-pulse border border-stone-800/80"
              />
            ))
          ) : (
            items.map((item) => (
              <ReelCard key={item.id} item={item} />
            ))
          )}
        </div>

        {/* Autoplay tip notice */}
        <div className="flex items-center justify-between text-xs text-stone-400 font-mono pt-2 border-t border-stone-900/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Autoplaying High Trip reels · Tap video to pause · Tap speaker icon for audio</span>
          </div>
          <span className="hidden sm:inline text-stone-400">Curated from Instagram</span>
        </div>
      </div>
    </section>
  );
}
