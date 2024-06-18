export const getRandomOptionProduct = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL}/custom/get/random-option-products`, {
      cache: 'no-store',
    });
    const { data } = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
