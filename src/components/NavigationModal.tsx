import React, { useState, useEffect, useRef } from 'react';
import { GasStation } from '../types';
import { 
  X, Navigation, Compass, MapPin, Play, Pause, ChevronRight, 
  RotateCcw, ExternalLink, Volume2, Check, Award
} from 'lucide-react';

interface NavigationModalProps {
  station: GasStation;
  onClose: () => void;
}

interface Step {
  instruction: string;
  distance: string;
  icon: 'straight' | 'left' | 'right' | 'destination';
}

export default function NavigationModal({ station, onClose }: NavigationModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [voiceInstructions, setVoiceInstructions] = useState('Rota iniciada. Siga em frente.');

  const totalSteps = 4;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Derive static navigation steps based on station
  const steps: Step[] = [
    {
      instruction: 'Inicie na sua localização atual e siga em direção ao Norte.',
      distance: '300m',
      icon: 'straight'
    },
    {
      instruction: `Vire à esquerda na principal avenida em direção a ${station.address.split(',')[0]}.`,
      distance: `${(station.distance * 0.4).toFixed(1)} km`,
      icon: 'left'
    },
    {
      instruction: 'Continue na faixa da direita e passe pelo semáforo.',
      distance: `${(station.distance * 0.4).toFixed(1)} km`,
      icon: 'straight'
    },
    {
      instruction: `Chegando ao seu destino! O posto ${station.name} estará do lado direito.`,
      distance: '100m',
      icon: 'destination'
    }
  ];

  // Calculate estimated duration: ~3 minutes per km + traffic traffic jitter
  const initialDurationMinutes = Math.max(Math.round(station.distance * 3), 2);
  const [remainingTime, setRemainingTime] = useState(initialDurationMinutes * 60); // in seconds

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          const nextProgress = prev + 1.2;
          if (nextProgress >= 100) {
            setIsPlaying(false);
            setProgress(100);
            setCurrentStepIndex(totalSteps - 1);
            setRemainingTime(0);
            setVoiceInstructions('Você chegou ao seu destino final!');
            clearInterval(timerRef.current!);
            return 100;
          }

          // Advance step index based on progress percent
          const calculatedStep = Math.min(
            Math.floor((nextProgress / 100) * totalSteps),
            totalSteps - 1
          );
          if (calculatedStep !== currentStepIndex) {
            setCurrentStepIndex(calculatedStep);
            // Dynamic voice lines updates
            const feedbackNotes = [
              'Continue em frente por mais 500 metros.',
              'No próximo cruzamento, vire à esquerda.',
              'Atenção: radar à frente. Mantenha os limites de segurança.',
              `Chegando ao posto de combustíveis ${station.name}.`
            ];
            setVoiceInstructions(feedbackNotes[calculatedStep] || 'Siga a rota sugerida.');
          }

          setRemainingTime(Math.max(Math.round((1 - nextProgress / 100) * initialDurationMinutes * 60), 0));
          return nextProgress;
        });
      }, 200);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, currentStepIndex, station.name, initialDurationMinutes]);

  const handleReset = () => {
    setProgress(0);
    setCurrentStepIndex(0);
    setRemainingTime(initialDurationMinutes * 60);
    setIsPlaying(true);
    setVoiceInstructions('Rota reiniciada. Siga em frente.');
  };

  const getStepIcon = (iconType: string) => {
    switch (iconType) {
      case 'left':
        return <Compass className="w-5 h-5 text-blue-600 -rotate-90" />;
      case 'right':
        return <Compass className="w-5 h-5 text-blue-600 rotate-90" />;
      case 'destination':
        return <MapPin className="w-5 h-5 text-rose-600" />;
      default:
        return <Navigation className="w-5 h-5 text-blue-600" />;
    }
  };

  const formattedMinutes = Math.floor(remainingTime / 60);
  const formattedSeconds = remainingTime % 60;

  // External real link to Google Maps
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`;

  return (
    <div id="navigation-modal" className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-slate-900 text-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-800 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Banner header top */}
        <div className="p-4 bg-slate-850 flex justify-between items-center border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center animate-pulse">
              <Navigation className="w-4 h-4 text-white fill-white" />
            </div>
            <div>
              <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider font-mono">
                GPS Assistente Ativo
              </p>
              <h3 className="font-extrabold text-sm">{station.name}</h3>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-all cursor-pointer border border-slate-700"
          >
            <X className="w-4 h-4 text-slate-300" />
          </button>
        </div>

        {/* Live Map Representation block */}
        <div className="relative w-full h-44 bg-slate-950 flex flex-col justify-between p-4 overflow-hidden border-b border-slate-800 shrink-0">
          
          {/* Animated decorative grid coordinates background */}
          <div className="absolute inset-0 opacity-15" style={{
            backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)',
            backgroundSize: '16px 16px'
          }}></div>

          {/* Route path vector */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M 50 140 Q 150 50 200 90 T 320 30" 
              fill="none" 
              stroke="#334155" 
              strokeWidth="4" 
              strokeLinecap="round"
            />
            <path 
              d="M 50 140 Q 150 50 200 90 T 320 30" 
              fill="none" 
              stroke="#0284c7" 
              strokeWidth="4" 
              strokeLinecap="round"
              strokeDasharray="400"
              strokeDashoffset={400 - (progress / 100) * 400}
            />
          </svg>

          {/* Start Marker (User) */}
          <div className="absolute left-[35px] bottom-[20px] z-10 flex flex-col items-center">
            <span className="w-3" />
            <div className="w-3 h-3 bg-blue-500 rounded-full ring-4 ring-blue-500/35"></div>
            <span className="text-[9px] font-bold font-mono text-blue-400 mt-1">Você</span>
          </div>

          {/* GPS Moving Unit Indicator */}
          {progress < 100 && (
            <div 
              className="absolute z-20 w-6 h-6 bg-sky-400 rounded-full shadow-lg border border-white flex items-center justify-center transition-all duration-300 ease-out"
              style={{
                left: `${50 + (progress / 100) * 270}px`,
                bottom: `${20 + Math.sin((progress / 100) * Math.PI) * 100}px`
              }}
            >
              <Navigation className="w-3.5 h-3.5 text-slate-900 fill-slate-900 rotate-45 transform" />
            </div>
          )}

          {/* Destination Marker (Station) */}
          <div className="absolute right-[35px] top-[15px] z-10 flex flex-col items-center">
            <div className="w-7 h-7 bg-rose-600 rounded-full border border-white flex items-center justify-center shadow-lg">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <span className="text-[9px] font-bold text-rose-400 mt-1">{station.name}</span>
          </div>

          {/* Upper Info Row */}
          <div className="relative z-10 self-start bg-slate-900/95 border border-slate-800 px-2.5 py-1 rounded-lg flex items-center gap-2">
            <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse shrink-0" />
            <p className="text-[9px] font-bold font-sans text-slate-300 truncate max-w-[200px]">
              {voiceInstructions}
            </p>
          </div>

          {/* Lower ETA/Status Board overlay */}
          <div className="relative z-10 flex justify-between items-end">
            <div>
              <p className="text-[10px] text-slate-400 font-mono tracking-wider">DISTÂNCIA</p>
              <p className="text-lg font-black font-mono">
                {Math.max((station.distance * (1 - progress / 100)), 0).toFixed(2)} km
              </p>
            </div>
            
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-mono tracking-wider">CHEGADA EM</p>
              <p className="text-lg font-black text-emerald-400 font-mono">
                {progress === 100 ? 'Chegou' : `${formattedMinutes}:${formattedSeconds < 10 ? '0' : ''}${formattedSeconds}`}
              </p>
            </div>
          </div>
        </div>

        {/* Step-by-Step interactive card */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
              Próximos Passos
            </h4>
            <div className="flex gap-2">
              <button 
                onClick={handleReset}
                className="px-2 py-1 text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 font-mono flex items-center gap-1 transition-all cursor-pointer"
                title="Reiniciar Simulação"
              >
                <RotateCcw className="w-3 h-3" /> Reiniciar
              </button>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-2 py-1 text-[10px] bg-blue-600 hover:bg-blue-500 text-white rounded font-mono flex items-center gap-1 transition-all cursor-pointer font-bold"
              >
                {isPlaying ? <><Pause className="w-3 h-3" /> Pausar</> : <><Play className="w-3 h-3" /> Continuar</>}
              </button>
            </div>
          </div>

          <div className="space-y-2.5">
            {steps.map((step, idx) => {
              const isCurrent = idx === currentStepIndex;
              const isPast = idx < currentStepIndex;

              return (
                <div 
                  key={idx}
                  className={`p-3 rounded-xl border flex items-start gap-3 transition-all duration-300 ${
                    isCurrent 
                      ? 'bg-slate-850 border-blue-500/60 shadow-md ring-1 ring-blue-500/20' 
                      : isPast 
                        ? 'bg-slate-900/40 border-slate-850 opacity-40 line-through' 
                        : 'bg-slate-900/60 border-slate-850 opacity-80'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    isCurrent 
                      ? 'bg-blue-500 text-white ring-4 ring-blue-500/20' 
                      : isPast 
                        ? 'bg-slate-800 text-slate-500' 
                        : 'bg-slate-800 text-slate-400'
                  }`}>
                    {isPast ? <Check className="w-4 h-4 text-emerald-400" /> : getStepIcon(step.icon)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={`text-xs ${isCurrent ? 'font-bold text-white' : 'text-slate-300'}`}>
                      {step.instruction}
                    </p>
                    <span className="text-[10px] font-bold font-mono text-slate-400 mt-0.5 block">
                      {step.distance}
                    </span>
                  </div>

                  {isCurrent && (
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 self-center animate-ping"></span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Outer Links / Open Google Maps drawer info footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-900 shrink-0 text-center space-y-3">
          
          {progress === 100 ? (
            <div className="py-2.5 bg-emerald-950/40 border border-emerald-800/40 rounded-xl flex items-center justify-center gap-2 text-emerald-400">
              <Award className="w-5 h-5" />
              <span className="text-xs font-bold uppercase font-mono">Você chegou ao Posto!</span>
            </div>
          ) : (
            <p className="text-[11px] text-slate-400">
              A simulação demonstra a rota para o posto dentro do seu painel corporativo.
            </p>
          )}

          <a 
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-11 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-98"
          >
            <ExternalLink className="w-4 h-4" />
            Abrir GPS no Google Maps
          </a>
        </div>

      </div>
    </div>
  );
}
