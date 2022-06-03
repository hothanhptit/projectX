import { Args, ID, Query, Resolver } from '@nestjs/graphql';
// import { fromGlobalId } from 'graphql-relay';

// import { MusicService } from '../../services/music';
import { Node } from './models/node.model';

@Resolver()
export class NodesResolvers {
  constructor() {}
}
