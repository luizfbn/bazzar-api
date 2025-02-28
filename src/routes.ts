import Stripe from 'stripe';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { stripe } from './lib/stripe';

type Product = {
	price: string;
	quantity: number;
};

const bodySchema = {
	type: 'array',
	items: {
		type: 'object',
		properties: {
			price: { type: 'string' },
			quantity: {
				type: 'number',
				minimum: 1,
			},
		},
		required: ['price', 'quantity'],
	},
	maxItems: 100,
};

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
	app.post(
		'/checkout',
		{ schema: { body: bodySchema } },
		async (req: FastifyRequest, res: FastifyReply) => {
			try {
				const products = req.body as Product[];
				const session = await stripe.checkout.sessions.create({
					line_items: products,
					mode: 'payment',
					success_url: process.env.REDIRECT_SUCCESS_URL,
					cancel_url: process.env.REDIRECT_CANCEL_URL,
				});

				res.send(session.url);
				// res.redirect(session.url!, 303);
			} catch (error) {
				res.code(500).send(error);
			}
		}
	);
}
