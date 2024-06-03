import { FC, memo } from 'react';

const MeterListTitle: FC = memo(() => {
  return (
    <div className="meter-title-bg">
      <div className="meters-title">
        <div className="meter-index">№</div>
        <div className="meter-type">Тип</div>
        <div className="meter-date">Дата установки</div>
        <div className="meter-auto">Автоматический</div>
        <div className="meter-values">Значение</div>
        <div className="meter-addr">Адреc</div>
        <div className="meter-desc">Примечание</div>
      </div>
    </div>
  );
});

export default MeterListTitle;
