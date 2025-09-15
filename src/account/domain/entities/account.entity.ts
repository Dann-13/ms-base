export class AccountEntity {
  id?: string;
  code: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class AccountFindEntity {
  id: string;
  code: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class AccountListEntity {
  id: string;
  code: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}