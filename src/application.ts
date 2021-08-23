import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin, SchemaMigrationOptions} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {RolRepository} from './repositories/rol.repository';
import {CompanyRepository} from './repositories/company.repository';
import {UserRepository} from './repositories/user.repository';
import { genSalt, hash} from 'bcryptjs';

export {ApplicationConfig};

export class ZubutTestApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  async migrateSchema(options?: SchemaMigrationOptions) {
    // 1. Run migration scripts provided by connectors
    await super.migrateSchema(options);

    // 2. Make further changes. When creating predefined model instances,
    // handle the case when these instances already exist.
    const rolRepo = await this.getRepository(RolRepository);
    const companyRepo = await this.getRepository(CompanyRepository);
    const userRepo = await this.getRepository(UserRepository);
    const roles = rolRepo.defaultData()
    const companies = companyRepo.defaultData()

    const users = userRepo.defaultData()

    for (const rol of roles) {
      await rolRepo.create({name: rol});
    }

    for (const company of companies) {
      await companyRepo.create(company);
    }
    for (const user of users) {
      if(user.password)  user.password = await hash(user.password, await genSalt());
      await userRepo.create(user);
    }
  }
}
