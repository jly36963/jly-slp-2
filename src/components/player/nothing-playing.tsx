import React from 'react';
// component imports
import { Typography } from '@material-ui/core';
import PaddedPaper from '../padded-paper';
import FlexContainer from '../flex-container';

const NothingPlaying: React.FC = (): JSX.Element => {
  return (
    <FlexContainer>
      <PaddedPaper elevation={3}>
        <Typography variant="h6">Nothing Playing</Typography>
      </PaddedPaper>
    </FlexContainer>
  );
};

export default NothingPlaying;
