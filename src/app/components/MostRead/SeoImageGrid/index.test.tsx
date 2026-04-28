import { render, screen } from '../../react-testing-library-with-providers';
import SeoImageGrid from '.';

describe('SeoImageGrid', () => {
  it('should render the Sport section with the mock data', () => {
    const { container } = render(<SeoImageGrid />, {
      service: 'news',
    });

    expect(container.querySelector('#t4SeoImageGrid')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Sport' })).toBeInTheDocument();
    expect(container.querySelectorAll('#t4SeoImageGrid li')).toHaveLength(2);

    expect(
      screen.getByRole('link', {
        name:
          'Real Madrid vs Manchester City, and oda fixtures for di Champions League knockout play-off second leg. Di two-leg Champions League knockout phase play-offs start dis week, Manchester City and Real Madrid dey among di 16 teams wey don dey hope to reach di last 16. Published 13 February 2025.',
      }),
    ).toHaveAttribute('href', 'https://www.bbc.com/pidgin/articles/cq8k9lqxyd8o');

    expect(screen.getByLabelText(/Real Madrid vs Manchester City/)).toHaveAttribute(
      'id',
      't4Image-cq8k9lqxyd8o',
    );

    expect(
      screen.getByRole('link', {
        name:
          'Kendrick Lamar, Donald Trump, and celebs wey show for Super Bowl . Oda stars wey show for New Orleans include Jay-Z, Blue Ivy, Samuel L Jackson and Bradley Cooper. Published 10 February 2025.',
      }),
    ).toHaveAttribute('href', 'https://www.bbc.com/pidgin/articles/cew5rdyv8xno');

    expect(screen.getByLabelText(/Kendrick Lamar/)).toHaveAttribute(
      'id',
      't4Image-cew5rdyv8xno',
    );
  });
});
