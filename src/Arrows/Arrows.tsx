import { scaledDots } from '../Dots/Dots'; // импорт точек (готовые для отрисовки)

interface ArrowsProps {
  arrow: [number, number, number];
}

const Arrows = ({ arrow }: ArrowsProps) => {
  const fromNode = scaledDots.find((dot) => dot.id === arrow[0]);
  const toNode = scaledDots.find((dot) => dot.id === arrow[1]);

  return (
    fromNode &&
    toNode && (
      <line
        x1={fromNode.x}
        y1={fromNode.y}
        x2={toNode.x}
        y2={toNode.y}
        stroke="black"
        markerEnd="url(#arrow)"
      />
    )
  );
};

export default Arrows;
