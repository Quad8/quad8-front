'use server';

import { getPlaiceholder } from 'plaiceholder';

export const getBlurImage = async (imgSrc: string) => {
  try {
    const buffer = await fetch(imgSrc).then(async (res) => Buffer.from(await res.arrayBuffer()));
    const { base64 } = await getPlaiceholder(buffer);

    return base64;
  } catch (error) {
    throw error;
  }
};

export const getBlurImageList = async (imgSrcList: string[]) => {
  try {
    const promise = imgSrcList.map((url) => getBlurImage(url));
    const base64 = await Promise.all(promise);
    return base64;
  } catch (error) {
    throw error;
  }
};
