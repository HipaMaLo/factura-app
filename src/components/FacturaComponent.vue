<template>
  <div class="container-maestro">
    <FacturaMaestro
      @addProducto="addProducto"
      v-model:productoEditar="productoEditando"
    />
  </div>

  <div class="container-detalle">
    <FacturaDetalle
      v-model:visibleRow="visibleRow"
      v-model:productos="productos"
      @editProducto="editProducto"
      @deleteProducto="deleteProducto"
    />
  </div>

  <div class="container-total">
    <h2>Subtotal: {{ formatCurrency(subTotal) }}</h2>
    <h2>IVA: {{ formatCurrency(Iva) }}</h2>
    <h2>Total: {{ formatCurrency(total) }}</h2>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, Ref } from 'vue'
import type { IProducto } from '../types/IProducto'
import FacturaMaestro from './FacturaMaestro.vue'
import FacturaDetalle from './FacturaDetalle.vue'
import { formatCurrency } from '../utilities/formatCurrency'

// Lista de productos
const productos: Ref<IProducto[]> = ref([])

// Visibilidad de las filas del detalle
const visibleRow = ref<number | null>(null) 

// Producto actualmente en edición (si hay)
const productoEditando = ref<IProducto | null>(null)

// Agrega o actualiza un producto
const addProducto = (producto: IProducto) => {
  if (productoEditando.value) {
    const index = productos.value.findIndex(
      p => p.nombre === productoEditando.value?.nombre
    )

    if (index !== -1) {
      productos.value[index] = { ...producto }
    }

    productoEditando.value = null
    visibleRow.value = null 

  } else {
    productos.value.push(producto)
  }
}

// Edita un producto existente
const editProducto = (index: number) => {
  productoEditando.value = productos.value[index] || null
}

const deleteProducto = (index: number) => {
  productos.value.splice(index, 1)
}

// Cálculos automáticos
const subTotal = computed(() =>
  productos.value.reduce((acc, item) => acc + item.totalitem, 0)
)
const Iva = computed(() => subTotal.value * 0.15)
const total = computed(() => subTotal.value + Iva.value)
</script>


<style scoped >
.container-total {
    font-size: 12px;
    font-weight: bold;
    text-align: right;
    color: #333;
    margin-top: 20px;
    width: 100%;
    max-width: 700px;
}
</style>

