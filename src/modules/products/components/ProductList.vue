<template>
    <section class="py-10 bg-gray-100">
        <!-- CONTAINER CARDS -->
        <div class="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <!-- PRODUCT CARD  -->
            <ProductCardItem v-for="propduct in products" v-bind:key="propduct.id" :product="propduct" />
        </div>
    </section>
</template>
<script lang="ts" setup>
import type { Product } from '../interfaces/product.interface';
import ProductCardItem from '@/modules/products/components/ProductCardItem.vue'

interface Props {
    products: Product[]
}

defineProps<Props>()
</script>