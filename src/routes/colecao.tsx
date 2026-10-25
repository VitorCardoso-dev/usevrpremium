import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories, whatsapp, instagram } from "@/lib/catalog";
import { useState } from "react";

export const Route = createFileRoute("/colecao")({
  component: Collection,
  head: () => ({
    meta: [
      { title: "Coleção completa | usevr" },
      { name: "description", content: "Explore 30 modelos de moda masculina usevr: camisetas básicas, polos e regatas. Consulte cores, tamanhos e disponibilidade pelo WhatsApp." },
    ],
  }),
});

const models: Record<string, string[]> = {
  Básicas: [
    "Camiseta Essential", "Camiseta Oversized", "Camiseta Slim Fit", "Camiseta Heavy Cotton",
    "Camiseta Minimal", "Camiseta Urban", "Camiseta Boxy", "Camiseta Comfort",
    "Camiseta Monocromática", "Camiseta Classic"
  ],
  Polos: [
    "Polo Classic", "Polo Texturizada", "Polo Slim Fit", "Polo Premium Piquet",
    "Polo Minimal", "Polo Urban", "Polo Comfort", "Polo Contrast",
    "Polo Signature", "Polo Essential"
  ],
  Regatas: [
    "Regata Essential", "Regata Fitness", "Regata Oversized", "Regata Cavada",
    "Regata Comfort", "Regata Minimal", "Regata Urban", "Regata Classic",
    "Regata Sport", "Regata Premium"
  ],
};

const collection = categories.flatMap((category) =>
  (models[category.name] ?? []).map((name, index) => ({
    id: category.name + "-" + index,
    name,
    category: category.name,
    index,
    number: String(index + 1).padStart(2, "0"),
  }))
);

const garmentColors = [
  { fabric: "#171717", background: "#e8e5df", detail: "#f5f2eb" },
  { fabric: "#e8e4dc", background: "#d6d2ca", detail: "#252525" },
  { fabric: "#737c70", background: "#e4e2d9", detail: "#f4f1e9" },
  { fabric: "#253c55", background: "#e1e4e7", detail: "#f3f0e9" },
  { fabric: "#9d473a", background: "#e9ddd4", detail: "#f5eee7" },
  { fabric: "#c6a56d", background: "#e8e2d6", detail: "#292929" },
  { fabric: "#4e4e4e", background: "#dddcd7", detail: "#d8c9a7" },
  { fabric: "#a7b9c6", background: "#e4e7e6", detail: "#25313a" },
  { fabric: "#5c4d68", background: "#e5dfe5", detail: "#f5f0e8" },
  { fabric: "#f1eee7", background: "#dedbd3", detail: "#373737" },
];

function GarmentIllustration({ category, index, name }: { category: string; index: number; name: string }) {
  const palette = garmentColors[(index + (category === "Polos" ? 3 : category === "Regatas" ? 6 : 0)) % garmentColors.length];
  const isPolo = category === "Polos";
  const isTank = category === "Regatas";
  const shape = isTank
    ? "M73 48 L91 48 L105 66 L118 49 L136 49 L151 85 L140 94 L131 78 L135 169 Q104 179 73 169 L78 78 L67 94 L56 85 Z"
    : isPolo
      ? "M75 42 L91 42 L104 55 L117 42 L133 42 L153 66 L139 82 L129 72 L135 169 Q104 178 73 169 L79 72 L69 82 L55 66 Z"
      : "M75 42 L91 42 L104 55 L117 42 L133 42 L153 66 L139 82 L129 72 L135 169 Q104 178 73 169 L79 72 L69 82 L55 66 Z";
  const pattern = index % 4;
  return (
    <svg className="garment-illustration" viewBox="0 0 208 208" role="img" aria-label={name + ", ilustração de produto"}>
      <rect width="208" height="208" fill={palette.background} />
      <ellipse cx="104" cy="176" rx="48" ry="7" fill="#000" opacity=".08" />
      <g transform={index % 2 ? "rotate(-3 104 104)" : "rotate(2 104 104)"}>
        <path d={shape} fill={palette.fabric} stroke="#000" strokeOpacity=".12" strokeWidth="1.5" strokeLinejoin="round" />
        {isPolo && <>
          <path d="M91 42 L104 56 L117 42 L112 65 L104 71 L96 65 Z" fill={palette.detail} />
          <path d="M104 70 L104 112" stroke={palette.detail} strokeWidth="2" opacity=".9" />
          <circle cx="108" cy="82" r="1.6" fill={palette.detail} />
          <circle cx="108" cy="91" r="1.6" fill={palette.detail} />
        </>}
        {!isPolo && !isTank && <path d="M91 43 Q104 63 117 43" fill="none" stroke={palette.detail} strokeWidth="3" opacity=".8" />}
        {isTank && <path d="M91 48 Q104 66 117 49" fill="none" stroke={palette.detail} strokeWidth="2.5" opacity=".7" />}
        {pattern === 1 && <g stroke={palette.detail} strokeWidth="1" opacity=".3"><path d="M82 100 H126 M80 106 H128 M80 112 H128 M80 118 H128 M80 124 H128 M80 130 H128" /></g>}
        {pattern === 2 && <path d="M82 111 H94 M82 116 H94 M82 121 H94" stroke={palette.detail} strokeWidth="2" opacity=".8" />}
        {pattern === 3 && <path d="M78 145 Q104 151 131 145" stroke={palette.detail} strokeWidth="2" fill="none" opacity=".75" />}
        {index % 3 === 0 && <rect x="112" y="102" width="10" height="13" rx="1" fill="none" stroke={palette.detail} strokeWidth="1" opacity=".7" />}
        <path d="M78 160 Q104 166 131 160" stroke="#fff" strokeOpacity=".15" strokeWidth="1" fill="none" />
      </g>
      <text x="104" y="196" textAnchor="middle" fill={palette.detail} opacity=".8" fontSize="7" letterSpacing="2.5">USEVR / ESSENTIAL</text>
    </svg>
  );
}

