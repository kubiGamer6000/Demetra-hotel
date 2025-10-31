"use client";

import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  children: React.ReactNode;
}

export function CustomButton({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  const baseStyles = "relative px-6 py-2.5 text-sm font-medium tracking-wider overflow-hidden group rounded-lg flex items-center justify-center";
  const variantStyles = {
    primary: "bg-[#E8E2D7] text-[#4A3F35]",
    outline: "border border-white text-white"
  };

  return (
    <motion.button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover="hover"
      whileTap="tap"
      variants={{
        hover: {
          y: -2,
          transition: {
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1],
          }
        },
        tap: {
          y: 0,
          transition: {
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1],
          }
        }
      }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      <motion.div
        className="absolute inset-0 bg-black/5 opacity-0"
        variants={{
          hover: {
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }
          },
          tap: {
            opacity: 0,
            transition: {
              duration: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }
          }
        }}
      />
      <motion.span 
        className="relative z-10 flex items-center gap-2"
        variants={{
          hover: {
            x: variant === "primary" ? 2 : 0,
            transition: {
              duration: 0.3,
              ease: [0.25, 0.1, 0.25, 1]
            }
          }
        }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}