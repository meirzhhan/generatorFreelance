import { useEffect, useState } from 'react';

// Компоненты
import GeneratorsInfo from './GeneratorsInfo/Generators';
import Map from './Diagram/Map'; // Импорт компонента Map
import ConnectionsInfo from './Info/Info';
import TransactionsInfo, {
  Transactions,
} from './TransactionsInfo/TransactionsInfo'; // импорт компонента и типа Transactions

import {
  connectionFunc,
  generatorEnergy,
  generators,
  getTransfersForConsumer,
} from './connection/connectionFunc'; // Импорт функций и данных из connectionFunc

import { dots } from './Dots/Dots'; // Импорт массива точек dots
import './App.css'; // Импорт стилей из App.css

// Типы для возвращаемых данных результата функции connectionFunc
export interface Info {
  consumer: number; // Потребитель ID
  generator: number; // Генератор ID
  loss: number; // Общие потери от генератора к потребителю
  road: string; // Путь до потребителя от генератора(массив), Пример [3, 5, 7, 2]
  requested: string; // запрошенное количество энергии
}
export type InfoDataType = Info[];

function App() {
  const [connectionData, setConnectionData] = useState<InfoDataType>([]); // Состояние возвращаемых данных. Тип выше
  const [inputValue, setInputValue] = useState(''); // Состояние для значения инпута
  const [isInputVisible, setIsInputVisible] = useState(false); // Состояние для видимости инпута
  const [selectedDot, setSelectedDot] = useState(0); // Состояние для выбранного ID потребителя
  const [totalAvailableEnergy, setTotalAvailableEnergy] = useState<number>(0); // Состояние общей доступной энергии
  const [generatorsEnergy, setGeneratorsEnergy] = useState<{
    [key: number]: number; // Объект, где ключ - ID генератора, значение - доступная энергия
  }>(generatorEnergy);
  const [transactionsData, setTransactionsData] = useState<Transactions>([]); // Данные о транзакциях

  // Инициализация данных при загрузке компонента
  useEffect(() => {
    const init = async () => {
      // Цикл проходит по каждым точкам (потребители или генераторы)
      for (const dot of dots) {
        // Если требуемая энергия выше нуля
        if (dot.consumption > 0) {
          await connect(true, dot.id, dot.consumption); // Передает в функцию true(инициализация), id, кол-во
          await new Promise((resolve) => setTimeout(resolve, 250)); // Задержка 250 мс между подключениями
        }
      }
    };

    init();
  }, []);

  // Функция для изменения инпута
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Функция для открытия инпута и установления ID выбранного потребителя
  const onClickDot = async (id: number) => {
    if (!generators.includes(id)) {
      setSelectedDot(id); // Установка выбранного потребителя в состояние
      setIsInputVisible(true); // Видимость инпута => true

      setTransactionsData([]); // Сброс состояния для данных транзакций

      let transfers;
      transfers = [];
      transfers = await getTransfersForConsumer(id); // Получение транзакций для выбранного ID потребителя

      if (transfers) {
        setTransactionsData(transfers); // Установка данных о транзакциях если они есть
      }
    }
  };

  // Функция обертка для подключения, которая прокидывает данные для функции connectionFunc
  const connect = async (
    isInit: boolean, // Флаг инициализации. Если true - инициализация, false - ручное подключение
    consumerId?: number, // ID потребителя
    consumption?: number, // Запрашиваемое кол-во энергии
  ) => {
    // Если в inputValue есть число и если это ручное подключение(false)
    if (inputValue && isInit === false) {
      const requestedEnergy = Number(inputValue); // string в number

      // Вызов функции connectionFunc с передачей ID, запрашиваемое кол-во. Функция возвращает данные о подключении, общее доступное кол-во энергии, доступная энергия у генов
      const { data, totalAvailableEnergy, generatorEnergy } =
        await connectionFunc(selectedDot, requestedEnergy);

      if (data) {
        setConnectionData(data); // Установка данных о подключении в состояние
        setTotalAvailableEnergy(totalAvailableEnergy); // Установка общей доступной энергии в состояние
        setGeneratorsEnergy(generatorEnergy); // Установка данных о доступной энергии у генераторов в состояние
      }
      setIsInputVisible(false); // Скрытие инпута после подключения
    }

    // Если это инициализация
    if (isInit === true && consumerId && consumption) {
      // Вызов функции connectionFunc с передачей ID, запрашиваемое кол-во. Функция возвращает данные о подключении, общее доступное кол-во энергии, доступная энергия у генов
      const { data, totalAvailableEnergy, generatorEnergy } =
        await connectionFunc(consumerId, consumption);

      if (data) {
        setConnectionData(data); // Установка данных о подключении в состояние
        setTotalAvailableEnergy(totalAvailableEnergy); // Установка общей доступной энергии в состояние
        setGeneratorsEnergy(generatorEnergy); // Установка данных о доступной энергии у генераторов в состояние
      }
    }
  };

  return (
    <div className="App">
      <GeneratorsInfo
        generatorsEnergy={generatorsEnergy}
        totalEnergy={totalAvailableEnergy}
      />

      <Map onClickDot={onClickDot} />

      <ConnectionsInfo
        infoData={connectionData}
        onClickButton={connect}
        isInputVisible={isInputVisible}
        onChange={onChangeInput}
        value={inputValue}
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
