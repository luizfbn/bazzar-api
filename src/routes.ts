import { FastifyInstance } from 'fastify';
import { getProductById, getProducts } from './controllers/productController';
import { CheckoutSchema } from './schemas/CheckoutSchema';
import {
	paymentCheckout,
	paymentStatus,
} from './controllers/paymentController';

export async function routes(app: FastifyInstance) {
	app.get('/products', getProducts);
	app.get('/products/:id', getProductById);
	app.post(
		'/payment/checkout',
		{ schema: { body: CheckoutSchema } },
		paymentCheckout
	);
	app.get('/payment/status', paymentStatus);
}
