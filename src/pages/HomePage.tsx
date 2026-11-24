import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/menu';
import { SAMPLE_REVIEWS } from '../data/reviews';
import { getMenu } from '../services/api';
import { useQuery } from '../hooks/useQuery';
import { useTitle } from '../hooks/useTitle';
import { ProductCard } from '../components/ProductCard';
import { Img } from '../components/Img';
import { Icon } from '../components/Icon';
import { categoryImage } from '../lib/links';
import { SHOP } from '../config/shop';

export function HomePage() {
  useTitle('');
  const { data: menu } = useQuery(getMenu);
  const bestsellers = (menu ?? []).filter((p) => p.bestseller && !p.soldOut).slice(0, 6);

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="badge">
              <Icon name="clock" size={16} /> Same-day delivery on menu cakes
            </p>
            <h1>{SHOP.tagline}</h1>
            <p className="hero-sub">
              Birthday cakes, anniversary cakes and everyday pastries — baked fresh in Banjara Hills. Pick up from the shop or get it
              delivered.
            </p>
            <div className="hero-actions">
              <Link to="/menu" className="btn btn-primary btn-lg">
                Order Now
              </Link>
              <Link to="/custom-cake" className="text-link">
                Or design a custom cake <Icon name="arrowRight" size={16} />
              </Link>
            </div>
          </div>
          <div className="hero-art">
            <Img src="/images/site/hero.svg" alt="A red velvet celebration cake with a candle" eager width={600} height={600} />
          </div>
        </div>
      </section>

      <section className="section container" aria-labelledby="cat-heading">
        <div className="section-head">
          <h2 id="cat-heading">Shop by category</h2>
        </div>
        <ul className="category-grid">
          {CATEGORIES.map((c) => (
            <li key={c.id}>
              <Link to={`/menu?category=${c.id}`} className="category-tile">
                <Img src={categoryImage(c.id)} alt="" width={600} height={600} />
                <span className="category-name">{c.name}</span>
                <span className="category-blurb">{c.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section container" aria-labelledby="best-heading">
        <div className="section-head">
          <h2 id="best-heading">Bestsellers</h2>
          <Link to="/menu" className="text-link">
            See full menu <Icon name="arrowRight" size={16} />
          </Link>
        </div>
        <div className="product-grid product-grid-3">
          {menu
            ? bestsellers.map((p) => <ProductCard key={p.id} product={p} />)
            : Array.from({ length: 6 }, (_, i) => <div key={i} className="product-card skeleton" aria-hidden="true" />)}
        </div>
      </section>

      <section className="section container">
        <div className="custom-promo">
          <Img src="/images/site/custom-cake.svg" alt="A two-tier custom celebration cake" width={600} height={600} />
          <div>
            <h2>Custom cake for your occasion</h2>
            <p>
              Theme birthdays, tiered anniversary cakes, baby showers — share a reference photo and your budget. We'll send you a quote on
              WhatsApp, usually the same day.
            </p>
            <ul className="check-list">
              <li><Icon name="check" size={18} /> Up to 3 tiers, egg or eggless</li>
              <li><Icon name="check" size={18} /> Your message and colours</li>
              <li><Icon name="check" size={18} /> Order at least 2 days ahead</li>
            </ul>
            <Link to="/custom-cake" className="btn btn-secondary">
              Request a custom cake
            </Link>
          </div>
        </div>
      </section>

      <section className="section container" aria-labelledby="how-heading">
        <h2 id="how-heading" className="center">How it works</h2>
        <ol className="steps-3">
          <li>
            <span className="step-num">1</span>
            <h3>Pick your cake</h3>
            <p>Choose a size, egg or eggless, and the message for the cake.</p>
          </li>
          <li>
            <span className="step-num">2</span>
            <h3>Choose a slot</h3>
            <p>Pick up from our shop or get it delivered — pick a date and a 2-hour slot.</p>
          </li>
          <li>
            <span className="step-num">3</span>
            <h3>Pay & relax</h3>
            <p>Pay online by UPI, card or net banking. Track your order right here.</p>
          </li>
        </ol>
      </section>

      {/* ⚠️ SAMPLE REVIEWS — placeholders, not real customers. Replace or remove before launch (src/data/reviews.ts). */}
      <section className="section container" aria-labelledby="reviews-heading">
        <div className="section-head">
          <h2 id="reviews-heading">What customers say</h2>
          <span className="tag">Sample reviews – for demo only</span>
        </div>
        <ul className="review-grid">
          {SAMPLE_REVIEWS.map((r) => (
            <li key={r.id} className="review-card">
              <p className="stars" aria-label={`${r.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Icon key={i} name="star" size={16} className={i < r.rating ? 'star-on' : 'star-off'} />
                ))}
              </p>
              <blockquote>{r.text}</blockquote>
              <p className="review-meta">
                {r.name} · {r.area} · {r.occasion}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
