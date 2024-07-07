import React from 'react';
import { InfoDataType } from '../App';

interface InfoProps {
  infoData: InfoDataType;
  isInputVisible: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickButton: () => void;
  selectedConsumer?: number;
}

const Info = (props: InfoProps) => {
  const {
    isInputVisible,
    value,
    onChange,
    onClickButton,
    infoData,
    selectedConsumer,
  } = props;

  return (
    <div className="InfoWrapper">
      <div className="header">
        <p>
          {selectedConsumer
            ? `Потребитель: ${selectedConsumer}`
            : 'Выберите потребителя'}
        </p>

        <div className="inputButtonWrapper">
          <input
            style={{ width: 135 }}
            className={isInputVisible ? 'inputButton' : 'inputButton disable'}
            type="number"
            value={value}
            onChange={onChange}
            placeholder="Введите количество"
          />
          <button
            style={{ width: 70 }}
            className={isInputVisible ? 'inputButton' : 'inputButton disable'}
            onClick={onClickButton}
          >
            Получить
          </button>
        </div>
      </div>
      <div className="infoItems" style={{ marginTop: 15 }}>
        {infoData.map((item, index) => (
          <div key={index} className="infoItem">
            <p>
              Получатель: <span className="consumer">{item.consumer}</span> |{' '}
              Генератор: <span className="generator">{item.generator}</span>
            </p>
            <p>
              Запрошено: {Number(item.requested).toFixed(2)} | Потери:{' '}
              {item.loss.toFixed(2)}
            </p>
            <p>
              Путь:{' '}
              {item.road.length == 1
                ? `${item.road} -> ${item.road}`
                : item.road}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Info;
