import { arrows } from '../connection/connectionFunc';
import Dots, { scaledDots } from '../Dots/Dots';
import Arrows from '../Arrows/Arrows';

interface DiagramProps {
  onClickDot: (id: number) => void;
}

const Diagram = ({ onClickDot }: DiagramProps) => {
  return (
    <svg
      width="900"
      height="750"
      // viewBox="0 0 650 750"
      preserveAspectRatio="xMidYMid meet"
      className="Diagram"
    >
      {arrows.map((arrow, index) => (
        <Arrows arrow={arrow} key={index} />
      ))}
      {scaledDots.map((dot, index) => (
        <Dots key={index} onClickDot={onClickDot} dot={dot} />
      ))}
    </svg>
  );
};

export default Diagram;
