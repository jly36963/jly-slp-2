// react imports
import React from 'react';
// mui imports
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, Typography, LinearProgress } from '@material-ui/core';
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
    padding: theme.spacing(2),
    height: 575,
  },
  bar: { transitionDuration: '2s' },
  player: {
    height: 500,
    width: 320,
  },
  playerText: {
    width: '200px',
    textAlign: 'center',
  },
  grow: {
    flexGrow: 1,
  },
}));

// component
const PlayerNoLyrics: React.FC = ({
  songItem,
  songItemId,
  is_playing,
  progress_percent,
  sendSpotifyPlaybackRequest,
  shuffle_state,
  repeat_state,
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
                <Typography variant="h6">
                  <TextTicker text={songItem.name} />
                </Typography>
                <Typography variant="h6">
                  <TextTicker text={songItem.artists[0].name} />
                </Typography>
                <Typography variant="h6">
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
          {/* <div className="background" style={backgroundStyles} /> */}
        </Box>
      </PaddedPaper>
    </FlexContainer>
  );
};

export default PlayerNoLyrics;

// <MainContentContainer>
//   <PaddedPaper elevation={3}>

//   </PaddedPaper>
// </MainContentContainer>;
