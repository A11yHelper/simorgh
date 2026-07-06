import styled from '@emotion/styled';
import { MostReadData } from '../types';

interface TopStoriesProps {
  data: MostReadData;
}

const Section = styled.section({
  marginTop: '1.5rem',
});

const Heading = styled.h2({
  fontSize: '1.5rem',
  lineHeight: 1.2,
  margin: '0 0 1rem',
});

const List = styled.ul({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

const ListItem = styled.li({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.375rem',
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

const formatReadableDate = (value: Date) =>
  new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(value);

/**
 * TODO: TASK T3
 * Add a "Top Stories" section.
 *
 * Requirements:
 * 1. Insert a standalone container with the title "Top Stories".
 * 2. The container must use id="topStories".
 * 3. Display the first 3 items from props.data.items in a vertical list.
 * 4. For each item, render:
 *    - A clickable title link
 *    - A readable date below the title
 *
 * Resources:
 * - Use item.href for the link URL.
 * - Use item.title for the link text.
 * - Format item.timestamp as a readable date.
 * - Do not hardcode content; render everything from props.data.
 *
 * You can preview your changes at http://localhost:7080/pidgin/popular/read
 */

const TopStories = ({ data }: TopStoriesProps) => {
  return (
    <Section id="topStories" aria-labelledby="topStoriesHeading">
      <Heading id="topStoriesHeading">Top Stories</Heading>
      <List>
        {data.items.slice(0, 3).map(item => {
          const publishedDate = new Date(item.timestamp);

          return (
            <ListItem key={item.id}>
              <TitleLink href={item.href}>{item.title}</TitleLink>
              <Meta dateTime={publishedDate.toISOString()}>
                {formatReadableDate(publishedDate)}
              </Meta>
            </ListItem>
          );
        })}
      </List>
    </Section>
  );
};

export default TopStories;
