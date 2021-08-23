import {Entity, model, property, hasMany} from '@loopback/repository';
import {User} from './user.model';

@model({
  settings: { mysql: { schema: 'zubutdb', table: 'roles'} }
})
export class Rol extends Entity {
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
      columnName: 'name',
    }
  })
  name: string;

  @hasMany(() => User, {keyTo: 'rolId'})
  rolUsers: User[];

  constructor(data?: Partial<Rol>) {
    super(data);
  }
}

export interface RolRelations {
  // describe navigational properties here
}

export type RolWithRelations = Rol & RolRelations;
