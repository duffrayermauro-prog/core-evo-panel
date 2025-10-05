import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Session } from '@/types/session';
import { Loader2 } from 'lucide-react';

interface QRCodeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: Session | null;
  qrCode: string | null;
  loading: boolean;
}

export const QRCodeModal = ({ open, onOpenChange, session, qrCode, loading }: QRCodeModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient-core">
            QR Code - {session?.name}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-6">
          {loading ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Carregando QR Code...</p>
            </div>
          ) : qrCode ? (
            <div className="bg-white p-4 rounded-lg">
              <img src={qrCode} alt="QR Code" className="w-64 h-64" />
            </div>
          ) : (
            <p className="text-destructive">Erro ao carregar QR Code</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
