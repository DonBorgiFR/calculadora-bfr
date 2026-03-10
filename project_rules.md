# 👑 Calculadora BFR - Reglas del Proyecto y Agente (Antigravity)

Este documento establece las normativas estrictas de desarrollo, arquitectura y estilo para la **Calculadora de Sueldo BFR**. Cualquier asistente de IA (como Antigravity) o desarrollador humano debe acatar estas directrices antes de modificar el código.

## 1. Stack Tecnológico Base
- **Framework:** React 19 con TypeScript estricto.
- **Build Tool:** Vite.
- **Estilos:** Tailwind CSS v4 (Mobile-First, atomic design).
- **Visualización de Datos:** Recharts.
- **Testing:** Vitest (Obligatorio para la lógica core).

## 2. Reglas de Arquitectura y Código
- **Separación de Responsabilidades:** La lógica de cálculo pura DEBE vivir separada de los componentes UI. El core matemático está centralizado (ej. `src/lib/salary-engine.ts`).
- **TypeScript Estricto:** Está terminantemente prohibido el uso de `any` o ignorar advertencias de tipado (`@ts-ignore`) salvo extrema necesidad fundamentada en dependencias externas.
- **Evitar Breaking Changes:** Antes de modificar el motor de cálculo, ejecutar la suite de tests (`npm run test`). Un commit nunca debe romper la fiabilidad matemática de los impuestos.

## 3. Filosofía UI/UX (Visual Excellence)
- **Estética Premium:** La aplicación prioriza un estilo moderno, "Tech-Fin", con **Dark Mode por defecto** y elementos de **Glassmorphism** (fondos translúcidos, bordes sutiles, desenfoques).
- **Responsive / Mobile-First:** El 80% de los reclutadores abrirán el enlace desde el móvil (LinkedIn). La interfaz debe ser impecable en pantallas pequeñas (evitar overflows horizontales, fuentes legibles, botones táctiles grandes).
- **Micro-interacciones:** Las transiciones de estado, pestañas o recálculos deben sentirse fluidos (idealmente apoyados por librerías como Framer Motion o transiciones nativas de CSS/Tailwind).

## 4. Instrucciones Específicas para el Agente (Antigravity)
- **Priorizar el ROI (Retorno de Inversión):** Enfocarse en tareas que maximicen el impacto visual frente a un potencial empleador o reclutador técnico (Lead Magnet).
- **Cruce de Datos:** Asegurar que los datos viajen entre módulos (ej. el Salario Neto resultante debe alimentar el Dashboard de Coste de Vida y la Proyección de Inflación).
- **Comentarios y Documentación:** Documentar algoritmos complejos en el código de forma sucinta.

> **Objetivo Final:** Demostrar el mayor nivel posible de ingeniería de software front-end y experiencia de usuario para consolidar el portafolio profesional de Borja Felix Rojas.
