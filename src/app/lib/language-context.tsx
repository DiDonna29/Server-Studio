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
    app_title: 'Quick Command',
    sidebar_language: 'Language',
    action_label: 'Action',
    action_placeholder: 'Select server action...',
    player_label: 'Player',
    player_placeholder: 'Select a player...',
    item_label: 'Item',
    item_placeholder: 'Select an item...',
    amount_label: 'Amount',
    weather_label: 'Weather Type',
    location_label: 'Location',
    generate_btn: 'Generate Command',
    copy_btn: 'Copy',
    copied: 'Copied!',
    ai_suggest_btn: 'AI Smart Parameters',
    ai_loading: 'Thinking...',
    command_result: 'Generated Command',
    recent_commands: 'Recent',
    presets: 'Presets',
    give_item: 'Give Item',
    teleport: 'Teleport',
    weather: 'Change Weather',
    set_time: 'Set Time',
    kick_ban: 'Kick/Ban Player',
    param_hint: 'AI suggestions will appear here'
  },
  es: {
    app_title: 'Comando Rápido',
    sidebar_language: 'Idioma',
    action_label: 'Acción',
    action_placeholder: 'Selecciona acción...',
    player_label: 'Jugador',
    player_placeholder: 'Selecciona un jugador...',
    item_label: 'Ítem',
    item_placeholder: 'Selecciona un ítem...',
    amount_label: 'Cantidad',
    weather_label: 'Tipo de Clima',
    location_label: 'Ubicación',
    generate_btn: 'Generar Comando',
    copy_btn: 'Copiar',
    copied: '¡Copiado!',
    ai_suggest_btn: 'Parámetros IA',
    ai_loading: 'Pensando...',
    command_result: 'Comando Generado',
    recent_commands: 'Recientes',
    presets: 'Ajustes',
    give_item: 'Dar Ítem',
    teleport: 'Teletransportar',
    weather: 'Cambiar Clima',
    set_time: 'Ajustar Tiempo',
    kick_ban: 'Expulsar/Banear',
    param_hint: 'Sugerencias de IA aparecerán aquí'
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
