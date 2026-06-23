"use client"

import React, { useState, useEffect } from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { LanguageProvider, useLanguage } from '@/app/lib/language-context';
import { aiCommandParameterSuggestions } from '@/ai/flows/ai-command-parameter-suggestions';
import { Sparkles, Terminal, Copy, Globe, User, Package, Cloud, MapPin, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';

const MOCK_PLAYERS = ["Steve", "Alex", "Admin", "CreeperHunter", "Miner49er"];
const MOCK_ITEMS = ["diamond", "iron_sword", "apple", "obsidian", "torch", "gold_ingot"];
const MOCK_LOCATIONS = ["Spawn", "Base Alpha", "Stronghold", "Village", "Nether Portal"];
const MOCK_WEATHER = ["clear", "rain", "thunder"];

function CommandGenerator() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [action, setAction] = useState<string>("");
  const [player, setPlayer] = useState<string>("");
  const [item, setItem] = useState<string>("");
  const [amount, setAmount] = useState<string>("1");
  const [weatherType, setWeatherType] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [timeValue, setTimeValue] = useState<string>("1000");
  const [generatedCommand, setGeneratedCommand] = useState<string>("");
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  useEffect(() => {
    generateCommand();
  }, [action, player, item, amount, weatherType, location, timeValue]);

  const generateCommand = () => {
    let cmd = "";
    switch (action) {
      case "give_item":
        if (player && item) cmd = `/give ${player} ${item} ${amount}`;
        break;
      case "teleport":
        if (player && location) cmd = `/tp ${player} ${location}`;
        break;
      case "weather":
        if (weatherType) cmd = `/weather ${weatherType}`;
        break;
      case "set_time":
        if (timeValue) cmd = `/time set ${timeValue}`;
        break;
      case "kick_ban":
        if (player) cmd = `/kick ${player} "Rules violation"`;
        break;
    }
    setGeneratedCommand(cmd);
  };

  const handleAiSuggestions = async () => {
    if (!action) return;
    setIsLoadingAi(true);
    try {
      const result = await aiCommandParameterSuggestions({
        selectedAction: t(action),
        serverContext: {
          players: MOCK_PLAYERS,
          items: MOCK_ITEMS,
          weatherStates: MOCK_WEATHER,
          locations: MOCK_LOCATIONS
        }
      });
      setAiSuggestions(result.suggestions);
      if (result.commandExample) {
         toast({
           title: "AI Suggestion",
           description: `Example: ${result.commandExample}`,
         });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingAi(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCommand);
    toast({
      title: t('copied'),
      description: generatedCommand,
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight font-headline text-foreground">{t('app_title')}</h1>
          <p className="text-muted-foreground mt-1">Efficient server administration made easy.</p>
        </div>
        <div className="flex items-center gap-2">
           <SidebarTrigger className="md:hidden" />
           <Badge variant="secondary" className="px-3 py-1 bg-primary/10 text-primary border-primary/20">v1.2.0</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-border shadow-sm bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-headline">
              <Terminal className="w-5 h-5 text-primary" />
              {t('action_label')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>{t('action_label')}</Label>
              <Select onValueChange={setAction} value={action}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('action_placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="give_item">{t('give_item')}</SelectItem>
                  <SelectItem value="teleport">{t('teleport')}</SelectItem>
                  <SelectItem value="weather">{t('weather')}</SelectItem>
                  <SelectItem value="set_time">{t('set_time')}</SelectItem>
                  <SelectItem value="kick_ban">{t('kick_ban')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {action === 'give_item' && (
              <>
                <div className="space-y-2">
                  <Label>{t('player_label')}</Label>
                  <Select onValueChange={setPlayer} value={player}>
                    <SelectTrigger><SelectValue placeholder={t('player_placeholder')} /></SelectTrigger>
                    <SelectContent>
                      {MOCK_PLAYERS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{t('item_label')}</Label>
                  <Select onValueChange={setItem} value={item}>
                    <SelectTrigger><SelectValue placeholder={t('item_placeholder')} /></SelectTrigger>
                    <SelectContent>
                      {MOCK_ITEMS.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{t('amount_label')}</Label>
                  <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
              </>
            )}

            {action === 'teleport' && (
              <>
                <div className="space-y-2">
                  <Label>{t('player_label')}</Label>
                  <Select onValueChange={setPlayer} value={player}>
                    <SelectTrigger><SelectValue placeholder={t('player_placeholder')} /></SelectTrigger>
                    <SelectContent>
                      {MOCK_PLAYERS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{t('location_label')}</Label>
                  <Select onValueChange={setLocation} value={location}>
                    <SelectTrigger><SelectValue placeholder={t('location_label')} /></SelectTrigger>
                    <SelectContent>
                      {MOCK_LOCATIONS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {action === 'weather' && (
              <div className="space-y-2">
                <Label>{t('weather_label')}</Label>
                <Select onValueChange={setWeatherType} value={weatherType}>
                  <SelectTrigger><SelectValue placeholder={t('weather_label')} /></SelectTrigger>
                  <SelectContent>
                    {MOCK_WEATHER.map(w => <SelectItem key={w} value={w}>{w}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}

            {action === 'set_time' && (
              <div className="space-y-2">
                <Label>{t('amount_label')} (0-24000)</Label>
                <Input type="number" value={timeValue} onChange={(e) => setTimeValue(e.target.value)} />
              </div>
            )}

            {action === 'kick_ban' && (
              <div className="space-y-2">
                <Label>{t('player_label')}</Label>
                <Select onValueChange={setPlayer} value={player}>
                  <SelectTrigger><SelectValue placeholder={t('player_placeholder')} /></SelectTrigger>
                  <SelectContent>
                    {MOCK_PLAYERS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button 
              onClick={handleAiSuggestions} 
              variant="outline" 
              className="w-full mt-4 border-primary/20 hover:bg-primary/5 text-primary gap-2"
              disabled={!action || isLoadingAi}
            >
              {isLoadingAi ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" /> : <Sparkles className="w-4 h-4" />}
              {isLoadingAi ? t('ai_loading') : t('ai_suggest_btn')}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-primary/20 shadow-md bg-primary/[0.02]">
            <CardHeader>
              <CardTitle className="text-xl font-headline flex items-center justify-between">
                {t('command_result')}
                <Terminal className="w-5 h-5 text-primary opacity-50" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative group">
                <div className="bg-black/90 p-6 rounded-lg font-code text-primary min-h-[100px] flex items-center justify-center break-all text-lg shadow-inner border border-white/10">
                  {generatedCommand || `/${action || '...'}`}
                </div>
                <Button 
                  size="icon" 
                  onClick={copyToClipboard}
                  className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary hover:bg-primary/90"
                  disabled={!generatedCommand}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4 italic text-center">
                Paste this into your server console or chat.
              </p>
            </CardContent>
          </Card>

          {aiSuggestions.length > 0 && (
            <Card className="border-accent/20 bg-accent/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-accent flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  AI Suggested Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {aiSuggestions.map((s, idx) => (
                  <div key={idx} className="bg-background/80 p-3 rounded-md border border-accent/10">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-accent">{s.parameterName}</span>
                      <Badge variant="outline" className="text-[10px] uppercase font-bold px-1.5 py-0">{s.type}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{s.description}</p>
                    {s.examples && (
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {s.examples.map((ex: string) => (
                          <span key={ex} className="text-[10px] bg-accent/10 text-accent px-1.5 py-0.5 rounded cursor-pointer hover:bg-accent/20 transition-colors">
                            {ex}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function PageContent() {
  const { t, setLanguage, language } = useLanguage();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background text-foreground">
        <Sidebar className="border-r border-border">
          <SidebarHeader className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <Terminal className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tight">{t('app_title')}</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="px-4 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {t('sidebar_language')}
              </SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setLanguage('en')} 
                    isActive={language === 'en'}
                    className={`transition-all duration-200 ${language === 'en' ? 'bg-primary/10 text-primary font-bold' : ''}`}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    English
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setLanguage('es')} 
                    isActive={language === 'es'}
                    className={`transition-all duration-200 ${language === 'es' ? 'bg-primary/10 text-primary font-bold' : ''}`}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Español
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            <Separator className="mx-4 my-2 opacity-50" />

            <SidebarGroup>
              <SidebarGroupLabel className="px-4 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {t('presets')}
              </SidebarGroupLabel>
              <SidebarMenu className="gap-1 px-2">
                <SidebarMenuItem>
                  <SidebarMenuButton className="hover:bg-primary/5 rounded-lg group">
                    <User className="w-4 h-4 mr-2 text-muted-foreground group-hover:text-primary" />
                    Player Management
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="hover:bg-primary/5 rounded-lg group">
                    <Package className="w-4 h-4 mr-2 text-muted-foreground group-hover:text-primary" />
                    Item Spawning
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="hover:bg-primary/5 rounded-lg group">
                    <Cloud className="w-4 h-4 mr-2 text-muted-foreground group-hover:text-primary" />
                    Environment
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="hover:bg-primary/5 rounded-lg group">
                    <MapPin className="w-4 h-4 mr-2 text-muted-foreground group-hover:text-primary" />
                    Teleportation
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="hover:bg-primary/5 rounded-lg group">
                    <Clock className="w-4 h-4 mr-2 text-muted-foreground group-hover:text-primary" />
                    Time Control
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="hover:bg-primary/5 rounded-lg group">
                    <ShieldAlert className="w-4 h-4 mr-2 text-muted-foreground group-hover:text-primary" />
                    Security & Logs
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <div className="mt-auto p-4">
             <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                <p className="text-[10px] font-bold text-primary/70 uppercase tracking-tighter mb-1">Server Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-medium">Production Node Beta</span>
                </div>
             </div>
          </div>
        </Sidebar>
        <SidebarInset className="flex-1 bg-background">
          <main className="h-full flex flex-col items-center justify-center">
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
