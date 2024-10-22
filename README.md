# AI Genie

AI Genie is a personal project that harnesses the power of artificial intelligence to generate various types of content, including images, music, code, and videos.

## Features

- **Multi-modal AI Generation**: Create images, music, code, and videos using advanced AI algorithms.
- **Unlimited Generations**: Subscribe for unlimited access to all generation features.
- **Secure Authentication**: User authentication powered by Clerk.js.
- **Stripe Integration**: Seamless subscription payments through Stripe.

## Dashboard Preview

![AI Genie Dashboard](https://utfs.io/f/x8mzEklJSlivBA6OcVSsS8OQ0tFE67o39ACUjvauTwbYIKyz)

## Sample Generations

### Conversation Generation
![Sample Generation](https://utfs.io/f/x8mzEklJSliv2QcHBE9xVFicPdHO8u7wyCQoK4JXAZ5bWkjL)

### Code Generation
![Sample Code Generation](https://utfs.io/f/x8mzEklJSliv3TIOKzXv1yghAalVdBc7OkWqKYHsLEiXSUTZ)



## Tech Stack

- **Frontend**: Next.js 13 with TypeScript
- **Authentication**: Clerk.js
- **Database**: PostgreSQL
- **Payment Processing**: Stripe

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/sankarkalla2/Genie.git
   cd ai-genie
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following environment variables:

   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   OPENAI_API_KEY=your_openai_api_key

   REPLICATE_API_TOKEN=your_replicate_api_token

   DATABASE_URL=your_database_url

   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

   NEXT_PUBLIC_APP_URL=http://localhost:3000

   UPLOADTHING_SECRET=your_uploadthing_secret
   UPLOADTHING_APP_ID=your_uploadthing_app_id
   ```

   Replace the placeholder values with your actual API keys and credentials.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).
