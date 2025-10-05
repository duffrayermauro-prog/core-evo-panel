import { motion } from 'framer-motion';
import { QrCode, Trash2, Wifi, WifiOff, Clock } from 'lucide-react';
import { Session } from '@/types/session';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface SessionCardProps {
  session: Session;
  onViewQR: (session: Session) => void;
  onDelete: (sessionId: string) => void;
}

export const SessionCard = ({ session, onViewQR, onDelete }: SessionCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'border-status-online shadow-glow-green';
      case 'pending':
        return 'border-status-pending';
      case 'offline':
        return 'border-status-offline';
      default:
        return 'border-border';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <Wifi className="w-5 h-5 text-status-online" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-status-pending" />;
      case 'offline':
        return <WifiOff className="w-5 h-5 text-status-offline" />;
      default:
        return <WifiOff className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'pending':
        return 'Pendente';
      case 'offline':
        return 'Offline';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`gradient-card border-2 ${getStatusColor(session.status)} p-6 hover:scale-105 transition-transform duration-200`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {getStatusIcon(session.status)}
            <div>
              <h3 className="text-lg font-bold text-foreground">{session.name}</h3>
              <p className="text-sm text-muted-foreground">{session.id}</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
            session.status === 'online' ? 'bg-status-online/20 text-status-online' :
            session.status === 'pending' ? 'bg-status-pending/20 text-status-pending' :
            'bg-status-offline/20 text-status-offline'
          }`}>
            {getStatusText(session.status)}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewQR(session)}
            className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <QrCode className="w-4 h-4 mr-2" />
            Ver QR
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(session.id)}
            className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};
