import { edges } from '../connection/connectionFunc'; // Импорт массива ребер из connectionFunc.ts
import Dots, { scaledDots } from '../Dots/Dots'; // Импорт компонента Dots и массива масштабированных точек из Dots.ts
import Arrows from '../Arrows/Arrows'; // Импорт arrows из Arrows.ts

interface MapProps {
  onClickDot: (id: number) => void; // Функция, вызывается при клике на точку(узел)
}

const Map = ({ onClickDot }: MapProps) => {
  return (
    <svg
      width="850" // Ширина Карты
      height="750" // Высота Карты
      preserveAspectRatio="xMidYMid meet"
      className="Diagram"
    >
      {/* Отображение всех стрелок  */}
      {edges.map((arrow, index) => (
        <Arrows arrow={arrow} key={index} /> // Компонент Arrows для каждой стрелки
      ))}

      {/* Отображение всех точек */}
      {scaledDots.map((dot, index) => (
        <Dots key={index} onClickDot={onClickDot} dot={dot} /> // Компонент Dots для каждой точки
      ))}
    </svg>
  );
};

export default Map;
