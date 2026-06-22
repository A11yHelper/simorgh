import React, { useMemo } from 'react';
import { MostReadData } from '../types';

interface TopStoriesProps {
  data: MostReadData;
  locale?: string;
}

const TopStories = ({ data, locale }: TopStoriesProps) => {
  const items = data?.items ? data.items.slice(0, 3) : [];

  const resolvedLocale = useMemo(() => {
    if (locale) return locale;
    if (typeof document !== 'undefined' && document.documentElement?.lang) {
      return document.documentElement.lang;
    }
    if (typeof navigator !== 'undefined' && navigator.language) {
      return navigator.language;
    }
    // a sensible default when nothing else is available
    return 'en-GB';
  }, [locale]);

  const formatTimestamp = (timestamp?: string | number) => {
    if (!timestamp) return null;
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) return null;
    const iso = date.toISOString();
    const readable = new Intl.DateTimeFormat(resolvedLocale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
    return { iso, readable };
  };

  return (
    <section id="topStories" aria-labelledby="topStories-heading">
      <h2 id="topStories-heading">Top Stories</h2>
      <ul>
        {items.map((item, index) => {
          const formatted = formatTimestamp(item.timestamp);
          return (
            <li key={`${item.href}-${index}`}>
              <a href={item.href}>{item.title}</a>
              {formatted ? (
                <div>
                  <time dateTime={formatted.iso}>{formatted.readable}</time>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default TopStories;
