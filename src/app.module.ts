import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: 'users',
              url: 'https://codelabs-users-service.up.railway.app/graphql', //'http://localhost:3001/graphql',
            },
            {
              name: 'courses',
              url: 'https://codelabs-courses-service.up.railway.app/graphql', //http://localhost:3002/graphql',
            },
            {
              name: 'discussions',
              url: 'https://codelabs-discussions-service.up.railway.app/graphql', // http://localhost:3003/graphql',
            },
          ],
        }),
      },
      server: {
        playground: true,
        introspection: true,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
