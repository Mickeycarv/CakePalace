import { Link, NavLink, Outlet } from 'react-router-dom';
import { Icon } from './Icon';
import { ScrollToTop } from './ui';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import { SHOP, SHOP_MAPS_URL } from '../config/shop';
import { whatsappLink } from '../lib/links';

export function Logo() {
  return (
    <span className="logo">
      <img src="/favicon.svg" alt="" width={36} height={36} />
      <span>
        Cake <span className="logo-accent">Palace</span>
      </span>
    </span>
  );
}

function Header() {
  const { count } = useCart();
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="Cake Palace home">
          <Logo />
        </Link>
        <nav className="main-nav" aria-label="Main">
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/custom-cake">Custom Cake</NavLink>
          <NavLink to="/orders">My Orders</NavLink>
        </nav>
        <Link to="/cart" className="cart-link" aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}>
          <Icon name="cart" size={24} />
          {count > 0 && (
            <span className="cart-count" aria-hidden="true">
              {count > 99 ? '99+' : count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  const settings = useSettings();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Logo />
          <p className="footer-tag">{SHOP.tagline}.</p>
        </div>
        <div>
          <h2 className="footer-heading">Visit us</h2>
          {/* PLACEHOLDER address and hours — see src/config/shop.ts */}
          <address>
            <a href={SHOP_MAPS_URL} target="_blank" rel="noopener noreferrer">
              {SHOP.address}
            </a>
          </address>
          <p>Open daily {SHOP.hours}</p>
        </div>
        <div>
          <h2 className="footer-heading">Talk to us</h2>
          <p>
            <a href={whatsappLink(settings.whatsappNumber, 'Hi Cake Palace! I have a question.')} target="_blank" rel="noopener noreferrer" className="footer-wa">
              <Icon name="whatsapp" /> WhatsApp us
            </a>
          </p>
          <p>
            <a href={`tel:${SHOP.phoneE164}`}>
              <Icon name="phone" size={16} /> {SHOP.phoneDisplay}
            </a>
          </p>
        </div>
        <div>
          <h2 className="footer-heading">Order</h2>
          <ul className="footer-links">
            <li><Link to="/menu">Full menu</Link></li>
            <li><Link to="/custom-cake">Custom cakes</Link></li>
            <li><Link to="/orders">Track an order</Link></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Cake Palace, Hyderabad. Also on Swiggy & Zomato.</p>
        <p className="muted-on-dark">Demo version · sample content</p>
      </div>
    </footer>
  );
}

export function SiteLayout() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollToTop />
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
