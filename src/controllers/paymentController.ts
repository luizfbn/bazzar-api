import Stripe from 'stripe';
import { stripe } from '../lib/stripe';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function paymentCheckout(req: FastifyRequest, res: FastifyReply) {
	try {
		const products = req.body as Stripe.Checkout.SessionCreateParams.LineItem[];
		const session = await stripe.checkout.sessions.create({
			line_items: products,
			mode: 'payment',
			success_url: process.env.REDIRECT_SUCCESS_URL,
			cancel_url: process.env.REDIRECT_CANCEL_URL,
		});
		res.send(session.url);
	} catch (error) {
		res.code(500).send(error);
	}
}

export async function paymentStatus(
	req: FastifyRequest<{ Querystring: { session_id: string } }>,
	res: FastifyReply
) {
	try {
		const { session_id } = req.query;
		if (!session_id) {
			res.code(400).send({
				error: 'Parameter session_id not found',
			});
			return;
		}
		const session = await stripe.checkout.sessions.retrieve(session_id);
		if (session.payment_status !== 'paid') {
			res.code(402).send({
				error: 'Payment not confirmed.',
			});
			return;
		}
		res.send({
			name: session.customer_details?.name,
			email: session.customer_details?.email,
		});
	} catch (error) {
		res.code(500).send(error);
	}
}
