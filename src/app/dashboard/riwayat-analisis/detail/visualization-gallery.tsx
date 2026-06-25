"use client";

import { useState } from "react";
import { ZoomIn, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

type VisualizationImage = {
  title: string;
  url?: string | null;
  alt: string;
};

type VisualizationGalleryProps = {
  images: VisualizationImage[];
};

export function VisualizationGallery({ images }: VisualizationGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<VisualizationImage | null>(
    null,
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-6">
        {images.map((image) => (
          <div
            key={image.title}
            className="overflow-hidden rounded-xl border border-border/80 bg-card"
          >
            <div className="flex items-center justify-between gap-3 bg-slate-900 p-3">
              <span className="truncate text-xs font-semibold text-white">
                {image.title}
              </span>
              {image.url ? (
                <ZoomIn
                  aria-hidden="true"
                  className="size-4 shrink-0 text-white/70"
                />
              ) : null}
            </div>

            {image.url ? (
              <button
                type="button"
                aria-label={`Buka preview ${image.title}`}
                className="group block w-full bg-white p-3 text-left outline-none transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                onClick={() => setSelectedImage(image)}
              >
                <span className="relative flex w-full items-center justify-center overflow-hidden rounded-lg border border-border/50 bg-slate-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="h-auto w-full object-contain transition-transform duration-200 group-hover:scale-[1.01]"
                  />
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition duration-200 group-hover:bg-black/15 group-hover:opacity-100">
                    <ZoomIn aria-hidden="true" className="size-8 text-white" />
                  </span>
                </span>
              </button>
            ) : (
              <div className="flex min-h-56 items-center justify-center bg-muted/30 p-6">
                <span className="text-center text-sm text-muted-foreground">
                  Gambar belum tersedia.
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog
        open={Boolean(selectedImage?.url)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedImage(null);
          }
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="max-w-[min(1120px,calc(100vw-2rem))] gap-0 border-none bg-transparent p-0 text-white ring-0 shadow-none sm:max-w-[min(1120px,calc(100vw-2rem))]"
        >
          <DialogTitle className="sr-only">
            {selectedImage?.title ?? "Preview visualisasi audio"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Preview gambar visualisasi audio paru dalam ukuran besar.
          </DialogDescription>

          <div className="flex max-h-[calc(100vh-2rem)] flex-col">
            <div className="flex items-center justify-between gap-3 rounded-t-xl bg-black/75 px-4 py-3 backdrop-blur">
              <p className="truncate text-sm font-semibold text-white">
                {selectedImage?.title}
              </p>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="shrink-0 text-white hover:bg-white/10 hover:text-white"
                  aria-label="Tutup preview"
                >
                  <X aria-hidden="true" />
                </Button>
              </DialogClose>
            </div>

            <div className="flex min-h-0 items-center justify-center rounded-b-xl bg-black/85 p-3 backdrop-blur">
              {selectedImage?.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selectedImage.url}
                  alt={selectedImage.alt}
                  className="max-h-[calc(100vh-8rem)] w-auto max-w-full rounded-lg object-contain"
                />
              ) : null}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
