import React, { useState, useMemo, useEffect } from 'react';
// component imports
import Link from 'next/link';
import { Button, Box, Typography } from '@material-ui/core';
import PaddedPaper from '../padded-paper';
import FlexContainer from '../flex-container';
// config
import {
  authEndpoint,
  clientId,
  redirectUri,
  scopes,
} from '../../config/spotify-config';

const AuthorizeSpotify: React.FC = (): JSX.Element => {
  // spotify auth url (get default from config, update based on 'window')
  const encodedScopes: string = scopes.join('%20');
  const [uri, setUri] = useState<string>(redirectUri);
  useEffect(() => {
    const { protocol, hostname, port } = window.location;
    if (hostname === 'localhost') {
      const updatedUri: string = `${protocol}//${hostname}:${port}/`;
      console.log(updatedUri);
      setUri(updatedUri);
    }
  }, []);
  const spotifyAuthURL: string = useMemo(() => {
    return `${authEndpoint}?client_id=${clientId}&redirect_uri=${uri}&scope=${encodedScopes}&response_type=token&show_dialog=false`;
  }, [uri]);

  // jsx
  return (
    <FlexContainer>
      <PaddedPaper elevation={3}>
        <Box
          minHeight="150px"
          width="300px"
          display="flex"
          flexDirection="column"
          justifyContent="space-evenly"
        >
          <Typography
            align="center"
            color="inherit"
            display="block"
            variant="h5"
          >
            Please authenticate with Spotify and authorize this app.
          </Typography>
          <div>
            <Link href={spotifyAuthURL}>
              <Button
                variant="outlined" // contained, outlined, text
                color="default" // primary, secondary, default
                href={spotifyAuthURL}
              >
                Login
              </Button>
            </Link>
          </div>
        </Box>
      </PaddedPaper>
    </FlexContainer>
  );
};

export default AuthorizeSpotify;
