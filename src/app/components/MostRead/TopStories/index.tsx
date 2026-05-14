import { MostReadData } from '../types';

interface TopStoriesProps {
  data: MostReadData;
}

const TopStories = ({ data }: TopStoriesProps) => {
  const items = data?.items?.slice(0, 3) ?? [];

  if (items.length === 0) return null;

  return (
    <section id="topStories" aria-labelledby="topStories-heading">
      <h2 id="topStories-heading">Top Stories</h2>
      <ul>
        {items.map(item => {
          const date = new Date(item.timestamp);
          const readable = date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });

          return (
            <li key={item.id ?? item.href}>
              <a href={item.href}>{item.title}</a>
              <div>
                <time dateTime={date.toISOString()}>{readable}</time>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default TopStories;
