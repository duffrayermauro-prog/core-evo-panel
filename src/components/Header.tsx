import { Link, useLocation } from 'react-router-dom';
import { Settings, LayoutDashboard, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header = () => {
  const location = useLocation();

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-core flex items-center justify-center">
            <span className="text-2xl font-bold text-background">E</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gradient-core">Evolution Manager</h1>
            <p className="text-xs text-muted-foreground">CORE Edition</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          <Link to="/">
            <Button
              variant={location.pathname === '/' ? 'default' : 'ghost'}
              size="sm"
              className={location.pathname === '/' ? 'bg-primary text-primary-foreground' : ''}
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <Link to="/documentation">
            <Button
              variant={location.pathname === '/documentation' ? 'default' : 'ghost'}
              size="sm"
              className={location.pathname === '/documentation' ? 'bg-accent text-accent-foreground' : ''}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Docs</span>
            </Button>
          </Link>
          <Link to="/settings">
            <Button
              variant={location.pathname === '/settings' ? 'default' : 'ghost'}
              size="sm"
              className={location.pathname === '/settings' ? 'bg-secondary text-secondary-foreground' : ''}
            >
              <Settings className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Configurações</span>
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};