function Collection() {
  const [filter, setFilter] = useState("Todos");
  const shown = collection.filter((item) => filter === "Todos" || item.category === filter);

  return (
    <main className="collection-page">
      <header className="collection-header">
        <a href="/" className="collection-brand" aria-label="Voltar ao início">usevr<span>.</span></a>
        <a href={instagram} target="_blank" rel="noopener noreferrer" className="collection-instagram"><Instagram size={17} /> Instagram</a>
      </header>
      <section className="collection-intro">
        <a href="/" className="collection-back"><ArrowLeft size={15} /> Voltar para a loja</a>
        <p className="section-kicker">USEVR · MODA MASCULINA</p>
        <h1>A coleção completa<span>.</span></h1>
        <p>30 modelos para encontrar o essencial do seu jeito. Escolha uma categoria e consulte cores, tamanhos e disponibilidade com a nossa equipe.</p>
        <div className="collection-count"><strong>30</strong><span>modelos em</span><strong>3</strong><span>categorias</span></div>
      </section>
      <section className="collection-products shell" aria-label="Catálogo completo">
        <div className="collection-filters" aria-label="Filtrar coleção">
          {["Todos", "Básicas", "Polos", "Regatas"].map((category) => (
            <Button key={category} variant="filter" data-active={filter === category} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</Button>
          ))}
          <span>{shown.length} modelos</span>
        </div>
        <div className="collection-grid">
          {shown.map((item) => (
            <article className="collection-card" key={item.id}>
              <div className="collection-card-image">
                <GarmentIllustration category={item.category} index={item.index} name={item.name} />
                <span className="collection-number">{item.number}</span>
              </div>
              <p className="product-meta">{item.category.toUpperCase()} / USEVR</p>
              <h2>{item.name}</h2>
              <p className="collection-description">Preço sob consulta · Consulte opções disponíveis</p>
              <a className="collection-order" href={whatsapp("Olá! Tenho interesse no modelo " + item.name + " da categoria " + item.category + ". Pode me enviar fotos reais, cores, tamanhos, preço e disponibilidade?")} target="_blank" rel="noopener noreferrer">Consultar modelo <ArrowUpRight size={15} /></a>
            </article>
          ))}
        </div>
        <p className="collection-disclaimer">As peças acima são ilustrações de apresentação para diferenciar os modelos no catálogo. Para confirmar produtos reais, cores, tamanhos, preços e disponibilidade, solicite fotos à equipe pelo WhatsApp.</p>
      </section>
      <section className="collection-contact">
        <p className="section-kicker">NÃO ENCONTROU O QUE PROCURA?</p>
        <h2>Vamos encontrar sua próxima peça.</h2>
        <p>Chame a equipe usevr e conheça as opções disponíveis.</p>
        <Button asChild variant="editorial"><a href={whatsapp("Olá! Quero conhecer a coleção completa da usevr.")} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} /> Falar no WhatsApp <ArrowUpRight size={15} /></a></Button>
      </section>
      <footer className="collection-footer"><a href="/">usevr<span>.</span></a><span>Seu estilo. Sua essência.</span><a href={instagram} target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight size={13} /></a></footer>
    </main>
  );
}
