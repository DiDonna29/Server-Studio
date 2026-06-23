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
import { Copy, Globe, Radio, ChevronRight, Info, Gamepad2, Activity, Terminal, Shield, Box, Settings, HardDrive, Cpu } from 'lucide-react';
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
    <div className="flex flex-col gap-6 md:gap-8 w-full max-w-7xl mx-auto p-4 md:p-8 lg:p-12 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div className="space-y-2 overflow-hidden">
          <div className="flex items-center gap-3 md:hidden mb-4">
             <SidebarTrigger />
             <Badge variant="outline" className="px-3 py-1 text-[10px] font-black border-primary/30 text-primary">V4.0 MOBILE</Badge>
          </div>
          <h1 className="text-3xl md:text-6xl font-black tracking-tighter font-headline text-foreground bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary to-accent leading-none truncate">
            {t('app_title')}
          </h1>
          <p className="text-muted-foreground text-sm md:text-xl font-medium max-w-2xl leading-tight">
            {t('app_subtitle')}
          </p>
        </div>
        <div className="hidden md:flex items-center gap-4 shrink-0">
           <Badge variant="outline" className="px-6 py-2 rounded-full border-primary/30 bg-primary/5 text-primary font-bold tracking-wide shadow-sm">
            PRO EDITION V4.0
           </Badge>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-start overflow-hidden">
        <div className="lg:col-span-7 space-y-6 md:space-y-8 overflow-hidden">
          <Card className="border-border/60 shadow-2xl bg-card/60 backdrop-blur-3xl rounded-3xl overflow-hidden border w-full">
            <CardHeader className="bg-primary/5 border-b border-primary/10 p-5 md:p-8">
              <CardTitle className="flex items-center gap-3 text-lg md:text-xl font-bold tracking-tight">
                <Settings className="w-5 h-5 text-primary" />
                {t('crafting_options')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 md:p-10 space-y-8 md:space-y-10 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
                <div className="space-y-2 overflow-hidden">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">{t('category_label')}</Label>
                  <Select onValueChange={setSelectedCategoryId} value={selectedCategoryId}>
                    <SelectTrigger className="h-12 bg-background/40 border-border/40 transition-all hover:bg-background/60 focus:ring-primary/20 rounded-xl w-full">
                      <SelectValue placeholder={t('placeholder_select')} />
                    </SelectTrigger>
                    <SelectContent>
                      {currentOS?.categories.map(cat => (
                        <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 overflow-hidden">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">{t('command_label')}</Label>
                  <Select onValueChange={setSelectedCommandId} value={selectedCommandId}>
                    <SelectTrigger className="h-12 bg-background/40 border-border/40 transition-all hover:bg-background/60 focus:ring-primary/20 rounded-xl w-full">
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
                  className="p-5 md:p-8 rounded-2xl bg-accent/5 border border-accent/10 space-y-3 w-full"
                >
                  <div className="flex items-center gap-3 text-accent font-black uppercase tracking-widest text-[9px] md:text-[10px]">
                    <Info className="w-4 h-4" />
                    <span>{t('description')}</span>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-medium break-words">
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
                    className="space-y-6 md:space-y-8 overflow-hidden w-full"
                  >
                    <h3 className="text-base md:text-lg font-bold flex items-center gap-3">
                      <ChevronRight className="w-5 h-5 text-primary" />
                      {t('parameters_title')}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
                      {currentCommand.parameters.map((param) => (
                        <div key={param.name} className="space-y-2 overflow-hidden">
                          <Label className="text-xs font-semibold text-foreground/90 block truncate">{param.label}</Label>
                          {param.type === 'select' ? (
                            <Select 
                              onValueChange={(val) => handleParamChange(param.name, val)} 
                              value={params[param.name] || 'default'}
                            >
                              <SelectTrigger className="h-12 bg-background/40 border-border/40 rounded-xl w-full">
                                <SelectValue placeholder={param.placeholder || t('placeholder_select')} />
                              </SelectTrigger>
                              <SelectContent>
                                {param.options?.map(opt => (
                                  <SelectItem key={opt} value={opt}>{opt === 'default' ? '(vacío)' : opt}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input 
                              type={param.type}
                              placeholder={param.placeholder}
                              value={params[param.name] || ''}
                              onChange={(e) => handleParamChange(param.name, e.target.value)}
                              className="h-12 bg-background/40 border-border/40 rounded-xl px-4 text-sm md:text-base w-full"
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

        <div className="lg:col-span-5 space-y-6 md:space-y-8 overflow-hidden w-full">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full overflow-hidden"
          >
            <Card className="border-primary/30 shadow-2xl bg-slate-950 text-white rounded-3xl border overflow-hidden w-full">
              <CardHeader className="bg-white/5 p-5 md:p-8 border-b border-white/10">
                <CardTitle className="text-base md:text-lg font-bold flex items-center justify-between">
                  {t('result_title')}
                  <div className="flex gap-1.5 md:gap-2 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-red-500/90" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/90" />
                    <div className="w-3 h-3 rounded-full bg-green-500/90" />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 overflow-hidden">
                <div className="p-6 md:p-12 font-code min-h-[180px] md:min-h-[220px] flex items-center justify-center relative group bg-gradient-to-b from-transparent to-black/20 overflow-hidden">
                  <div className="w-full text-center md:text-left overflow-hidden">
                    <p className="text-base md:text-2xl text-emerald-400 break-all leading-relaxed tracking-tight break-words">
                      {generatedCommand ? (
                        <span className="opacity-40 mr-2 md:mr-3 select-none">#</span>
                      ) : null}
                      {generatedCommand || <span className="text-white/20 animate-pulse italic">Esperando selección...</span>}
                    </p>
                  </div>
                  
                  {generatedCommand && (
                    <Button 
                      size="icon" 
                      onClick={copyToClipboard}
                      className="absolute bottom-4 right-4 md:bottom-6 md:right-6 h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-white/10 hover:bg-primary border border-white/10 backdrop-blur-3xl transition-all shadow-2xl hover:scale-105 shrink-0"
                    >
                      <Copy className="w-4 h-4 md:w-5 md:h-5" />
                    </Button>
                  )}
                </div>
                <div className="bg-white/5 p-4 border-t border-white/10 overflow-hidden">
                  <p className="text-[9px] md:text-[10px] text-white/40 uppercase tracking-[0.25em] text-center font-black truncate">
                    {t('usage_tip')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <Card className="border-border/60 bg-card/40 rounded-3xl p-6 md:p-8 shadow-xl w-full overflow-hidden">
            <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 mb-6 truncate">{t('server_status')}</h4>
            <div className="space-y-4 md:space-y-6 overflow-hidden">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-background/60 border border-border/40 shadow-inner overflow-hidden">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="relative shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute inset-0 opacity-40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 relative" />
                  </div>
                  <span className="text-xs md:text-sm font-bold tracking-tight truncate">{t('status_online')}</span>
                </div>
                <Badge variant="secondary" className="text-[8px] md:text-[9px] font-black tracking-widest bg-emerald-500/10 text-emerald-600 shrink-0">5MS PING</Badge>
              </div>
              <div className="grid grid-cols-2 gap-3 md:gap-4 overflow-hidden">
                 <div className="p-4 rounded-2xl bg-background/60 border border-border/40 shadow-sm transition-hover hover:border-primary/20 overflow-hidden">
                    <p className="text-[8px] md:text-[9px] font-black text-muted-foreground/60 uppercase tracking-widest truncate">{currentOS?.name.split(' ')[0] || 'GAME'}</p>
                    <p className="text-xs md:text-sm font-black text-primary mt-1 truncate">READY</p>
                 </div>
                 <div className="p-4 rounded-2xl bg-background/60 border border-border/40 shadow-sm transition-hover hover:border-accent/20 overflow-hidden">
                    <p className="text-[8px] md:text-[9px] font-black text-muted-foreground/60 uppercase tracking-widest truncate">THROUGHPUT</p>
                    <p className="text-xs md:text-sm font-black text-accent mt-1 truncate">OPTIMAL</p>
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
      <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#020617] text-foreground font-body w-full overflow-hidden">
        <Sidebar className="border-r border-border/50 bg-sidebar/95 backdrop-blur-3xl overflow-hidden" collapsible="offcanvas">
          <SidebarHeader className="p-6 md:p-8 overflow-hidden">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 cursor-pointer overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center text-white shadow-xl shadow-primary/30 relative shrink-0">
                <Gamepad2 className="w-6 h-6 relative z-10" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="font-black text-xl tracking-tight leading-none truncate">Studio</span>
                <span className="text-[8px] font-black text-primary tracking-widest mt-1 opacity-60 uppercase truncate">PRO CORE</span>
              </div>
            </motion.div>
          </SidebarHeader>
          <SidebarContent className="px-4 space-y-4 overflow-x-hidden">
            <SidebarGroup className="overflow-hidden">
              <SidebarGroupLabel className="px-4 py-2 text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 mb-2 truncate">
                {t('sidebar_language')}
              </SidebarGroupLabel>
              <SidebarMenu className="gap-2 overflow-hidden">
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setLanguage('en')} 
                    isActive={language === 'en'}
                    className={`h-11 rounded-xl px-4 transition-all w-full ${language === 'en' ? 'bg-primary/10 text-primary font-bold shadow-sm' : 'hover:bg-primary/5'}`}
                  >
                    <Globe className="w-4 h-4 mr-3 shrink-0" />
                    English
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setLanguage('es')} 
                    isActive={language === 'es'}
                    className={`h-11 rounded-xl px-4 transition-all w-full ${language === 'es' ? 'bg-primary/10 text-primary font-bold shadow-sm' : 'hover:bg-primary/5'}`}
                  >
                    <Globe className="w-4 h-4 mr-3 shrink-0" />
                    Español
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            <Separator className="mx-4 opacity-20" />

            <SidebarGroup className="overflow-hidden">
              <SidebarGroupLabel className="px-4 py-2 text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 mb-2 truncate">
                {t('presets')}
              </SidebarGroupLabel>
              <SidebarMenu className="gap-1.5 overflow-hidden">
                {COMMANDS_BY_OS.map((game) => (
                  <SidebarMenuItem key={game.id}>
                    <SidebarMenuButton 
                      onClick={() => setSelectedOSId(game.id)}
                      isActive={selectedOSId === game.id}
                      className={`h-10 rounded-lg px-4 transition-all w-full ${selectedOSId === game.id ? 'bg-accent/10 text-accent font-bold' : 'hover:bg-primary/5'}`}
                    >
                      <span className="text-xs font-bold uppercase tracking-wide truncate">{game.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4 overflow-hidden">
             <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-4 border border-primary/10 w-full overflow-hidden">
                <div className="flex items-center gap-2 mb-1 overflow-hidden">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shrink-0" />
                  <span className="text-[10px] font-black tracking-tighter opacity-70 truncate">CORE: ACTIVE</span>
                </div>
                <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest truncate">Studio Engine v4.0</p>
             </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="flex-1 bg-background/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,180,216,0.03),transparent_50%)] pointer-events-none" />
          <main className="min-h-screen flex items-center justify-center py-12 md:py-20 relative z-10 w-full overflow-hidden">
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
