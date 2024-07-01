interface GeneratorsInfoProps {
  totalEnergy: number;
  generatorsEnergy: { [key: number]: number };
}

const GeneratorsInfo = ({
  generatorsEnergy,
  totalEnergy,
}: GeneratorsInfoProps) => {
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
