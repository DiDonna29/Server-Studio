
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
    app_title: 'Terminal Craft',
    app_subtitle: 'Professional server and OS command studio.',
    sidebar_language: 'Interface Language',
    os_select_label: 'Operating System',
    category_label: 'Category',
    command_label: 'Command',
    parameters_title: 'Parameters',
    generate_btn: 'Craft Command',
    copy_btn: 'Copy to Clipboard',
    copied: 'Copied!',
    result_title: 'Output Preview',
    presets: 'Quick Presets',
    server_status: 'Environment Status',
    status_online: 'Engine Ready',
    placeholder_select: 'Select an option...',
    description: 'Description',
    usage_tip: 'Paste this into your terminal or script editor.'
  },
  es: {
    app_title: 'Terminal Craft',
    app_subtitle: 'Estudio profesional de comandos para servidores y SO.',
    sidebar_language: 'Idioma de Interfaz',
    os_select_label: 'Sistema Operativo',
    category_label: 'Categoría',
    command_label: 'Comando',
    parameters_title: 'Parámetros',
    generate_btn: 'Forjar Comando',
    copy_btn: 'Copiar al Portapapeles',
    copied: '¡Copiado!',
    result_title: 'Vista Previa de Salida',
    presets: 'Ajustes Rápidos',
    server_status: 'Estado del Entorno',
    status_online: 'Motor Listo',
    placeholder_select: 'Selecciona una opción...',
    description: 'Descripción',
    usage_tip: 'Pega esto en tu terminal o editor de scripts.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

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
