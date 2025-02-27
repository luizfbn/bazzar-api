import Stripe from 'stripe';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { stripe } from './lib/stripe';

export async function routes(app: FastifyInstance) {
	app.get('/', (req: FastifyRequest, res: FastifyReply) => {
		res.send('Hello world');
	});
	app.get('/products', async (req: FastifyRequest, res: FastifyReply) => {
		try {
			const { data } = await stripe.products.list({
				expand: ['data.default_price'],
			});
			const products = data.map((product) => {
				const price = product.default_price as Stripe.Price;
				return {
					id: product.id,
					name: product.name,
					active: product.active,
					description: product.description,
					images: product.images,
					price: price.unit_amount ? price.unit_amount / 100 : 0,
					default_price: price.id,
					currency: price.currency,
				};
			});
			res.send(products);
		} catch (error) {
			res.code(500).send(error);
		}
	});
	app.get(
		'/product/:id',
		async (
			req: FastifyRequest<{ Params: { id: string } }>,
			res: FastifyReply
		) => {
			try {
				const productId = req.params.id;
				const data = await stripe.products.retrieve(productId, {
					expand: ['default_price'],
				});
				const price = data.default_price as Stripe.Price;
				const product = {
					id: data.id,
					name: data.name,
					active: data.active,
					description: data.description,
					images: data.images,
					price: price.unit_amount ? price.unit_amount / 100 : 0,
					defaultPrice: price.id,
					currency: price.currency,
				};
				res.send(product);
			} catch (error) {
				res.code(500).send(error);
			}
		}
	);
}
