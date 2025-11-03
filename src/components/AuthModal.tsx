import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
};

type Tab = "signin" | "signup";

export function AuthModal({ open, onClose }: AuthModalProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("signin");

  // Close modal when user successfully authenticates
  useEffect(() => {
    if (user && open) {
      onClose();
    }
  }, [user, open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 !m-0"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                onClose();
              }
            }}
          >
            {/* Modal */}
            <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
             className="px-3 pt-3 bg-gray-200 rounded-3xl"
               onClick={(e) => e.stopPropagation()}>
            <div
              className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm"
            >
              {/* Icon Header */}
              <div className="mb-4 flex items-center justify-center">
                <svg
                  className="h-8 w-8 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
              </div>

              {/* Title & Subtitle */}
              <div className="mb-10">
                <h2 className="text-center text-xl font-semibold text-gray-800">
                  {activeTab === "signin" ? "Sign in to continue" : "Create an account"}
                </h2>
                <p className="mt-2 text-center text-sm text-gray-500">
                  {activeTab === "signin"
                    ? "Sign in to access all the features on this app"
                    : "Sign up to get started with all the features"}
                </p>
              </div>

              {/* Forms */}
              {activeTab === "signin" ? (
                <SignInForm />
              ) : (
                <SignUpForm />
              )}
            </div>
              {/* Footer */}
              <div className="my-6 text-center">
                <p className="text-sm text-gray-500">
                  {activeTab === "signin" ? (
                    <>
                      Do not have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setActiveTab("signup")}
                        className="font-medium text-indigo-600 hover:underline"
                      >
                        Sign Up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setActiveTab("signin")}
                        className="font-medium text-indigo-600 hover:underline"
                      >
                        Sign In
                      </button>
                    </>
                  )}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


