import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PostEditor } from "../components/PostEditor";
import { PostCard } from "../components/PostCard";
import { useAuth } from "../hooks/useAuth";

type Post = {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  emoji?: string;
};

export default function Feed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: "Alice",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      emoji: "👋",
    },
    {
      id: "2",
      author: "Bob",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      emoji: "🎉",
    },
  ]);

  function handlePostSubmit(content: string) {
    if (!user) return;

    // Simple emoji detection - look for emoji at the start
    // Match common emoji ranges and other emoji
    const emojiMatch = content.match(/^([\p{Emoji_Presentation}\p{Emoji}]+)\s/u);
    const emoji = emojiMatch ? emojiMatch[1] : undefined;
    const textContent = emojiMatch ? content.slice(emojiMatch[0].length).trim() : content;

    const newPost: Post = {
      id: Date.now().toString(),
      author: user.name,
      content: textContent,
      timestamp: new Date(),
      emoji,
    };

    // Add new post at the top of the list
    setPosts([newPost, ...posts]);
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 p-4">
      <PostEditor onSubmit={handlePostSubmit} />
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard
                key={post.id}
                author={post.author}
                content={post.content}
                timestamp={post.timestamp}
                emoji={post.emoji}
              />
            ))
          ) : (
            <div className="rounded border border-neutral-300 p-6 text-center text-neutral-500">
              No posts yet. Be the first to post!
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


