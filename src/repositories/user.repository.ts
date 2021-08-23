import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import {ZubutdbDataSource} from '../datasources';
import {User, UserRelations, Rol} from '../models';
import {RolRepository} from './rol.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly rol: BelongsToAccessor<Rol, typeof User.prototype.id>;

  constructor(
    @inject('datasources.zubutdb') dataSource: ZubutdbDataSource,
    @repository.getter('RolRepository')
    protected rolRepositoryGetter: Getter<RolRepository>,
  ) {
    super(User, dataSource);
    this.rol = this.createBelongsToAccessorFor('rol', rolRepositoryGetter);
    this.registerInclusionResolver('rol', this.rol.inclusionResolver);
  }
  public defaultData(): Omit<
    User,
    'id' | 'getId' | 'getIdObject' | 'toJSON' | 'toObject'
  >[] {
    return [
      {
        firstName: 'Peter',
        lastName: 'Parker',
        email: 'peter@gmail.com',
        password: '12345678',
        lastLogin: '2020-08-22',
        companyId: 1,
        rolId: 1,
      },
      {
        firstName: 'Bruce',
        lastName: 'Wayne',
        email: 'wayne@gmail.com',
        password: '12345678',
        lastLogin: '2020-08-22',
        companyId: 1,
        rolId: 2,
      },
      {
        firstName: 'Clark',
        lastName: 'Kent',
        email: 'clark@gmail.com',
        password: '12345678',
        lastLogin: '2020-08-22',
        companyId: 2,
        rolId: 3,
      },
      {
        firstName: 'Oliver',
        lastName: 'Queen',
        email: 'oliver@gmail.com',
        password: '12345678',
        lastLogin: '2020-08-22',
        companyId: 2,
        rolId: 4,
      },
      {
        firstName: 'Mary',
        lastName: 'Watson',
        email: 'watson@gmail.com',
        password: '12345678',
        lastLogin: '2020-08-22',
        companyId: 2,
        rolId: 5,
      },
    ];
  }
}
