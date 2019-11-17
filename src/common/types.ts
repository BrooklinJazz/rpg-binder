export interface IAuthInput {
  email: string;
  password: string;
}
export type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

export type Enhancer<T> = {
  data: T;
};

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

export interface IStatBlock {
  TODO: string;
}

export interface INpcInput {
  name: string;
  description?: string;
  details?: string;
  statblock?: IStatBlock;
  avatar?: string;
}
export interface IUpdateNpcInput extends INpcInput {
  id: string;
}

export interface INpc extends INpcInput {
  _id: string;
}

export interface ICampaignInput {
  name: string;
}

export interface ICampaign extends ICampaignInput {
  _id: string;
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
