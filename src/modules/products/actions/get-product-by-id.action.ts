import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/product.interface';
import { getProductImageActon } from './get-product-image.action';

export const getProductById = async (productId: string): Promise<Product> => {
  //TODO: pensar la creacion de un nuevo producto

  if (productId === 'create') {
    return {
      id: '',
      title: '',
      slug: '',
      description: '',
      price: 0,
      stock: 0,
      images: [],
      tags: [],
      gender: '' as any,
      user: {} as any,
      sizes: [] as any,
    };
  }

  try {
    const { data } = await tesloApi.get<Product>(`products/${productId}`);

    return {
      ...data,
      images: data.images.map(getProductImageActon),
    };
  } catch (error) {
    console.log(error);
    throw new Error('Error getting product by id');
  }
};
