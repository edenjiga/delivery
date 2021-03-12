interface ProductImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: null;
  url: string;
}

export interface Product {
  unitsInStock: number;
  description: number;
  _id: string;
  name: string;
  published_at: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  Imagen?: {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    width: number;
    height: number;
    url: string;
    provider: string;
    related: [string];
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
    formats: {
      thumbnail: ProductImageFormat;
      large: ProductImageFormat;
      medium: ProductImageFormat;
      small: ProductImageFormat;
    };
  };
  price: number;
  discount?: number;
  id: string;
  finalPrice: number;
  discountValue: number;
}
