import styled from '@emotion/styled';

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

const Section = styled.section({
  marginTop: '1.5rem',
});

const Heading = styled.h2({
  fontSize: '1.5rem',
  lineHeight: 1.2,
  margin: '0 0 1rem',
});

const Grid = styled.div({
  display: 'grid',
  gap: '1rem',
  gridTemplateColumns: 'minmax(0, 1fr)',

  '@media (min-width: 37.5rem)': {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
});

const Card = styled.article({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
});

const Image = styled.img({
  display: 'block',
  width: '100%',
  height: 'auto',
  borderRadius: '0.25rem',
});

const TitleLink = styled.a({
  color: 'inherit',
  textDecoration: 'none',

  '&:hover, &:focus-visible': {
    textDecoration: 'underline',
  },
});

const Meta = styled.time({
  color: '#5a5a5a',
  fontSize: '0.9375rem',
});

const formatReadableDate = (value: string) =>
  new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value));

export default function SeoImageGrid() {
  return (
    <Section id="t4SeoImageGrid" aria-labelledby="t4SeoImageGridHeading">
      <Heading id="t4SeoImageGridHeading">Sport</Heading>
      <Grid>
        {T4_MOCK_DATA.map(item => {
          const altText = item.imageAlt?.trim() || item.title;
          const readableDate = formatReadableDate(item.lastPublished);

          return (
            <Card key={item.id}>
              <Image
                id={`t4Image-${item.id}`}
                src={item.imageUrl}
                alt={altText}
              />
              <div>
                <TitleLink href={item.link}>{item.title}</TitleLink>
              </div>
              <Meta dateTime={item.lastPublished}>{readableDate}</Meta>
            </Card>
          );
        })}
      </Grid>
    </Section>
  );
}
