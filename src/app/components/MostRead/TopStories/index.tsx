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

const TopStories = ({ data }: TopStoriesProps) => {
  return (
    <section id="topStories" aria-labelledby="topStoriesTitle">
      <h2 id="topStoriesTitle">Top Stories</h2>
      <ul>
        {data.items.slice(0, 3).map((item, index) => (
          <li key={index}>
            <a href={item.href}>{item.title}</a>
            <p>{new Date(item.timestamp).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TopStories;