import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export async function routes(app: FastifyInstance) {
	app.get('/', (req: FastifyRequest, res: FastifyReply) => {
		res.send('Hello world');
	});
}
