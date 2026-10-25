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
    image: category.image,
    number: String(index + 1).padStart(2, "0"),
  }))
);

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
                <img src={item.image} alt={item.name + " — referência visual da categoria " + item.category} loading="lazy" />
                <span className="collection-number">{item.number}</span>
              </div>
              <p className="product-meta">{item.category.toUpperCase()} / USEVR</p>
              <h2>{item.name}</h2>
              <p className="collection-description">Preço sob consulta · Consulte opções disponíveis</p>
              <a className="collection-order" href={whatsapp("Olá! Tenho interesse no modelo " + item.name + " da categoria " + item.category + ". Pode me enviar fotos reais, cores, tamanhos, preço e disponibilidade?")} target="_blank" rel="noopener noreferrer">Consultar modelo <ArrowUpRight size={15} /></a>
            </article>
          ))}
        </div>
        <p className="collection-disclaimer">As imagens são referências visuais da categoria e não representam necessariamente cada variação individual. Antes de comprar, solicite à equipe fotos reais do modelo, cores, tamanhos e disponibilidade.</p>
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
