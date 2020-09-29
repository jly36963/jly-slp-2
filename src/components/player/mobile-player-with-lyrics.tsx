import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// components
import {
  Button,
  Box,
  Typography,
  LinearProgress,
  Divider,
} from '@material-ui/core';
import PaddedPaper from '../padded-paper';
import TextTicker from '../text-ticker';

// icons
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PauseIcon from '@material-ui/icons/Pause';
import RepeatIcon from '@material-ui/icons/Repeat';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';
import ShuffleIcon from '@material-ui/icons/Shuffle';

// styles

const useStyles = makeStyles({
  root: {
    height: '100vh',
    minHeight: '650px',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navbarSpacer: {
    height: '100px',
  },
  bar: {
    transitionDuration: '2s',
  },
  player: {
    width: 320,
    height: 200,
  },
  playerText: {
    width: '150px',
    textAlign: 'center',
  },
  playerTextLine: {
    overflowX: 'scroll',
    whiteSpace: 'nowrap',
  },
  lyrics: {
    width: 320,
    height: '100%',
    // scrollbar
    overflowY: 'scroll',
    scrollbarWidth: 'none',
    '-ms-overflow-style': 'none',
    '&::-webkit-scrollbar': { width: '0 !important' },
  },
  pre: {
    whiteSpace: 'pre-wrap',
    font: 'Roboto',
  },
  albumArt: {
    height: 80,
    width: 80,
  },
});

// component
const MobilePlayerWithLyrics: React.FC = ({
  songItem,
  songItemId,
  is_playing,
  progress_percent,
  sendSpotifyPlaybackRequest,
  shuffle_state,
  repeat_state,
  lyrics,
  showLyrics,
  setShowLyrics,
  albumImageSrc,
}: any): JSX.Element => {
  // classes (mui jss)
  const classes = useStyles();

  return (
    <PaddedPaper elevation={3} className={classes.root}>
      {/* spacer */}
      <Box className={classes.navbarSpacer} />
      <Box className={classes.player}>
        {/* player */}
        <Box py={2} display="flex" flexDirection="column" alignItems="center">
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-evenly"
            width="100%"
          >
            <Box>
              <img
                src={albumImageSrc}
                alt="album art"
                className={classes.albumArt}
              />
            </Box>
            <Box className={classes.playerText}>
              <Typography className={classes.playerTextLine}>
                <TextTicker text={songItem.name} />
              </Typography>
              <Typography className={classes.playerTextLine}>
                <TextTicker text={songItem.artists[0].name} />
              </Typography>
              <Typography className={classes.playerTextLine}>
                <TextTicker text={songItem.album.name} />
              </Typography>
            </Box>
          </Box>
          <Box py={2} height="16" width="60%">
            <LinearProgress
              variant="determinate"
              value={progress_percent}
              classes={{ bar: classes.bar }}
            />
          </Box>
          <Box display="flex" flexDirection="flexRow" mx="auto">
            <Button>
              <ShuffleIcon
                onClick={() => sendSpotifyPlaybackRequest('shuffle')}
                color={shuffle_state ? 'primary' : 'inherit'}
              />
            </Button>
            <Button>
              <SkipPreviousIcon
                onClick={() => sendSpotifyPlaybackRequest('previous')}
              />
            </Button>
            <Button>
              {is_playing ? (
                <PauseIcon
                  onClick={() => sendSpotifyPlaybackRequest('pause')}
                />
              ) : (
                <PlayArrowIcon
                  onClick={() => sendSpotifyPlaybackRequest('play')}
                />
              )}
            </Button>
            <Button>
              <SkipNextIcon
                onClick={() => sendSpotifyPlaybackRequest('next')}
              />
            </Button>
            <Button>
              {['context', 'off'].includes(repeat_state) ? (
                <RepeatIcon
                  onClick={() => sendSpotifyPlaybackRequest('repeat')}
                  color={repeat_state === 'context' ? 'primary' : 'inherit'}
                />
              ) : (
                <RepeatOneIcon
                  onClick={() => sendSpotifyPlaybackRequest('repeat')}
                  color="primary"
                />
              )}
            </Button>
          </Box>
          {/* lyrics */}
          <Box py={2} display="flex" flexDirection="flexRow" mx="auto">
            <Box>
              <Button
                variant="outlined"
                onClick={() => setShowLyrics(!showLyrics)}
              >
                <Typography>
                  {showLyrics ? 'Hide Lyrics' : 'Show Lyrics'}
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* divider */}
      <Box my={2}>
        <Divider variant="middle" />
      </Box>
      {/* lyrics */}
      <Box className={classes.lyrics}>
        {lyrics ? (
          <pre className={classes.pre}>
            <Typography align="center">{lyrics.trim()}</Typography>
          </pre>
        ) : (
          <Typography align="center">No available lyrics</Typography>
        )}
      </Box>
    </PaddedPaper>
  );
};

export default MobilePlayerWithLyrics;
