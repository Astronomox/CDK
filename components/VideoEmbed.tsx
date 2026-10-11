"use client";

import Image from "next/image";
import { useState } from "react";
import type { Video } from "@/lib/content/types";
import { Play } from "@/components/icons";

/**
 * Lazy video: shows a lightweight poster first and only loads YouTube (or the
 * video file) when someone presses play. Saves data on mobile networks.
 */
export function VideoEmbed({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);
  const poster = video.poster?.src ?? (video.youtubeId ? `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg` : undefined);

  return (
    <figure>
      <div className="relative aspect-video overflow-hidden rounded-[20px] bg-navy">
        {playing ? (
          video.youtubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 size-full"
            />
          ) : (
            <video src={video.fileUrl} controls autoPlay playsInline preload="none" className="absolute inset-0 size-full" />
          )
        ) : (
          <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 size-full">
            {poster ? (
              <Image src={poster} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover opacity-90" />
            ) : null}
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid size-16 place-items-center rounded-full bg-gold text-ink shadow-lg transition-transform group-hover:scale-110 sm:size-20">
                <Play className="size-8" />
              </span>
            </span>
            <span className="sr-only">Play video: {video.title}</span>
          </button>
        )}
      </div>
      <figcaption className="mt-3">
        <p className="font-heading font-semibold">{video.title}</p>
        {video.description ? <p className="text-sm text-muted-foreground">{video.description}</p> : null}
      </figcaption>
    </figure>
  );
}
