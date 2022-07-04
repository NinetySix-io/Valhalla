import { FastifyReply, FastifyRequest } from 'fastify';
import {
  GraphQLDataSourceProcessOptions,
  RemoteGraphQLDataSource,
} from '@apollo/gateway';
import {
  GraphQLRequestContext,
  GraphQLResponse,
  ValueOrPromise,
} from 'apollo-server-types';

import { arrayFromIterator } from '@app/lib/array.from.iterator';
import { isDev } from '@valhalla/utilities';

export class RemoteDataSource extends RemoteGraphQLDataSource {
  private handleHeaders(
    entries: [string, number | string | string[]][],
    onHeaderEntry: (key: string, value: string) => void,
  ) {
    for (const [key, value] of entries) {
      if (Array.isArray(value)) {
        for (const v of value) {
          onHeaderEntry(key, v);
        }
      } else {
        onHeaderEntry(key, String(value));
      }
    }
  }

  override didReceiveResponse({
    response,
    context,
    request,
  }: Required<
    Pick<
      GraphQLRequestContext<{
        request: FastifyRequest;
        reply: FastifyReply;
        context: GraphQLRequestContext['context'];
      }>,
      'request' | 'response' | 'context'
    >
  >): ValueOrPromise<GraphQLResponse> {
    const fastifyReply: FastifyReply = context.reply;
    if (!request.http || !response.http) {
      throw new Error('Unable to resolve http');
    }

    if (fastifyReply) {
      if (isDev()) {
        const origin = request.http.headers.get('origin');
        if (origin) {
          response.http.headers.set('Access-Control-Allow-Origin', origin);
        }
      }

      this.handleHeaders(
        arrayFromIterator(response.http.headers.entries()),
        (key, value) => fastifyReply.header(key, value),
      );
    }

    return response;
  }

  override willSendRequest({
    request,
    context,
  }: GraphQLDataSourceProcessOptions<{
    request: FastifyRequest;
    reply: FastifyReply;
  }>): ValueOrPromise<void> {
    if (context.request && request.http) {
      const http = request.http;
      this.handleHeaders(
        Object.entries(context.request.headers),
        (key, value) => http.headers.set(key, value),
      );
    }
  }
}
