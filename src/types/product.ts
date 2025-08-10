export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
  stock_status: boolean;
  size: string;
  second_image_url?: string;
  stripe_id: string;
} 