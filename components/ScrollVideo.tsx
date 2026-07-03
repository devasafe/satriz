"use client";

import { useEffect, useRef, useState } from "react";

// Versão "all-intra" (keyframe em todo quadro) → busca instantânea no scrub.
const SCRUB_SRC = "/satriz-scrub.mp4";
// Versão leve (sem áudio) → suficiente pro autoplay em loop do mobile.
const LOOP_SRC = "/satriz-loop.mp4";
// Imagem estática exibida enquanto o vídeo ainda não terminou de baixar.
const POSTER_SRC = "/satriz-poster.webp";

// --- knobs de calibragem ---
const TRACK_VH = 360; // altura do trilho de scroll (em vh). Maior = scrub mais lento/longo
const SMOOTH = 0.075; // suavidade do scrub (0→1). Menor = desliza mais macio (efeito "manteiga")
const MIN_SEEK = 0.004; // ignora ajustes minúsculos de currentTime (evita seeks à toa)

type Mode = "scrub" | "loop";

export default function ScrollVideo() {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // 'scrub' é o padrão do SSR — mantém a hidratação consistente. O modo real
  // (loop no mobile / movimento reduzido) é decidido depois de montar.
  const [mode, setMode] = useState<Mode>("scrub");

  // Source do modo atual: troca scrub/loop sem misturar os efeitos abaixo.
  const src = mode === "loop" ? LOOP_SRC : SCRUB_SRC;

  // blobUrl só existe quando o vídeo terminou de baixar 100% no navegador.
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const ready = blobUrl !== null;

  // Decide o modo no cliente: tela pequena ou prefers-reduced-motion → loop simples.
  useEffect(() => {
    const small = window.matchMedia("(max-width: 768px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMode(small.matches || reduce.matches ? "loop" : "scrub");
    update();
    small.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      small.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  // Baixa o vídeo inteiro antes de ativá-lo. Só quando o blob chega é que o
  // <video> é montado e o scrub/loop pode rodar — sem buffering durante o uso.
  useEffect(() => {
    let cancelled = false;
    let url: string | null = null;
    setBlobUrl(null);

    fetch(src)
      .then((r) => r.blob())
      .then((blob) => {
        if (cancelled) return;
        url = URL.createObjectURL(blob);
        setBlobUrl(url);
      })
      .catch(() => {
        /* falha de rede: fica na imagem estática */
      });

    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, [src]);

  // Modo scrub: amarra currentTime do vídeo ao progresso do scroll no trilho.
  useEffect(() => {
    if (mode !== "scrub" || !ready) return;
    const track = trackRef.current;
    const video = videoRef.current;
    if (!track || !video) return;

    video.pause();

    let raf = 0;
    let inView = true;
    let targetTime = 0;

    // Só roda o loop quando o trilho está na viewport (poupa CPU).
    const io = new IntersectionObserver(([entry]) => (inView = entry.isIntersecting), {
      rootMargin: "100px",
    });
    io.observe(track);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!inView) return;
      const duration = video.duration;
      if (!duration || Number.isNaN(duration)) return;

      const rect = track.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      // progresso 0→1 do quanto já rolamos dentro do trilho
      const progress = scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0;
      targetTime = progress * duration;

      // desliza o tempo atual até o alvo (lerp) → scrub macio em vez de quadro-a-quadro
      const current = video.currentTime;
      const next = current + (targetTime - current) * SMOOTH;
      if (Math.abs(next - current) > MIN_SEEK) {
        video.currentTime = next;
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [mode, ready]);

  // Imagem estática mostrada enquanto o vídeo não terminou de baixar.
  const poster = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={POSTER_SRC}
      alt=""
      aria-hidden
      className="absolute inset-0 h-full w-full object-cover"
    />
  );

  if (mode === "loop") {
    // Mobile / movimento reduzido: seção comum, vídeo tocando sozinho.
    return (
      <section className="relative h-[100svh] w-full overflow-hidden bg-black">
        {poster}
        {ready && (
          <video
            key="loop"
            src={blobUrl!}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </section>
    );
  }

  // Enquanto for só imagem (vídeo não baixou), nada de scroll-scrubbing:
  // a seção é uma tela comum de 100svh, sem trilho alto.
  if (!ready) {
    return (
      <section className="relative h-[100svh] w-full overflow-hidden bg-black">
        {poster}
      </section>
    );
  }

  // Desktop com vídeo pronto: trilho alto + container sticky que segura o vídeo
  // enquanto rola → aí sim o scroll-scrubbing fica ativo.
  return (
    <section ref={trackRef} className="relative" style={{ height: `${TRACK_VH}vh` }}>
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-black">
        {poster}
        <video
          key="scrub"
          ref={videoRef}
          src={blobUrl!}
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}
