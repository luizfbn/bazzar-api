import Stripe from 'stripe';
import { stripe } from '../lib/stripe';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function processCheckout(req: FastifyRequest, res: FastifyReply) {
	try {
		const products = req.body as Stripe.Checkout.SessionCreateParams.LineItem[];
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
