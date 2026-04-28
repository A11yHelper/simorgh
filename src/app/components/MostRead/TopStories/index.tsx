import { MostReadData } from '../types';

interface TopStoriesProps {
  data: MostReadData;
}

/**
 * Top Stories Component
 * - Displays the first 3 items from props.data.items in a vertical list.
 * - Includes accessible and semantic HTML.
 */
const TopStories = ({ data }: TopStoriesProps) => {
  const topStories = data.items.slice(0, 3);

  return (
    <section id="topStories" aria-labelledby="topStoriesTitle">
      <h2 id="topStoriesTitle">Top Stories</h2>
      <ol>
        {topStories.map((item, index) => (
          <li key={index}>
            <a href={item.href}>{item.title}</a>
            <p>{new Date(item.timestamp).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default TopStories;
