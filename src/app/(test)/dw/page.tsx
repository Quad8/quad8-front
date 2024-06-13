'use client';

import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

export default function Page() {
  const [color, setColor] = useState('#ffffff');

  const handleClickButton = (value: string) => {
    setColor(value);
  };

  return (
    <div>
      <button type='button' onClick={() => setColor('#00aaff')}>
        클릭
      </button>
      <div>{color}</div>
      <HexColorPicker color={color} onChange={handleClickButton} />
    </div>
  );
}
