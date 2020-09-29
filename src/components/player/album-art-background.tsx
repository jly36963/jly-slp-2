// react imports
import React, { useMemo } from 'react';
// mui imports
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

// styles
const useStyles = makeStyles({
  root: (bgStyles: any) => ({
    // position: 'fixed',
    // zIndex: -1,
    // height: '100vh',
    // width: '100vw',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    filter: 'blur(8em) opacity(0.6)',
    position: 'absolute',
    ...bgStyles,
  }),
});

const AlbumArtBackground: React.FC = ({ albumImageSrc }: any): JSX.Element => {
  // ---------
  // state
  // ---------

  // bgStyle (based on album image source)
  const bgStyles = useMemo(() => {
    return albumImageSrc
      ? { backgroundImage: `url(${albumImageSrc})` }
      : {
          background: [
            '#0F2027',
            '-webkit-radial-gradient(circle, #2C5364, #203A43, #0F2027)',
            'radial-gradient(circle, #2C5364, #203A43, #0F2027)',
          ],
        };
  }, [albumImageSrc]);
  // classes (mui jss)
  const classes = useStyles(bgStyles);
  // jsx
  return <Box className={classes.root} />;
};

export default AlbumArtBackground;
