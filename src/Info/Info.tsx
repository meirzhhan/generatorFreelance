import { InfoDataType } from '../App'; // Импорт типа данных InfoDataType из App.tsx

interface ConnectionInfoProps {
  infoData: InfoDataType; // Массив объектов данных о подключении
  isInputVisible: boolean; // Видимость инпута (true или false)
  value: string; // Значение инпута
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Функция для изменения инпута
  onClickButton: (isInit: boolean) => void; // Функция для обработки клика на кнопку
  selectedConsumer?: number; // Выбранный потребитель (опционально)
}

const ConnectionsInfo = (props: ConnectionInfoProps) => {
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
      {/* Инпут и кнопка подключения */}
      <div className="header">
        <p>
          {
            selectedConsumer
              ? `Потребитель: ${selectedConsumer}` // Отображение выбранного потребителя
              : 'Выберите потребителя' // Сообщение, если потребитель не выбран
          }
        </p>

        <div className="inputButtonWrapper">
          <input
            style={{ width: 135 }}
            className={isInputVisible ? 'inputButton' : 'inputButton disable'}
            type="number"
            value={value}
            onChange={onChange} // Обработчик изменения инпута
            placeholder="Введите количество"
          />
          <button
            style={{ width: 70 }}
            className={isInputVisible ? 'inputButton' : 'inputButton disable'}
            onClick={() => onClickButton(false)} // Обработчик клика на кнопку. false - это ручное подключение
          >
            Получить
          </button>
        </div>
      </div>

      {/* Данные о подключении */}
      <div className="infoItems" style={{ marginTop: 15 }}>
        {/* // Проход по массиву данных и отображение каждого элемента */}
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

export default ConnectionsInfo;
