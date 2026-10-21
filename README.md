# ✦ Portafolio Profesional — Juliana Rincón
### Profesional en Mercadeo y Publicidad • Creative & Growth Strategist

Portafolio web avanzado con diseño editorial y tecnológico de alto impacto, optimizado para conversión, branding y presentación de casos de éxito. Incluye panel de control CMS privado en `/admin` con gestión integral (CRUD completo) de todos los contenidos y selector de temas.

---

## 🚀 Cómo Ejecutar Localmente

```bash
cd "Portfolio Juliana"
npm install
npm run dev
```

- **Sitio Web Público:** [http://localhost:5174/](http://localhost:5174/) (o puerto asignado por Vite)
- **Panel CMS Privado (Oculto):** [http://localhost:5174/admin](http://localhost:5174/admin)

---

## 🔐 Panel CMS Privado (`/admin`)

El portafolio público es 100% limpio y no muestra ningún botón, candado o indicador de administración. La administración se realiza exclusivamente desde la ruta oculta `/admin`.

- **Contraseña de acceso inicial:** `juliana2025` (personalizable desde la pestaña de Ajustes).

### 🛠️ Módulos con CRUD Completo (Crear, Ver, Editar y Eliminar):

1. **💼 Proyectos & Casos de Éxito**:
   - Crear nuevos proyectos con título, cliente, año, categoría, métrica destacada (ej. `+340% ROAS`), resumen, reto, estrategia, resultados y canales.
   - Carga de imágenes por URL o **subida directa desde tu computadora** (almacenamiento local optimizado).
   - Edición y eliminación con un clic.

2. **⚡ Servicios & Capacidades**:
   - Añadir nuevas áreas de servicio con título, subtítulo, descripción detallada, selector de ícono visual y lista de entregables clave.
   - Edición y eliminación en tiempo real.

3. **🛠 Herramientas & Stack Tecnológico**:
   - Crear nuevas herramientas indicando el software (Meta Ads, GA4, Semrush, etc.), categoría (Pauta, Analítica, Diseño, CRM, Estrategia) y nivel/etiqueta.
   - Edición y eliminación inmediata.

4. **🎓 Educación & Certificaciones**:
   - Añadir títulos universitarios y certificaciones oficiales con institución, periodo, tipo y número de credencial o mención de honor.
   - Edición y eliminación en tiempo real.

5. **⭐ Testimonios de Clientes**:
   - Añadir nuevas recomendaciones con nombre del autor, cargo, empresa, avatar (URL o carga de archivo local), métrica lograda y cita.
   - Edición y eliminación con confirmación.

6. **🧭 Metodología & Fases de Trabajo**:
   - Edición de cada una de las 5 fases del proceso de marketing (número de fase, título, tagline y descripción).

7. **👤 Perfil, CV & Textos sobre la Foto**:
   - Edición de nombre, titular principal, bio corta, bio extendida, foto de portada (URL o archivo local).
   - **Textos Flotantes sobre la Foto**: Personaliza el badge superior (ej. *"Abierta a Contratación Remota"*), el título inferior (*"Impacto & Performance"*), la métrica (*"+4.8x Retorno Promedio Logrado"*) y la etiqueta (*"Data-Driven"*).
   - Carga directa de tu CV en PDF o enlace a Drive/Dropbox.
   - Datos de contacto (WhatsApp, email, ubicación) y redes sociales.

8. **📊 Métricas Clave**:
   - Edición de las 4 cifras estrella del hero (Años, Campañas, ROAS promedio, Marcas).

9. **🎨 Tema Visual & Ajustes**:
   - Selector de los 3 temas visuales:
     - **Obsidian Noir**: Dark luxury con glassmorphism y acentos cian/violeta (Referencia 1).
     - **Editorial Sage**: Pergamino cálido con verde oliva y serif clásica (Referencia 2).
     - **Swiss Crimson**: Contraste editorial suizo con acento rojo carmesí (Referencia 3).
   - Cambio de contraseña de acceso a `/admin`.
   - Exportación de copia de seguridad (JSON) y restauración desde archivo.

---

## 📦 Despliegue en Servidor (Vercel / Netlify / Hostinger)

1. Sube este repositorio a tu cuenta de GitHub.
2. En [Vercel](https://vercel.com) o [Netlify](https://netlify.com), importa el repositorio.
3. El comando de compilación es `npm run build` y la carpeta de publicación es `dist`.
