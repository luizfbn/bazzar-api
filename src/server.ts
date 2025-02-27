import 'dotenv/config';
import fastify from 'fastify';
import cors from '@fastify/cors';
import { routes } from './routes';

const app = fastify();

app.register(cors, {
	origin: true,
});
app.register(routes);

app
	.listen({
		host: '0.0.0.0',
		port: process.env.PORT ? Number(process.env.PORT) : 3333,
	})
	.then(() => {
		console.log('HTTP server running');
	});
