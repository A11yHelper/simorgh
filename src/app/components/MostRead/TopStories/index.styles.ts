import { css, Theme } from '@emotion/react';

const styles = {
  section: ({ palette, spacings }: Theme) =>
    css({
      backgroundColor: palette.GREY_2,
      borderTop: `1px solid ${palette.GREY_10}`,
      borderBottom: `1px solid ${palette.GREY_10}`,
      padding: `${spacings.DOUBLE}rem ${spacings.FULL}rem`,
    }),

  title: ({ fontSizes, fontVariants, palette, spacings }: Theme) =>
    css({
      ...fontSizes.pica,
      ...fontVariants.sansBold,
      color: palette.SHADOW,
      margin: 0,
      marginBottom: `${spacings.FULL}rem`,
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
    }),

  list: () =>
    css({
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'grid',
    }),

  item: ({ palette, spacings }: Theme) =>
    css({
      paddingTop: `${spacings.FULL}rem`,
      paddingBottom: `${spacings.FULL}rem`,
      borderTop: `1px solid ${palette.GREY_10}`,

      '&:first-of-type': {
        borderTop: 'none',
        paddingTop: 0,
      },

      '&:last-of-type': {
        paddingBottom: 0,
      },
    }),

  link: ({ fontSizes, fontVariants, palette }: Theme) =>
    css({
      ...fontSizes.pica,
      ...fontVariants.serifMedium,
      color: palette.EBON,
      display: 'inline-block',
      textDecoration: 'none',
      lineHeight: 1.25,

      '&:hover, &:focus': {
        textDecoration: 'underline',
      },
    }),

  timestamp: ({ fontSizes, palette, spacings }: Theme) =>
    css({
      ...fontSizes.brevier,
      color: palette.GREY_6,
      display: 'block',
      marginTop: `${spacings.HALF}rem`,
    }),
};

export default styles;