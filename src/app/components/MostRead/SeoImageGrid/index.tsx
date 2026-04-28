import { use } from 'react';
import styled from '@emotion/styled';
import { ServiceContext } from '../../../contexts/ServiceContext';

type MostReadSeoItem = {
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

/**
 * TODO: TASK T4
 * Add a standalone "Sport" section.
 *
 * Requirements:
 * 1. Insert a section titled "Sport".
 * 2. The section must use id="t4SeoImageGrid".
 * 3. Render items from T4_MOCK_DATA in a 2-column layout.
 * 4. For each item, render from top to bottom:
 *    - An image
 *    - A headline
 *    - A readable date
 * 5. The card or headline must link to item.link.
 *
 * Resources:
 * - Use T4_MOCK_DATA as the data source for the section.
 * - Use item.imageUrl as the image source.
 * - Format item.lastPublished as a readable date.
 * - Each image must use id="t4Image-<item.id>".
 *
 * Constraints:
 * - Keep the markup semantic and clean.
 * - Do not use external UI libraries.
 *
 * You can preview your changes at http://localhost:7080/pidgin/popular/read
 */

const Section = styled.section({
  marginTop: '1.5rem',
});

const Title = styled.h2({
  margin: 0,
});

const Grid = styled.ul({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '1rem',
  listStyle: 'none',
  margin: '1rem 0 0',
  padding: 0,
});

const Card = styled.article({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

const CardLink = styled.a({
  color: 'inherit',
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  height: '100%',
});

const Image = styled.img({
  display: 'block',
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
});

const Headline = styled.h3({
  margin: 0,
});

const DateText = styled.time({
  display: 'block',
});

const formatReadableDate = (timestamp: string, locale: string) =>
  new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(timestamp));

export default function SeoImageGrid() {
  const { datetimeLocale, serviceDatetimeLocale } = use(ServiceContext);

  const locale = serviceDatetimeLocale || datetimeLocale;

  return (
    <Section id="t4SeoImageGrid" aria-labelledby="t4SeoImageGridHeading">
      <Title id="t4SeoImageGridHeading">Sport</Title>
      <Grid>
        {T4_MOCK_DATA.map(item => {
          const readableDate = formatReadableDate(item.lastPublished, locale);
          const altText = `${item.title}. ${item.description} Published ${readableDate}.`;

          return (
            <li key={item.id}>
              <Card>
                <CardLink href={item.link}>
                  <Image
                    id={`t4Image-${item.id}`}
                    src={item.imageUrl}
                    alt={altText}
                  />
                  <Headline>{item.title}</Headline>
                  <DateText dateTime={item.lastPublished}>
                    {readableDate}
                  </DateText>
                </CardLink>
              </Card>
            </li>
          );
        })}
      </Grid>
    </Section>
  );
}
