# 📘 LinkMaster - Documentación Técnica

**Versión:** 1.0.0  
**Estado:** Production Ready (Frontend)  
**Fecha:** Octubre 2023

---

## 1. Ficha Técnica

Resumen ejecutivo de las tecnologías y especificaciones del proyecto.

| Categoría | Especificación | Detalles |
| :--- | :--- | :--- |
| **Nombre del Proyecto** | LinkMaster | Plataforma de Bio-Enlaces y Catálogo Digital |
| **Tipo de Aplicación** | SPA (Single Page Application) | Renderizado del lado del cliente (CSR) |
| **Framework Principal** | React 19 | Hooks, Functional Components |
| **Lenguaje** | TypeScript | Tipado estricto (Interfaces compartidas) |
| **Estilos** | Tailwind CSS | Utility-first CSS, Diseño Responsivo |
| **Enrutamiento** | React Router DOM v6 | Manejo de rutas dinámicas (`/:username`) |
| **Animaciones** | Framer Motion | Transiciones de interfaz y micro-interacciones |
| **Inteligencia Artificial** | Google Gemini API | Generación de Bios y Optimización de Productos |
| **Iconografía** | Lucide React | Iconos SVG optimizados |
| **Gestión de Estado** | React State (Lifted) | Estado centralizado en `App.tsx` |
| **Dependencias Clave** | `@google/genai`, `framer-motion` | SDK oficial de Gemini, Librería de animación |

---

## 2. Visión General del Proyecto

**LinkMaster** es una aplicación web diseñada para resolver la fragmentación de la identidad digital. Permite a usuarios (creadores de contenido, empresas y profesionales) crear un micro-sitio web personalizado ("Link in Bio") que centraliza:

1.  **Enlaces Sociales:** Redirección a redes, webs y portafolios con detección automática de marca.
2.  **Catálogo de Productos:** Tarjetas de productos con precios, imágenes y descripciones mejoradas por IA.
3.  **Datos Financieros:** Información bancaria segura para recibir pagos (formato LATAM/Global).
4.  **Información Corporativa:** Tarjetas de presentación digital para empresas con validación de datos.
5.  **Analíticas:** Visualización de métricas de rendimiento (Visitas, Clicks, CTR).

El sistema se distingue por su capacidad de **Previsualización en Tiempo Real** (móvil y escritorio) y su integración nativa con **Inteligencia Artificial** para asistir en la redacción de contenido.

---

## 3. Arquitectura del Sistema

La aplicación sigue una arquitectura de componentes modular basada en características.

### 3.1 Estructura de Directorios

```text
/
├── index.html              # Punto de entrada, polyfills y configuración de Tailwind/ImportMap
├── src/
│   ├── App.tsx             # Componente Raíz, Enrutador y Estado Global
│   ├── index.tsx           # Montaje de React
│   ├── types.ts            # Definiciones de Tipos TypeScript (Contrato de datos)
│   │
│   ├── components/
│   │   ├── Dashboard.tsx       # Contenedor principal del panel de administración
│   │   ├── LandingPage.tsx     # Página de inicio / Marketing
│   │   ├── MobilePreview.tsx   # Componente polimórfico (Vista previa y Perfil público)
│   │   ├── PublicProfile.tsx   # Wrapper lógico para la ruta pública /:username
│   │   │
│   │   └── dashboard/          # Sub-módulos del Dashboard
│   │       ├── AnalyticsView.tsx    # Visualización de datos y gráficas
│   │       ├── AppearanceEditor.tsx # Editor de temas, colores y perfil
│   │       ├── BankEditor.tsx       # Gestión de cuentas bancarias
│   │       ├── BusinessEditor.tsx   # Gestión de datos corporativos
│   │       ├── LinkEditor.tsx       # CRUD de enlaces
│   │       ├── ProductEditor.tsx    # CRUD de productos + IA
│   │       └── Sidebar.tsx          # Navegación del dashboard
│   │
│   └── services/
│       └── geminiService.ts    # Capa de comunicación con Google Gemini API
└── metadata.json           # Metadatos de la aplicación
```

### 3.2 Flujo de Datos

1.  **Estado Central:** El estado de los perfiles (`UserProfile[]`) reside en `App.tsx`.
2.  **Dashboard:** Recibe el estado y funciones de actualización (`setProfiles`). Distribuye sub-estados a los editores (`LinkEditor`, `ProductEditor`, etc.).
3.  **Vista Pública:** El `PublicProfile` lee el parámetro de la URL (`useParams`), busca el perfil en el estado global y renderiza `MobilePreview` en modo `standalone`.

---

## 4. Características Clave y Detalles Técnicos

### 4.1 Motor de Temas (Theme Engine)
El sistema utiliza un identificador de tema (`ThemeId`) definido en `types.ts`.
*   **Implementación:** `MobilePreview.tsx` contiene un objeto de configuración (`getThemeConfig`) que mapea cada ID a un conjunto de clases de Tailwind CSS.
*   **Temas soportados:** Más de 20 temas predefinidos (Agate, Astrid, Cyber, Luxury, etc.) y un modo "Custom" que permite inyección de colores hexadecimales o imágenes de fondo.

### 4.2 Integración con IA (Gemini)
Ubicación: `services/geminiService.ts`.
*   **Generador de Bios:** Toma el nombre y palabras clave, construye un prompt optimizado y solicita a Gemini Flash 2.5 una biografía corta.
*   **Optimizador de Productos:** Reescribe descripciones de productos para maximizar la conversión.
*   **Seguridad:** Incluye verificación de `process.env` para evitar caídas en entornos sin variables de entorno inyectadas.

### 4.3 Sistema de Enrutamiento
Utiliza `react-router-dom` con un `BrowserRouter`.
*   `/`: Landing Page.
*   `/dashboard`: Panel de administración.
*   `/:username`: Ruta dinámica para perfiles públicos.

---

## 5. Modelo de Datos (TypeScript)

Interfaz principal `UserProfile` en `types.ts`:

```typescript
interface UserProfile {
  id: string;
  username: string; // Slug único para la URL
  theme: ThemeId;   // Identificador del tema visual
  appearance: {
    buttonShape: 'pill' | 'rounded' | 'square';
    socialLayout: 'list' | 'top_row' | 'bottom_row';
    customBackground?: string;
    // ...
  };
  links: Link[];           // Array de enlaces
  products: Product[];     // Array de productos (Catálogo)
  bankAccounts: BankAccount[]; // Array de cuentas bancarias
  businessInfo: BusinessInfo;  // Objeto de información fiscal
}
```

---

## 6. Instalación y Despliegue

### Requisitos
*   Navegador moderno (Soporte ES Modules).
*   API Key de Google Gemini (Configurada en el entorno).

### Configuración de Entorno
El proyecto utiliza un `importmap` en `index.html` para gestionar dependencias sin necesidad de un paso de compilación local complejo, ideal para prototipado rápido y entornos como AI Studio.

Para producción, se recomienda configurar las variables de entorno para la API Key de Gemini:
`API_KEY=tu_clave_aqui`

---

## 7. Roadmap Sugerido

1.  **Backend Real:** Implementar persistencia con Firebase o Supabase.
2.  **Autenticación:** Reemplazar el login simulado por autenticación real (OAuth).
3.  **Subida de Imágenes:** Integrar almacenamiento en la nube (AWS S3) para avatares.
4.  **Pagos:** Integrar Stripe en el catálogo de productos.
