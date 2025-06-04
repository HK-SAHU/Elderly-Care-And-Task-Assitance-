import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { userService } from './services/api';

// English translations
const enTranslations = {
  common: {
    welcome: 'Welcome to Senior Assist',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    dashboard: 'Dashboard',
    tasks: 'Tasks',
    medications: 'Medications',
    grocery: 'Grocery Lists',
    emergency: 'Emergency Contacts',
    forum: 'Community Forum',
    settings: 'Settings'
  },
  auth: {
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    noAccount: 'Don\'t have an account?',
    haveAccount: 'Already have an account?'
  },
  tasks: {
    addTask: 'Add Task',
    taskTitle: 'Task Title',
    taskDescription: 'Description',
    dueDate: 'Due Date',
    priority: 'Priority',
    status: 'Status',
    assignedTo: 'Assigned To',
    voiceTask: 'Add Task Using Voice'
  },
  medications: {
    addMedication: 'Add Medication',
    medicationName: 'Medication Name',
    dosage: 'Dosage',
    frequency: 'Frequency',
    startDate: 'Start Date',
    endDate: 'End Date',
    reminders: 'Reminders'
  },
  location: {
    checkIn: 'Check In Now',
    checkingIn: 'Checking in...',
    history: 'Check-In History',
    noCheckIns: 'No check-ins recorded yet.'
  },
  ratings: {
    rateVolunteer: 'Rate Volunteer',
    yourRating: 'Your Rating',
    submitRating: 'Submit Rating',
    thankYou: 'Thank you for your feedback!'
  }
};

// Spanish translations
const esTranslations = {
  common: {
    welcome: 'Bienvenido a Senior Assist',
    login: 'Iniciar Sesión',
    signup: 'Registrarse',
    logout: 'Cerrar Sesión',
    dashboard: 'Panel Principal',
    tasks: 'Tareas',
    medications: 'Medicamentos',
    grocery: 'Listas de Compras',
    emergency: 'Contactos de Emergencia',
    forum: 'Foro Comunitario',
    settings: 'Configuración'
  },
  auth: {
    email: 'Correo Electrónico',
    password: 'Contraseña',
    forgotPassword: '¿Olvidó su Contraseña?',
    noAccount: '¿No tiene una cuenta?',
    haveAccount: '¿Ya tiene una cuenta?'
  },
  tasks: {
    addTask: 'Agregar Tarea',
    taskTitle: 'Título de la Tarea',
    taskDescription: 'Descripción',
    dueDate: 'Fecha de Vencimiento',
    priority: 'Prioridad',
    status: 'Estado',
    assignedTo: 'Asignado a',
    voiceTask: 'Agregar Tarea por Voz'
  },
  medications: {
    addMedication: 'Agregar Medicamento',
    medicationName: 'Nombre del Medicamento',
    dosage: 'Dosis',
    frequency: 'Frecuencia',
    startDate: 'Fecha de Inicio',
    endDate: 'Fecha de Finalización',
    reminders: 'Recordatorios'
  },
  location: {
    checkIn: 'Registrar Ubicación',
    checkingIn: 'Registrando...',
    history: 'Historial de Ubicaciones',
    noCheckIns: 'No hay ubicaciones registradas.'
  },
  ratings: {
    rateVolunteer: 'Calificar Voluntario',
    yourRating: 'Su Calificación',
    submitRating: 'Enviar Calificación',
    thankYou: '¡Gracias por su opinión!'
  }
};

// Initialize i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: enTranslations,
      es: esTranslations
    },
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

// Function to save language preference to backend
export const saveLanguagePreference = async (language) => {
  try {
    await userService.updateLanguagePreference({ language });
  } catch (error) {
    console.error('Failed to save language preference:', error);
  }
};

export default i18n;