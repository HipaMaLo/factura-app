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

  <div class="container-total">
    
    <h2>Subtotal: {{ formatCurrency(subTotal) }}</h2>
    <h2>IVA: {{ formatCurrency(Iva) }}</h2>
    <h2>Total: {{ formatCurrency(total) }}</h2>
        
  </div>

</template>

<script lang="ts" setup>
import { ref, Ref, computed } from 'vue'
import type { IProducto } from '../types/IProducto'
import FacturaMaestro from './FacturaMaestro.vue'
import FacturaDetalle from './FacturaDetalle.vue'
import { formatCurrency } from '../utilities/formatCurrency'

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
