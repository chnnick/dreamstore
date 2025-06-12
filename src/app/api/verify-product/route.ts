import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-03-31.basil',
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const stripeId = searchParams.get('stripe_id');

  if (!stripeId) {
    return NextResponse.json(
      { error: 'Stripe ID is required' },
      { status: 400 }
    );
  }

  try {
    const product = await stripe.products.retrieve(stripeId);
    return NextResponse.json({ exists: true, product });
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError && error.code === 'resource_missing') {
      return NextResponse.json({ exists: false });
    }
    throw error;
  }
} 