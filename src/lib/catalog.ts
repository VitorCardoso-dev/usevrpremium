import basicas from '@/assets/basicas.jpg';
import polos from '@/assets/polos.jpg';
import regatas from '@/assets/regatas.jpg';
import campaign from '@/assets/campaign.jpg';

export const whatsapp = (message = 'Olá! Gostaria de conhecer o catálogo da usevr.') => `https://wa.me/5585997285773?text=${encodeURIComponent(message)}`;
export const instagram = 'https://www.instagram.com/usevr_premium/';
export const categories = [
  { name: 'Básicas', subtitle: 'O essencial, elevado.', image: basicas },
  { name: 'Polos', subtitle: 'Presença em cada detalhe.', image: polos },
  { name: 'Regatas', subtitle: 'Liberdade para ser você.', image: regatas },
];
export const products = [
  { id: 'basica', name: 'Camiseta Básica Premium', category: 'Básicas', image: basicas, tag: 'ESSENCIAL', description: 'Uma base versátil para combinações que acompanham o seu ritmo.' },
  { id: 'polo', name: 'Polo Texturizada', category: 'Polos', image: polos, tag: 'EM DESTAQUE', description: 'Textura marcante e um visual refinado, do casual aos momentos especiais.' },
  { id: 'regata', name: 'Regata Fit Premium', category: 'Regatas', image: regatas, tag: 'CASUAL & FIT', description: 'Uma escolha descomplicada para os dias de sol e movimento.' },
  { id: 'polo-preta', name: 'Polo Classic Preta', category: 'Polos', image: campaign, tag: 'SELEÇÃO USEVR', description: 'A presença do preto em uma peça que vai além do básico.' },
];
export type Product = (typeof products)[number];
