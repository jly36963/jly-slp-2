import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/styles';

// ***
// NOTICE
// if width is too small and text is too long:
// transform percentages might need changing.
// (many things could affect this: width, text length, fontsize, etc)
// ***

// mui styles (jss)
const useStyles = makeStyles(({ width }: any) => ({
  // classes
  scrollingTextContainer: {
    width: `${width}px`,
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
  },
  scrollingText: {
    whiteSpace: 'nowrap',
    textAlign: 'center',
    display: 'inline-flex',
    animation: '$backAndForth 16s linear infinite',
    animationDelay: '2s',
  },
  normal: {
    // no animation, maybe style later
  },
  '@keyframes backAndForth': {
    '0%': { transform: 'translateX(0%)' },
    '25%': { transform: 'translateX(-50%)' },
    '75%': { transform: 'translateX(50%)' },
    '100%': { transform: 'translateX(0%)' },
  },
}));

interface Props {
  text: string;
  threshold?: number;
  width?: number;
  [propName: string]: any;
}

const TextTicker: React.FC<Props> = ({
  text,
  threshold = 20,
  width = 200,
}: Props): JSX.Element => {
  // mui styles hook
  const classes = useStyles({ width });
  // use ticker (based on length)
  const useTicker: boolean = useMemo(() => text.length > threshold, [
    text,
    threshold,
  ]);
  return (
    <div className={classes.scrollingTextContainer}>
      <div className={useTicker ? classes.scrollingText : classes.normal}>
        {text}
      </div>
    </div>
  );
};

export default TextTicker;

// mui & keyframes
// https://github.com/mui-org/material-ui/issues/13793

// jss & keyframes
// https://cssinjs.org/jss-syntax/?v=v10.4.0#keyframes-animation

// jss & percentage based keyframes
// https://stackoverflow.com/a/58958349

// css -- back and forth scroll
// https://stackoverflow.com/a/47553567
