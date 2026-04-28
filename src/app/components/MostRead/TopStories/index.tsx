import { use } from 'react';
import styled from '@emotion/styled';
import { ServiceContext } from '../../../contexts/ServiceContext';
import { MostReadData } from '../types';

interface TopStoriesProps {
  data: MostReadData;
}

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

const TopStoriesSection = styled.section({
  margin: 0,
});

const Title = styled.h2({
  margin: 0,
});

const StoriesList = styled.ul({
  listStyle: 'none',
  margin: 0,
  padding: 0,
});

const StoryItem = styled.li({
  marginTop: '0.75rem',
});

const StoryLink = styled.a({
  display: 'inline-block',
});

const StoryDate = styled.time({
  display: 'block',
  marginTop: '0.25rem',
});

const formatReadableDate = (
  timestamp: number | string,
  locale: string,
  timezone: string,
) => {
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: timezone,
  }).format(date);
};

const TopStories = ({ data }: TopStoriesProps) => {
  const serviceContext = use(ServiceContext);
  const { datetimeLocale, serviceDatetimeLocale, timezone } = serviceContext;

  const locale = serviceDatetimeLocale || datetimeLocale;
  const items = data.items.slice(0, 3);

  return (
    <TopStoriesSection id="topStories" aria-labelledby="topStoriesHeading">
      <Title id="topStoriesHeading">Top Stories</Title>
      <StoriesList>
        {items.map(({ id, href, title, timestamp }) => {
          const date = new Date(timestamp);
          const readableDate = formatReadableDate(timestamp, locale, timezone);

          return (
            <StoryItem key={id}>
              <StoryLink href={href}>{title}</StoryLink>
              {readableDate ? (
                <StoryDate dateTime={date.toISOString()}>
                  {readableDate}
                </StoryDate>
              ) : null}
            </StoryItem>
          );
        })}
      </StoriesList>
    </TopStoriesSection>
  );
};

export default TopStories;
