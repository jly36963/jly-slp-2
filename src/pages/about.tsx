import React from 'react';
import { Typography } from '@material-ui/core';
import FlexContainer from '../components/flex-container';
import PaddedPaper from '../components/padded-paper';

const About: React.FC = (): JSX.Element => {
  return (
    <FlexContainer>
      <PaddedPaper elevation={3}>
        <Typography variant="h3" align="center" display="block">
          About this site
        </Typography>
        <Typography variant="h5" align="center" display="block">
          Quick app written with React, Next.js, MaterialUI, Express, and D3.
        </Typography>
      </PaddedPaper>
    </FlexContainer>
  );
};

export default About;
