"use client"; // R3F roda no navegador (usa WebGL), então o componente é client-side.

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import type { Mesh } from "three";
import Link from "next/link";

type Progress = { current: number };

// Trilho da experiência 3D. HOLD = tela extra no fim onde o último frame fica
// CONGELADO e o sticky segue grudado → a Hero sobe por cima (reveal 3D→Hero).
const TRACK_VH = 1100;
const HOLD_VH = 100;

const SERVICOS = ["Sites", "Sistemas", "E-commerce", "Automações",];

const ETAPAS = [
  { n: "01", t: "Briefing", d: "a gente mergulha na sua ideia", side: "right", top: "30%" },
  { n: "02", t: "Design", d: "desenhamos a experiência", side: "left", top: "45%" },
  { n: "03", t: "Desenvolvimento", d: "põe a mão no código", side: "right", top: "60%" },
  { n: "04", t: "No ar", d: "seu projeto publicado, funcionando", side: "left", top: "74%" },
];

// 3 braços saem do núcleo (que é o Satriz Club). Ângulos deixam o topo livre pro título.
const BRACOS = [
  { t: "Satriz Studio", s: "software · ativo", ang: 45 },
  { t: "Satriz Revista", s: "editorial · em breve", ang: 135 },
  { t: "Satriz News", s: "notícias · em breve", ang: 270 },
];

const scene5At = (p: number) => track(p, [[0.76, 0], [0.79, 1], [0.86, 1], [0.89, 0]]);

function Blob({ progress }: { progress: Progress }) {
  const mesh = useRef<Mesh>(null);
  const { viewport, size } = useThree();

  useFrame((state) => {
    if (!mesh.current) return;
    const { x, y } = state.pointer;
    mesh.current.rotation.y += (x * 0.6 - mesh.current.rotation.y) * 0.5;
    mesh.current.rotation.x += (-y * 0.6 - mesh.current.rotation.x) * 0.5;

    const p = progress.current;
    // ritmo uniforme: cada cena ocupa ~a mesma fatia do scroll
    const nx = track(p, [
      [0, 0], [0.1, 0], [0.16, -1], [0.3, -1], [0.36, 0], [0.5, 0],
      [0.53, -0.7], [0.59, 0.7], [0.65, -0.7], [0.71, 0.7], [0.74, 0], [1, 0],
    ]);
    mesh.current.position.x += ((viewport.width / 4) * nx - mesh.current.position.x) * 0.1;

    // zigue-zague do Processo com amplitude menor (±0.9) → não corta na nav
    const ny = track(p, [
      [0, 0], [0.5, 0], [0.53, 0.9], [0.59, 0.3], [0.65, -0.3], [0.71, -0.9], [0.74, 0], [1, 0],
    ]);
    mesh.current.position.y += (ny - mesh.current.position.y) * 0.1;

    const chaos = track(p, [[0, 0], [0.3, 0], [0.36, 1], [0.46, 1], [0.49, 0]]);
    const scene4 = track(p, [[0.5, 0], [0.53, 1], [0.71, 1], [0.74, 0]]);
    const scene5 = scene5At(p);
    const mat = mesh.current.material as unknown as { distort: number; speed: number };
    // teto de 0.48: acima de ~0.5 o deslocamento por ruído estica vértices
    // demais e cria "bicos" na malha. A agitação extra vem da speed.
    mat.distort = 0.3 + chaos * 0.18;
    mat.speed = 1.4 + chaos * 3;
    const t = state.clock.elapsedTime;
    // o blob fica vivo o tempo todo (é o fundo do site) — o painel laranja é
    // opaco e cobre a transição, então o blob não precisa se apagar no fim.
    // No celular o núcleo encolhe mais na cena da matriz, pra sobrar espaço
    // pros braços e os nomes caberem centralizados em cada bola.
    const mobile = size.width < 640;
    const base =
      (1 - chaos * 0.3) * (1 - scene4 * 0.4) * (1 - scene5 * 0.35) * (mobile ? 1 - scene5 * 0.28 : 1);
    const d = chaos * 0.18;
    mesh.current.scale.set(
      base * (1 + d * Math.sin(t * 1.5)),
      base * (1 + d * Math.sin(t * 1.9 + 2)),
      base * (1 + d * Math.sin(t * 1.3 + 4)),
    );
    mesh.current.visible = base > 0.02;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.4, 20]} />
      <MeshDistortMaterial color="#ffa31a" distort={0.3} speed={1.4} roughness={0.25} metalness={0.1} />
    </mesh>
  );
}

