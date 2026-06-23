
"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    app_title: 'Game Server Studio',
    app_subtitle: 'Elite command generator for professional gaming environments.',
    sidebar_language: 'Interface Language',
    os_select_label: 'Target Game',
    category_label: 'Category',
    command_label: 'Command',
    parameters_title: 'Command Parameters',
    generate_btn: 'Craft Command',
    copy_btn: 'Copy to Clipboard',
    copied: 'Command Copied!',
    result_title: 'Output Preview',
    presets: 'Quick Games',
    server_status: 'Environment Status',
    status_online: 'Engine Ready',
    placeholder_select: 'Select an option...',
    description: 'Manual & Documentation',
    usage_tip: 'Paste this into your server console or RCON client.',
    crafting_options: 'Server Configuration'
  },
  es: {
    app_title: 'Game Server Studio',
    app_subtitle: 'Generador de comandos de élite para entornos de gaming profesional.',
    sidebar_language: 'Idioma de Interfaz',
    os_select_label: 'Juego Seleccionado',
    category_label: 'Categoría',
    command_label: 'Comando',
    parameters_title: 'Parámetros del Comando',
    generate_btn: 'Forjar Comando',
    copy_btn: 'Copiar al Portapapeles',
    copied: '¡Comando Copiado!',
    result_title: 'Vista Previa de Salida',
    presets: 'Juegos Rápidos',
    server_status: 'Estado del Entorno',
    status_online: 'Motor Listo',
    placeholder_select: 'Selecciona una opción...',
    description: 'Manual y Documentación',
    usage_tip: 'Pega esto en la consola del servidor o cliente RCON.',
    crafting_options: 'Configuración del Servidor'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
