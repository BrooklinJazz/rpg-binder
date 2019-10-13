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

export interface INpcInput {
  name: string;
  description?: string;
}

export interface INpc extends INpcInput {
  _id: string;
}

export interface ICampaignInput {
  name: string;
  description?: string;
}

export interface ICampaign extends ICampaignInput {
  _id: string;
  npcs: INpc[];
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
