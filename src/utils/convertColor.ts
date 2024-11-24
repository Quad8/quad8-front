const getHueFromRGB = ({ delta, max, r, g, b }: Record<string, number>) => {
  if (delta === 0) {
    return 0;
  }
  if (max === r) {
    const h = Math.round((((g - b) / delta) % 6) * 60);
    return h;
  }

  if (max === g) {
    const h = Math.round(((b - r) / delta + 2) * 60);
    return h;
  }
  const h = Math.round(((r - g) / delta + 4) * 60);
  return h;
};

export const convertHexToHsva = (hexColor: string) => {
  const r = parseInt(hexColor.substring(1, 3), 16) / 255;
  const g = parseInt(hexColor.substring(3, 5), 16) / 255;
  const b = parseInt(hexColor.substring(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  const h = getHueFromRGB({ delta, max, r, g, b });
  const s = max === 0 ? 0 : (delta / max) * 100;
  const v = max * 100;
  const a = 1;

  return { h: h >= 0 ? h : h + 360, s, v, a };
};

export const convertHsvaToHsla = ({ h, s, v, a }: Record<'h' | 's' | 'v' | 'a', number>) => {
  const l = ((2 - s / 100) * v) / 2;
  if (l === 0) {
    return { h, s, l, a };
  }

  if (l === 100) {
    return { h, s: 0, l, a };
  }

  if (l < 50) {
    const ns = s * (v / (l * 0.02));
    return { h, s: ns, l, a };
  }
  const ns = s * (v / 100 / (2 - l * 0.02));
  return { h, s: ns, l, a };
};