function BracoBlob({ index, progress }: { index: number; progress: Progress }) {
  const mesh = useRef<Mesh>(null);
  const { size } = useThree();
  const ang = (BRACOS[index].ang * Math.PI) / 180;
  useFrame(() => {
    if (!mesh.current) return;
    // No celular retrato os braços saem menores e mais próximos do núcleo,
    // senão projetam gigantes e vazam pelas laterais (com os nomes cortados).
    const mobile = size.width < 640;
    const s5 = scene5At(progress.current);
    const R = mobile ? 1.05 : 1.7; // maior que o raio do núcleo → os braços saem de dentro dele
    mesh.current.position.x += (Math.cos(ang) * R * s5 - mesh.current.position.x) * 0.15;
    mesh.current.position.y += (Math.sin(ang) * R * s5 - mesh.current.position.y) * 0.15;
    const sc = (mobile ? 0.34 : 0.65) * s5;
    mesh.current.scale.setScalar(mesh.current.scale.x + (sc - mesh.current.scale.x) * 0.15);
    mesh.current.visible = s5 > 0.01 || mesh.current.scale.x > 0.01;
    mesh.current.rotation.y += 0.01;
  });
  return (
    <mesh ref={mesh} scale={0}>
      <icosahedronGeometry args={[1, 12]} />
      <MeshDistortMaterial color="#ffa31a" distort={0.3} speed={1.5} roughness={0.25} metalness={0.1} />
    </mesh>
  );
}

