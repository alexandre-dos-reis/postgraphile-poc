import * as dotenv from "dotenv";
import fastify from "fastify";
import { PostGraphileResponseFastify3, postgraphile, PostGraphileResponse } from "postgraphile";
import {
  CompatFastifyRequest,
  CompatFastifyReply,
} from "postgraphile/build/postgraphile/http/frameworks";
import { postgraphileOptions } from "./postgraphile/config";

dotenv.config();

const serverPort = parseInt(process.env.PORT || "") || 7000;

const middleware = postgraphile(process.env.DATABASE_URL || "", "public", postgraphileOptions);

const convertHandler =
  (handler: ((res: PostGraphileResponse) => Promise<void>) | null) =>
  (request: CompatFastifyRequest, reply: CompatFastifyReply) => {
    if (handler) {
      handler(new PostGraphileResponseFastify3(request, reply));
    }
  };

const app = fastify({
  logger: true,
});

// OPTIONS requests, for CORS/etc
app.options(middleware.graphiqlRoute, convertHandler(middleware.graphiqlRouteHandler));

// This is the main middleware
app.post(middleware.graphqlRoute, convertHandler(middleware.graphqlRouteHandler));

// GraphiQL, if you need it
if (middleware.options.graphiql) {
  if (middleware.graphiqlRouteHandler) {
    app.head(middleware.graphiqlRoute, convertHandler(middleware.graphiqlRouteHandler));
    app.get(middleware.graphiqlRoute, convertHandler(middleware.graphiqlRouteHandler));
  }
  // Remove this if you don't want the PostGraphile logo as your favicon!
  if (middleware.faviconRouteHandler) {
    app.get("/favicon.ico", convertHandler(middleware.faviconRouteHandler));
  }
}

if (middleware.options.watchPg) {
  if (middleware.eventStreamRouteHandler) {
    app.options(middleware.eventStreamRoute, convertHandler(middleware.eventStreamRouteHandler));
    app.get(middleware.eventStreamRoute, convertHandler(middleware.eventStreamRouteHandler));
  }
}

(async () => {
  try {
    await app.listen({ port: serverPort });
    console.log(`Server started successfully on port ${serverPort}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
})();
