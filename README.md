# Comando Rápido - Studio Pro v4.0

### Elite Command Generator for Servers & Systems

**Comando Rápido** es una aplicación web de alto rendimiento diseñada para administradores de servidores y entusiastas técnicos que necesitan generar comandos complejos de forma rápida, precisa y con una interfaz de nivel profesional. Inspirada en los flujos de trabajo de "Anti-Slop", la aplicación prioriza la legibilidad, la estética y la eficiencia operativa.

---

## 🚀 Características Principales

- **Multi-Entorno:** Soporte completo para **Minecraft Server**, **Project Zomboid**, **Linux Terminal**, **Windows CMD/PS** y **macOS Darwin**.
- **Lógica Dinámica:** Los parámetros se repueblan condicionalmente según el juego o sistema seleccionado.
- **UI Pro (Taste Skill v2):** Interfaz limpia con tipografía avanzada, espaciado premium y animaciones fluidas con Framer Motion.
- **Multilingüe:** Soporte nativo para Inglés y Español.
- **Responsive Estricto:** Diseño adaptado para escritorio y móvil con control total de desbordamientos (Container Strictness).
- **Copiado Rápido:** Salida tipo terminal con integración directa al portapapeles.

---

## 🛠️ Instalación y Desarrollo

La aplicación está construida con **Next.js 15**, **React 19**, **Tailwind CSS** y **ShadCN UI**. Es compatible con todos los gestores de paquetes modernos.

### Requisitos Previos
- Node.js 18.x o superior.

### Instalación con NPM
```bash
npm install
npm run dev
```

### Instalación con PNPM (Recomendado)
```bash
pnpm install
pnpm dev
```

### Instalación con Yarn
```bash
yarn install
yarn dev
```

---

## 🧠 Lógica de la Aplicación

1. **Estado Centralizado:** El componente `PageContent` gestiona el sistema operativo o juego seleccionado.
2. **Contexto de Idioma:** Un `LanguageProvider` envuelve la aplicación para manejar traducciones instantáneas sin recargas.
3. **Mapeo de Datos:** Los comandos se cargan desde un archivo de datos estructurado (`commands-data.ts`) que define sintaxis, descripciones y tipos de parámetros (texto, selector, número).
4. **Seguridad de Interfaz:** Se utilizan técnicas de `overflow-hidden` y `break-words` para asegurar que el contenido nunca rompa los contenedores padres, manteniendo la estructura intacta en cualquier resolución.

---

## 🔮 Futuro Escalable

Esta aplicación ha sido diseñada como un núcleo (Core) que puede expandirse hacia:

1. **Integración RCON/WebSockets:** Enviar comandos directamente a servidores de juegos en tiempo real.
2. **Persistencia de Datos:** Conectar con Firebase para guardar "presets" de comandos personalizados por el usuario.
3. **Creador de Comandos Custom:** Una interfaz para que los administradores definan sus propios esquemas de comandos.
4. **Módulo de IA:** (Desactivado actualmente por requerimiento) Podría re-integrarse para sugerir parámetros basados en logs del servidor.
5. **API de Automatización:** Permitir que scripts externos consulten la sintaxis de comandos correcta.

---

## 📄 Licencia

MIT License - Desarrollado con ❤️ para la comunidad de Gaming y DevOps.
