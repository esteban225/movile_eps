import api from "./Connection";

// Función auxiliar para formatear mensajes de error
const formatErrorMessage = (errorResponseData) => {
    if (typeof errorResponseData === 'string') {
        return errorResponseData; // Ya es una cadena
    }
    if (errorResponseData && typeof errorResponseData === 'object') {
        if (errorResponseData.errors) {
            // Si Laravel devuelve errores de validación (e.g., {"errors": {"Nombre": ["msg"]}})
            const messages = Object.values(errorResponseData.errors).flat();
            return messages.join('\n'); // Une todos los mensajes de error en una sola cadena
        }
        if (errorResponseData.message) {
            // Si Laravel devuelve un campo 'message' que es un objeto o cadena
            if (typeof errorResponseData.message === 'string') {
                return errorResponseData.message;
            }
            // Si 'message' es un objeto (menos común, pero posible)
            return JSON.stringify(errorResponseData.message);
        }
        // Si es un objeto pero no tiene 'errors' ni 'message', stringify it
        return JSON.stringify(errorResponseData);
    }
    return "Error desconocido"; // Fallback
};


export const listarHealthCenters = async () => {
    try {
        const response = await api.get("/healthcenters");
        console.log("Respuesta listar:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al listar :", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
}

export const eliminarHealthCenters = async (id) => {
    console.log("Intentando eliminar con ID:", id);
    try {
        const response = await api.delete(`/healthcenters/${id}`);
        console.log("Respuesta eliminar:", response.data);
        return { success: true, message: response.data.message || "Eliminado correctamente" };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al eliminar :", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const crearHealthCenters = async (data) => {
    try {
        const response = await api.post("/healthcenters", data);
        console.log("Respuesta crear:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al crear :", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};

export const editarHealthCenters = async (id, data) => { // Asegúrate de que 'id' se pase como primer argumento
    try {
        // La URL debe incluir el ID  a editar
        const response = await api.put(`/healthcenters/${id}`, data); // Asumiendo que tu ruta de Laravel es /healthcenters/{id}
        console.log("Respuesta editar:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al editar :", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};