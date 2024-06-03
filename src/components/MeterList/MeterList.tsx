import './MeterList.css';
import MeterListTitle from 'components/MeterListTitle/MeterListTitle';
import MetersCollection from 'components/MetersCollection/MetersCollection';
import { observer } from 'mobx-react-lite';
import MeterListPagination from 'components/MeterListPagination/MeterListPagination';

const MeterList: React.FC = observer(() => {
  return (
    <div className="main-container">
      <MeterListTitle />
      <div className="meters-list">
        <MetersCollection />
      </div>
      <MeterListPagination />
    </div>
  );
});

export default MeterList;
