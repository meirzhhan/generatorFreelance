import React from 'react';
import { InfoDataType } from '../App';

interface InfoProps {
  infoData: InfoDataType;
  isInputVisible: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickButton: () => void;
}

const Info = (props: InfoProps) => {
  const { isInputVisible, value, onChange, onClickButton, infoData } = props;
  return (
    <div className="InfoWrapper">
      <div className="inputButtonWrapper">
        <input
          className={isInputVisible ? 'inputButton' : 'inputButton disable'}
          type="number"
          value={value}
          onChange={onChange}
          placeholder="Введите количество"
        />
        <button
          className={isInputVisible ? 'inputButton' : 'inputButton disable'}
          onClick={onClickButton}
        >
          Запросить
        </button>
      </div>

      <div className="infoItems" style={{ marginTop: 15 }}>
        {infoData.map((item, index) => (
          <div className="infoItem">
            <p key={index}>
              Получатель: <span className="consumer">{item.consumer}</span> |{' '}
              Генератор: <span className="generator">{item.generator}</span> |
              Потери: {item.loss.toFixed(2)}
            </p>
            <p key={index}>Путь от генератора: {item.road}</p>
            <p>
              запрошенное количество: {item.requested} | Итого:{' '}
              {Number(item.requested) + item.loss}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Info;
