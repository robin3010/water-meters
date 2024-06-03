import { IMeterNodeWithIndex } from 'store/types/types';
import './Meter.css';
import { observer } from 'mobx-react-lite';
import { useAreas } from 'store/lib/useStore';
import { getFullAddressStr, prepareData } from './lib/utils';

const Meter: React.FC<IMeterNodeWithIndex> = observer(
  ({ index, remove, ...meter }) => {
    const {
      area: { id },
      _type,
      initial_values,
      installation_date,
      description,
      is_automatic,
    } = prepareData(meter);

    const { results } = useAreas();

    return (
      <div className="meter">
        <div className="meter-index">{index}</div>
        <div className="meter-type">{_type}</div>
        <div className="meter-date">{installation_date}</div>
        <div className="meter-auto">{is_automatic}</div>
        <div className="meter-values">{initial_values}</div>
        <div className="meter-addr">{getFullAddressStr(results, id)}</div>
        <div className="meter-desc">{description}</div>
        <div className="meter-trash">
          <button
            type="button"
            className="trash-btn"
            aria-label="Удалить"
            onClick={remove}
          />
        </div>
      </div>
    );
  }
);

export default Meter;
