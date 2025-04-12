<h1 align="center" style="font-weight: bold;">Bazzar API 💻</h1>

<p align="center">
  <a href="#tech">Technologies</a> • 
  <a href="#started">Getting Started</a> • 
  <a href="#routes">API Endpoints</a>
</p>

<p align="center">
    <b>List your products and checkout your purchases through Stripe.</b>
</p>

<p align="center">
     <a href="https://bazzar-api.vercel.app/">📱 Visit this project</a>
</p>

<h2 id="tech">💻 Technologies</h2>

- NodeJS
- Typescript
- Stripe
- Axios
- Fastify

<h2 id="started">🚀 Getting started</h2>

<h3>Prerequisites</h3>

- [Stripe account](https://stripe.com)
- [NodeJS](https://nodejs.org/en/download)
- [Git](https://git-scm.com/downloads)

<h3>Cloning</h3>

```bash
git clone https://github.com/luizfbn/bazzar-api.git
```

<h3>Config .env variables</h2>

Use the `.env.example` as reference to create your configuration file `.env`

```yaml
PORT={YOUR_PORT}
STRIPE_API_KEY={YOUR_STRIPE_API_KEY}
REDIRECT_SUCCESS_URL={YOUR_SUCCESS_URL}
REDIRECT_CANCEL_URL={YOUR_CANCEL_URL}
```

<h3>Starting</h3>

```bash
cd bazzar-api
npm install
npm run dev
```

<h2 id="routes">📍 API Endpoints</h2>

| route               | description                                          
|----------------------|-----------------------------------------------------
| <kbd>GET /products</kbd>     | retrieves a list of all products
| <kbd>GET /products/:id</kbd>     | retrieves a specific product by id
| <kbd>POST /payment/checkout</kbd>     | creates a stripe session checkout
| <kbd>GET /payment/status?session_id={session_id}</kbd>     | retrieves the payment status by session_id
