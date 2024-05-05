# Plataforma de Gestión de Eventos

Este repositorio contiene la implementación de una API RESTful para una plataforma de gestión de eventos. La API permite a los usuarios realizar operaciones CRUD en eventos, registrar asistentes, consultar información sobre eventos y lugares cercanos, entre otras funcionalidades.

## Requerimientos del Sistema

- Docker
- Node.js
- PostgreSQL
- Express (framework para construir servidores web)
- Mapbox API Key (para la funcionalidad de ubicaciones cercanas)

## Instalación y Configuración

1. Clona este repositorio en tu máquina local:

    ```bash
    git clone https://github.com/nicolas11258/coordinadora-plataforma-de-eventos

2. Ingresa al directorio del proyecto:

    ```bash
    cd coordinadora-plataforma-de-eventos

3. Crea un archivo .env en la raíz del proyecto y configura las variables de entorno necesarias:

    ```bash
    PORT=3000
    JWT_SECRET=Your_JWT_Secret
    DB_HOST=db
    DB_USER=user_test
    DB_PASSWORD=pass_test
    DB_DATABASE=db_test
    MAPBOX_API_KEY=Your_Mapbox_API_Key

4. Ejecuta el siguiente comando para construir y ejecutar los contenedores Docker:

    ```bash
    docker-compose up --build

Una vez que los contenedores estén en funcionamiento, podrás acceder a la aplicación a través de http://localhost:3000.


## Documentación de la API
La documentación de la API está disponible en Swagger. Una vez que la aplicación esté en ejecución, puedes acceder a la documentación en http://localhost:3000/api-docs.

## Video de Explicación
Enlace al video de explicación
Proximamente

## Contribución
Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio
2. Crea una nueva rama (git checkout -b feature/nueva-caracteristica)
3. Haz tus cambios y haz commit de ellos (git commit -am 'Añade una nueva característica')
4. Haz push de la rama (git push origin feature/nueva-caracteristica)
5. Crea un pull request

## Licencia
Este proyecto está licenciado bajo la Licencia MIT.