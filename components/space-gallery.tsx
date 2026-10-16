"use client";

import { AnimatePresence, motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useI18n } from "@/lib/i18n";
import { resizeImage, type GalleryImage } from "@/lib/gallery-images";

export interface Space {
  key: string;
  images: GalleryImage[];
}

interface SpaceGalleryProps {
  spaces: Space[];
  /** Index into `spaces` of the open space, or null when closed. */
  openIndex: number | null;
  onChangeSpace: (index: number) => void;
  onClose: () => void;
}

const EASE = [0.25, 0.1, 0.25, 1] as const;
// Slides this far from the current one get their image requested ahead of time.
const PRELOAD_DISTANCE = 2;

export function SpaceGallery({
  spaces,
  openIndex,
  onChangeSpace,
  onClose,
}: SpaceGalleryProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {openIndex !== null && (
        <GalleryDialog
          key="space-gallery"
          spaces={spaces}
          spaceIndex={openIndex}
          onChangeSpace={onChangeSpace}
          onClose={onClose}
        />
      )}
    </AnimatePresence>,
    document.body,
  );
}

function GalleryDialog({
  spaces,
  spaceIndex,
  onChangeSpace,
  onClose,
}: {
  spaces: Space[];
  spaceIndex: number;
  onChangeSpace: (index: number) => void;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const space = spaces[spaceIndex];
  const images = space.images;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: images.length > 1,
    duration: 28,
  });
  const [selected, setSelected] = useState(0);
  const [requested, setRequested] = useState<Set<number>>(() => new Set([0]));
  const [loaded, setLoaded] = useState<Set<string>>(() => new Set());
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Track the current slide and request nearby images before they're shown.
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      setSelected(index);
      setRequested((prev) => {
        const next = new Set(prev);
        for (let d = -PRELOAD_DISTANCE; d <= PRELOAD_DISTANCE; d++) {
          next.add((index + d + images.length) % images.length);
        }
        return next;
      });
    };
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, images.length]);

  // Switching space: restart from the first photo.
  useEffect(() => {
    setDescriptionOpen(false);
    setRequested(new Set([0, 1, images.length - 1]));
    if (emblaApi) {
      emblaApi.reInit();
      emblaApi.scrollTo(0, true);
    }
  }, [spaceIndex, emblaApi, images.length]);

  // Keep the active thumbnail centred in whichever strip is visible.
  useEffect(() => {
    dialogRef.current
      ?.querySelectorAll<HTMLElement>(`[data-thumb="${selected}"]`)
      .forEach((thumb) => {
        const strip = thumb.parentElement;
        if (!strip || thumb.offsetParent === null) return;
        strip.scrollTo({
          left: thumb.offsetLeft - (strip.clientWidth - thumb.offsetWidth) / 2,
          top: thumb.offsetTop - (strip.clientHeight - thumb.offsetHeight) / 2,
          behavior: "smooth",
        });
      });
  }, [selected, spaceIndex]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Keyboard navigation and a simple focus trap.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
      else if (event.key === "ArrowLeft") scrollPrev();
      else if (event.key === "ArrowRight") scrollNext();
      else if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>("button, a[href]"),
        ).filter((element) => element.offsetParent !== null);
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [scrollPrev, scrollNext]);

  // Lock page scroll while open, then restore focus to the card that opened it.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow, paddingRight } = document.body.style;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.classList.add("space-gallery-open");
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("[data-close]") ?? [])
      .find((button) => button.offsetParent !== null)
      ?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = overflow;
      document.body.classList.remove("space-gallery-open");
      document.body.style.paddingRight = paddingRight;
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, []);

  // Let the phone's Back button/gesture close the gallery instead of leaving
  // the page. Next's own history state is kept, otherwise its router reloads.
  useEffect(() => {
    window.history.pushState({ ...window.history.state, spaceGallery: true }, "");
    const onPopState = () => onCloseRef.current();
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
      if (window.history.state?.spaceGallery) window.history.back();
    };
  }, []);

  const title = t(`places.sections.${space.key}.title`);
  const description = t(`places.sections.${space.key}.description`);
  const counter = `${String(selected + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;

  const spaceTabs = (
    <div
      role="tablist"
      aria-label={t("places.title")}
      className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0 lg:flex-wrap"
    >
      {spaces.map((item, index) => (
        <button
          key={item.key}
          role="tab"
          aria-selected={index === spaceIndex}
          onClick={() => onChangeSpace(index)}
          className={`shrink-0 rounded-full px-4 py-2 text-xs tracking-wider uppercase transition-colors duration-300 ${
            index === spaceIndex
              ? "bg-[var(--brand-beige)] text-[var(--brand-brown)]"
              : "bg-white/[0.06] text-white/70 hover:bg-white/[0.12] hover:text-white"
          }`}
        >
          {t(`places.sections.${item.key}.title`)}
        </button>
      ))}
    </div>
  );

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="fixed inset-0 z-[100] bg-[#161210] text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="h-[100dvh] flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_420px]"
      >
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between gap-4 px-4 pt-[max(env(safe-area-inset-top),0.75rem)] pb-3">
          <div className="min-w-0">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--brand-beige)]/60">
              {t("places.title")}
            </p>
            <h2 className="font-cormorant text-2xl leading-tight truncate">{title}</h2>
          </div>
          <CloseButton onClose={onClose} label={t("places.gallery.close")} />
        </div>

        {/* Stage */}
        <div className="relative flex-1 min-h-0 flex flex-col lg:h-[100dvh] lg:py-8 lg:pl-8">
          <div className="relative flex-1 min-h-0 overflow-hidden lg:rounded-2xl" ref={emblaRef}>
            <div className="flex h-full touch-pan-y">
              {images.map((image, index) => {
                const src = resizeImage(image.url, 1600);
                const isLoaded = loaded.has(src);
                return (
                  <div
                    key={image.url}
                    className="relative flex-[0_0_100%] min-w-0 h-full flex items-center justify-center"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} / ${images.length}`}
                  >
                    {!isLoaded && requested.has(index) && (
                      // The thumbnail is usually cached already: show it blurred
                      // until the full-size photo arrives.
                      <>
                        <img
                          src={resizeImage(image.url, 320)}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-contain blur-xl scale-105 opacity-60"
                        />
                        <div className="absolute inset-0 m-auto h-8 w-8 rounded-full border-2 border-white/15 border-t-white/60 animate-spin" />
                      </>
                    )}
                    {requested.has(index) && (
                      <img
                        src={src}
                        srcSet={[960, 1600, 2400]
                          .map((w) => `${resizeImage(image.url, w)} ${w}w`)
                          .join(", ")}
                        sizes="(min-width: 1280px) calc(100vw - 452px), (min-width: 1024px) calc(100vw - 412px), 100vw"
                        alt={image.alt ? `${title} – ${image.alt}` : title}
                        draggable={false}
                        onLoad={() => setLoaded((prev) => new Set(prev).add(src))}
                        className={`relative max-h-full max-w-full object-contain select-none transition-opacity duration-500 ${
                          isLoaded ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {images.length > 1 && (
              <>
                <NavButton side="left" onClick={scrollPrev} label={t("places.gallery.previous")} />
                <NavButton side="right" onClick={scrollNext} label={t("places.gallery.next")} />
              </>
            )}

            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-4 lg:bottom-4 rounded-full bg-black/45 backdrop-blur px-3 py-1 text-xs tabular-nums tracking-widest text-white/85">
              {counter}
            </span>
          </div>

          {/* Mobile details */}
          <div className="lg:hidden px-4 pt-4 space-y-4 pb-[max(env(safe-area-inset-bottom),1rem)]">
            <button
              onClick={() => setDescriptionOpen((open) => !open)}
              aria-expanded={descriptionOpen}
              className={`block text-left text-sm leading-relaxed text-white/70 ${descriptionOpen ? "" : "line-clamp-2"}`}
            >
              {description}
            </button>
            <Thumbnails
              images={images}
              selected={selected}
              onSelect={(index) => emblaApi?.scrollTo(index)}
              title={title}
            />
            {spaceTabs}
          </div>
        </div>

        {/* Desktop side panel */}
        <aside className="hidden lg:flex flex-col h-[100dvh] min-h-0 px-8 xl:px-10 py-8">
          <div className="flex justify-end">
            <CloseButton onClose={onClose} label={t("places.gallery.close")} />
          </div>

          <div className="mt-6">
            <p className="text-[11px] tracking-[0.35em] uppercase text-[var(--brand-beige)]/60 mb-3">
              {t("places.title")}
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={space.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <h2 className="font-cormorant text-5xl leading-[1.05] mb-4">{title}</h2>
                <p className="text-white/70 leading-relaxed">{description}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="my-8 h-px bg-gradient-to-r from-white/15 to-transparent" />

          <div className="flex-1 min-h-0 flex flex-col">
            <p className="text-xs tracking-[0.2em] uppercase text-white/50 mb-4">
              {t("places.gallery.photos").replace("{count}", String(images.length))}
            </p>
            <Thumbnails
              images={images}
              selected={selected}
              onSelect={(index) => emblaApi?.scrollTo(index)}
              title={title}
              grid
            />
          </div>

          <div className="pt-6 space-y-5">
            {spaceTabs}
            <a
              href="/booking"
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-[var(--brand-beige)] text-[var(--brand-brown)] py-3.5 text-sm font-medium tracking-wider uppercase transition-colors hover:bg-white"
            >
              <Calendar className="w-4 h-4" />
              {t("cta.button")}
            </a>
          </div>
        </aside>
      </motion.div>
    </motion.div>
  );
}

function CloseButton({
  onClose,
  label,
}: {
  onClose: () => void;
  label: string;
}) {
  return (
    <button
      data-close
      onClick={onClose}
      aria-label={label}
      className="shrink-0 w-11 h-11 rounded-full bg-white/[0.08] hover:bg-white/[0.16] flex items-center justify-center transition-colors"
    >
      <X className="w-5 h-5" />
    </button>
  );
}

function NavButton({
  side,
  onClick,
  label,
}: {
  side: "left" | "right";
  onClick: () => void;
  label: string;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`hidden sm:flex absolute top-1/2 -translate-y-1/2 ${
        side === "left" ? "left-4" : "right-4"
      } w-12 h-12 rounded-full bg-black/35 hover:bg-black/60 backdrop-blur items-center justify-center transition-colors`}
    >
      <Icon className="w-6 h-6" />
    </button>
  );
}

function Thumbnails({
  images,
  selected,
  onSelect,
  title,
  grid = false,
}: {
  images: GalleryImage[];
  selected: number;
  onSelect: (index: number) => void;
  title: string;
  grid?: boolean;
}) {
  if (images.length < 2) return null;
  return (
    <div
      className={
        grid
          ? "relative grid grid-cols-3 gap-2 overflow-y-auto no-scrollbar min-h-0 p-1 -m-1"
          : "relative flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 py-1"
      }
    >
      {images.map((image, index) => (
        <button
          key={image.url}
          data-thumb={index}
          onClick={() => onSelect(index)}
          aria-label={`${title} ${index + 1}`}
          aria-current={index === selected}
          className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
            grid ? "aspect-[4/3]" : "shrink-0 w-[4.5rem] h-[3.25rem]"
          } ${
            index === selected
              ? "ring-2 ring-[var(--brand-beige)] ring-offset-2 ring-offset-[#161210] opacity-100"
              : "opacity-45 hover:opacity-90"
          }`}
        >
          <img
            src={resizeImage(image.url, 320)}
            alt=""
            loading="lazy"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  );
}
