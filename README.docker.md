# Despliegue de Mintaka con Docker

Este documento proporciona instrucciones para desplegar Mintaka como un contenedor Docker, especialmente configurado para Coolify.

## Archivos incluidos

- `Dockerfile`: Configuración para construir la imagen de Docker
- `.dockerignore`: Lista de archivos y directorios excluidos del contexto de construcción
- `docker-compose.yml`: Configuración para desplegar el servicio con Docker Compose

## Puerto expuesto

El servicio está configurado para ejecutarse en el puerto **3055**.

## Instrucciones para despliegue local

### Usando Docker Compose (recomendado)

1. Asegúrate de tener Docker y Docker Compose instalados en tu sistema
2. Navega al directorio raíz del proyecto donde se encuentra el archivo `docker-compose.yml`
3. Ejecuta el siguiente comando para construir y iniciar el contenedor:

```bash
docker-compose up -d
```

4. La aplicación estará disponible en: http://localhost:3055

### Usando Docker directamente

1. Construye la imagen:

```bash
docker build -t mintaka .
```

2. Ejecuta el contenedor:

```bash
docker run -d -p 3055:3055 --name mintaka mintaka
```

3. La aplicación estará disponible en: http://localhost:3055

## Despliegue en Coolify

Para desplegar en Coolify:

1. En el panel de Coolify, crea un nuevo servicio
2. Selecciona la opción de despliegue desde un repositorio Git
3. Conecta con tu repositorio que contiene estos archivos
4. En la configuración de construcción, asegúrate de que:
   - El tipo de construcción sea "Dockerfile"
   - El puerto expuesto sea "3055"
5. Completa la configuración adicional según sea necesario y despliega

## Variables de entorno

El contenedor está configurado con `NODE_ENV=production` por defecto. Si necesitas configurar variables de entorno adicionales, puedes añadirlas en el archivo `docker-compose.yml` o configurarlas en Coolify.

## Notas adicionales

- La imagen utiliza Node.js 20 Alpine como base para minimizar el tamaño
- Se utiliza Bun para la instalación de dependencias y construcción
- La aplicación se sirve utilizando el comando `bun run preview`