import StarIcon from '@/public/svgs/star.svg';

interface StarProps {
  checked: boolean;
  onClick?: () => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  isEditable?: boolean;
}

export default function Star({ checked, onClick, onMouseOver, onMouseOut, isEditable }: StarProps) {
  return (
    <StarIcon
      style={{
        color: checked ? '#F15252' : '#E4E4E4',
        cursor: isEditable ? 'pointer' : 'default',
      }}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    />
  );
}
