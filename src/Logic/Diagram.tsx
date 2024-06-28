import { arrows } from './connectionFunc';
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
      {/* <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="20"
          refY="5"
          markerWidth="10"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="red" />
        </marker>
      </defs> */}

      {arrows.map((arrow, index) => (
        <Arrows arrow={arrow} key={index} />
      ))}
      {scaledDots.map((dot) => (
        <Dots onClickDot={onClickDot} dot={dot} />
      ))}
    </svg>
  );
};

export default Diagram;
