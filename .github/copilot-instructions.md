# Copilot Instructions for 3D Portfolio Project

## Project Overview

React-based 3D portfolio application showcasing GIS visualizations, AR experiments, and WebGL/ThreeJS demos. Two workspaces:

- `portfolio/` - Main React/Vite application (primary development focus)
- `hexo-framework/` - Hexo blog (static site generation)

## Architecture & Stack

### Core Technologies

- **Framework**: React 18 + Vite 5 with TypeScript
- **3D Rendering**: React Three Fiber (`@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`)
- **Native Three.js**: Used directly in some demos (see `models/ShaderPattern/`, `models/RickMorty/`)
- **GIS Libraries**: Cesium + Resium wrapper, Mapbox GL
- **Styling**: Tailwind CSS 3.4 + Sass + Stylus (mixed preprocessors)
- **i18n**: react-i18next with locale files in `src/locales/`
- **Routing**: React Router v6 with basename `/about_portfolio`

### Project Structure Pattern

```
src/
  pages/          # Top-level routes (Home, About, Projects, Contact, Arts)
  models/         # 3D components (mix of R3F and vanilla Three.js)
  components/     # Shared UI components
  CesisumDemos/   # Cesium visualization demos (typo is intentional)
  MapboxDemos/    # Mapbox map visualizations
  visualizedDemos/# Data viz (D3, ECharts, Canvas, WebGL)
  CssScene/       # CSS layout experiments (HolyGrail, Float, etc.)
  constants/      # Route configurations and static data
```

## Critical Development Patterns

### 1. Dual 3D Rendering Approaches

**React Three Fiber** (declarative):

```jsx
// Used in: Home.jsx, Contact.jsx, most models/
<Canvas camera={{ near: 0.1, far: 1000 }}>
  <Suspense fallback={<Loader />}>
    <directionalLight position={[1, 1, 1]} intensity={2} />
    <Island isRotating={isRotating} setCurrentStage={setCurrentStage} />
  </Suspense>
</Canvas>
```

**Vanilla Three.js** (imperative):

```jsx
// Used in: models/ShaderPattern/, models/RickMorty/
// Direct THREE.Scene, THREE.Renderer manipulation in useEffect
import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
```

**When to use which**: Use R3F for new 3D components; vanilla Three.js demos are standalone experiments.

### 2. Dynamic Route System

Routes defined in `src/constants/index.js` and mapped in App.jsx:

```jsx
{
  arts.map((route, index) => (
    <Route key={index} path={route.path} element={<route.component />} />
  ))
}
```

Collections: `arts`, `mapboxDemos`, `visualizeDemos`, `cssLayouts`, `cesiumDemos`

### 3. 3D Asset Loading

- **Asset types**: `.glb`, `.gltf`, `.fbx`, `.obj`, `.mtl` configured in `vite.config.ts`
- **Location**: `public/glb-models/`, `public/gltf-models/`
- **DRACO compression**: Available at `public/draco/` for loading compressed models

### 4. Responsive 3D Scaling

Common pattern in models:

```jsx
const adjustIslandForScreenSize = () => {
  let screenScale = window.innerWidth < 768 ? [0.2, 0.2, 0.2] : [0.4, 0.4, 0.4]
  return [screenScale, screenPosition, rotation]
}
```

## Development Workflow

### Build & Deploy

```bash
npm run dev              # Development server
npm run build            # TypeScript check + Vite build
npm run preview          # Preview production build
npm run deploy           # Build + deploy to GitHub Pages (gh-pages)
```

**Base URL**: All routes use `/about_portfolio/` basename (configured in App.jsx and vite.config.ts)

### Styling Preprocessors

Project uses **three** CSS preprocessors:

- Tailwind (primary, configured in `tailwind.config.js`)
- SCSS (`.scss` files, requires `sass` package)
- Stylus (`.styl` files, requires `stylus` package - see `components/modelThreeExp/Earth/index.styl`)

### Adding New Demos

1. Create component in appropriate folder (`models/`, `CesisumDemos/`, etc.)
2. Export from folder's `index.js`
3. Add route object to `src/constants/index.js` (e.g., `arts`, `cesiumDemos`)
4. Route automatically appears in App.jsx mapping

## GIS-Specific Patterns

### Cesium Integration

- Uses `vite-plugin-cesium` for bundling
- Resium wrapper for React integration
- Examples in `src/CesisumDemos/`: 3D tiles, imagery layers, model coloring, data info

### Mapbox Integration

- Direct `mapbox-gl` usage (not Resium-equivalent)
- Examples in `src/MapboxDemos/`: simple maps, story maps (MilkStory)

## Internationalization

- Files: `src/locales/en.json`, `src/locales/zh.json`
- Keys organized by page: `greeting`, `research`, `aboutMe`, `projects`, `contact`, `gallery`
- `LanguageSwitcher` component toggles language globally

## Key Files Reference

- [src/App.jsx](src/App.jsx) - Main routing configuration
- [src/constants/index.js](src/constants/index.js) - Route definitions and static content
- [vite.config.ts](vite.config.ts) - Build config (plugins, aliases, asset types)
- [src/pages/Home.jsx](src/pages/Home.jsx) - Primary 3D scene example
- [src/models/index.js](src/models/index.js) - 3D component exports

## Common Issues

- **Chunk size warnings**: Configured to 1500KB limit in vite.config.ts
- **Asset imports**: Use `assetsInclude` in Vite config for 3D model formats
- **Stylus errors**: Must install `stylus` package for `.styl` file support
- **Routing**: Always test with `/about_portfolio/` base path for production accuracy
