import { Link } from 'react-router-dom';
import { useTitle } from '../hooks/useTitle';
import { Img } from '../components/Img';
import { PHOTO_CREDITS } from '../data/photoCredits';
import { productImage } from '../lib/links';

/**
 * Credits for openly licensed stock photos (required by CC BY licences).
 * Photos of Cake Palace's own cakes don't need to be listed here.
 */
export function CreditsPage() {
  useTitle('Photo credits');
  return (
    <div className="container section narrow">
      <h1>Photo credits</h1>
      <p className="lead">
        Some cake photos on this site are openly licensed images by the photographers below, used under the licence shown. They show the
        style of each cake; your cake is baked fresh by Cake Palace and may look a little different.
      </p>
      <ul className="credits-list">
        {PHOTO_CREDITS.map((c) => (
          <li key={c.slug} className="credit">
            <Img src={productImage(c.slug)} alt="" width={72} height={72} />
            <div>
              <p className="credit-item">{c.item}</p>
              <p className="small">
                “
                <a href={c.sourceUrl} target="_blank" rel="noopener noreferrer">
                  {c.title}
                </a>
                ” by{' '}
                {c.creatorUrl ? (
                  <a href={c.creatorUrl} target="_blank" rel="noopener noreferrer">
                    {c.creator}
                  </a>
                ) : (
                  c.creator
                )}
                , licensed under{' '}
                {c.licenseUrl ? (
                  <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer license">
                    {c.license}
                  </a>
                ) : (
                  c.license
                )}
                . Cropped and resized.
              </p>
            </div>
          </li>
        ))}
      </ul>
      <p>
        <Link to="/contact" className="text-link">
          Questions about a photo? Contact us
        </Link>
      </p>
    </div>
  );
}
