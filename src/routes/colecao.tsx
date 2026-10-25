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
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1583743814966-8936f37f4678?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1661937715011-d8f8d9f21c0e?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=85",
  ],
  Polos: [
    "https://objectstorage.ap-singapore-1.oraclecloud.com/n/aximxvolvk6d/b/sailorbucket/o/uploads/all/4wLtICGoJM0qXWVVEVrHCHy5QhM0vuBGVPpvRAWQ.jpg",
    "https://eagle.com.eg/cdn/shop/files/203A6740_1880x_6d1ae349-7f8f-412b-956a-bee296444f65_1880x.jpg?v=1741898811",
    "https://attirenco.com/cdn/shop/files/AnyConv.com__0709856b-f7ee-4d09-8244-0c3188425ba9.jpg?v=1692919608",
    "https://www.siatexbd.com/cdn/524/img/polo-t-shirts/Mens%20Polo%20T-shirt%20Supplier%20in%20Bangladesh.jpeg?l=r",
    "https://fypiq.com/images/h1cp4r72x7/featured/h1cp4r72x7.jpg?v=1775071327",
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=85",
    "https://image.hm.com/assets/hm/9f/76/9f76f0a20c5f6909a05ab2b56fdc6354cd10351b.jpg?imwidth=1260",
  ],
  Regatas: [
    "https://images.unsplash.com/photo-1661937715011-d8f8d9f21c0e?auto=format&fit=crop&w=900&q=85",
    "https://images.rawpixel.com/image_social_portrait/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI2LTAxL3Jhd3BpeGVsb2ZmaWNlN19hX3BvcnRyYWl0X29mX2FuX2JyaXRpc2hfbWFuX3dlYXJpbmdfYV9wbGFpbl9saV9jZjg5YjRjYy1iZWNlLTQyYWMtYjNlYS04YWNkM2VmOGIzZDdfMS5qcGc.jpg",
    "https://images.squarespace-cdn.com/content/v1/5a2c77d812abd9bc7ab2b450/de62d7c5-e8db-4961-b65f-4d5fd388e4be/Paris_by_AlexanderCourtman_11.jpg",
    "https://www.damanmgmt.com/uploads/galleries/1703233612_BOOK_Emilio_Alcaraz_116_1.jpg",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85",
  ],
};

const collection = categories.flatMap((category) =>
  (models[category.name] ?? []).map((name, index) => ({
    id: category.name + "-" + index,
    name,
    category: category.name,
    image: productPhotos[category.name][index],
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
