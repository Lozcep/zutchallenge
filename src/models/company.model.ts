import {Entity, model, property, hasMany} from '@loopback/repository';
import {User} from './user.model';

@model({
  settings: { mysql: { schema: 'zubutdb', table: 'companies'} }
})
export class Company extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    mysql: {
      columnName: 'id',
    }
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'legalName',
      dataType: 'VARCHAR',
      dataLength: 45,
    }
  })
  legalName: string;

  @property({
    type: 'string',
    default: 'no posee',
    mysql: {
      columnName: 'comercialName',
      dataType: 'VARCHAR',
      dataLength: 45,
    }
    
  })
  comercialName?: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'rfc',
      dataType: 'VARCHAR',
      dataLength: 20,
    }
  })
  rfc: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'phoneNumber',
      dataType: 'VARCHAR',
      dataLength: 20,
    }
  })
  phoneNumber: string;

  @property({
    type: 'date',
    required: true,
    mysql: {
      columnName: 'createdAt',
      dataType: 'DATE',
    }
  })
  createdAt: string;

  @hasMany(() => User)
  users: User[];

  constructor(data?: Partial<Company>) {
    super(data);
  }
}

export interface CompanyRelations {
  // describe navigational properties here
}

export type CompanyWithRelations = Company & CompanyRelations;
