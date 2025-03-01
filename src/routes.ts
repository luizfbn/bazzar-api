import { FastifyInstance } from 'fastify';
import { getProductById, getProducts } from './controllers/productController';
import { processCheckout } from './controllers/checkoutController';
import { CheckoutSchema } from './schemas/CheckoutSchema';

export async function routes(app: FastifyInstance) {
	app.get('/products', getProducts);
	app.get('/products/:id', getProductById);
	app.post('/checkout', { schema: { body: CheckoutSchema } }, processCheckout);
}
