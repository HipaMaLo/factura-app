<template>
  <div class="form-group">
    <h2>MARKET PLACE</h2>

    <label>Product</label>
    <input type="text" v-model="producto.nombre" placeholder="Nombre del producto" v-focus />

    <label>Price</label>
    <input type="number" v-model="producto.precio" placeholder="Precio" min="0" />

    <label>Quantity</label>
    <input type="number" v-model="producto.cantidad" placeholder="Cantidad" min="0"  value="12" />

    <button @click="handleAgregar">Add Product</button>

  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits, defineProps, watch, Ref } from 'vue'
import type { IProducto } from '../types/IProducto'

const producto:Ref<IProducto> = ref({
  nombre: 'Naranja',
  precio: 1.15,
  cantidad: 23,
  totalitem: 0,
})

const props = defineProps({
  productoEditar: {
    type: Array as () => IProducto | null,
    default: null
  }
})

const emit = defineEmits(['addProducto', 'update:productoEditar'])

watch(() => props.productoEditar, (nuevo) => {
  if (nuevo) producto.value = { ...nuevo }
  else cleanForm()
})

const handleAgregar = () => {
  if (producto.value.nombre && producto.value.precio > 0 && producto.value.cantidad > 0) {
    
    producto.value.totalitem = producto.value.precio * producto.value.cantidad;
    
    emit('addProducto', { ...producto.value });
    
    emit('update:productoEditar', null);
  
    cleanForm();

  } else {
    alert('Por favor completa todos los campos correctamente.')
  }
}

const cleanForm = () => {
  producto.value = { nombre: '', precio: 0, cantidad: 0, totalitem: 0 }
}
</script>

<style scoped>
.form-group {
  background: #ffffff;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.form-group h2 {
  margin-bottom: 20px;
  color: #333;
}

label {
  margin-top: 10px;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 15px;
}

button {
  background-color: #28a745;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>
