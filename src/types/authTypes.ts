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

export interface FetchSignUpInfoTypes {
  joinRequest: SignupInfoTypes;
  imgFile: string;
}

export interface FetchSignInInfoTypes {
  email: string;
  password: string;
}
