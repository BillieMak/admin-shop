<template>
  <div class="bg-white px-5 py-2 rounded">
    <h1 class="text-3xl">
      Producto: <small class="text-blue-500">{{ title }}</small>
    </h1>
    <hr class="my-4" />
  </div>

  <form @submit="onSubmit" class="grid grid-cols-1 sm:grid-cols-2 bg-white px-5 gap-5">
    <div class="first-col">
      <!-- Primera parte del formulario -->
      <div class="mb-4">
        <label for="title" class="form-label">Título</label>
        <CustomInput v-model="title" v-bind="titleAttrs" :error="errors.title" />
      </div>

      <div class="mb-4">
        <label for="slug" class="form-label">Slug</label>
        <CustomInput v-model="slug" v-bind="slugAttrs" :error="errors.slug" />
      </div>

      <div class="mb-4">
        <label for="description" class="form-label">Descripción</label>
        <CustomTextArea
          v-model="description"
          v-bind="descriptionAttrs"
          :error="errors.description"
        />
      </div>

      <div class="flex flex-row gap-3">
        <div class="mb-4 flex-1">
          <label for="price" class="form-label">Precio</label>
          <CustomInput v-model.number="price" v-bind="priceAttrs" :error="errors.price" />
        </div>

        <div class="mb-4 flex-1">
          <label for="stock" class="form-label">Inventario</label>
          <CustomInput
            type="number"
            v-model.number="stock"
            v-bind="stockAttrs"
            :error="errors.stock"
          />
        </div>
      </div>

      <div class="mb-4">
        <label for="sizes" class="form-label">Tallas</label>
        <div class="flex">
          <button
            v-for="size of allSizes"
            :key="size"
            @click="toggleSize(size)"
            type="button"
            :class="[
              'p-2 rounded w-14 mr-2 flex-1',
              {
                'bg-blue-700 text-white': hasSize(size),
                'bg-blue-100 text-blue-700': !hasSize(size),
              },
            ]"
          >
            {{ size }}
          </button>
        </div>
      </div>
    </div>

    <!-- Segunda columna -->
    <div class="first-col">
      <label for="stock" class="form-label">Imágenes</label>
      <!-- Row with scrollable horizontal -->
      <div class="flex p-2 overflow-x-auto space-x-8 w-full h-[265px] bg-gray-200 rounded">
        <div v-for="image of images" class="flex-shrink-0" :key="image.value">
          <img :src="image.value" alt="imagen" class="w-[250px] h-[250px]" />
        </div>
        <div v-for="imageFile of imageFiles" class="flex-shrink-0" :key="imageFile.name">
          <img :src="temporalImageUrl(imageFile)" alt="imagen" class="w-[250px] h-[250px]" />
        </div>

        <!-- <div class="flex-shrink-0">
          <img src="https://via.placeholder.com/250" alt="imagen" class="w-[250px] h-[250px]" />
        </div> -->
      </div>
      <!-- Upload image -->
      <div class="col-span-2 my-2">
        <label for="image" class="form-label">Subir imagen</label>

        <input
          multiple
          type="file"
          id="image"
          class="form-control"
          @change="onFilesChange"
          accept="image/*"
        />
      </div>

      <div class="mb-4">
        <label for="stock" class="form-label">Género</label>
        <select v-model="gender" v-bind="genderAttrs" class="form-control">
          <option value="">Seleccione</option>
          <option value="kid">Niño</option>
          <option value="women">Mujer</option>
          <option value="men">Hombre</option>
        </select>
        <span v-if="errors.gender" class="text-red-600">{{ errors.gender }}</span>
      </div>

      <!-- Botón para guardar -->
      <div class="my-4 text-right">
        <button
          :disabled="isPending"
          type="submit"
          :class="[
            ' text-white font-bold py-2 px-4 rounded',
            {
              'bg-blue-700': meta.touched,
              'bg-blue-300': !meta.touched,
            },
          ]"
        >
          Guardar
        </button>
      </div>
    </div>
  </form>
  <!-- grid-cols-2 = tamaños de columnas  -->
  <!-- <div class="grid grid-cols-2"> -->
  <!-- <div class="bg-blue-200 p-2">
      <pre>
        {{ values }}
      </pre>
    </div>
    <div class="bg-red-200 p-2">
      <pre>{{ errors }}</pre>
    </div> -->
  <!-- col span 2 toma todo el tamaño segun cantidad columnas -->
  <!-- <div class="bg-green-200 p-2 col-span-2">
      <pre>{{ meta }}</pre>
    </div> -->
  <!-- </div> -->
</template>
<script lang="ts" src="./ProductView.ts"></script>
<style scoped>
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}
.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>
