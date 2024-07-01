export interface Dot {
  id: number;
  x: number;
  y: number;
  role?: boolean;
}

interface DotsProps {
  dot: Dot;
  onClickDot: (id: number) => void;
}

//  Координаты расположений, и роль (true = генератор)
const dots: Dot[] = [
  { id: 1, x: 823, y: 10, role: true },
  { id: 2, x: 243, y: 10, role: true },
  { id: 3, x: 150, y: 130, role: true },
  { id: 4, x: 155, y: 210 },
  { id: 5, x: 175, y: 270 },
  { id: 6, x: 20, y: 480, role: true },
  { id: 7, x: 70, y: 900 },
  { id: 8, x: 250, y: 1410, role: true },
  { id: 9, x: 600, y: 1410, role: true },
  { id: 10, x: 970, y: 1025 },
  { id: 11, x: 760, y: 1155 },
  { id: 12, x: 920, y: 270, role: true },
  { id: 13, x: 850, y: 250 },
  { id: 14, x: 550, y: 210 },
  { id: 15, x: 550, y: 50 },
  { id: 16, x: 850, y: 155, role: true },
  { id: 17, x: 890, y: 100 },
  { id: 18, x: 130, y: 345 },
  { id: 19, x: 250, y: 300 },
  { id: 20, x: 280, y: 400 },
  { id: 21, x: 350, y: 350 },
  { id: 22, x: 380, y: 500 },
  { id: 23, x: 350, y: 660 },
  { id: 24, x: 300, y: 755 },
  { id: 25, x: 405, y: 845 },
  { id: 26, x: 150, y: 480 },
  { id: 27, x: 135, y: 585 },
  { id: 28, x: 140, y: 660 },
  { id: 29, x: 170, y: 755 },
  { id: 30, x: 450, y: 950 },
  { id: 31, x: 500, y: 1000 },
  { id: 32, x: 600, y: 1100 },
  { id: 33, x: 800, y: 1100 },
  { id: 34, x: 650, y: 940 },
  { id: 35, x: 600, y: 800 },
  { id: 36, x: 500, y: 700 },
  { id: 37, x: 560, y: 480 },
  { id: 38, x: 550, y: 350 },
  { id: 39, x: 660, y: 560 },
  { id: 40, x: 820, y: 850 },
  { id: 41, x: 900, y: 1300 },
  { id: 42, x: 840, y: 960 },
  { id: 43, x: 800, y: 1400 },
  { id: 44, x: 435, y: 270 },
  { id: 45, x: 435, y: 210 },
  { id: 46, x: 570, y: 270 },
  { id: 47, x: 650, y: 300 },
  { id: 48, x: 670, y: 450 },
  { id: 49, x: 750, y: 400 },
  { id: 50, x: 925, y: 900 },
  { id: 51, x: 920, y: 1000 },
  { id: 52, x: 200, y: 900 },
  { id: 53, x: 250, y: 1000 },
  { id: 54, x: 380, y: 1050 },
  { id: 55, x: 430, y: 1200 },
  { id: 56, x: 900, y: 650 },
  { id: 57, x: 650, y: 700 },
  { id: 58, x: 600, y: 1250 },
];

//  Функция для размещения точек
const scaleCoordinates = (
  dots: Dot[],
  width: number,
  height: number,
): Dot[] => {
  const minX = Math.min(...dots.map((dot) => dot.x)) - 15;
  const maxX = Math.max(...dots.map((dot) => dot.x)) + 35;
  const minY = Math.min(...dots.map((dot) => dot.y)) - 30;
  const maxY = Math.max(...dots.map((dot) => dot.y)) + 30;

  return dots.map((dot) => ({
    ...dot,
    x: ((dot.x - minX) / (maxX - minX)) * width,
    y: ((dot.y - minY) / (maxY - minY)) * height,
  }));
};

export const scaledDots = scaleCoordinates(dots, 900, 750);

const Dots = (props: DotsProps) => {
  const {
    dot: { id, x, y, role },
    onClickDot,
  } = props;

  return (
    <g key={id}>
      <circle
        cx={x}
        cy={y}
        r={10}
        fill={role === true ? 'red' : 'blue'}
        style={role ? {} : { cursor: 'pointer' }}
        onClick={() => onClickDot(id)}
      />
      <text x={x + 12} y={y + 4} fontSize="15" fontWeight={700} fill="black">
        {id}
      </text>
    </g>
  );
};

export default Dots;
