import { useEffect, useState } from 'react';
import './App.css';
import Diagram from './Diagram/Diagram';
import Info from './Info/Info';
import {
  connectionFunc,
  generatorEnergy,
  generators,
  getTransfersForConsumer,
} from './connection/connectionFunc';
import { dots } from './Dots/Dots';
import GeneratorsInfo from './GeneratorsInfo/Generators';
import TransactionsInfo, {
  Transactions,
} from './TransactionsInfo/TransactionsInfo';

export interface Info {
  consumer: number; // Потребитель
  generator: number; // Генератор
  loss: number; // Потери
  road: string; // путь до потребителя от генератора, Пример: [3, 5, 7, 2] = 3 => 5 => 7
  requested: string; // запрошенное количество
}

export type InfoDataType = Info[];

function App() {
  const [connectionData, setConnectionData] = useState<InfoDataType>([]); // Возвращаемые Данные

  const [value, setValue] = useState(''); // Значение инпута
  const [isInputVisible, setIsInputVisible] = useState(false); // Видимость инпута
  const [selectedDot, setSelectedDot] = useState(0); // Выбранный потребитель
  const [totalAvailableEnergy, setTotalAvailableEnergy] = useState<number>(0); // 1000
  const [generatorsEnergy, setGeneratorsEnergy] = useState<{
    [key: number]: number; // 1 = 100
  }>(generatorEnergy);
  const [transactionsData, setTransactionsData] = useState<Transactions>([]);

  // const initConnections = useCallback(
  //   async (consumerId: number, consumption: number) => {
  //     const requestedEnergy = Math.floor(consumption);
  //     try {
  //       const { data, totalAvailableEnergy, generatorEnergy } =
  //         await connectionFunc(consumerId, requestedEnergy);

  //       if (data) {
  //         setConnectionData(data);
  //         setTotalAvailableEnergy(totalAvailableEnergy);
  //         setGeneratorsEnergy(generatorEnergy);
  //       }
  //     } catch (error) {
  //       console.error('Ошибка при инициализации соединений:', error);
  //     }
  //   },
  //   [],
  // );

  //
  useEffect(() => {
    const init = async () => {
      for (const dot of dots) {
        if (dot.consumption && dot.consumption > 0) {
          await connect(true, dot.id, dot.consumption);
          await new Promise((resolve) => setTimeout(resolve, 2500));
        }
      }
    };
    init();
  }, []);

  // Функция для изменения инпута
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // Функция для открытия инпута и установления выбранного потребителя
  const onClickDot = async (id: number) => {
    if (!generators.includes(id)) {
      setSelectedDot(id);
      setIsInputVisible(true);

      // Сброс текущих данных транзакций
      setTransactionsData([]);

      let transfers;
      transfers = [];

      transfers = await getTransfersForConsumer(id);
      if (transfers) {
        setTransactionsData(transfers);
        console.log(JSON.stringify(transfers));
      } else {
        setTransactionsData([]);
      }
    }
  };

  // Функция для подключения
  const connect = async (
    isInit: boolean,
    consumerId?: number,
    consumption?: number,
  ) => {
    if (selectedDot && value && isInit === false) {
      const requestedEnergy = parseFloat(value);
      const { data, totalAvailableEnergy, generatorEnergy } =
        await connectionFunc(selectedDot, requestedEnergy);

      if (data) {
        setConnectionData(data);
        setTotalAvailableEnergy(totalAvailableEnergy);
        setGeneratorsEnergy(generatorEnergy);
      }
      setIsInputVisible(false);
    } else if (isInit === true && consumerId && consumption) {
      const { data, totalAvailableEnergy, generatorEnergy } =
        await connectionFunc(consumerId, consumption);

      if (data) {
        setConnectionData(data);
        setTotalAvailableEnergy(totalAvailableEnergy);
        setGeneratorsEnergy(generatorEnergy);
      }
    }
  };

  // console.log(connectionData);

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

      <TransactionsInfo
        consumer={selectedDot}
        transactions={transactionsData}
      />
    </div>
  );
}

export default App;
