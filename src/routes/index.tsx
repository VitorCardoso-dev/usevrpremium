import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, Instagram, Menu, X, Truck, ShieldCheck, MessageCircle, Sparkles, Plus } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import campaign from "@/assets/campaign.jpg";
import essence from "@/assets/essence.jpg";
import logo from "@/assets/logo.png";
import { categories, products, whatsapp, instagram, type Product } from "@/lib/catalog";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({ meta: [
    { title: "usevr | Seu estilo. Sua essência." },
    { name: "description", content: "Moda masculina premium com identidade. Explore básicas, polos e regatas usevr. Atendimento pelo WhatsApp e envios para todo o Brasil." },
    { property: "og:title", content: "usevr | Seu estilo. Sua essência." },
    { property: "og:description", content: "Essenciais, texturas e atitude. Descubra a seleção de moda masculina usevr." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
});

function Brand() {
  return <span className="brand-lockup"><img className="brand-logo" src={logo} alt="usevr — moda masculina premium" width={1152} height={576} /><span className="brand-caption">MODA MASCULINA PREMIUM</span></span>;
}

function ExternalLink({ children, href, className, variant = "editorial" }: { children: React.ReactNode; href: string; className?: string; variant?: "editorial" | "quiet" | "ghost" }) {
  return <Button asChild variant={variant} className={className}><a href={href} target="_blank" rel="noopener noreferrer">{children}</a></Button>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("Todos");
  const [selected, setSelected] = useState<Product | null>(null);
  const [size, setSize] = useState("");
  const navigation = [{ label: 'Início', id: 'inicio' }, { label: 'Categorias', id: 'categorias' }, { label: 'Destaques', id: 'produtos' }, { label: 'A usevr', id: 'sobre' }];
  const visibleProducts = products.filter(p => filter === 'Todos' || p.category === filter);

  return (
    <>
      <div className="announcement">DE FORTALEZA PARA TODO O BRASIL <span className="mx-3">·</span> SEU ESTILO NÃO TEM FRONTEIRAS</div>
      <header className="site-header">
        <div className="shell header-row">
          <a href="#inicio" aria-label="usevr — início"><Brand /></a>
          <nav className="main-nav" aria-label="Navegação principal">{navigation.map(n => <a key={n.id} href={`#${n.id}`}>{n.label}</a>)}</nav>
          <div className="header-actions">
            <ExternalLink variant="ghost" href={instagram} className="desktop-social" ><Instagram aria-label="Instagram da usevr" /></ExternalLink>
            <ExternalLink href={whatsapp()} className="buy-button"><MessageCircle /> Comprar no WhatsApp</ExternalLink>
            <Button variant="ghost" size="icon" className="mobile-menu-trigger" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
          </div>
        </div>
        {menuOpen && <nav className="mobile-nav" aria-label="Navegação mobile">{navigation.map(n => <a key={n.id} href={`#${n.id}`} onClick={() => setMenuOpen(false)}>{n.label}</a>)}<a href="#contato" onClick={() => setMenuOpen(false)}>Contato</a></nav>}
      </header>

      <main>
        <section className="hero" id="inicio" aria-label="Coleção usevr">
          <img className="hero-image" src={campaign} width={1920} height={1024} alt="Modelo vestindo polo preta texturizada e calça clara em cenário contemporâneo" fetchPriority="high" />
          <div className="shell hero-inner">
            <div className="hero-copy">
              <span className="eyebrow">ESSENCIAIS COM IDENTIDADE</span>
              <h1>usevr<span className="wordmark-dot">.</span></h1>
              <p className="hero-title">Seu estilo.<br /><strong>Sua essência.</strong></p>
              <p className="hero-description">Mais do que vestir. É sobre ser você.<br />Peças selecionadas para quem encontra<br className="hidden sm:block" /> no simples a sua melhor versão.</p>
              <Button asChild variant="editorial" className="hero-cta"><a href="#produtos">Explore a seleção <ArrowUpRight /></a></Button>
            </div>
            <div className="hero-bottom"><span>MENOS EXCESSO. MAIS PERSONALIDADE.</span><div className="hero-index">01 <span /> USEVR ESSENTIALS</div></div>
          </div>
        </section>

        <section className="benefits" aria-label="Diferenciais usevr"><div className="shell benefits-inner">
          {[{ icon: Truck, title: 'Para todo o Brasil', text: 'Seu estilo vai com você' }, { icon: Sparkles, title: 'Seleção premium', text: 'Cuidado em cada escolha' }, { icon: ShieldCheck, title: 'Compra com confiança', text: 'Direto com a nossa equipe' }, { icon: MessageCircle, title: 'Atendimento próximo', text: 'Do primeiro oi ao seu pedido' }].map(b => <div className="benefit" key={b.title}><b.icon /><div><strong>{b.title}</strong><span>{b.text}</span></div></div>)}
        </div></section>

        <section id="categorias" className="section shell">
          <div className="section-heading"><div><p className="section-kicker">ENCONTRE O SEU ESTILO</p><h2>Essenciais para cada versão sua.</h2></div><ExternalLink href={whatsapp()} variant="quiet" className="section-link">Ver catálogo <ArrowUpRight /></ExternalLink></div>
          <div className="category-grid">{categories.map(c => <a key={c.name} className="category" href="#produtos" onClick={() => setFilter(c.name)} aria-label={`Ver ${c.name}`}><img src={c.image} width={768} height={1024} loading="lazy" alt={`Moda masculina usevr — ${c.name}`} /><div className="category-caption"><div><h3>{c.name}</h3><p>{c.subtitle}</p></div><ArrowUpRight /></div></a>)}</div>
          <div className="extra-categories">{['Shorts', 'Texturizadas', 'Bonés', 'Promoções'].map(c => <a key={c} href={whatsapp(`Olá! Gostaria de conhecer as opções de ${c.toLowerCase()} da usevr.`)} target="_blank" rel="noopener noreferrer">{c} <ArrowUpRight className="inline size-3 ml-1" /></a>)}</div>
        </section>

        <section id="produtos" className="section products-section shell">
          <div className="section-heading"><div><p className="section-kicker">CURADORIA USEVR</p><h2>Peças que fazem a diferença.</h2></div><ExternalLink href={whatsapp()} variant="quiet" className="section-link">Toda a seleção <ArrowUpRight /></ExternalLink></div>
          <div className="filters" aria-label="Filtrar peças">{['Todos', 'Básicas', 'Polos', 'Regatas'].map(f => <Button key={f} variant="filter" data-active={filter === f} aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</Button>)}</div>
          <div className="product-grid">{visibleProducts.map(p => <article className="product" key={p.id}>
            <div className={`product-image ${p.id === 'polo-preta' ? 'campaign-product' : ''}`}><img src={p.image} alt={p.name} width={768} height={1024} loading="lazy" /><span className="product-tag">{p.tag}</span><Button className="product-open" variant="ghost" aria-label={`Ver detalhes de ${p.name}`} onClick={() => { setSelected(p); setSize(''); }}><Plus /></Button></div>
            <p className="product-meta">{p.category} / USEVR PREMIUM</p><h3>{p.name}</h3><div className="product-bottom"><span>Preço sob consulta</span><a href={whatsapp(`Olá! Tenho interesse na peça ${p.name}. Pode me informar o preço e as opções disponíveis?`)} target="_blank" rel="noopener noreferrer">Consultar <ArrowUpRight className="inline size-3" /></a></div>
          </article>)}</div>
          <p className="product-note">Imagens editoriais ilustrativas. Consulte fotos reais, cores, tamanhos e disponibilidade com a nossa equipe.</p>
        </section>

        <section id="sobre" className="about"><div className="about-photo"><img src={essence} alt="Peças da seleção usevr organizadas sobre uma mesa de madeira" width={1024} height={1280} loading="lazy" /></div><div className="about-copy"><span className="eyebrow">A ESSÊNCIA USEVR</span><h2>O verdadeiro estilo<br />começa em você.</h2><p>Nascida em Fortaleza, a usevr acredita na força de um visual autêntico. Na peça que combina com a sua rotina. No detalhe que faz você se sentir bem.</p><p>Selecionamos moda masculina que une presença e conforto — do básico indispensável à textura que transforma uma combinação. De Fortaleza, para onde você estiver.</p><ExternalLink href={instagram} variant="quiet"><Instagram /> Conheça nosso universo <ArrowUpRight /></ExternalLink></div></section>

        <section id="contato" className="contact shell"><p className="section-kicker">UMA CONVERSA. MUITAS POSSIBILIDADES.</p><h2>Seu próximo look começa aqui.</h2><p>Conte o que você procura. A gente te ajuda a encontrar a sua próxima peça favorita.</p><ExternalLink href={whatsapp('Olá! Quero conversar com a equipe usevr e encontrar peças para o meu estilo.')}><MessageCircle /> Fale com a usevr <ArrowRight /></ExternalLink><span className="phone">(85) 99728-5773 · Fortaleza, CE</span></section>
      </main>

      <footer className="footer"><div className="shell"><div className="footer-top"><div><a href="#inicio" aria-label="usevr — início"><Brand /></a><p>Seu estilo. Sua essência.</p></div><nav className="footer-nav" aria-label="Navegação do rodapé">{navigation.slice(1).map(n => <a href={`#${n.id}`} key={n.id}>{n.label}</a>)}<a href="#contato">Contato</a></nav><div className="footer-social"><ExternalLink href={instagram} variant="ghost"><Instagram aria-label="Instagram da usevr" /></ExternalLink><ExternalLink href={whatsapp()} variant="ghost"><MessageCircle aria-label="WhatsApp da usevr" /></ExternalLink></div></div><div className="footer-bottom"><span>© 2026 usevr premium. Todos os direitos reservados.</span><span>Feito de essência. Feito para você.</span></div></div></footer>
      <ExternalLink href={whatsapp()} variant="ghost" className="floating-contact"><MessageCircle aria-label="Conversar com a usevr no WhatsApp" /></ExternalLink>

      <Dialog.Root open={selected !== null} onOpenChange={open => { if (!open) setSelected(null); }}><Dialog.Portal><Dialog.Overlay className="dialog-overlay" />{selected && <Dialog.Content className="product-dialog"><img className={`dialog-photo ${selected.id === 'polo-preta' ? 'is-campaign' : ''}`} src={selected.image} alt={selected.name} width={768} height={1024} /><div className="dialog-details"><span className="section-kicker">{selected.category.toUpperCase()} / USEVR PREMIUM</span><Dialog.Title>{selected.name}</Dialog.Title><Dialog.Description>{selected.description}</Dialog.Description><span className="size-label">Seu tamanho de interesse</span><div className="size-options">{['P','M','G','GG'].map(s => <Button key={s} variant="filter" data-active={size === s} aria-pressed={size === s} onClick={() => setSize(s)}>{s}</Button>)}</div><ExternalLink href={whatsapp(`Olá! Tenho interesse em ${selected.name}${size ? `, tamanho ${size}` : ''}. Pode me enviar fotos reais, preço e disponibilidade?`)}><MessageCircle /> Consultar no WhatsApp</ExternalLink><span className="dialog-help">Preço e disponibilidade confirmados no atendimento.<br />Imagem editorial ilustrativa.</span></div><Dialog.Close asChild><Button size="icon" variant="ghost" className="dialog-close" aria-label="Fechar detalhes"><X /></Button></Dialog.Close></Dialog.Content>}</Dialog.Portal></Dialog.Root>
    </>
  );
}
