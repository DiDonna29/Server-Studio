"use client"

import React, { useState, useEffect, useMemo } from 'react';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarInset, 
  SidebarTrigger 
} from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { LanguageProvider, useLanguage } from '@/app/lib/language-context';
import { Terminal, Copy, Globe, Cpu, Radio, ChevronRight, Info, Gamepad2, Box, Activity } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { COMMANDS_BY_OS } from '@/app/lib/commands-data';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandGeneratorProps {
  selectedOSId: string;
}

function CommandGenerator({ selectedOSId }: CommandGeneratorProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedCommandId, setSelectedCommandId] = useState<string>('');
  const [params, setParams] = useState<Record<string, string>>({});
  const [generatedCommand, setGeneratedCommand] = useState<string>('');

  const currentOS = useMemo(() => COMMANDS_BY_OS.find(os => os.id === selectedOSId), [selectedOSId]);
  const currentCategory = useMemo(() => currentOS?.categories.find(c => c.name === selectedCategoryId) || currentOS?.categories[0], [currentOS, selectedCategoryId]);
  const currentCommand = useMemo(() => currentCategory?.commands.find(cmd => cmd.id === selectedCommandId) || currentCategory?.commands[0], [currentCategory, selectedCommandId]);

  useEffect(() => {
    if (currentOS && currentOS.categories.length > 0) {
      setSelectedCategoryId(currentOS.categories[0].name);
    }
  }, [selectedOSId, currentOS]);

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
        const val = params[key] === 'default' ? '' : params[key];
        cmd = cmd.replace(`{${key}}`, val || '');
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
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto p-4 md:p-8 lg:p-12 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight font-headline text-foreground bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary to-accent leading-tight">
            {t('app_title')}
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
            {t('app_subtitle')}
          </p>
        </div>
        <div className="flex items-center gap-4">
           <SidebarTrigger className="md:hidden" />
           <Badge variant="outline" className="px-6 py-2 rounded-full border-primary/30 bg-primary/5 text-primary font-bold tracking-wide shadow-sm">
            PRO EDITION V4.0
           </Badge>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="lg:col-span-7 space-y-8">
          <Card className="border-border/60 shadow-2xl bg-card/60 backdrop-blur-3xl rounded-3xl overflow-hidden border">
            <CardHeader className="bg-primary/5 border-b border-primary/10 p-6 md:p-8">
              <CardTitle className="flex items-center gap-3 text-xl font-bold tracking-tight">
                <Radio className="w-6 h-6 text-primary animate-pulse" />
                {t('crafting_options')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-10 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">{t('category_label')}</Label>
                  <Select onValueChange={setSelectedCategoryId} value={selectedCategoryId}>
                    <SelectTrigger className="h-12 bg-background/40 border-border/40 transition-all hover:bg-background/60 focus:ring-primary/20 rounded-xl">
                      <SelectValue placeholder={t('placeholder_select')} />
                    </SelectTrigger>
                    <SelectContent>
                      {currentOS?.categories.map(cat => (
                        <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">{t('command_label')}</Label>
                  <Select onValueChange={setSelectedCommandId} value={selectedCommandId}>
                    <SelectTrigger className="h-12 bg-background/40 border-border/40 transition-all hover:bg-background/60 focus:ring-primary/20 rounded-xl">
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
                  className="p-6 md:p-8 rounded-2xl bg-accent/5 border border-accent/10 space-y-4"
                >
                  <div className="flex items-center gap-3 text-accent font-black uppercase tracking-widest text-[10px]">
                    <Info className="w-4 h-4" />
                    <span>{t('description')}</span>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-medium">
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
                    className="space-y-8"
                  >
                    <h3 className="text-lg font-bold flex items-center gap-3">
                      <ChevronRight className="w-5 h-5 text-primary" />
                      {t('parameters_title')}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {currentCommand.parameters.map((param) => (
                        <div key={param.name} className="space-y-3">
                          <Label className="text-sm font-semibold text-foreground/90">{param.label}</Label>
                          {param.type === 'select' ? (
                            <Select 
                              onValueChange={(val) => handleParamChange(param.name, val)} 
                              value={params[param.name] || 'default'}
                            >
                              <SelectTrigger className="h-12 bg-background/40 border-border/40 rounded-xl">
                                <SelectValue placeholder={param.placeholder || t('placeholder_select')} />
                              </SelectTrigger>
                              <SelectContent>
                                {param.options?.map(opt => (
                                  <SelectItem key={opt} value={opt}>{opt === 'default' ? '(vacio)' : opt}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input 
                              type={param.type}
                              placeholder={param.placeholder}
                              value={params[param.name] || ''}
                              onChange={(e) => handleParamChange(param.name, e.target.value)}
                              className="h-12 bg-background/40 border-border/40 rounded-xl px-4"
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
            <Card className="border-primary/30 shadow-2xl bg-slate-950 text-white rounded-3xl border overflow-hidden">
              <CardHeader className="bg-white/5 p-6 md:p-8 border-b border-white/10">
                <CardTitle className="text-lg font-bold flex items-center justify-between">
                  {t('result_title')}
                  <div className="flex gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-red-500/90 shadow-lg shadow-red-500/20" />
                    <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/90 shadow-lg shadow-yellow-500/20" />
                    <div className="w-3.5 h-3.5 rounded-full bg-green-500/90 shadow-lg shadow-green-500/20" />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-8 md:p-12 font-code min-h-[220px] flex items-center justify-center relative group bg-gradient-to-b from-transparent to-black/20">
                  <div className="w-full">
                    <p className="text-xl md:text-3xl text-emerald-400 break-all leading-relaxed tracking-tight">
                      {generatedCommand ? (
                        <span className="opacity-40 mr-3 select-none">#</span>
                      ) : null}
                      {generatedCommand || <span className="text-white/20 animate-pulse italic">Awaiting selection...</span>}
                    </p>
                  </div>
                  
                  {generatedCommand && (
                    <Button 
                      size="icon" 
                      onClick={copyToClipboard}
                      className="absolute bottom-6 right-6 h-12 w-12 rounded-2xl bg-white/10 hover:bg-primary border border-white/10 backdrop-blur-3xl transition-all duration-300 shadow-2xl hover:scale-110 active:scale-95 group-hover:bg-primary/20"
                    >
                      <Copy className="w-5 h-5" />
                    </Button>
                  )}
                </div>
                <div className="bg-white/5 p-5 border-t border-white/10">
                  <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] text-center font-black">
                    {t('usage_tip')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <Card className="border-border/60 bg-card/40 rounded-3xl p-8 shadow-xl">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 mb-6">{t('server_status')}</h4>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-background/60 border border-border/40 shadow-inner">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute inset-0 opacity-40" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500 relative shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
                  </div>
                  <span className="text-sm font-bold tracking-tight">{t('status_online')}</span>
                </div>
                <Badge variant="secondary" className="text-[9px] font-black tracking-widest bg-emerald-500/10 text-emerald-600 border-none">PING: 5MS</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-5 rounded-2xl bg-background/60 border border-border/40 shadow-sm transition-hover hover:border-primary/20">
                    <p className="text-[9px] font-black text-muted-foreground/60 uppercase tracking-widest">{currentOS?.name || 'GAME'}</p>
                    <p className="text-sm font-black text-primary mt-2">READY</p>
                 </div>
                 <div className="p-5 rounded-2xl bg-background/60 border border-border/40 shadow-sm transition-hover hover:border-accent/20">
                    <p className="text-[9px] font-black text-muted-foreground/60 uppercase tracking-widest">TPS / LOAD</p>
                    <p className="text-sm font-black text-accent mt-2">OPTIMAL</p>
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
  const [selectedOSId, setSelectedOSId] = useState<string>('minecraft');

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#020617] text-foreground font-body">
        <Sidebar className="border-r border-border/50 bg-sidebar/95 backdrop-blur-3xl">
          <SidebarHeader className="p-10">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-5 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center text-white shadow-2xl shadow-primary/40 group relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Gamepad2 className="w-8 h-8 relative z-10" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tighter leading-none">{t('app_title')}</span>
                <span className="text-[9px] font-black text-primary tracking-[0.2em] mt-1 opacity-60">PRO COMMAND STUDIO</span>
              </div>
            </motion.div>
          </SidebarHeader>
          <SidebarContent className="px-6 space-y-6">
            <SidebarGroup>
              <SidebarGroupLabel className="px-4 py-4 text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 mb-2">
                {t('sidebar_language')}
              </SidebarGroupLabel>
              <SidebarMenu className="gap-3">
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setLanguage('en')} 
                    isActive={language === 'en'}
                    className={`h-12 rounded-2xl px-5 transition-all duration-300 ${language === 'en' ? 'bg-primary/15 text-primary font-bold shadow-lg shadow-primary/5' : 'hover:bg-primary/5'}`}
                  >
                    <Globe className="w-4.5 h-4.5 mr-4" />
                    English
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setLanguage('es')} 
                    isActive={language === 'es'}
                    className={`h-12 rounded-2xl px-5 transition-all duration-300 ${language === 'es' ? 'bg-primary/15 text-primary font-bold shadow-lg shadow-primary/5' : 'hover:bg-primary/5'}`}
                  >
                    <Globe className="w-4.5 h-4.5 mr-4" />
                    Español
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            <Separator className="mx-6 opacity-30" />

            <SidebarGroup>
              <SidebarGroupLabel className="px-4 py-4 text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 mb-2">
                {t('presets')}
              </SidebarGroupLabel>
              <SidebarMenu className="gap-2">
                {COMMANDS_BY_OS.map((game) => (
                  <SidebarMenuItem key={game.id}>
                    <SidebarMenuButton 
                      onClick={() => setSelectedOSId(game.id)}
                      isActive={selectedOSId === game.id}
                      className={`h-11 rounded-xl px-5 group transition-all duration-300 ${selectedOSId === game.id ? 'bg-accent/10 text-accent font-bold' : 'hover:bg-primary/10'}`}
                    >
                      <span className="text-sm font-bold">{game.name}</span>
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
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 relative shadow-sm" />
                  </div>
                  <span className="text-xs font-bold tracking-tight">STABLE NODE</span>
                </div>
             </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex-1 bg-background/50 overflow-x-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,180,216,0.05),transparent_50%)] pointer-events-none" />
          <main className="min-h-screen flex items-center justify-center py-16 md:py-24 relative z-10">
            <CommandGenerator selectedOSId={selectedOSId} />
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
