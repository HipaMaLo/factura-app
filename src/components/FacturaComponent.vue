<template>
  <div class="container-maestro">
    <FacturaMaestro
      v-on:addProducto="addProducto"
      v-bind:productoEditar="productoEditando"
    />
  </div>

  <div class="container-detalle">
    <FacturaDetalle
      v-on:editProducto="editProducto"
      v-bind:productos="productos"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref, computed } from 'vue'
import type { IProducto } from '../types/IProducto'
import FacturaMaestro from './FacturaMaestro.vue'
import FacturaDetalle from './FacturaDetalle.vue'

const productos: Ref<IProducto[]> = ref([])

// Nuevo estado: producto que está siendo editado
const productoEditando: Ref<IProducto | null> = ref(null)

// Agregar o actualizar producto
const addProducto = (producto: IProducto) => {
  const index = productos.value.findIndex(p => p.nombre === producto.nombre)

  if (productoEditando.value) {
    // Editando: reemplazar el producto existente
    const i = productos.value.findIndex(p => p.nombre === productoEditando.value?.nombre)
    if (i !== -1) productos.value[i] = { ...producto }
    productoEditando.value = null
  } else {
    // Agregando nuevo producto
    productos.value.push(producto)
  }
}

const editProducto = (index: number) => {
  const producto = productos.value[index]
  if (producto) {
    productoEditando.value = { ...producto } // Hacer copia para no modificar directo
  }
}

const subTotal = computed(() => productos.value.reduce((acc, item) => acc + item.totalitem, 0))
const Iva = computed(() => subTotal.value * 0.15)
const total = computed(() => subTotal.value + Iva.value)

</script>
