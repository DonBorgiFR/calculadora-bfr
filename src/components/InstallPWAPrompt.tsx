import { useState, useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { Download, RefreshCw, X } from 'lucide-react';

export function InstallPWAPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  // Auto-Update PWA Logic
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r: any) {
      console.log('SW Registered:', r);
    },
    onRegisterError(error: any) {
      console.log('SW registration error', error);
    },
  });

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  const closeRefreshModal = () => {
    setNeedRefresh(false);
  };

  // If there's an update pending, show the update prompt with priority
  if (needRefresh) {
    return (
      <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5">
        <div className="bg-slate-800/90 backdrop-blur-md border border-slate-700/50 p-4 rounded-xl shadow-2xl flex flex-col gap-3 min-w-[300px]">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-indigo-400 animate-spin" />
            <h3 className="text-white font-medium text-sm">Nueva versión disponible</h3>
          </div>
          <p className="text-slate-400 text-xs">Actualiza para recibir las últimas mejoras financieras.</p>
          <div className="flex gap-2 mt-1">
            <button
              onClick={() => updateServiceWorker(true)}
              className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white text-xs py-2 rounded-lg font-medium transition-colors"
            >
              Actualizar Ahora
            </button>
            <button
              onClick={closeRefreshModal}
              className="p-2 border border-slate-700 hover:bg-slate-700 rounded-lg text-slate-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If it's installable but no update, show install prompt
  if (isInstallable) {
    return (
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 z-50 animate-in slide-in-from-bottom-5">
        <div className="bg-slate-800/90 backdrop-blur-md border border-slate-700/50 p-4 rounded-xl shadow-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg">
              <Download className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium text-sm">Instalar Calculadora BFR</h3>
              <p className="text-slate-400 text-xs">Añádele a tu inicio para acceso rápido.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleInstallClick}
              className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-2 rounded-lg font-medium transition-colors"
            >
              Instalar
            </button>
            <button
              onClick={() => setIsInstallable(false)}
              className="p-1.5 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
