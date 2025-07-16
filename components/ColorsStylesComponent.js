export default function Colors() {
    return {
        // Colores principales de la marca/aplicación
        primary: '#4CAF50',        // Un verde vibrante y amigable
        primaryDark: '#388E3C',    // Una versión más oscura para contrastes y elementos destacados
        accent: '#FFC107',         // Un amarillo brillante para acciones destacadas o advertencias

        // Colores de fondo
        background: '#F0F2F5',     // Un gris muy claro para el fondo general de la pantalla
        cardBackground: '#FFFFFF', // Blanco puro para las tarjetas y elementos elevados

        // Colores de texto
        textPrimary: '#212121',    // Gris oscuro casi negro para el texto principal
        textSecondary: '#757575',  // Gris medio para texto secundario o detalles
        textLight: '#FFFFFF',      // Blanco para texto sobre fondos oscuros (ej. botones primarios)
        textPlaceholder: '#9E9E9E',// Color para el placeholder del input y texto vacío

        // Colores de estado/feedback
        success: '#28A745',        // Verde para éxito
        danger: '#DC3545',         // Rojo para acciones destructivas o errores

        // Colores de UI específicos
        shadow: 'rgba(0,0,0,0.1)',  // Sombra ligera para un efecto sutil
        inputBorder: '#CFD8DC',    // Color más suave para el borde del input
        inputFocusBorder: '#9E9E9E', // Borde del input cuando está en foco
        headerBackground: '#FFFFFF',// Fondo del encabezado (si se añade un título fijo)
        border: '#E0E0E0',         // Color para bordes de separación o elementos discretos
    };
}