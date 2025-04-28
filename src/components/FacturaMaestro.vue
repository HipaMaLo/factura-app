<template>

<div class="form-group">

<h1>Factura Maestro</h1>

<label  for="">Producto</label>
<input type="text" v-model="producto.nombre" placeholder="Producto" v-focus />

<label for="">Precio</label>
<input type="text" v-model="producto.precio" placeholder="Precio" />

<label for="">Cantidad</label>  
<input  type="text" v-model="producto.cantidad" placeholder="Cantidad" />

<button v-on:click="handleAgregar">Agregar</button>

</div>

</template>

<script lang="ts" setup>
import { ref, defineEmits, defineProps, watch } from 'vue'
import type { IProducto } from '../types/IProducto'

// Props y Emits
const props = defineProps({
  productoEditar: {
    type: Object as () => IProducto | null,
    default: null
  }
})

const emit = defineEmits(['addProducto', 'update:productoEditar'])

// Producto local
const producto = ref<IProducto>({
  nombre: '',
  precio: 0,
  cantidad: 0,
  totalitem: 0,
})

// Si recibimos un productoEditar, copiamos sus valores
watch(() => props.productoEditar, (nuevo) => {
  if (nuevo) {
    producto.value = { ...nuevo }
  } else {
    // Si es null, limpiamos el formulario
    limpiarFormulario()
  }
})

// Función para agregar o editar producto
const handleAgregar = () => {
  if (producto.value.nombre && producto.value.precio > 0 && producto.value.cantidad > 0) {
    producto.value.totalitem = producto.value.precio * producto.value.cantidad

    emit('addProducto', { ...producto.value })

    // Luego de agregar o editar, reseteamos productoEditar
    emit('update:productoEditar', null)

    // Limpiamos el formulario visualmente
    limpiarFormulario()
  } else {
    alert('Por favor, completa todos los campos correctamente.')
  }
}

// Limpiar el formulario
const limpiarFormulario = () => {
  producto.value = {
    nombre: '',
    precio: 0,
    cantidad: 0,
    totalitem: 0
  }
}
</script>



<style scoped>

.form-group h1{
    text-align: left;
    color: #333;
}

.form-group {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
}

.form-group {
    width: 100%;
    max-width: 300px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.form-group input {
    width: calc(100% - 20px);
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    display: flex;
}

button {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #218838;
}

</style>