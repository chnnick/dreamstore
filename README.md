# DreamStore

A modern e-commerce platform built with Next.js, featuring a sleek UI and seamless payment processing.

## Features

- 🛍️ **Product Management**
  - Add and edit products with multiple images
  - Track stock status
  - Manage product sizes and descriptions
  - Automatic Stripe product synchronization

- 🛒 **Shopping Cart**
  - Persistent cart using Zustand
  - Real-time quantity updates
  - Cart summary with total calculation
  - Automatic removal of out-of-stock items

- 💳 **Secure Checkout**
  - Stripe payment processing
  - Real-time stock validation
  - Secure card element integration
  - Order summary with shipping costs

- 🎨 **Modern UI/UX**
  - Responsive design
  - Smooth animations
  - Dark mode support
  - Image gallery with hover effects
  - Loading states and error handling

- 🔒 **Data Management**
  - Supabase database integration
  - Secure product storage
  - Image hosting
  - Real-time stock updates

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   # Stripe Keys
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key

   # Supabase Keys
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Setup

1. Create a Supabase project
2. Create a `products` table with the following columns:
   - id (int, primary key)
   - name (text)
   - price (decimal)
   - description (text)
   - image_url (text)
   - second_image_url (text, nullable)
   - stock_status (text)
   - size (text)
   - stripe_id (text)
   - created_at (timestamp with time zone)

## Stripe Setup

1. Create a Stripe account
2. Create products in your Stripe dashboard
3. Copy the product IDs to your Supabase products table
4. Ensure your Stripe webhook is configured for payment events

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management**: Zustand
- **Database**: Supabase
- **Payment Processing**: Stripe
- **Animations**: Framer Motion

## Contributing

Feel free to submit issues and pull requests.

## License

MIT
