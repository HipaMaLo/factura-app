<template>
  <div class="form-group-detalle">
    <h2>PRODUCTS</h2>
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in productos" :key="index" v-show="visibleRow !== index">
          <td>{{ item.nombre }}</td>
          <td>{{ formatCurrency(item.precio) }}</td>
          <td>{{ item.cantidad }}</td>
          <td>{{ formatCurrency(item.totalitem) }}</td>
          <td class="actions">
            <button @click="handleEdit(index)" class="edit-btn">✏️ Edit</button>
            <button @click="handleDelete(index)" class="delete-btn">❌ Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits, defineProps } from 'vue'
import type { IProducto } from '../types/IProducto'
import { formatCurrency } from '../utilities/formatCurrency'

const emit = defineEmits(["editProducto", "deleteProducto", "update:visibleRow", "update:productos"])

const props = defineProps({

  visibleRow: {
    type: Number,
    default: null
  },

  productos: {
    type: Array as () => IProducto[],
    default: () => []
  }
  
})

const visible = ref(props.visibleRow)

watch(() => props.visibleRow, (nuevo) => {
  visible.value = nuevo
})

const handleEdit = (index: number) => {
  emit('editProducto', index)
  emit('update:visibleRow', index)
}

const handleDelete = (index: number) => {
  emit('deleteProducto', index)
}
</script>

<style scoped>


h2 {
  margin-bottom: 20px;
  color: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f9f9f9;
  text-align: left;
}

.actions {
  display: flex;
  gap: 10px;
}

.edit-btn, .delete-btn {
  border: none;
  background: none;
  cursor: pointer;
  font-weight: bold;
}

.edit-btn {
  color: #007bff;
}

.edit-btn:hover {
  text-decoration: underline;
}

.delete-btn {
  color: #dc3545;
}

.delete-btn:hover {
  text-decoration: underline;
}
</style>
