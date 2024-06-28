import { useState } from 'react';
import './App.css';
import Diagram from './Logic/Diagram';
import Info from './Info/Info';
import { xd } from './Logic/connectionFunc';

interface Info {
  consumer: number; // Потребитель
  generator: number; // Генератор
  loss: number; // Потери
  road: string; //
  requested: string;
}

export type InfoDataType = Info[];

function App() {
  const [data, setData] = useState<InfoDataType>([]); // Данные
  const [value, setValue] = useState(''); // Значение инпута
  const [isInputVisible, setIsInputVisible] = useState(false); // Видимость инпута
  const [selectedDot, setSelectedDot] = useState(0); // Выбранный потребитель

  // Функция для изменения инпута
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // функция для открытия инпута и установления выбранного потребителя
  const onClickDot = (id: number) => {
    setSelectedDot(id);
    setIsInputVisible(true);
  };

  // Функция для подключения
  const connect = () => {
    if (selectedDot) {
      const { generator, loss, road } = xd(selectedDot);
      const updatedInfo = [
        ...data,
        {
          consumer: selectedDot,
          generator,
          loss,
          road: road.join(' -> '),
          requested: value,
        },
      ];
      setData(updatedInfo);

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
