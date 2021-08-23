import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Rol} from './rol.model';

@model({
  settings: {
    mysql: {schema: 'zubutdb', table: 'users'},
    foreignKeys: {
      FK_USER_ROL: {
        name: 'FK_USER_ROL',
        entity: 'roles',
        entityKey: 'id',
        foreignKey: 'rolId',
      },
    },
  },
})
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    mysql: {
      columnName: 'id',
    },
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'firstName',
      dataType: 'VARCHAR',
      dataLength: 20,
    },
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'lastName',
      dataType: 'VARCHAR',
      dataLength: 20,
    },
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'email',
      dataType: 'VARCHAR',
      dataLength: 30,
    },
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'password',
      dataType: 'VARCHAR',
      dataLength: 80,
    },
  })
  password: string;

  @property({
    type: 'date',
    default: Date.now(),
    mysql: {
      columnName: 'lastLogin',
    },
  })
  lastLogin: string;

  @property({
    type: 'number',
  })
  companyId: number;

  @belongsTo(() => Rol)
  rolId: number;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
