import { css } from '@emotion/react';

export type MostReadSeoItem = {
  id: string;
  type: 'article';
  isLive: boolean;
  title: string;
  firstPublished: string;
  lastPublished: string;
  link: string;
  imageUrl: string;
  description: string;
  imageAlt?: string;
};

export const T4_MOCK_DATA: MostReadSeoItem[] = [
  {
    type: 'article',
    isLive: false,
    title:
      'Real Madrid vs Manchester City, and oda fixtures for di Champions League knockout play-off second leg',
    firstPublished: '2025-02-11T09:57:42.029Z',
    lastPublished: '2025-02-13T10:52:48.687Z',
    link: 'https://www.bbc.com/pidgin/articles/cq8k9lqxyd8o',
    imageUrl:
      'https://ichef.bbci.co.uk/ace/ws/594/cpsprodpb/faf5/live/6452c2b0-e9e6-11ef-a319-fb4e7360c4ec.jpg.webp',
    description:
      'Di two-leg Champions League knockout phase play-offs start dis week, Manchester City and Real Madrid dey among di 16 teams wey don dey hope to reach di last 16.',
    imageAlt: '',
    id: 'cq8k9lqxyd8o',
  },
  {
    type: 'article',
    isLive: false,
    title: 'Kendrick Lamar, Donald Trump, and celebs wey show for Super Bowl ',
    firstPublished: '2025-02-10T10:00:48.820Z',
    lastPublished: '2025-02-10T10:00:48.820Z',
    link: 'https://www.bbc.com/pidgin/articles/cew5rdyv8xno',
    imageUrl:
      'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/6818/live/27d31820-e78f-11ef-bd1b-d536627785f2.jpg.webp',
    description:
      'Oda stars wey show for New Orleans include Jay-Z, Blue Ivy, Samuel L Jackson and Bradley Cooper.',
    imageAlt: '',
    id: 'cew5rdyv8xno',
  },
];

const sectionStyles = css({
  margin: '2rem 0',
  padding: 0,
});

const headingStyles = css({
  fontSize: '1.5rem',
  fontWeight: 700,
  marginBottom: '1rem',
  marginTop: 0,
  lineHeight: 1.2,
});

const gridStyles = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1.5rem',
  listStyle: 'none',
  padding: 0,
  margin: 0,
  '@media (max-width: 600px)': {
    gridTemplateColumns: '1fr',
  },
});

const cardStyles = css({
  background: '#fff',
  borderRadius: '0.5rem',
  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

const imageLinkStyles = css({
  display: 'block',
  lineHeight: 0,
  outline: 'none',
  ':focus-visible': {
    boxShadow: '0 0 0 3px #005bbc',
  },
});

const imageStyles = css({
  width: '100%',
  height: 'auto',
  display: 'block',
  aspectRatio: '16/9',
  objectFit: 'cover',
  background: '#f2f2f2',
});

const contentStyles = css({
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
});

const headlineStyles = css({
  fontSize: '1rem',
  fontWeight: 600,
  margin: 0,
  marginBottom: '0.5rem',
  lineHeight: 1.3,
  color: '#222',
});

const linkStyles = css({
  color: '#005bbc',
  textDecoration: 'none',
  ':hover, :focus-visible': {
    textDecoration: 'underline',
  },
});

const dateStyles = css({
  fontSize: '0.875rem',
  color: '#666',
  marginTop: 'auto',
});

function formatDate(iso: string) {
  const date = new Date(iso);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function getAltText(item: MostReadSeoItem) {
  if (item.imageAlt?.trim()) return item.imageAlt;
  if (item.description?.trim()) return item.description;
  // a11y-helper TODO: Provide descriptive alt text for this image
  return '';
}

export default function SeoImageGrid() {
  return (
    <section
      id="t4SeoImageGrid"
      aria-labelledby="t4SeoImageGrid-heading"
      css={sectionStyles}
    >
      <h2 id="t4SeoImageGrid-heading" css={headingStyles}>
        Sport
      </h2>
      <ul css={gridStyles}>
        {T4_MOCK_DATA.map(item => (
          <li key={item.id} css={cardStyles}>
            <a
              href={item.link}
              css={imageLinkStyles}
              tabIndex={0}
              aria-labelledby={`t4Headline-${item.id}`}
            >
              <img
                src={item.imageUrl}
                id={`t4Image-${item.id}`}
                alt={getAltText(item)}
                css={imageStyles}
                loading="lazy"
              />
            </a>
            <div css={contentStyles}>
              <h3 css={headlineStyles} id={`t4Headline-${item.id}`}>
                <a href={item.link} css={linkStyles}>
                  {item.title}
                </a>
              </h3>
              <time dateTime={item.lastPublished} css={dateStyles}>
                {formatDate(item.lastPublished)}
              </time>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
