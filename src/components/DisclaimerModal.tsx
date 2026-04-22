import { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('soromaps_accepted');
    if (!hasAccepted) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('soromaps_accepted', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Atenção</h2>
          <p className="text-gray-700 mb-4">
            Este aplicativo é um <strong>guia informativo não-oficial</strong>.
            O sistema <strong>NÃO</strong> garante a precisão das rotas, disponibilidade de soro nos hospitais, e <strong>NÃO</strong> assume qualquer responsabilidade de salvar vidas.
          </p>
          <p className="text-gray-600 text-sm mb-6">
            Em caso de emergência, sempre que possível, ligue para o SAMU (192) ou procure o hospital mais próximo imediatamente.
          </p>
          <button
            onClick={handleAccept}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors"
          >
            Li e Aceito os Termos
          </button>
        </div>
      </div>
    </div>
  );
}
