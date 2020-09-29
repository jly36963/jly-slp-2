// imports
import React from 'react';
// components (desktop)
import PlayerWithLyrics from './player-with-lyrics';
import PlayerNoLyrics from './player-no-lyrics';
// components (mobile)
import MobilePlayerWithLyrics from './mobile-player-with-lyrics';
import MobilePlayerNoLyrics from './mobile-player-no-lyrics';

import { useMediaQuery } from 'react-responsive';

interface Props {
  [propName: string]: any;
}

const ReactivePlayer: React.FC<Props> = (props: Props): JSX.Element => {
  const { showLyrics } = props;
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  return (
    <>
      {isMobile ? (
        <>
          {showLyrics ? (
            <MobilePlayerWithLyrics {...props} />
          ) : (
            <MobilePlayerNoLyrics {...props} />
          )}
        </>
      ) : (
        <>
          {showLyrics ? (
            <PlayerWithLyrics {...props} />
          ) : (
            <PlayerNoLyrics {...props} />
          )}
        </>
      )}
    </>
  );
};

export default ReactivePlayer;
