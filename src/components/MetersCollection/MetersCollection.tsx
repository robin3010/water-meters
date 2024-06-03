import Meter from 'components/Meter/Meter';
import { observer } from 'mobx-react-lite';
import { useMeters } from 'store/lib/useStore';

const MetersCollection: React.FC = observer(() => {
  const { results } = useMeters();

  if (!results) return null;

  return (
    <>
      {results.map((meter, idx) => (
        <Meter
          {...meter}
          key={meter.id}
          index={idx + 1}
          remove={meter.remove}
        />
      ))}
    </>
  );
});

export default MetersCollection;
