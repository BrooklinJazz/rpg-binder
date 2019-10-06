export interface IAuthInput {
  email: string;
  password: string;
}

export interface ISignUpRetval {
  _id: string;
  email: string;
}

export interface IDecodedToken {
  userId: string;
  email: string;
  exp: number;
  iat: number;
}

export interface INPCInput {
  name: string;
  description?: string;
}

export interface INPC extends INPCInput {
  _id: string;
}

export interface ICampaignInput {
  name: string;
  description?: string;
}

export interface ICampaign extends ICampaignInput {
  _id: string;
  npcs: INPC[];
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
