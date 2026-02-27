import { MostReadData } from '../types';

interface TopStoriesProps {
  data: MostReadData;
}

const formatDate = (timestamp: number) => {
  // Assumes timestamp is in ms. Adjust if needed.
  return new Date(timestamp).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const TopStories = ({ data }: TopStoriesProps) => {
  const topItems = data.items.slice(0, 3);

  return (
    <section id="topStories" aria-labelledby="topStories-heading">
      <h2 id="topStories-heading">Top Stories</h2>
      <ol>
        {topItems.map((item, idx) => (
          <li key={item.href}>
            <a href={item.href}>{item.title}</a>
            <div>
              <time dateTime={new Date(item.timestamp).toISOString()}>
                {formatDate(item.timestamp)}
              </time>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default TopStories;
