# 📚 Remitee Challenge - Frontend

Aplicación React + TypeScript para gestión de libros, desarrollada con Vite, Redux Toolkit, React Router DOM y Tailwind CSS.

## 🚀 Tecnologías Utilizadas

- **React 19.2** - Framework UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Redux Toolkit** - Gestión de estado global
- **React Router DOM** - Enrutamiento
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Estilos y diseño

## 📋 Características

- ✅ Listado de libros con diseño responsive
- ✅ Paginación (10 libros por página) con navegación Anterior/Siguiente
- ✅ Formulario para agregar nuevos libros con validaciones
- ✅ Selector (dropdown) de categorías consumiendo la API
- ✅ Vista de detalle de cada libro
- ✅ Gestión de estado con Redux Toolkit
- ✅ Manejo de errores y estados de carga
- ✅ Navegación con React Router
- ✅ Diseño moderno con Tailwind CSS

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/aventuracode/RemiteeChallenge.git
cd RemiteeFront
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar .env y configurar la URL del backend
VITE_API_URL=http://localhost:5064/api
```

## 🏃 Ejecutar el Proyecto

### Modo desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`

### Build para producción
```bash
npm run build
```

### Preview del build
```bash
npm run preview
```

## 📁 Estructura del Proyecto

```text
src/
├── App.tsx                     # Componente principal con rutas
├── main.tsx                    # Punto de entrada
├── index.css                   # Estilos globales
├── pages/                      # Páginas/Rutas
│   ├── Home.tsx                # Página principal
│   ├── BookDetail.tsx          # Página de detalle
│   ├── Home/
│   │   └── components/         # Componentes de la Home
│   │       ├── BookCard.tsx
│   │       ├── BookEmpty.tsx
│   │       ├── BookError.tsx
│   │       ├── BookForm.tsx
│   │       └── BookSkeleton.tsx
│   └── BookDetail/
│       ├── BookDetail.tsx
│       └── components/         # Componentes del detalle
└── shared/                     # Módulos compartidos
    ├── services/               # Servicios API
    │   ├── bookService.ts
    │   └── bookService.service.ts
    │   └── categoriaService.ts
    ├── store/                  # Redux
    │   ├── store.ts
    │   ├── hooks.ts
    │   └── slices/
    │       └── booksSlice.ts
    └── types/                  # Definiciones TypeScript
        ├── book.type.ts
        ├── booksState.type.ts
        ├── categoria.type.ts
        └── paginatedResponse.type.ts
```


## 🔌 API Backend

La aplicación espera que el backend .NET exponga los siguientes endpoints:

- `GET /api/Libro?PageIndex=1&PageSize=10` - Obtener libros paginados
- `GET /api/Libro/{id}` - Obtener un libro por ID
- `POST /api/Libro` - Crear un nuevo libro
- `GET /api/Categoria` - Obtener todas las categorías
- `GET /api/Categoria/{id}` - Obtener una categoría por ID

### Formato de datos
```typescript
interface Book {
  id: number;
  titulo: string;
  autor: string;
  descripcion: string;
  categoriaId: number;
  categoriaNombre: string;
  createdAt: string;
}

interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
}
```

### Crear libro (payload)
```typescript
{
  titulo: string;
  autor: string;
  descripcion: string;
  categoriaId: number;
}
```

### Respuesta paginada
```typescript
{
  count: number;
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  data: Book[];
}
```

## 🎨 Rutas de la Aplicación

- `/` - Home con listado de libros y formulario
- `/libro/:id` - Detalle de un libro específico

## 📄 Paginación

- Por defecto se muestran **10 libros** por página.
- El listado incluye botones **Anterior** y **Siguiente** para navegar.
- Al crear un libro nuevo, se recarga la primera página.

## 🧪 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila para producción
- `npm run preview` - Preview del build de producción
- `npm run lint` - Ejecuta ESLint

## ⚙️ Configuración Adicional

### Tailwind CSS
Configurado en `tailwind.config.js` y `postcss.config.js`

### TypeScript
Configuración en `tsconfig.json` y `tsconfig.app.json`

## 📝 Notas
