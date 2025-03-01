export const CheckoutSchema = {
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
