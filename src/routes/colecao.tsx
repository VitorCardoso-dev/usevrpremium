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

const productPhotos: Record<string, string[]> = {
  Básicas: [
    "photo-1521572163474-6864f9cf17ab",
    "photo-1583743814966-8936f37f4678",
    "photo-1618354691373-d851c5c3a990",
    "photo-1622445275463-afa2ab738c34",
    "photo-1576566588028-4147f3842f27",
    "photo-1554568218-0f1715e72254",
    "photo-1525507119028-ed4c629a60a3",
    "photo-1620799140408-edc6dcb6d633",
    "photo-1578587018452-892bacefd3f2",
    "photo-1523398002811-999ca8dec234",
  ],
  Polos: [
    "photo-1523381210434-271e8be1f52b",
    "photo-1551488831-00ddcb6c6bd3",
    "photo-1551232864-3f0890e580d9",
    "photo-1544441893-675973e31985",
    "photo-1627225924765-552d49cf47ad",
    "photo-1551028719-00167b16eac5",
    "photo-1543076447-215ad9ba6923",
    "photo-1633966887768-64f9a867bdba",
    "photo-1520004434532-668416a08753",
    "photo-1490114538077-0a7f8cb49891",
  ],
  Regatas: [
    "photo-1503342217505-b0a15ec3261c",
    "photo-1515886657613-9f3515b0c78f",
    "photo-1529139574466-a303027c1d8b",
    "photo-1539109136881-3be0616acf4b",
    "photo-1509631179647-0177331693ae",
    "photo-1515372039744-b8f02a3ae446",
    "photo-1539533018447-63fcce2678e3",
    "photo-1483985988355-763728e1935b",
    "photo-1490481651871-ab68de25d43d",
    "photo-1529139574466-a303027c1d8b",
  ],
};

const collection = categories.flatMap((category) =>
  (models[category.name] ?? []).map((name, index) => ({
    id: category.name + "-" + index,
    name,
    category: category.name,
    image: `https://images.unsplash.com/${productPhotos[category.name][index]}?auto=format&fit=crop&w=900&q=85`,
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
                <img src={item.image} alt={item.name + " — foto de referência de moda"} loading="lazy" />
                <span className="collection-number">{item.number}</span>
              </div>
              <p className="product-meta">{item.category.toUpperCase()} / USEVR</p>
              <h2>{item.name}</h2>
              <p className="collection-description">Preço sob consulta · Consulte opções disponíveis</p>
              <a className="collection-order" href={whatsapp("Olá! Tenho interesse no modelo " + item.name + " da categoria " + item.category + ". Pode me enviar fotos reais, cores, tamanhos, preço e disponibilidade?")} target="_blank" rel="noopener noreferrer">Consultar modelo <ArrowUpRight size={15} /></a>
            </article>
          ))}
        </div>
        <p className="collection-disclaimer">As fotos são referências de estilo para apresentar diferentes opções de peças e não confirmam estoque ou correspondência exata com produtos da loja. Antes de comprar, peça à equipe fotos reais, cores, tamanhos, preço e disponibilidade.</p>
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
