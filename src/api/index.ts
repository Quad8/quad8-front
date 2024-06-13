export const checkEmailDuplication = async (emailValue: string) => {
  const url = `http://43.201.71.50:8080/api/v1/users/check/email?email=${emailValue}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
};

export const checkNicknameDuplication = async (nickname: string) => {
  const url = `http://43.201.71.50:8080/api/v1/users/check/nickname?nickname=${nickname}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
};
