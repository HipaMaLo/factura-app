<template>
  <div class="factura-wrapper">
    
    <!-- Maestro a la Izquierda -->
    <div class="container-maestro">
      <FacturaMaestro
        @addProducto="addProducto"
        v-model:productoEditar="productoEditando"
      />
    </div>

    <!-- Detalle + Totales dentro del mismo contenedor -->
    <div class="container-detalle-total">
      <FacturaDetalle
        v-model:visibleRow="visibleRow"
        v-model:productos="productos"
        @editProducto="editProducto"
        @deleteProducto="deleteProducto"
      />

      <!-- Sección Totales dentro del mismo panel -->
      <div class="totales-section">
        <h3>Sub-Total: {{ formatCurrency(subTotal) }}</h3>
        <h3>VAT(15%): {{ formatCurrency(Iva) }}</h3>
        <h2 class="total-final">Total: {{ formatCurrency(total) }}</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, Ref } from 'vue'
import type { IProducto } from '../types/IProducto'
import FacturaMaestro from './FacturaMaestro.vue'
import FacturaDetalle from './FacturaDetalle.vue'
import { formatCurrency } from '../utilities/formatCurrency'

//const productos: Ref<IProducto[]> = ref([])
const visibleRow = ref<number | null>(null)
const productoEditando = ref<IProducto | null>(null)

const productos = ref<IProducto[]>([

  {
    nombre: 'Pera',
    precio: 100,
    cantidad: 2,
    totalitem: 200,
  },
  {
    nombre: 'Manzana',
    precio: 50,
    cantidad: 3,
    totalitem: 150,
  },
  {
    nombre: 'Banana',
    precio: 30,
    cantidad: 4,
    totalitem: 120,
  },

])

const addProducto = (producto: IProducto) => {
  if (productoEditando.value) {
    const index = productos.value.findIndex(p => p.nombre === productoEditando.value?.nombre)
    if (index !== -1) productos.value[index] = { ...producto }
    productoEditando.value = null
    visibleRow.value = null
  } else {
    productos.value.push(producto)
  }
}

const editProducto = (index: number) => {
  productoEditando.value = productos.value[index] || null
}

const deleteProducto = (index: number) => {
  productos.value.splice(index, 1)
}

const subTotal = computed(() => productos.value.reduce((acc, item) => acc + item.totalitem, 0))
const Iva = computed(() => subTotal.value * 0.15)
const total = computed(() => subTotal.value + Iva.value)


</script>

<style scoped>
.factura-wrapper {
  display: flex;
  gap: 30px;
  padding: 20px;
  flex-wrap: wrap;
}

/* Maestro */
.container-maestro {
  flex: 1;
  min-width: 300px;
  max-width: 400px;
}

/* Detalle + Totales juntos */
.container-detalle-total {
  flex: 2;
  min-width: 600px;
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.container-detalle-total {
  flex: 2;
  min-width: 600px;
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: stretch; /* Asegura que los totales y el detalle se estiren correctamente */
}

.totales-section {
  margin-top: 20px;
  text-align: right;  /* Alinea el texto de los totales a la derecha */
  font-size: 16px;
  font-weight: normal;
  color: #555;
  border-top: 1px solid #eee;
  padding-top: 15px;
  
}

.totales-section h3 {
  margin: 5px 0;
  font-weight: 500;
  font-size: 16px;
}

.totales-section h2.total-final {
  margin-top: 5px;
  font-size: 16px;
  font-weight: 700;
  color: #28a745;
}

/* Si la tabla de productos está dentro de la misma sección */
.container-detalle-total table {
  width: 100%;
  margin-bottom: 20px;
  table-layout: fixed; /* Para asegurar que las columnas tengan un ancho fijo */
}

/* Aseguramos que el contenedor de totales tenga el mismo ancho que el contenedor de productos */
.totales-section {
  display: flex;
  flex-direction: column;
  margin-right: 325px; /* Ajusta este valor según el ancho de la tabla de productos */
}

</style>
