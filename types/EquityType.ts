export type EquityType = {
  name: string;
  price: number;
  change: number;
  volume: number;
};

export type EquityCompanyType = {
  address: string;
  directors: Array<any>;
  email: string;
  facsimile: string;
  industry: string;
  name: string;
  sector: string;
  telephone: string;
  website: string;
}

export type EquityDetailType = {
  capital: number;
  company: EquityCompanyType;
  dps: number,
  eps: number,
  name: string,
  price: number,
  shares: number,
};

export type EquityScreenParamList = {
  Equity: {
    equity: string
  };
};
