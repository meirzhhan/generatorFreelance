import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Diagram from './Diagram/Diagram';
import Info from './Info/Info';
import {
  connectionFunc,
  generatorEnergy,
  generators,
} from './connection/connectionFunc';
import { dots } from './Dots/Dots';
import GeneratorsInfo from './GeneratorsInfo/Generators';

interface Info {
  consumer: number; // Потребитель
  generator: number; // Генератор
  loss: number; // Потери
  road: string; // путь до потребителя, Пример: [3, 5, 7]
  requested: string; // запрошенное количество
}

export type InfoDataType = Info[];

function App() {
  const [connectionData, setConnectionData] = useState<InfoDataType>([]); // Возвращаемые Данные
  const [value, setValue] = useState(''); // Значение инпута
  const [isInputVisible, setIsInputVisible] = useState(false); // Видимость инпута
  const [selectedDot, setSelectedDot] = useState(0); // Выбранный потребитель
  const [totalAvailableEnergy, setTotalAvailableEnergy] = useState<number>(0);
  const [generatorsEnergy, setGeneratorsEnergy] = useState<{
    [key: number]: number;
  }>(generatorEnergy);

  const initConnections = useCallback((id: number, consumption: number) => {
    const { data, totalAvailableEnergy, generatorEnergy } = connectionFunc(
      id,
      consumption,
    );
    if (data) {
      setConnectionData(data);
      setTotalAvailableEnergy(totalAvailableEnergy);
      setGeneratorsEnergy(generatorEnergy);
    }
  }, []);

  useEffect(() => {
    dots.map((dot) => {
      if (dot.consumption && dot.consumption > 0) {
        initConnections(dot.id, dot.consumption);
      }
    });
  }, []);

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
      const { data, totalAvailableEnergy, generatorEnergy } = connectionFunc(
        selectedDot,
        requestedEnergy,
      );

      if (data) {
        setConnectionData(data);
        setTotalAvailableEnergy(totalAvailableEnergy);
        setGeneratorsEnergy(generatorEnergy);
      }
      setIsInputVisible(false);
    }
  };
  console.log(connectionData);

  return (
    <div className="App">
      <GeneratorsInfo
        generatorsEnergy={generatorsEnergy}
        totalEnergy={totalAvailableEnergy}
      />
      <Diagram onClickDot={onClickDot} />
      <Info
        infoData={connectionData}
        onClickButton={connect}
        isInputVisible={isInputVisible}
        onChange={onChangeInput}
        value={value}
        selectedConsumer={selectedDot}
      />
    </div>
  );
}

export default App;
