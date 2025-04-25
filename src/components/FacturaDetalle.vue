// Componente: DetalleFactura.vue
<template>
  <div class="form-group-detalle">
    <h1>Detalle de la Factura</h1>
    <table>
      <thead>
        <tr>
          <th>Producto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in productos" :key="index">
          <td>{{ item.nombre }}</td>
          <td>{{ formatCurrency(item.precio) }}</td>
          <td>{{ item.cantidad }}</td>
          <td>{{ formatCurrency(item.totalitem) }}</td>
          <td class="actions">
            <button @click="handleEdit(index)" class="edit-btn">✏️</button>
            <button @click="handleDelete(index)" class="delete-btn">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">    
import { defineProps, defineEmits } from 'vue'
import type { IProducto } from '../types/IProducto'
import { formatCurrency } from '../utilities/formatCurrency'

const emit = defineEmits(["editProducto", "deleteProducto"])

defineProps<{ productos: IProducto[] }>();

const handleEdit = (index: number) => {
  emit('editProducto', index)
}

const handleDelete = (index: number) => {
  emit('deleteProducto', index)
}

</script>

<style scoped>

.form-group-detalle h1 {
    text-align: left;
    color: #333;
}

.form-group-footer {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}


.form-group-detalle {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 1000px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

th {
    background-color: #f2f2f2;
}

.actions {
    display: flex;
    gap: 10px;
}

.edit-btn, .delete-btn {
    border: none;
    background: none;
    
    cursor: pointer;
    font-size: 12px;
}

.edit-btn:hover {
    color: #007bff;
}
.delete-btn:hover {
    color: #dc3545;
}

.form-group-footer {
    font-size: 18px;
    font-weight: bold;
    text-align: right;
    color: #333;
    margin-top: 20px;
    width: 100%;
    max-width: 700px;
}


</style>