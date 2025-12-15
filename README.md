# RemiteChallenge

Backend construido con ASP.NET Core Web API.

## Requisitos

- .NET SDK 9
- SQL Server (LocalDB, Express o instancia completa)

## Estructura del repositorio

```text
RemiteeChallenge/
├── RemiteeChallenge/                  # Solución .NET
│   ├── RemiteeChallenge.sln
│   ├── Remitee.WebApi/                # API (Startup/Controllers/Swagger)
│   ├── Remitee.Business/              # Acceso a datos + lógica
│   └── Remitee.Core/                  # Entidades, interfaces y specifications
└── RemiteeFront/                      # Frontend (Vite + React)
```

## Configuración

La API usa SQL Server vía EF Core. La connection string está en:

`RemiteeChallenge/Remitee.WebApi/appsettings.json`

Clave:

- `ConnectionStrings:DefaultConnection`

Ejemplo (del repo):

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=PC10\\SQLEXPRESS; Database=remiteedb; Integrated Security=True; TrustServerCertificate=True"
  }
}
```

Actualizala para que apunte a tu instancia de SQL Server.

## Ejecutar el backend

Desde la raíz del repo:

```bash
dotnet restore RemiteeChallenge/RemiteeChallenge.sln
dotnet build RemiteeChallenge/RemiteeChallenge.sln
dotnet run --project RemiteeChallenge/Remitee.WebApi/Remitee.WebApi.csproj
```

Al iniciar:

- Se ejecutan migraciones automáticamente (`Database.MigrateAsync()`).
- Se carga data inicial (seed) vía `RemiteeDbContextData.CargarDataAsync(...)`.

## Swagger

Swagger queda expuesto en la raíz del sitio (RoutePrefix vacío). En desarrollo normalmente lo vas a ver en algo como:

- `http://localhost:5064/`

El puerto puede variar según tu perfil/entorno.

## Endpoints

La ruta base para controllers es `api/[controller]`.

### Libros

- `GET /api/libro`
  - Soporta paginación/filtros por query string (ver `LibroSpecificationParams`).
  - Respuesta paginada: `Pagination<LibroDto>`.
- `GET /api/libro/{id}`
  - Devuelve `404` si no existe.
- `POST /api/libro`
  - Crea un libro.
  - Devuelve `201` con el libro creado.

#### Paginación

Ejemplo:

- `GET /api/libro?PageIndex=1&PageSize=10`

Notas:

- Por defecto los resultados se ordenan por `CreatedAt` descendente (libros más recientes primero).
- `PageIndex` comienza en `1`.

#### Ejemplo de payload para crear un libro

```json
{
  "titulo": "Hábitos Atómicos",
  "autor": "James Clear",
  "descripcion": "Cómo construir hábitos positivos y eliminar los negativos",
  "categoriaId": 1
}
```

#### Ejemplo de respuesta paginada

```json
{
  "count": 34,
  "pageIndex": 1,
  "pageSize": 10,
  "pageCount": 4,
  "data": [
    {
      "id": 31,
      "titulo": "Hábitos Atómicos",
      "autor": "James Clear",
      "descripcion": "Cómo construir hábitos positivos y eliminar los negativos",
      "categoriaId": 1,
      "categoriaNombre": "Poesía",
      "createdAt": "2025-12-15T05:07:46.685395"
    }
  ]
}
```

### Categorías

- `GET /api/categoria`
- `GET /api/categoria/{id}`

## CORS

Hay una policy `CorsRule` habilitada en `Startup.cs`.

## Notas
