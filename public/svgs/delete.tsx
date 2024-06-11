interface DeleteImageIconProps {
  onClick?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  fill?: string;
  width?: number;
  height?: number;
}

function DeleteIcon({ onClick, fill = '#4968F6', width = 20, height = 20 }: DeleteImageIconProps) {
  return (
    <svg onClick={onClick} width={width} height={height} viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M10 8.82208L14.1247 4.69727L15.3032 5.87577L11.1783 10.0006L15.3032 14.1253L14.1247 15.3038L10 11.1791L5.87505 15.3038L4.69653 14.1253L8.82133 10.0006L4.69653 5.87577L5.87505 4.69727L10 8.82208Z'
        fill={fill}
      />
    </svg>
  );
}

export default DeleteIcon;
