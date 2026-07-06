import { render, screen } from '../../react-testing-library-with-providers';
import SeoImageGrid from '.';

describe('SeoImageGrid', () => {
  it('renders the sport section with linked image cards and readable dates', () => {
    render(<SeoImageGrid />);

    expect(
      screen.getByRole('heading', { name: 'Sport', level: 2 }),
    ).toBeInTheDocument();

    expect(screen.getByRole('region', { name: 'Sport' })).toHaveAttribute(
      'id',
      't4SeoImageGrid',
    );

    expect(
      screen.getByRole('link', {
        name: 'Real Madrid vs Manchester City, and oda fixtures for di Champions League knockout play-off second leg',
      }),
    ).toHaveAttribute(
      'href',
      'https://www.bbc.com/pidgin/articles/cq8k9lqxyd8o',
    );

    expect(
      screen.getByAltText(
        'Real Madrid vs Manchester City, and oda fixtures for di Champions League knockout play-off second leg',
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('img', {
        name: 'Kendrick Lamar, Donald Trump, and celebs wey show for Super Bowl ',
      }),
    ).toHaveAttribute('id', 't4Image-cew5rdyv8xno');

    expect(screen.getByText('11 February 2025')).toBeInTheDocument();
    expect(screen.getByText('10 February 2025')).toBeInTheDocument();
  });
});