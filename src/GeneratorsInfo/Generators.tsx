interface GeneratorsInfoProps {
  generatorsEnergy: { [key: number]: number }; // Объект с энергией каждого генератора. Пример: 1 = 230, 2 = 300
  totalEnergy: number; // Общее количество доступной энергии
}

const GeneratorsInfo = ({
  generatorsEnergy,
  totalEnergy,
}: GeneratorsInfoProps) => {
  // Преобразование объекта `generatorsEnergy` в массив [ключ, значение], [], ...
  const generators = Object.entries(generatorsEnergy);

  return (
    <div className="generatorsInfo">
      {generators.map(([generatorNumber, energy]) => (
        <p key={generatorNumber}>
          Генератор <span>{generatorNumber}</span>: {energy.toFixed(2)}
        </p>
      ))}
      <p style={{ borderTop: '1px solid white' }}>
        Доступно: {totalEnergy.toFixed(2)}
      </p>
    </div>
  );
};

export default GeneratorsInfo;
