import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface NewSessionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateSession: (name: string) => Promise<void>;
  loading: boolean;
}

export const NewSessionModal = ({ open, onOpenChange, onCreateSession, loading }: NewSessionModalProps) => {
  const [sessionName, setSessionName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sessionName.trim()) {
      await onCreateSession(sessionName);
      setSessionName('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-secondary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient-core">
            Nova Sessão
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="session-name" className="text-foreground">
                Nome da Sessão
              </Label>
              <Input
                id="session-name"
                placeholder="Ex: Atendimento Principal"
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                className="bg-input border-border focus:border-primary"
                disabled={loading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="border-muted text-muted-foreground hover:bg-muted"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!sessionName.trim() || loading}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Criando...
                </>
              ) : (
                'Criar Sessão'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
