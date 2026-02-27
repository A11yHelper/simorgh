import React from 'react';

interface StoryItem {
  href: string;
  title: string;
  timestamp: string | number | Date;
}

interface MostReadData {
  items: StoryItem[];
}

interface TopStoriesProps {
  data: MostReadData;
}

const formatDate = (timestamp: string | number | Date) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const TopStories = ({ data }: TopStoriesProps) => (
  <section id="topStories" aria-labelledby="topStories-heading">
    <h2 id="topStories-heading">Top Stories</h2>
    <ol>
      {data.items.slice(0, 3).map((item, idx) => (
        <li key={item.href}>
          <a
            href={item.href}
            className="top-story-link"
          >
            {item.title}
          </a>
          <div className="top-story-date">
            {formatDate(item.timestamp)}
          </div>
        </li>
      ))}
    </ol>
    <style>{`
      #topStories {
        margin: 2rem 0;
        padding: 1rem;
        background: #f9f9f9;
        border-radius: 8px;
      }
      .top-story-link {
        display: inline-block;
        font-size: 1.1rem;
        font-weight: 600;
        color: #005bbc;
        text-decoration: none;
        transition: background 0.2s, outline 0.2s;
        padding: 0.2em 0.4em;
        border-radius: 4px;
      }
      .top-story-link:hover,
      .top-story-link:focus-visible {
        background: #e6f0fa;
        outline: 2px solid #005bbc;
        outline-offset: 2px;
      }
      .top-story-date {
        font-size: 0.95rem;
        color: #555;
        margin-top: 0.2em;
      }
      ol {
        list-style: decimal inside;
        padding-left: 1em;
      }
      li + li {
        margin-top: 1em;
      }
    `}</style>
  </section>
);

export default TopStories;
