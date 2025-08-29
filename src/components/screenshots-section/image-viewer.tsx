"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";

interface ImageViewerProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export const ImageViewer = ({ src, alt, onClose }: ImageViewerProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const modalContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <motion.div
        initial={{ scale: 0.9, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="pointer-events-none relative flex h-auto max-h-[90vh] w-full max-w-5xl items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          width={1920}
          height={1080}
          className={`pointer-events-auto h-auto max-h-[90vh] w-auto max-w-full rounded-lg border border-zinc-900 bg-zinc-900 object-contain shadow-xl transition-opacity duration-300 ${
            isLoading || hasError ? "opacity-0" : "opacity-100"
          }`}
          onLoad={handleLoad}
          onError={handleError}
        />

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-white/20 border-t-white"
              role="status"
            >
              <span className="sr-only">Carregando...</span>
            </div>
          </div>
        )}

        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <Image
              src="/image_placeholder.png"
              width={256}
              height={256}
              alt="Erro ao carregar imagem"
              className="w-2/5 opacity-60 sm:w-1/3"
            />
          </div>
        )}
      </motion.div>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        onClick={onClose}
        className="absolute top-4 right-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/75"
        aria-label="Close Image Viewer"
      >
        <X size={20} />
      </motion.button>
    </motion.div>
  );

  return createPortal(modalContent, document.body);
};
