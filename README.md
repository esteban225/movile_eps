# 🏥 Gestión de Usuarios EPS

![React Native Logo](https://reactnative.dev/img/header_logo.svg)

Bienvenido al repositorio de **Gestión de Usuarios EPS**, un proyecto de ejemplo desarrollado en React Native para administrar información de usuarios y sus asociados (centros de salud) dentro de un sistema de Entidades Promotoras de Salud (EPS).

Este proyecto sirve como una base para aplicaciones móviles que requieren formularios dinámicos, integración con APIs RESTful (a través de Axios), y una interfaz de usuario limpia y funcional.

---

## 🌟 Características Principales

* **Creación y Edición de Usuarios EPS**: Permite añadir nuevos usuarios con diversos detalles (nombre, email, teléfono, tipo/número de identificación, rol, estado, dirección).
* **Asociación con Centros de Salud**: Los usuarios pueden ser vinculados a un centro de salud específico, cargado dinámicamente desde una API.
* **Formularios Interactivos**: Utiliza `TextInput` y `Picker` para una entrada de datos intuitiva.
* **Manejo de Estados**: Gestión de estados de carga y errores de API para una experiencia de usuario robusta.
* **Validación Básica**: Campos requeridos validados antes de enviar la información.
* **Diseño Responsivo**: Adaptado para diferentes tamaños de pantalla y teclado con `ScrollView` y `KeyboardAvoidingView`.
* **Estilos Limpios**: Uso de una paleta de colores consistente y `StyleSheet` para un diseño atractivo.

---

## 🛠️ Tecnologías Utilizadas

* **React Native**: Framework principal para el desarrollo de aplicaciones móviles multiplataforma.
* **Axios**: Cliente HTTP basado en promesas para realizar llamadas a la API.
* **`@react-navigation/native`**: Para la navegación entre pantallas.
* **`@react-native-picker/picker`**: Componente de selector para opciones predefinidas.
* **`useState` y `useEffect` (React Hooks)**: Para la gestión del estado y efectos secundarios.

---

## 🚀 Cómo Empezar

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### Prerrequisitos

Asegúrate de tener instalado:

* Node.js (versión LTS recomendada)
* npm o Yarn
* React Native CLI (`npm install -g react-native-cli`)
* Un emulador de Android/iOS o un dispositivo físico.

### Instalación

1.  **Clona el repositorio:**

    ```bash
    git clone https://github.com/esteban225/movile_eps.git
    cd movile_eps
    ```

2.  **Instala las dependencias:**

    ```bash
    npm install
    # o
    yarn install
    ```

3.  **Configura tu API:**

    Asegúrate de que tu instancia de Axios (`api` en `UsersEpsService.js`) esté configurada para apuntar a la URL de tu backend. Por ejemplo:

    ```javascript
    // src/services/api.js (ejemplo)
    import axios from 'axios';

    const api = axios.create({
      baseURL: '[http://tu-backend.com/api](http://tu-backend.com/api)', // <-- ¡IMPORTANTE! Reemplaza con la URL de tu API
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    export default api;
    ```

    Y asegúrate de que el servicio `listarHealthCenters` apunte al endpoint correcto:

    ```javascript
    // src/services/UsersEpsService.js
    import api from './api'; // Asume que tienes un archivo api.js con tu instancia de Axios

    export const listarHealthCenters = async () => {
        try {
            const response = await api.get("/healthcenters"); // <-- Endpoint para centros de salud
            return { success: true, data: response.data };
        } catch (error) {
            // ... manejo de errores ...
        }
    };

    export const crearUserEps = async (userData) => {
        try {
            const response = await api.post("/users-eps", userData); // <-- Endpoint para crear usuarios
            return { success: true, data: response.data };
        } catch (error) {
            // ... manejo de errores ...
        }
    };

    export const editarUserEps = async (id, userData) => {
        try {
            const response = await api.put(`/users-eps/${id}`, userData); // <-- Endpoint para editar usuarios
            return { success: true, data: response.data };
        } catch (error) {
            // ... manejo de errores ...
        }
    };
    ```

### Ejecutar la Aplicación

1.  **Inicia el Metro Bundler:**

    ```bash
    npm start
    # o
    yarn start
    ```

2.  **Ejecuta en tu plataforma deseada:**

    * **Android:**
        ```bash
        npm run android
        # o
        yarn android
        ```
    * **iOS:**
        ```bash
        npm run ios
        # o
        yarn ios
        ```
        (Requiere macOS y Xcode)

---

## 📂 Estructura del Proyecto

```
.
├── src/
├── App.js                   
├── app.json
├── package.json
└── README.md              

```

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si encuentras un error o tienes una mejora, no dudes en abrir un *issue* o enviar un *pull request*.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