export default function Scene3D() {
  const track_ = useRef<HTMLDivElement>(null);
  const manifesto = useRef<HTMLDivElement>(null);
  const textStudio = useRef<HTMLDivElement>(null);
  const servicos = useRef<HTMLDivElement>(null);
  const processo = useRef<HTMLDivElement>(null);
  const etapaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const matriz = useRef<HTMLDivElement>(null);
  const nucleo = useRef<HTMLDivElement>(null);
  const bracoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const laranja = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const el = track_.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Desconta o HOLD final: o progresso chega a 1 uma tela ANTES do trilho
      // acabar, deixando o último frame congelado enquanto a Hero sobe por cima.
      const hold = (HOLD_VH / 100) * window.innerHeight;
      const scrollable = rect.height - window.innerHeight - hold;
      const p = scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0;
      progress.current = p;

      setFade(manifesto.current, 1 - smoothstep(0.05, 0.1, p), -smoothstep(0.05, 0.1, p) * 30);
      setFade(textStudio.current, smoothstep(0.16, 0.22, p) * (1 - smoothstep(0.26, 0.3, p)), (1 - smoothstep(0.16, 0.22, p)) * 24);
      setFade(servicos.current, smoothstep(0.38, 0.42, p) * (1 - smoothstep(0.46, 0.49, p)), 0);
      setFade(processo.current, smoothstep(0.5, 0.53, p) * (1 - smoothstep(0.71, 0.74, p)), 0);
      ETAPAS.forEach((_, i) => {
        const start = 0.52 + i * 0.055; // mais espaçado + mais tempo visível → cada etapa respira
        const vis = smoothstep(start, start + 0.014, p) * (1 - smoothstep(start + 0.04, start + 0.054, p));
        setFade(etapaRefs.current[i] ?? null, vis, (1 - smoothstep(start, start + 0.014, p)) * 18);
      });
      const mVis = smoothstep(0.76, 0.79, p) * (1 - smoothstep(0.86, 0.89, p));
      setFade(matriz.current, mVis, 0);
      setFade(nucleo.current, mVis, 0);
      bracoRefs.current.forEach((b) => setFade(b, mVis, 0));

      // CONTATO — o painel laranja (com o form) SOBE de baixo pra cima e cobre
      // a cena. Sem explosão: o blob só se acalma no centro (ver Blob).
      const rise = smoothstep(0.9, 1, p);
      const panelY = (1 - rise) * 100; // 100vh embaixo → 0 (cobrindo a tela)
      if (laranja.current) {
        laranja.current.style.opacity = "1";
        laranja.current.style.transform = `translateY(${panelY}vh)`;
      }
      if (form.current) {
        form.current.style.opacity = "1";
        form.current.style.transform = `translateY(${panelY}vh)`;
        form.current.style.pointerEvents = rise > 0.9 ? "auto" : "none";
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section ref={track_} className="relative" style={{ height: `${TRACK_VH + HOLD_VH}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[4, 4, 4]} intensity={40} color="#ffe6c0" />
          <pointLight position={[-4, -2, 2]} intensity={15} color="#e07c00" />
          <Blob progress={progress} />
          {BRACOS.map((_, i) => (
            <BracoBlob key={i} index={i} progress={progress} />
          ))}
        </Canvas>

        {/* CENA 1 — manifesto */}
        <div ref={manifesto} className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="eyebrow mb-5">Satriz Club · coletivo criativo</p>
          <h1 className="max-w-3xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-bone md:text-7xl">
            Um clube de criação em geral.
          </h1>
          <p className="mt-8 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-bone-dim">role pra descer ↓</p>
        </div>

        {/* CENA 3 — serviços */}
        <div ref={servicos} style={{ opacity: 0 }} className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
          {isMobile ? (
            // Mobile: um balão embaixo do outro, coluna centralizada.
            <div className="flex flex-col items-center gap-3">
              <span className="mb-1 whitespace-nowrap font-mono text-[0.7rem] uppercase tracking-[0.28em] text-flush">o que a gente faz</span>
              {SERVICOS.map((s) => (
                <span key={s} className="whitespace-nowrap rounded-full border border-line bg-ink-2/70 px-5 py-2.5 font-mono text-sm text-bone backdrop-blur">{s}</span>
              ))}
            </div>
          ) : (
            // Desktop: distribuídos ao redor do blob (losango).
            <div className="relative">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[280px] whitespace-nowrap font-mono text-[0.7rem] uppercase tracking-[0.28em] text-flush">o que a gente faz</span>
              {SERVICOS.map((s, i) => {
                const spots: [number, number][] = [[1, -1], [1, 1], [-1, 1], [-1, -1]];
                const [sx, sy] = spots[i] ?? [0, 0]; // protege contra serviço extra sem posição
                return (
                  <span key={s} style={{ transform: `translate(-50%,-50%) translate(${sx * 300}px, ${sy * 180}px)` }} className="absolute left-1/2 top-1/2 whitespace-nowrap rounded-full border border-line bg-ink-2/70 px-5 py-2.5 font-mono text-sm text-bone backdrop-blur">{s}</span>
                );
              })}
            </div>
          )}
        </div>

        {/* CENA 4 — processo */}
        <div ref={processo} style={{ opacity: 0 }} className="pointer-events-none absolute inset-x-0 top-24 text-center">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-flush">como a gente faz</span>
        </div>
        {ETAPAS.map((e, i) => {
          // Mobile: cada etapa colada num canto (o balão fica no centro atrás).
          // Canto inferior-direito sobe um pouco pra não bater no botão do WhatsApp.
          const corner = [
            "left-5 top-28 text-left",
            "right-5 top-28 text-right",
            "left-5 bottom-28 text-left",
            "right-5 bottom-32 text-right",
          ][i] ?? "left-5 top-28 text-left";
          return (
            <div
              key={e.n}
              ref={(el) => { etapaRefs.current[i] = el; }}
              style={isMobile ? { opacity: 0 } : ({ opacity: 0, top: e.top } as React.CSSProperties)}
              className={
                isMobile
                  ? `pointer-events-none absolute max-w-[13rem] ${corner}`
                  : `pointer-events-none absolute max-w-xs ${e.side === "right" ? "right-[8%] text-left" : "left-[8%] text-right"}`
              }
            >
              <div className="font-mono text-xs tracking-[0.2em] text-flush">{e.n}</div>
              <h3 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-bone [text-shadow:0_2px_12px_rgba(0,0,0,0.6)] md:text-4xl">{e.t}</h3>
              <p className="mt-1 text-sm text-bone-dim [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">{e.d}</p>
            </div>
          );
        })}

        {/* CENA 5 — matriz */}
        <div ref={matriz} style={{ opacity: 0 }} className="pointer-events-none absolute inset-x-0 top-24 text-center">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-flush">satriz ≈ matriz</span>
          <p className="mx-auto mt-2 max-w-md font-display text-2xl font-bold text-bone">Um núcleo que gera braços.</p>
        </div>
        {/* núcleo = Satriz Club (a marca-mãe, no centro) */}
        <div ref={nucleo} style={{ opacity: 0, transform: "translate(-50%,-50%)" }} className="pointer-events-none absolute left-1/2 top-1/2 text-center [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]">
          <div className="font-display text-2xl font-extrabold text-bone">Satriz Club</div>
          <div className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-bone/80">o coletivo</div>
        </div>
        {BRACOS.map((b, i) => {
          const a = (b.ang * Math.PI) / 180;
          const ux = Math.cos(a).toFixed(3);
          const uy = (-Math.sin(a)).toFixed(3);
          // O nome cai no CENTRO da bola. Como a câmera projeta ~20.12vh por
          // unidade 3D, o raio do braço (R) vira R*20.12vh na tela. Mobile usa
          // R=1.05 → 21.1vh; desktop mantém o raio original em px.
          const off = isMobile ? "21.1vh" : "min(330px, 40vw)";
          return (
            <div key={b.t} ref={(el) => { bracoRefs.current[i] = el; }} style={{ opacity: 0, transform: `translate(-50%,-50%) translate(calc(${ux} * ${off}), calc(${uy} * ${off}))` }} className="pointer-events-none absolute left-1/2 top-1/2 text-center [text-shadow:0_2px_10px_rgba(0,0,0,0.55)]">
              <div className="font-display text-base font-extrabold text-bone sm:text-xl">{b.t}</div>
              <div className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-bone/75 sm:text-[0.65rem]">{b.s}</div>
            </div>
          );
        })}

        {/* CENA 8 — o painel laranja + form SOBE de baixo pra cima (começa fora,
            embaixo, via translateY) e cobre a cena. */}
        <div ref={laranja} style={{ transform: "translateY(100vh)" }} className="pointer-events-none absolute inset-0 bg-flush" />
        {/* ...com o formulário junto, subindo por cima */}
        <div ref={form} style={{ transform: "translateY(100vh)" }} className="absolute inset-0 flex items-center justify-center px-6">
          <div className="w-full max-w-md text-center">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-ink/60">bora criar junto?</p>
            <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Vamos <span className="text-bone">começar</span>
            </h2>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/contato"
                className="rounded-full bg-ink px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-bone transition-colors hover:bg-ink-2"
              >
                Faça o seu orçamento
              </Link>
              <Link
                href="/criador"
                className="rounded-full border border-ink/30 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-ink transition-colors hover:bg-ink/10"
              >
                Sou criador
              </Link>
            </div>
          </div>
        </div>

        {/* Studio (cena 2, direita) */}
        <div className="pointer-events-none absolute inset-0 grid grid-cols-2">
          <div />
          <div className="flex items-center justify-center px-8">
            <div ref={textStudio} style={{ opacity: 0 }} className="max-w-sm">
              <h2 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-bone md:text-5xl">Satriz Studio</h2>
              <p className="mt-3 font-display text-xl text-bone-dim md:text-2xl">
                Muito mais que só uma <span className="text-flush"><br />Software House.</span>
                <br />Buscamos a essência da sua marca para criarmos uma <span className="text-flush">experiência</span> para seus clientes!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function setFade(el: HTMLElement | null, opacity: number, translateY: number) {
  if (!el) return;
  el.style.opacity = String(opacity);
  if (!el.style.transform.includes("translate(-50%")) {
    el.style.transform = `translateY(${translateY}px)`;
  }
}

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

function smoothstep(a: number, b: number, x: number) {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
}

function track(p: number, keys: [number, number][]) {
  if (p <= keys[0][0]) return keys[0][1];
  for (let i = 0; i < keys.length - 1; i++) {
    const [pa, va] = keys[i];
    const [pb, vb] = keys[i + 1];
    if (p < pb) return va + (vb - va) * smoothstep(pa, pb, p);
  }
  return keys[keys.length - 1][1];
}
