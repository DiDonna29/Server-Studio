
"use client"

import React, { useState, useEffect, useMemo } from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { LanguageProvider, useLanguage } from '@/app/lib/language-context';
import { Terminal, Copy, Globe, Cpu, Network, Files, ShieldCheck, Monitor, ChevronRight, Zap, Info, Server, Activity, Lock, Database } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { COMMANDS_BY_OS, OSData, Category, CommandDefinition } from '@/app/lib/commands-data';
import { motion, AnimatePresence } from 'framer-motion';

const ICON_MAP: Record<string, any> = {
  Files,
  Cpu,
  Network,
  ShieldCheck,
  Terminal,
  Server,
  Activity,
  Lock,
  Database
};

function CommandGenerator() {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [selectedOSId, setSelectedOSId] = useState<string>('linux');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedCommandId, setSelectedCommandId] = useState<string>('');
  const [params, setParams] = useState<Record<string, string>>({});
  const [generatedCommand, setGeneratedCommand] = useState<string>('');

  const currentOS = useMemo(() => COMMANDS_BY_OS.find(os => os.id === selectedOSId), [selectedOSId]);
  const currentCategory = useMemo(() => currentOS?.categories.find(c => c.name === selectedCategoryId), [currentOS, selectedCategoryId]);
  const currentCommand = useMemo(() => currentCategory?.commands.find(cmd => cmd.id === selectedCommandId), [currentCategory, selectedCommandId]);

  useEffect(() => {
    if (currentOS && currentOS.categories.length > 0) {
      setSelectedCategoryId(currentOS.categories[0].name);
    }
  }, [selectedOSId]);

  useEffect(() => {
    if (currentCategory && currentCategory.commands.length > 0) {
      setSelectedCommandId(currentCategory.commands[0].id);
    }
  }, [currentCategory]);

  useEffect(() => {
    if (currentCommand) {
      const defaultParams: Record<string, string> = {};
      currentCommand.parameters.forEach(p => {
        defaultParams[p.name] = p.defaultValue || '';
      });
      setParams(defaultParams);
    }
  }, [currentCommand]);

  useEffect(() => {
    if (currentCommand) {
      let cmd = currentCommand.syntax;
      Object.keys(params).forEach(key => {
        cmd = cmd.replace(`{${key}}`, params[key] || '');
      });
      setGeneratedCommand(cmd.replace(/\s+/g, ' ').trim());
    }
  }, [params, currentCommand]);

  const handleParamChange = (name: string, value: string) => {
    setParams(prev => ({ ...prev, [name]: value }));
  };

  const copyToClipboard = () => {
    if (!generatedCommand) return;
    navigator.clipboard.writeText(generatedCommand);
    toast({
      title: t('copied'),
      description: generatedCommand,
    });
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto p-4 md:p-12 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div className="space-y-1">
          <h1 className="text-5xl font-extrabold tracking-tight font-headline text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            {t('app_title')}
          </h1>
          <p className="text-muted-foreground text-lg max-w-md">{t('app_subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
           <SidebarTrigger className="md:hidden" />
           <Badge variant="outline" className="px-4 py-1.5 rounded-full border-primary/20 bg-primary/5 text-primary font-bold">
            PRO EDITION v2.5
           </Badge>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <Card className="border-border/50 shadow-2xl bg-card/40 backdrop-blur-xl rounded-2xl overflow-hidden border">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="flex items-center gap-2 text-xl font-bold">
                <Zap className="w-5 h-5 text-primary" />
                {t('crafting_options')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2.5">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('os_select_label')}</Label>
                  <Select onValueChange={setSelectedOSId} value={selectedOSId}>
                    <SelectTrigger className="h-11 bg-background/50 border-border/50 transition-all focus:ring-primary/20">
                      <SelectValue placeholder={t('placeholder_select')} />
                    </SelectTrigger>
                    <SelectContent>
                      {COMMANDS_BY_OS.map(os => (
                        <SelectItem key={os.id} value={os.id}>{os.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2.5">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('category_label')}</Label>
                  <Select onValueChange={setSelectedCategoryId} value={selectedCategoryId}>
                    <SelectTrigger className="h-11 bg-background/50 border-border/50 transition-all focus:ring-primary/20">
                      <SelectValue placeholder={t('placeholder_select')} />
                    </SelectTrigger>
                    <SelectContent>
                      {currentOS?.categories.map(cat => (
                        <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2.5">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('command_label')}</Label>
                  <Select onValueChange={setSelectedCommandId} value={selectedCommandId}>
                    <SelectTrigger className="h-11 bg-background/50 border-border/50 transition-all focus:ring-primary/20">
                      <SelectValue placeholder={t('placeholder_select')} />
                    </SelectTrigger>
                    <SelectContent>
                      {currentCategory?.commands.map(cmd => (
                        <SelectItem key={cmd.id} value={cmd.id}>{cmd.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {currentCommand && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-xl bg-accent/5 border border-accent/10 space-y-3"
                >
                  <div className="flex items-center gap-2 text-accent font-bold">
                    <Info className="w-4 h-4" />
                    <span>{t('description')}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {currentCommand.description}
                  </p>
                </motion.div>
              )}

              <Separator className="opacity-40" />

              <AnimatePresence mode="wait">
                {currentCommand && currentCommand.parameters.length > 0 && (
                  <motion.div 
                    key={currentCommand.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      {t('parameters_title')}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {currentCommand.parameters.map((param) => (
                        <div key={param.name} className="space-y-2.5">
                          <Label className="text-sm font-medium">{param.label}</Label>
                          {param.type === 'select' ? (
                            <Select 
                              onValueChange={(val) => handleParamChange(param.name, val)} 
                              value={params[param.name] || ''}
                            >
                              <SelectTrigger className="h-10 bg-background/40">
                                <SelectValue placeholder={param.placeholder || t('placeholder_select')} />
                              </SelectTrigger>
                              <SelectContent>
                                {param.options?.map(opt => (
                                  <SelectItem key={opt} value={opt}>{opt || '(empty)'}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input 
                              type={param.type}
                              placeholder={param.placeholder}
                              value={params[param.name] || ''}
                              onChange={(e) => handleParamChange(param.name, e.target.value)}
                              className="h-10 bg-background/40"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="border-primary/20 shadow-2xl bg-black/95 text-white rounded-2xl border overflow-hidden">
              <CardHeader className="bg-white/5 p-6 border-b border-white/10">
                <CardTitle className="text-lg font-bold flex items-center justify-between">
                  {t('result_title')}
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-8 font-code min-h-[160px] flex items-center justify-center relative group">
                  <p className="text-2xl text-emerald-400 break-all text-center leading-relaxed">
                    {generatedCommand ? (
                      <span className="opacity-60 mr-2">$</span>
                    ) : null}
                    {generatedCommand || '...'}
                  </p>
                  
                  {generatedCommand && (
                    <Button 
                      size="icon" 
                      onClick={copyToClipboard}
                      className="absolute bottom-4 right-4 bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-all shadow-xl"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="bg-white/5 p-4 border-t border-white/10">
                  <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] text-center font-bold">
                    {t('usage_tip')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <Card className="border-border/50 bg-card/30 rounded-2xl p-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">{t('server_status')}</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/40">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  <span className="text-sm font-medium">{t('status_online')}</span>
                </div>
                <Badge variant="secondary" className="text-[10px] font-bold">LATENCY: 12ms</Badge>
              </div>
              <div className="grid grid-cols-2 gap-3">
                 <div className="p-3 rounded-lg bg-background/50 border border-border/40">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{currentOS?.name || 'OS'}</p>
                    <p className="text-xs font-bold text-primary mt-1">OPTIMIZED</p>
                 </div>
                 <div className="p-3 rounded-lg bg-background/50 border border-border/40">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">ENGINE</p>
                    <p className="text-xs font-bold text-accent mt-1">V8-TURBO</p>
                 </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function PageContent() {
  const { t, setLanguage, language } = useLanguage();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-[#F7F9FA] dark:bg-[#0E1117] text-foreground font-body">
        <Sidebar className="border-r border-border/50 bg-sidebar/80 backdrop-blur-md">
          <SidebarHeader className="p-8">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-2xl shadow-primary/30">
                <Terminal className="w-7 h-7" />
              </div>
              <span className="font-black text-2xl tracking-tighter">{t('app_title')}</span>
            </motion.div>
          </SidebarHeader>
          <SidebarContent className="px-4">
            <SidebarGroup>
              <SidebarGroupLabel className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">
                {t('sidebar_language')}
              </SidebarGroupLabel>
              <SidebarMenu className="gap-2">
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setLanguage('en')} 
                    isActive={language === 'en'}
                    className={`h-11 rounded-xl px-4 transition-all ${language === 'en' ? 'bg-primary/10 text-primary font-bold shadow-sm' : 'hover:bg-accent/5'}`}
                  >
                    <Globe className="w-4 h-4 mr-3" />
                    English
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setLanguage('es')} 
                    isActive={language === 'es'}
                    className={`h-11 rounded-xl px-4 transition-all ${language === 'es' ? 'bg-primary/10 text-primary font-bold shadow-sm' : 'hover:bg-accent/5'}`}
                  >
                    <Globe className="w-4 h-4 mr-3" />
                    Español
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            <Separator className="mx-4 my-6 opacity-30" />

            <SidebarGroup>
              <SidebarGroupLabel className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">
                {t('presets')}
              </SidebarGroupLabel>
              <SidebarMenu className="gap-1">
                {Object.entries(ICON_MAP).map(([name, Icon]) => (
                  <SidebarMenuItem key={name}>
                    <SidebarMenuButton className="h-10 rounded-xl px-4 hover:bg-primary/5 group transition-all">
                      <Icon className="w-4 h-4 mr-3 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-sm font-medium">{name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-6">
             <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-5 border border-primary/10 shadow-sm">
                <p className="text-[10px] font-black text-primary/70 uppercase tracking-widest mb-2">Cloud Core</p>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute inset-0" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 relative" />
                  </div>
                  <span className="text-xs font-bold">Stable Node Alpha</span>
                </div>
             </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex-1 bg-background overflow-x-hidden">
          <main className="min-h-screen flex items-center justify-center py-12 md:py-0">
            <CommandGenerator />
          </main>
        </SidebarInset>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <PageContent />
    </LanguageProvider>
  );
}
