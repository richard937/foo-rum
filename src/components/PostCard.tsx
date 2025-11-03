import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { AuthModal } from "./AuthModal";

type PostCardProps = {
  author: string;
  content: string;
  timestamp: Date;
  emoji?: string;
};

// Generate avatar from name initials
function getAvatarInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Format timestamp as relative time
function formatTimestamp(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return date.toLocaleDateString();
}

export function PostCard({ author, content, timestamp, emoji }: PostCardProps) {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  function handleInteraction() {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    alert("Function not implemented");
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="p-3 bg-gray-100 rounded-3xl"
      >
        <article className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-medium text-white">
              {getAvatarInitials(author)}
            </div>

            <div className="flex-1 min-w-0">
              {/* Header with name and timestamp */}
              <div className="mb-2">
                <h3 className="font-semibold text-gray-900">{author}</h3>
                <p className="text-sm text-neutral-500">
                  {formatTimestamp(timestamp)}
                </p>
              </div>

              {/* Content with emoji */}
              <div className="mb-4 flex items-start gap-2">
                {emoji && <span className="text-2xl shrink-0">{emoji}</span>}
                <div className="flex-1 whitespace-pre-wrap text-gray-900">
                  {content}
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Interaction icons */}
        <div className="flex items-center gap-4 pt-3">
          <button
            onClick={handleInteraction}
            className="flex items-center gap-1 text-neutral-600 hover:text-red-600 transition-colors"
            aria-label="Like"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          <button
            onClick={handleInteraction}
            className="flex items-center gap-1 text-neutral-600 hover:text-blue-600 transition-colors"
            aria-label="Comment"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </button>
          <button
            onClick={handleInteraction}
            className="flex items-center gap-1 text-neutral-600 hover:text-indigo-600 transition-colors"
            aria-label="Share"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </motion.div>

      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}
