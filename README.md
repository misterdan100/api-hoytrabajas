# API REST - HoyTrabajas

Este proyecto es una API REST básica para manejar productos y un carrito de compras, esta construida bajo la arquitectura MVC usando Node.js para el backend y Next.js para el frontend, todo en TypeScript.

# Backend
Se eligió crear el backend en un proyecto independiente utilizando Node.js y Express.js. La estructura de archivos separa las funcionalidades server, router y controladores para las diferentes peticiones HTTP.

## Endpoints principales
- `GET /products` — Devuelve la lista de productos.
- `GET /cart` — Devuelve el carrito actual.
- `POST /cart` — Agrega un producto al carrito (requiere `{ productId }` en el body).

El archivo `productos.json` contiene los productos de ejemplo.
## Instalación y Ejecución

1. Abre el proyecto y navega a la carpeta `backend`:
   ```sh
   cd backend
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Para iniciar el servidor en modo desarrollo:
   ```sh
   npm run dev
   ```


- Puedes configurar el puerto en el archivo `.env` usando la variable `PORT`. Por defecto es 4000.


# Frontend
El frontend está construido con Next.js (App Router) y TypeScript. Utiliza Server Components y Server Actions para conectarse con la API de forma eficiente. La UI esta diseñada con una arquitectura de componentes modulares que favorece el mantenimiento y reutilización. También se hace una implementación ligera de Context para mostrar el estado global del carrito.

## Instalación
1. Navega a la carpeta `frontend`:
   ```sh
   cd frontend
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Configura la URL del backend en las variables de entorno:
   ```sh
   # Crea un archivo .env.local y agrega la direccion del backend
   NEXT_PUBLIC_API_URL=http://localhost:4000
   ```
4. Inicia proyecto en modo desarrollo:
   ```sh
   npm run dev
   ```
- La aplicación estará disponible (por defecto) en: http://localhost:3000

## Rutas Principales
- `/` Lista de productos.
- `/cart` Carrito de compras.
- `/presupuesto` Herramienta de selección de productos según presupuesto.

# Lógica
Para la implementación del ejercicio de lógica se buscó obtener la combinación de productos que en conjunto utilizaran la mayor cantidad del presupuesto sin excederlo.

Recibiendo una lista de productos se procede a verificar las condiciones directas para encontrar productos que encagen con el presupuesto, si no se cumplen, la lista se ordena por precio y de manera descendente para en ultimas ser recorrida agregando en un array resultante de manera eficiente los productos que no excedan y que consuman la mayor cantidad del presupuesto.

### Pasos
1. Seleccionar productos dentro del rango del presupuesto

   `product.price <= budget`
2. Comprobar caso: no hay productos dentro del presupuesto

   `if (rangeProducts.length === 0) return []`
3. Comprobar caso: solo hay un producto dentro del rango

   `if (rangeProducts.length === 1) return rangeProducts`
4. Comprobar caso: buscar si hay un producto que utilice todo el presupuesto

   `.find() && if (product.price === budget) return [product]`
5. Si no se cumplen los casos anteriores, se ordena la lista (productos dentro del presupuesto) por precio de manera descendente.
6. Se crea una lista resultante y se agregar el producto de mayor valor dentro del rango.
7. Se recorre el resto de la lista agregando los productos de mayor valor posible sin exceder el presupuesto

## Ejemplo
### Input
```
[
   { "id": 1, "name": "Producto 1", "price": 60 },
   { "id": 2, "name": "Producto 2", "price": 100 },
   { "id": 3, "name": "Producto 3", "price": 120 },
   { "id": 4, "name": "Producto 4", "price": 70 }
]
```

### Output
```
[
   { "id": 1, "name": "Producto 1", "price": 60 },
   { "id": 4, "name": "Producto 4", "price": 70 }
]
```
### Implementación Frontend
En la dirección `/presupuesto` se puede acceder a la implantación del ejercicio, se ingresa un valor de presupuesto mediante un input el cual sera calculado con la función `findBestCombination()` y devolverá de manera eficiente una lista de productos para el presupuesto dado.

Se renderiza un componente de resumen del presupuesto el cual indica la cantidad de productos, el valor total a gastar y el valor sobrante si lo hubiera.

Ademas se reutiliza el componente de `ProductList` para mostrar los productos seleccionados en el presupuesto.

Desarrollado por Daniel Merchan Caceres
