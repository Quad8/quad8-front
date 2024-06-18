export interface SignupInfoTypes {
  email: string;
  password: string;
  birth: string;
  phone: number | string;
  gender: string;
  nickname: string;
  imgUrl: string;
  provider?: string;
  providerId?: string;
}

export interface FetchSignupInfoTypes {
  joinRequest: SignupInfoTypes;
  imgFile: string;
}

export interface FetchSigninInfoTypes {
  email: string;
  password: string;
}
