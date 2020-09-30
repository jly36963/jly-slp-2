// react imports
import React, { useState, useEffect, useMemo, useCallback } from 'react';
// mui imports
import { Box } from '@material-ui/core';
// component imports
import PrivateRoute from '../components/auth/private-route';
import Player from '../components/player';
import CustomSnackbar from '../components/snackbar';
import AuthorizeSpotify from '../components/spotify/authorize-spotify';
import NothingPlaying from '../components/player/nothing-playing';
// util imports
import axios, { AxiosRequestConfig, Method } from 'axios';
import qs from 'qs';
import useInterval from '../utils/useInterval';
import validateLyricPath from '../utils/validate-lyric-path';
import removeSpecialCharacters from '../utils/remove-special-characters';
import storage from '../utils/storage';

// component
const Landing: React.FC = ({ authState }: any): JSX.Element => {
  // ---------
  // state
  // ---------

  // initialState
  const initialState = useMemo(
    () => ({
      lyrics: null,
      spotifyToken: null,
      spotifyRefreshToken: null,
      songItem: null,
      songItemId: null,
      is_playing: false,
      progress_ms: 0,
      lyrics_path: null,
      repeat_state: 'off',
      shuffle_state: false,
      showLyrics: false,
    }),
    [],
  );
  // spotify token state
  const [spotifyToken, setSpotifyToken] = useState<string | null>(
    initialState.spotifyToken,
  );
  const [spotifyRefreshToken, setSpotifyRefreshToken] = useState<string | null>(
    initialState.spotifyRefreshToken,
  );
  // song state
  const [songItem, setSongItem] = useState<any | null>(initialState.songItem);
  const [songItemId, setSongItemId] = useState<any | null>(
    initialState.songItemId,
  );
  const [is_playing, set_is_playing] = useState<boolean>(
    initialState.is_playing,
  );
  const [progress_ms, set_progress_ms] = useState<number>(
    initialState.progress_ms,
  );
  const [lyrics_path, set_lyrics_path] = useState<string | null>(
    initialState.lyrics_path,
  );
  const [repeat_state, set_repeat_state] = useState<string>(
    initialState.repeat_state,
  );
  const [shuffle_state, set_shuffle_state] = useState<boolean>(
    initialState.shuffle_state,
  );
  // genius lyrics state
  const [lyrics, setLyrics] = useState<string | null>(initialState.lyrics);
  const [showLyrics, setShowLyrics] = useState<boolean>(
    initialState.showLyrics,
  );
  // progress percent (computed value)
  const progress_percent = useMemo(() => {
    let progress: number | undefined;
    if (songItem && progress_ms) {
      progress = Math.round((progress_ms * 100) / songItem.duration_ms);
    } else {
      progress = 0;
    }
    return progress;
  }, [progress_ms]);

  // album image src (coputed value)
  const albumImageSrc = useMemo(() => {
    let src: string | undefined;
    try {
      src = songItem.album.images[1].url;
    } catch {
      src = undefined;
    }
    return src;
  }, [songItemId]);

  // snackbar
  const [feedback, setFeedback] = useState({
    type: 'info',
    message: 'Default Message',
    open: false,
  });

  // ---------
  // helper methods
  // ---------

  // get hash from current url
  const getHash = useCallback(() => {
    const hash = window.location.hash
      .substring(1)
      .split('&')
      .reduce((acc, cv) => {
        if (cv) {
          const [key, value] = cv.split('=');
          acc[key] = decodeURIComponent(value);
        }
        return acc;
      }, {});
    window.location.hash = '';
    return hash;
  }, []);

  // get spotify token
  const getToken = useCallback((): void => {
    // use access token from ls (if exists)
    const lsToken: string | null = storage.getItem('spotify_token');
    if (lsToken) {
      setSpotifyToken(lsToken);
      return;
    }
    // get from hash
    const hash: any = getHash();
    const { access_token } = hash;
    if (access_token) {
      // set and save token
      setSpotifyToken(access_token);
      storage.setItem('spotify_token', access_token);
    }
  }, []);

  // reset song, lyrics, and player state
  const resetState = useCallback((): void => {
    setLyrics(initialState.lyrics);
    setSongItem(initialState.songItem);
    setSongItemId(initialState.songItemId);
    set_is_playing(initialState.is_playing);
    set_progress_ms(initialState.progress_ms);
    set_lyrics_path(initialState.lyrics_path);
  }, []);

  // get currently playing song from spotify api
  const getCurrentlyPlaying = useCallback(async (): Promise<void> => {
    // only execute if spotifyToken
    if (spotifyToken) {
      const headers = {
        Authorization: `Bearer ${spotifyToken}`,
      };
      try {
        // make request
        const response = await axios({
          method: 'get',
          url: 'https://api.spotify.com/v1/me/player',
          headers,
        });
        const {
          item: newItem,
          is_playing: new_is_playing,
          progress_ms: new_progress_ms,
          shuffle_state: new_shuffle_state,
          repeat_state: new_repeat_state,
        } = response.data;
        // set state initially
        if (!songItem && newItem) {
          setSongItem(newItem);
          setSongItemId(newItem.id);
          set_is_playing(new_is_playing);
          set_progress_ms(new_progress_ms);
          set_shuffle_state(new_shuffle_state);
          set_repeat_state(new_repeat_state);
        }
        // determine when state needs updating
        if (songItem && newItem) {
          // only update if necessary
          if (songItem.name !== newItem.name) set_is_playing(new_is_playing);
          if (progress_ms !== new_progress_ms) set_progress_ms(new_progress_ms);
          if (shuffle_state !== new_shuffle_state)
            set_shuffle_state(new_shuffle_state);
          if (repeat_state !== new_repeat_state)
            set_repeat_state(new_repeat_state);
          if (songItem.name !== newItem.name) {
            setSongItem(newItem);
            setSongItemId(newItem.id);
          }
        }
      } catch (err) {
        console.log(err);
        if (err.response && err.response.status === 401) {
          // bad token
          setSpotifyToken(null);
          storage.removeItem('spotify_token');
        }
        setFeedback({
          type: 'error',
          message: 'Could not get currently playing',
          open: true,
        });
        resetState();
        return;
      }
    }
  }, [spotifyToken, songItem, shuffle_state, repeat_state]);

  // return next repeat state in cycle
  const nextRepeatState = useCallback((state: string): string => {
    let newState: string | undefined;
    switch (state) {
      case 'off':
        newState = 'context';
        break;
      case 'context':
        newState = 'track';
        break;
      case 'track':
        newState = 'off';
        break;
      default:
        newState = 'off';
    }
    return newState;
  }, []);

  // make playback request to spotify api
  const sendSpotifyPlaybackRequest = useCallback(
    async (action: string): Promise<void> => {
      // request
      if (spotifyToken) {
        // action
        let method: Method | undefined, url: string | undefined, query: any;
        switch (action) {
          case 'play':
            method = 'put';
            url = 'https://api.spotify.com/v1/me/player/play';
            break;
          case 'pause':
            method = 'put';
            url = 'https://api.spotify.com/v1/me/player/pause';
            break;
          case 'next':
            method = 'post';
            url = 'https://api.spotify.com/v1/me/player/next';
            break;
          case 'previous':
            method = 'post';
            url = 'https://api.spotify.com/v1/me/player/previous';
            break;
          case 'shuffle':
            method = 'put';
            url = 'https://api.spotify.com/v1/me/player/shuffle';
            query = { state: !shuffle_state };
            break;
          case 'repeat':
            method = 'put';
            url = 'https://api.spotify.com/v1/me/player/repeat';
            query = { state: nextRepeatState(repeat_state) };
            break;
          default:
            console.log('No matching action');
        }

        // headers
        let headers = {
          Authorization: `Bearer ${spotifyToken}`,
        };
        // request
        if (method && url) {
          // playback action
          const axiosConfig: AxiosRequestConfig = {
            method,
            url,
            headers,
          };
          if (query) {
            const axiosQS = qs.stringify(query);
            axiosConfig.url = `${url}?${axiosQS}`;
          }
          // add data if applicable
          try {
            await axios(axiosConfig);
            // get song data
            await getCurrentlyPlaying();
            // toggle set_is_playing
            if (['play', 'pause'].includes(action)) {
              set_is_playing(!is_playing);
            }
          } catch (err) {
            setFeedback({
              type: 'error',
              message: 'Action unavailable',
              open: true,
            });
          }
        }
      }
    },
    [spotifyToken, shuffle_state, repeat_state, is_playing],
  );

  // get lyrics path from genius api (using song information from spotify)
  const getLyricsPath = useCallback(async () => {
    if (songItem) {
      try {
        // query
        const songName: string = removeSpecialCharacters(songItem.name);
        const artistName: string = removeSpecialCharacters(
          songItem.artists[0].name,
        );
        const query: string = qs.stringify({
          songName,
          artistName,
        });
        // url
        const url: string = `/api/genius/lyrics-path?${query}`;
        // headers
        const token: string = await authState.currentUser.getIdToken();
        const { uid } = authState.currentUser;
        const headers = { token, uid };
        // request
        const response = await axios({
          method: 'get',
          url,
          headers,
        });
        const { song } = response.data;
        const { id, path } = song;
        // check if path is valid (genius sometimes returns bad URLs)
        const validLyricPath: boolean = validateLyricPath(
          path,
          songName,
          artistName,
        );
        if (!validLyricPath) throw new Error();
        set_lyrics_path(path);
      } catch (err) {
        console.log(err);
        if (showLyrics) {
          setFeedback({
            type: 'info',
            message: 'Could not get lyrics from Genius',
            open: true,
          });
        }
        set_lyrics_path(initialState.lyrics_path);
      }
    }
  }, [songItem, showLyrics]);

  // get lyrics for current playing song
  const getLyrics = useCallback(async () => {
    if (songItem && lyrics_path) {
      try {
        // query
        const query = qs.stringify({
          lyrics_path,
        });
        // url
        const url: string = `/api/genius/lyrics?${query}`;
        // headers
        const token: string = await authState.currentUser.getIdToken();
        const { uid } = authState.currentUser;
        const headers = { token, uid };
        // request
        const response = await axios({
          method: 'get',
          url,
          headers,
        });
        const { lyrics } = response.data;
        setLyrics(lyrics);
      } catch (err) {
        console.log(err);
        if (showLyrics) {
          setFeedback({
            type: 'info',
            message: 'Could not get lyrics from Genius',
            open: true,
          });
        }
      }
    } else {
      setLyrics(initialState.lyrics);
    }
  }, [songItem, lyrics_path, showLyrics]);

  // ---------
  // useEffect
  // ---------

  // get spotify token
  useEffect(() => {
    getToken();
  }, []);

  // get currently playing (manually the first time, useInterval after)
  useEffect(() => {
    getCurrentlyPlaying();
  }, []);

  useInterval(() => {
    // https://overreacted.io/making-setinterval-declarative-with-react-hooks/
    getCurrentlyPlaying();
  }, 2000);

  // get lyrics_path when spotify song id changes (getCurrentlyPlaying will set)
  useEffect(() => {
    (async () => {
      await getLyricsPath();
    })();
  }, [songItemId]);

  // get lyrics when lyrics_path changes
  useEffect(() => {
    (async () => {
      await getLyrics();
    })();
  }, [lyrics_path]);

  // ---------
  // event handlers
  // ---------

  const handleCloseSnackbar = () => {
    setFeedback({
      ...feedback,
      open: false,
    });
  };

  // ---------
  // jsx
  // ---------

  return (
    <Box>
      {/* no token */}
      {!spotifyToken && <AuthorizeSpotify />}
      {/* nothing playing */}
      {spotifyToken && !songItem && <NothingPlaying />}
      {/* player */}
      {spotifyToken && songItem && (
        <Player
          songItem={songItem}
          songItemId={songItemId}
          is_playing={is_playing}
          lyrics={lyrics}
          progress_percent={progress_percent}
          sendSpotifyPlaybackRequest={sendSpotifyPlaybackRequest}
          shuffle_state={shuffle_state}
          repeat_state={repeat_state}
          showLyrics={showLyrics}
          setShowLyrics={setShowLyrics}
          albumImageSrc={albumImageSrc}
        />
      )}
      {/* feedback */}
      <CustomSnackbar
        message={feedback.message}
        type={feedback.type}
        open={feedback.open}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
};

export default PrivateRoute(Landing);
