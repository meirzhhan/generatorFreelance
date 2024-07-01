import { useState } from 'react';
import './App.css';
import Diagram from './Diagram/Diagram';
import Info from './Info/Info';
import { connectionFunc, generators } from './connection/connectionFunc';

interface Info {
  consumer: number; // Потребитель
  generator: number; // Генератор
  loss: number; // Потери
  road: string; // путь до потребителя, Пример: [3, 5, 7]
  requested: string; // запрошенное количество
}

export type InfoDataType = Info[];

function App() {
  const [data, setData] = useState<InfoDataType>([]); // Возвращаемые Данные
  const [value, setValue] = useState(''); // Значение инпута
  const [isInputVisible, setIsInputVisible] = useState(false); // Видимость инпута
  const [selectedDot, setSelectedDot] = useState(0); // Выбранный потребитель

  // Функция для изменения инпута
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // функция для открытия инпута и установления выбранного потребителя
  const onClickDot = (id: number) => {
    if (!generators.includes(id)) {
      setSelectedDot(id);
      setIsInputVisible(true);
    }
  };

  // Функция для подключения
  const connect = () => {
    if (selectedDot && value) {
      const requestedEnergy = parseFloat(value);
      let connectionResult = connectionFunc(selectedDot, requestedEnergy);

      // Проверка если генератор не найден
      // if (connectionResult.generator === -1) {
      //   alert('Не хватает энергии для удовлетворения запроса.');
      //   setIsInputVisible(false);
      //   return;
      // }

      const { data } = connectionResult;
      data && setData(data);
      setIsInputVisible(false);
    }
  };

  return (
    <div className="App">
      <Diagram onClickDot={onClickDot} />
      <Info
        infoData={data}
        onClickButton={connect}
        isInputVisible={isInputVisible}
        onChange={onChangeInput}
        value={value}
      />
    </div>
  );
}

export default App;
