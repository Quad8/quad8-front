interface CheckIconProps {
  width?: number;
  height?: number;
  color?: string;
  onClick?: () => void;
}

export default function checkIcon({ width = 25, height = 25, color = '#A5A5A5', onClick }: CheckIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0.5 1 11 8'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      <circle cx='6' cy='5' r='4.1' fill='transparent' stroke-width='0.5' stroke={color} />
      <path
        d='M9.79688 1.2395L4.06445 6.70825L1.20312 3.97388'
        stroke={color}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
        transform='scale(0.4) translate(9, 8.8)'
      />
    </svg>
  );
}
