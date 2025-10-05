import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Server, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { evolutionAPI } from '@/lib/api';
import { toast } from 'sonner';

export default function Settings() {
  const [apiUrl, setApiUrl] = useState(evolutionAPI.getApiUrl());
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    evolutionAPI.setApiUrl(apiUrl);
    setSaved(true);
    toast.success('Configurações salvas com sucesso!');
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient-core">Configurações</h1>
          <p className="text-muted-foreground">Configure a conexão com a Evolution API</p>
        </div>

        <Card className="gradient-card border-2 border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
              <Server className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Endpoint da API</h2>
              <p className="text-sm text-muted-foreground">URL base da Evolution API</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-url" className="text-foreground">
                URL da API
              </Label>
              <Input
                id="api-url"
                type="url"
                placeholder="http://localhost:8080"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                className="bg-input border-border focus:border-primary"
              />
              <p className="text-xs text-muted-foreground">
                Digite a URL completa onde a Evolution API está rodando (ex: http://seu-servidor.com:8080)
              </p>
            </div>

            <Button
              onClick={handleSave}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-green"
              disabled={saved}
            >
              {saved ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Salvo!
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Salvar Configurações
                </>
              )}
            </Button>
          </div>
        </Card>

        <Card className="gradient-card border-2 border-secondary/30 p-6 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
              <span className="text-2xl">ℹ️</span>
            </div>
            <h2 className="text-xl font-bold text-foreground">Sobre</h2>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong className="text-foreground">Evolution Manager</strong> (CORE Edition)</p>
            <p>Versão: 1.0.0</p>
            <p>Painel de gerenciamento para Evolution API</p>
            <p className="mt-4 text-xs">
              Este aplicativo se conecta diretamente à sua instância da Evolution API.
              Não armazena dados localmente e não requer backend adicional.
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
