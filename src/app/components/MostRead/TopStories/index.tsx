import { MostReadData } from '../types';

interface TopStoriesProps {
  data: MostReadData;
}

/**
 * TopStories Component
 * Displays the top 3 stories with accessible links and formatted dates.
 */
const TopStories = ({ data }: TopStoriesProps) => {
  return (
    <section id="topStories" aria-labelledby="top-stories-title">
      <h2 id="top-stories-title">Top Stories</h2>
      <ul>
        {data.items.slice(0, 3).map((item) => (
          <li key={item.href}>
            <a href={item.href} title={item.title}>
              {item.title}
            </a>
            <time dateTime={new Date(item.timestamp).toISOString()}>
              {new Date(item.timestamp).toLocaleDateString()}
            </time>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TopStories;
