import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { AuthModal } from "./AuthModal";
import { motion } from "framer-motion";

type PostEditorProps = {
  onSubmit?: (content: string) => void;
};

export function PostEditor({ onSubmit }: PostEditorProps) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);

  function handleNotImplemented() {
    alert("Function not implemented");
  }

  function handlePost() {
    if (!content.trim()) return;
    
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    onSubmit?.(content);
    setContent("");
  }

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="p-3 bg-gray-100 rounded-3xl">
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
          {/* Top toolbar */}
          <div className="flex items-center gap-2 border-b border-neutral-200 px-3 py-2">
            <select className="rounded-md border border-neutral-300 bg-neutral-50 px-2 py-1 text-sm">
              <option>Paragraph</option>
            </select>
            
            <div className="flex gap-1">
              <button
                className="rounded-md px-2 py-1 text-sm font-bold hover:bg-neutral-100"
                onClick={handleNotImplemented}
              >
                B
              </button>
              <button
                className="rounded-md px-2 py-1 text-sm italic hover:bg-neutral-100"
                onClick={handleNotImplemented}
              >
                I
              </button>
              <button
                className="rounded-md px-2 py-1 text-sm underline hover:bg-neutral-100"
                onClick={handleNotImplemented}
              >
                U
              </button>
            </div>

            <div className="flex gap-1">
              <button
                className="rounded-md px-2 py-1 hover:bg-neutral-100"
                onClick={handleNotImplemented}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button
                className="rounded-md px-2 py-1 hover:bg-neutral-100"
                onClick={handleNotImplemented}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
              </button>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <div className="text-sm text-neutral-500">99</div>
              <button
                className="rounded-md px-2 py-1 hover:bg-neutral-100"
                onClick={handleNotImplemented}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
              <button
                className="rounded-md bg-red-50 px-2 py-1 text-red-600 hover:bg-red-100"
                onClick={handleNotImplemented}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Text input area */}
          <div className="p-4">
            <div className="flex items-start gap-2">
              <button
                className="mt-1 rounded-full p-1 hover:bg-neutral-100"
                onClick={handleNotImplemented}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <textarea
                className="w-full resize-none border-none text-lg focus:outline-none"
                placeholder={user ? "How are you feeling today?" : "Sign in to post"}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                readOnly={!user}
                onClick={() => !user && setShowAuthModal(true)}
              />
            </div>
          </div>

          {/* Bottom toolbar */}
          <div className="flex items-center gap-2 border-t border-neutral-200 px-3 py-2">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200"
              onClick={handleNotImplemented}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-neutral-100"
              onClick={handleNotImplemented}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-neutral-100"
              onClick={handleNotImplemented}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            
            <button
              className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-neutral-300"
              onClick={handlePost}
              disabled={!user}
            >
              <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>

      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}


