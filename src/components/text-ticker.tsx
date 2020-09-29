import Ticker from 'react-ticker';

interface Props {
  text: string;
  threshold?: number;
  [propName: string]: any;
}

const TextTicker: React.FC<Props> = ({
  text,
  threshold = 20,
}: Props): JSX.Element => (
  <>
    {text.length > threshold ? (
      <Ticker speed={3} mode="await">
        {() => text}
      </Ticker>
    ) : (
      text
    )}
  </>
);

export default TextTicker;
