import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/product.interface';
import { getProductImageActon } from './get-product-image.action';

export const getProductsAction = async (page: number = 1, limit: number = 10) => {
  try {
    const { data } = await tesloApi.get<Product[]>(
      `/products?limit=${limit}&offset=${(page - 1) * limit}`,
    );
    return data.map((product) => ({
      ...product,
      images: product.images.map(getProductImageActon),
    }));
  } catch (error) {
    throw new Error('Error getting products');
  }
};
