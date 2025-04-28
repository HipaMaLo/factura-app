# Factura App

Proyecto hecho en Vue 3.

## Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Conceptos Básicos](#vue-3-conceptos-clave)


## Descripción

Factura App es una demo desarrollada en Vue 3 que tiene como objetivo practicar los conceptos básicos de Vue 3.

## Características

- Interfaz moderna y fácil de usar.
- Construido con tecnologías modernas como Vue 3.

## Tecnologías Utilizadas

El proyecto utiliza las siguientes tecnologías:

- **Vue 3**: Framework progresivo para construir interfaces de usuario.
- **HTML**: Lenguaje de marcado para estructurar el contenido web.
- **JavaScript**: Lenguaje de programación para la lógica de la aplicación.
- **TypeScript**: Superset de JavaScript que añade tipado estático.

## Instalación

Sigue estos pasos para instalar el proyecto en tu máquina local:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/HipaMaLo/factura-app.git

2. Navega al directorio del proyecto:
   ```bash
   cd factura-app
   ```

3. Instala las dependencias:
   ```bash
   npm install

4. Para iniciar el proyecto en un entorno de desarrollo, ejecuta:
   ```bash
   npm run dev
   ```

## Vue 3 Conceptos Clave

## 1. Props (`defineProps`)
### Qué es:
Forma en que un componente hijo recibe datos del componente padre.

### Ejemplo tuyo:
En `FacturaMaestro.vue` tienes:

```typescript
const props = defineProps({
  productoEditar: {
    type: Object as () => IProducto | null,
    default: null
  }
})
```

### Función:
El padre (`FacturaComponente.vue`) manda el `productoEditar` al hijo (`FacturaMaestro.vue`).

## 2. Emitir eventos (`defineEmits`)
### Qué es:
Forma en que un componente hijo envía eventos hacia el padre.

### Ejemplo tuyo:
```typescript
const emit = defineEmits(['addProducto'])
emit('addProducto', producto)
```

### Función:
El hijo (`FacturaMaestro.vue`) avisa al padre que agregaste un producto.

## 3. Reactividad (`ref`, `reactive`, `computed`)
### Qué es:
Hacer que los datos sean reactivos (si cambian, la UI también cambia automáticamente.

### Ejemplo tuyo:
```typescript
const productos = ref<IProducto[]>([])
const producto = ref<IProducto>({
  nombre: '', precio: 0, cantidad: 0, totalitem: 0
})
```

### Función:
Cada vez que agregas productos o editas, la tabla se actualiza sola.

## 4. Watchers (`watch`)
### Qué es:
Escuchar cambios en variables y reaccionar cuando cambian.

### Ejemplo tuyo:
```typescript
watch(() => props.productoEditar, (nuevo) => {
  producto.value = { ...nuevo }
})
```

### Función:
Cuando quieres editar un producto, el formulario se llena solo.

## 5. v-model personalizado
### Qué es:
Comunicación bidireccional entre padre e hijo automáticamente.

### Ejemplo tuyo:
```html
<FacturaDetalle v-model:visibleRow="visibleRow" />
```

### Función:
El padre controla si una fila del detalle debe mostrarse o no.

## 6. Directivas Vue (`v-for`, `v-if`, `v-show`, `v-on`, `v-bind`, `v-model`)
Estas son palabras especiales que Vue entiende en el template.

| Directiva | Qué hace | Ejemplo tuyo |
|:----------|:---------|:-------------|
| v-for     | Repetir elementos | `<tr v-for="(item, index) in productos">` |
| v-on (@)  | Escuchar eventos | `<button @click="handleEdit(index)">` |
| v-bind (:) | Pasar datos dinámicos | `<FacturaDetalle :productos="productos" />` |
| v-model   | Sincronizar datos automáticamente | `<input v-model="producto.nombre" />` |
| v-show    | Mostrar u ocultar sin quitar del DOM | `v-show="visibleRow !== index"` |
