import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ZubutdbDataSource} from '../datasources';
import {Company, CompanyRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class CompanyRepository extends DefaultCrudRepository<
  Company,
  typeof Company.prototype.id,
  CompanyRelations
> {

  public readonly users: HasManyRepositoryFactory<User, typeof Company.prototype.id>;

  constructor(
    @inject('datasources.zubutdb') dataSource: ZubutdbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Company, dataSource);
    this.users = this.createHasManyRepositoryFactoryFor('users', userRepositoryGetter,);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
  public  defaultData(): object[] {
    return [
      {
        legalName: 'MICROSOFT CORPORATION',
        comercialName: 'MICROSOFT CORPORATION',
        rfc: 'MCO091123MR8',
        phoneNumber: '555-55555',
        createdAt: '2000-01-24',
      },
      {
        legalName: 'AMAZON SERVICES INTERNATIONAL, INC.',
        comercialName: 'AMAZON',
        rfc: 'ASI030624312',
        phoneNumber: '333-33333',
        createdAt: '2002-02-10',
      },
    ];
  }
}
