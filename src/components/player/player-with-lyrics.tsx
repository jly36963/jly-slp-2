// react imports
import React, { useMemo } from 'react';
// mui imports
import { Button, Box, Typography, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// component imports
import PaddedPaper from '../padded-paper';
import FlexContainer from '../flex-container';
import TextTicker from '../text-ticker';
// icon imports
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PauseIcon from '@material-ui/icons/Pause';
import RepeatIcon from '@material-ui/icons/Repeat';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';
import ShuffleIcon from '@material-ui/icons/Shuffle';

// styles

const useStyles = makeStyles((theme) => ({
  root: {
    height: 575,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '640px',
    },
    [theme.breakpoints.up('md')]: {
      width: '768px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '1024px',
    },
  },
  bar: { transitionDuration: '2s' },
  player: {
    width: 320,
    height: 500,
    flex: '1 1 auto',
  },
  playerText: {
    width: '200px',
    textAlign: 'center',
  },
  playerTextLine: {
    overflowX: 'scroll',
    whiteSpace: 'nowrap',
    scrollbarWidth: 'none',
    '-ms-overflow-style': 'none',
    '&::-webkit-scrollbar': { display: 'none' },
  },
  lyrics: {
    width: 320,
    height: 500,
    flex: '1 1 auto',
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
}));

// component
const Player: React.FC = ({
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
    <FlexContainer>
      <PaddedPaper elevation={3}>
        <Box className={classes.root}>
          <Box className={classes.player}>
            <Box
              py={2}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Box pb={2}>
                <img src={albumImageSrc} alt="album art" />
              </Box>
              <Box className={classes.playerText}>
                <Typography variant="h6" className={classes.playerTextLine}>
                  <TextTicker text={songItem.name} />
                </Typography>
                <Typography variant="h6" className={classes.playerTextLine}>
                  <TextTicker text={songItem.artists[0].name} />
                </Typography>
                <Typography variant="h6" className={classes.playerTextLine}>
                  <TextTicker text={songItem.album.name} />
                </Typography>
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
          <Box className={classes.lyrics}>
            {lyrics ? (
              <pre className={classes.pre}>
                <Typography align="center">{lyrics.trim()}</Typography>
              </pre>
            ) : (
              <Typography align="center">No available lyrics</Typography>
            )}
          </Box>
        </Box>
      </PaddedPaper>
    </FlexContainer>
  );
};

export default Player;
