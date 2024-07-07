import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Diagram from './Diagram/Diagram';
import Info from './Info/Info';
import {
  connectionFunc,
  generatorEnergy,
  generators,
  getTransfersForGenerator,
} from './connection/connectionFunc';
import { dots } from './Dots/Dots';
import GeneratorsInfo from './GeneratorsInfo/Generators';

export interface Info {
  consumer: number; // Потребитель
  generator: number; // Генератор
  loss: number; // Потери
  road: string; // путь до потребителя, Пример: [3, 5, 7]
  requested: string; // запрошенное количество
}

export type InfoDataType = Info[];

const qwerty = [
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0x244B713DaB2bFC7d2D98F5DC6C01d2445cf78873',
    '17',
    '17',
    '170',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '150',
    '150',
    '1500',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0xD52ce2bDf9223f98FEF22E9c0Afd4A9ADc15380A',
    '19',
    '19',
    '190',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0xE0dBFe11F7e9805A868E8605339Cbd10Bc6817B9',
    '3',
    '3',
    '30',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0x1B2cF788f1C62F202a6c9Ab7bB9c50EacD429B32',
    '2',
    '2',
    '20',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0x69DDce1c110439add7178f86090E4e9baA4D34D1',
    '6',
    '6',
    '60',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0xef2CF0433B868D8F2cFd8840A4a077A2A9367CBd',
    '6',
    '6',
    '60',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0xA9242B1C14361068BcCd4ff785Caf84C75Ec0A62',
    '9',
    '9',
    '90',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0x668d5bFD5978c11d19ccb808998Df41A9F2f89f7',
    '4',
    '4',
    '40',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0xF7D6bA152c0E939b6947Ea0e1eEd0F1a843e4D22',
    '17',
    '17',
    '170',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0x40b4C7DB2106279D1615AAc079326b73945e00C0',
    '3',
    '3',
    '30',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0x85f320d1450E5D4fDF5162C381daF89e63642A70',
    '5',
    '5',
    '50',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0x90F3967E862BDf8e9b42a4d870C0DCe00Dca70aA',
    '1',
    '1',
    '10',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0xB1e857ACC2F2b60D2a3B844F66A59dA6aa34EeA7',
    '3',
    '3',
    '30',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0x3170991943c9458042BAFF19e9a06a25d55F9551',
    '6',
    '6',
    '60',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0xfC1AC38f86bd8CA8DE5e1e22EF5006727c3eC18b',
    '14',
    '14',
    '140',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0xBf64F4F37eDFF92FB71a580F78ABbcaBa2D71eE3',
    '6',
    '6',
    '60',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0x7c185834D94787480dedFf15B97DecBaaa89Ee79',
    '7',
    '7',
    '70',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0xEeFA6650c01805e40580bFD1a807D47099e00C72',
    '2',
    '2',
    '20',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0x94A446B83564f97a48dd934Cf09D44a8e8C20ceA',
    '12',
    '12',
    '120',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0x4C7FAb2a60d2E98dEA26e63840b92630570AcCEA',
    '29',
    '29',
    '290',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0x7732886AE9504e34ce4296CBc1A2867881B5dDb3',
    '18',
    '18',
    '180',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0xD715FEDfA0c657f782d9A9CCC7d057066b2ac174',
    '21',
    '21',
    '210',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0x82060a2a09d08c13ff24f2f34e8577121E35888a',
    '18',
    '18',
    '180',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0xFA760Ab01e9F50A30a09d21b91Ff8163740a46B7',
    '4',
    '4',
    '40',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0x63cc76F776a61fE9a90706217324bA48a96c69c4',
    '20',
    '20',
    '200',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0x922A8BD50f8444361004e7061d76bCE6A9E7Fd20',
    '4',
    '4',
    '40',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0xFA2A050D8A3BE85F78Cf403f4507E004e6D57F77',
    '6',
    '6',
    '60',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0xa9C4c0CB024ef3065d0838799b92c40d9Ff7D650',
    '7',
    '7',
    '70',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0x8C509581ea7f041E1C1D146437Db44fb81Ad7987',
    '6',
    '6',
    '60',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0xdA67be33Bc3d5038178cc99b6a7B80BBAef82e9b',
    '6',
    '6',
    '60',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0xCc9B3c7e438bAcBE73d23CD7739F2b586EF48612',
    '10',
    '10',
    '100',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0xBc9E38DCEe22C62769486aDFBF0FA0A9E075E3B0',
    '5',
    '5',
    '50',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0x244B713DaB2bFC7d2D98F5DC6C01d2445cf78873',
    '17',
    '17',
    '170',
  ],
  [
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '0x0d6E734cb22bC2160bf43aca25db3d38c5C7f919',
    '150',
    '150',
    '1500',
  ],
];

function App() {
  const [connectionData, setConnectionData] = useState<InfoDataType>([]); // Возвращаемые Данные
  const [value, setValue] = useState(''); // Значение инпута
  const [isInputVisible, setIsInputVisible] = useState(false); // Видимость инпута
  const [selectedDot, setSelectedDot] = useState(0); // Выбранный потребитель
  const [totalAvailableEnergy, setTotalAvailableEnergy] = useState<number>(0);
  const [generatorsEnergy, setGeneratorsEnergy] = useState<{
    [key: number]: number;
  }>(generatorEnergy);

  const initConnections = useCallback(
    async (id: number, consumption: number) => {
      try {
        const { data, totalAvailableEnergy, generatorEnergy } =
          await connectionFunc(id, consumption);

        if (data) {
          setConnectionData(data);
          setTotalAvailableEnergy(totalAvailableEnergy);
          setGeneratorsEnergy(generatorEnergy);

          // Получение всех трансферов для каждого генератора
          for (const generator of generators) {
            const transfers = await getTransfersForGenerator(generator);
            console.log(
              `Информация о всех трансферах для генератора ${generator}: ${JSON.stringify(
                transfers,
              )}`,
            );
          }
        }
      } catch (error) {
        console.error('Ошибка при инициализации соединений:', error);
      }
    },
    [],
  );

  useEffect(() => {
    const init = async () => {
      for (const dot of dots) {
        if (dot.consumption && dot.consumption > 0) {
          await initConnections(dot.id, dot.consumption);
        }
      }
    };
    init();
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

  // let r: { generator: number; loss: number; gotEnergy: number }[] = [];

  // Функция для подключения
  const connect = async () => {
    if (selectedDot && value) {
      const requestedEnergy = parseFloat(value);
      const { data, totalAvailableEnergy, generatorEnergy } =
        await connectionFunc(selectedDot, requestedEnergy);

      if (data) {
        setConnectionData(data);
        setTotalAvailableEnergy(totalAvailableEnergy);
        setGeneratorsEnergy(generatorEnergy);

        // Получение всех трансферов для выбранного потребителя
        const transfers = await getTransfersForGenerator(selectedDot);
        console.log(
          `Информация о всех трансферах для потребителя: ${selectedDot} => \n ${JSON.stringify(
            transfers,
          )}`,
        );
      }
      setIsInputVisible(false);
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
    </div>
  );
}

export default App;
