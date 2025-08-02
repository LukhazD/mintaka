# Despliegue de Mintaka con Docker

Este documento proporciona instrucciones para desplegar Mintaka como un contenedor Docker, especialmente configurado para Coolify.

## Archivos incluidos

- `Dockerfile`: Configuración para construir la imagen de Docker usando Node.js y pnpm
- `.dockerignore`: Lista de archivos y directorios excluidos del contexto de construcción
- `docker-compose.yml`: Configuración para desplegar el servicio con Docker Compose
- `.npmrc`: Configuración de npm modificada para usar la versión estándar de GSAP

## Puertos expuestos

El servicio está configurado para ejecutarse internamente en el puerto **3055**, pero se expone externamente en el puerto **80** (HTTP estándar) a través de un proxy inverso Nginx.

## Instrucciones para despliegue local

### Usando Docker Compose (recomendado)

1. Asegúrate de tener Docker y Docker Compose instalados en tu sistema
2. Navega al directorio raíz del proyecto donde se encuentra el archivo `docker-compose.yml`
3. Ejecuta el siguiente comando para construir y iniciar el contenedor:

```bash
docker-compose up -d
```

4. La aplicación estará disponible en: http://localhost

### Usando Docker directamente

1. Construye la imagen:

```bash
docker build -t mintaka .
```

2. Ejecuta el contenedor:

```bash
docker run -d -p 80:3055 --name mintaka mintaka
```

3. La aplicación estará disponible en: http://localhost

## Despliegue en Coolify

Para desplegar en Coolify:

1. En el panel de Coolify, crea un nuevo servicio
2. Selecciona la opción de despliegue desde un repositorio Git
3. Conecta con tu repositorio que contiene estos archivos
4. En la configuración de construcción, asegúrate de que:
   - El tipo de construcción sea "Dockerfile"
   - El puerto expuesto sea "80" (para acceso externo) y "3055" (para comunicación interna)
5. Completa la configuración adicional según sea necesario y despliega

## Variables de entorno

El contenedor está configurado con `NODE_ENV=production` por defecto. Si necesitas configurar variables de entorno adicionales, puedes añadirlas en el archivo `docker-compose.yml` o configurarlas en Coolify.

## Configuración del proxy inverso

El proyecto incluye una configuración de proxy inverso con Nginx para redirigir el tráfico del puerto 80 (HTTP estándar) al puerto 3055 donde se ejecuta la aplicación:

- `nginx.conf`: Archivo de configuración de Nginx que define cómo se redirige el tráfico
- `docker-compose.override.yml`: Añade un servicio de Nginx que actúa como proxy inverso

Esta configuración permite:

1. Acceder a la aplicación a través del puerto estándar HTTP (80)
2. Implementar reglas de caché y compresión a nivel de servidor web
3. Facilitar la configuración de SSL/TLS en el futuro

## Notas adicionales

- La imagen utiliza Node.js 20 Alpine como base para minimizar el tamaño
- Se utiliza pnpm para la instalación de dependencias y construcción
- La aplicación se sirve utilizando el comando `pnpm run preview`
- Se ha modificado la dependencia de GSAP para usar la versión estándar (3.12.7) en lugar de la versión business que requiere licencia premium
- El proxy inverso Nginx está configurado para manejar correctamente las conexiones WebSocket y las cabeceras HTTP