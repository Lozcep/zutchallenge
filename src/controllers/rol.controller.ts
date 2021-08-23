import {Filter, repository} from '@loopback/repository';
import {param, get, getModelSchemaRef, response} from '@loopback/rest';
import {Rol} from '../models';
import {RolRepository} from '../repositories';

export class RolController {
  constructor(
    @repository(RolRepository)
    public rolRepository: RolRepository,
  ) {}

  @get('/roles')
  @response(200, {
    description: 'Array of Rol model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Rol, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Rol) filter?: Filter<Rol>): Promise<Rol[]> {
    return this.rolRepository.find(filter);
  }
}
