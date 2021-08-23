import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ZubutdbDataSource} from '../datasources';
import {Rol, RolRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype.id,
  RolRelations
> {

  public readonly rolUsers: HasManyRepositoryFactory<User, typeof Rol.prototype.id>;

  constructor(
    @inject('datasources.zubutdb') dataSource: ZubutdbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Rol, dataSource);
    this.rolUsers = this.createHasManyRepositoryFactoryFor('rolUsers', userRepositoryGetter,);
    this.registerInclusionResolver('rolUsers', this.rolUsers.inclusionResolver);
  }
  public  defaultData(): string[] {
    return ["admin", "manager", "accounting", "employee"]
  }
}
