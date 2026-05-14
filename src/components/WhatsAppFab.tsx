import { whatsappLink } from "@/lib/site";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[oklch(0.66_0.18_145)] text-white shadow-soft transition-transform hover:scale-110"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
        <path d="M19.05 4.91A10 10 0 0 0 4.1 18.36L3 22l3.74-1.08A10 10 0 1 0 19.05 4.91Zm-7.04 15.34h-.01a8.3 8.3 0 0 1-4.22-1.16l-.3-.18-2.22.64.66-2.16-.2-.31a8.3 8.3 0 1 1 6.29 3.17Zm4.55-6.21c-.25-.13-1.47-.72-1.7-.8s-.4-.13-.56.13-.64.8-.79.96-.29.2-.54.07a6.8 6.8 0 0 1-2-1.24 7.5 7.5 0 0 1-1.39-1.73c-.15-.25 0-.39.11-.51.11-.11.25-.29.38-.43.13-.15.17-.25.25-.42a.47.47 0 0 0 0-.44c-.07-.13-.56-1.36-.77-1.86s-.41-.43-.56-.44h-.48a.92.92 0 0 0-.67.31 2.82 2.82 0 0 0-.88 2.1 4.9 4.9 0 0 0 1.04 2.6 11.32 11.32 0 0 0 4.34 3.83 14.55 14.55 0 0 0 1.45.54 3.5 3.5 0 0 0 1.6.1 2.62 2.62 0 0 0 1.71-1.21 2.13 2.13 0 0 0 .15-1.21c-.06-.11-.23-.17-.48-.29Z"/>
      </svg>
    </a>
  );
}
