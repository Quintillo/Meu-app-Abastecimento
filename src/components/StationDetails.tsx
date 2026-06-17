import React, { useState } from 'react';
import { GasStation, FuelType, getSanitizedLogoUrl, getBrandLogoFallback } from '../types';
import { MINIMAP_IMAGE_URL } from '../data';
import { 
  ArrowLeft, MapPin, CheckCircle, Navigation, Edit3, 
  ShoppingBag, Car, BatteryCharging, Utensils, Clock, AlertTriangle,
  Map as MapIcon, Globe, MessageSquare, Send, Lock, ShieldAlert
} from 'lucide-react';

interface StationDetailsProps {
  station: GasStation;
  selectedFuel: FuelType;
  onBack: () => void;
  onOpenPriceUpdate: () => void;
  onOpenNavigation: (station: GasStation) => void;
  onAddComment: (stationId: string, text: string) => void;
  isDeveloper?: boolean;
}

export default function StationDetails({
  station,
  selectedFuel,
  onBack,
  onOpenPriceUpdate,
  onOpenNavigation,
  onAddComment,
  isDeveloper = false
}: StationDetailsProps) {
  const [mapType, setMapType] = useState<'streets' | 'satellite'>('streets');
  const [coverError, setCoverError] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showDevOnlyPrompt, setShowDevOnlyPrompt] = useState(false);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(station.id, commentText.trim());
    setCommentText('');
  };

  // Substitute known broken cover photo with a highly reliable and gorgeous one
  const rawCoverUrl = station.coverUrl;
  const coverUrl = rawCoverUrl.includes('photo-1610444378125-9f5b2ba98dc8')
    ? 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?q=80&w=600&auto=format&fit=crop'
    : rawCoverUrl;

  const getBrandedFallback = () => {
    const nameUpper = station.name.toUpperCase();
    if (nameUpper.includes('IPIRANGA')) {
      return {
        gradient: 'from-amber-600 to-amber-700',
        brand: 'IPIRANGA',
        color: 'text-amber-100'
      };
    }
    if (nameUpper.includes('SHELL')) {
      return {
        gradient: 'from-red-650 to-red-800',
        brand: 'SHELL',
        color: 'text-yellow-100'
      };
    }
    if (nameUpper.includes('PETROBRAS') || nameUpper.includes('PETROBRÁS') || nameUpper.includes('BR ') || nameUpper.includes('ELDORADO') || nameUpper.includes('RODOPOSTO') || nameUpper.includes('VERÃO') || nameUpper.includes('AUTOVIA')) {
      return {
        gradient: 'from-emerald-700 to-emerald-850',
        brand: 'PETROBRAS BR',
        color: 'text-yellow-100'
      };
    }
    return {
      gradient: 'from-blue-900 via-blue-950 to-indigo-950',
      brand: 'POSTO DE SERVIÇOS',
      color: 'text-blue-100'
    };
  };

  const brandStyle = getBrandedFallback();

  // Translate services to icons
  const renderServiceIcon = (service: string) => {
    switch (service) {
      case 'store': 
        return <ShoppingBag className="w-6 h-6 text-blue-800" />;
      case 'car-wash': 
        return <Car className="w-6 h-6 text-blue-800" />;
      case 'ev-charging': 
        return <BatteryCharging className="w-6 h-6 text-blue-800" />;
      case 'restaurant': 
        return <Utensils className="w-6 h-6 text-blue-800" />;
      default:
        return <ShoppingBag className="w-6 h-6 text-blue-800" />;
    }
  };

  const getServiceLabel = (service: string) => {
    switch (service) {
      case 'store': return 'Loja';
      case 'car-wash': return 'Lava-jato';
      case 'ev-charging': return 'Recarga EV';
      case 'restaurant': return 'Alimentação';
      default: return service;
    }
  };

  const getFuelPortuguese = (type: FuelType): string => {
    switch (type) {
      case 'Gasoline': return 'GASOLINA COMUM';
      case 'GasolineAdit': return 'GASOLINA ADITIVADA';
      case 'Ethanol': return 'ETANOL';
      case 'Diesel': return 'DIESEL COMUM';
      case 'DieselS10': return 'DIESEL S10';
    }
  };

  return (
    <div className="w-full flex flex-col pb-24 relative font-sans animate-in fade-in slide-in-from-right-8 duration-200">
      
      {/* Top Header Row for Navigation */}
      <div className="flex items-center gap-2 mb-4">
        <button 
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-blue-800 active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-blue-800" />
        </button>
        <span className="font-bold text-lg text-blue-800 tracking-tight font-sans">
          Detalhes do Posto
        </span>
      </div>

      {/* Hero Cover section */}
      <section className="relative w-full h-56 bg-slate-900 overflow-hidden rounded-xl shadow-xs">
        {!coverError ? (
          <img 
            alt={station.name}
            className="w-full h-full object-cover filter brightness-[0.85]"
            src={coverUrl}
            onError={() => setCoverError(true)}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${brandStyle.gradient} flex flex-col justify-end p-5 relative select-none`}>
            {/* Ambient pattern */}
            <div className="absolute inset-0 opacity-10 bg-radial-gradient from-white to-transparent"></div>
            <div className="absolute top-4 right-4 text-white/10 font-black text-6xl select-none uppercase tracking-widest font-sans">
              {brandStyle.brand[0]}
            </div>
            
            <div className="relative z-10 flex flex-col">
              <span className={`text-[10px] font-black tracking-widest uppercase ${brandStyle.color} font-mono`}>
                RESERVA DE IMAGEM
              </span>
              <span className="text-xl font-black text-white uppercase tracking-tight font-sans mt-0.5">
                {brandStyle.brand}
              </span>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
      </section>

      {/* Brand card container (Overlaps cover section) */}
      <article className="px-3 -mt-16 relative z-10">
        <div className="bg-white p-5 rounded-xl border border-gray-150 shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
            
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center text-white p-1 shrink-0">
                  <img 
                    alt={station.name} 
                    className="w-full h-full object-contain filter brightness-100" 
                    src={getSanitizedLogoUrl(station.logoUrl, station.name)}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = getBrandLogoFallback(station.name);
                    }}
                    referrerPolicy="no-referrer"
                  />
                </span>
                <h1 className="font-extrabold text-[20px] text-gray-900 leading-tight font-sans">
                  {station.name}
                </h1>
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-1 font-sans mt-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                {station.address}
              </p>
            </div>

            <div className="flex flex-col items-end shrink-0">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-800 font-bold text-[10px] uppercase rounded-full flex items-center gap-1.5 font-mono tracking-wider border border-emerald-100 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                ABERTO AGORA
              </span>
              <p className="text-[11px] text-gray-500 mt-1 italic font-sans text-right">
                {station.closeTime === '24h' ? 'Atendimento 24h' : `Fecha às ${station.closeTime}`}
              </p>
            </div>
          </div>

          {/* Action cluster row */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
            <button 
              type="button"
              onClick={() => onOpenNavigation(station)}
              className="h-11 px-3 bg-blue-800 hover:bg-blue-900 text-white rounded-lg flex items-center justify-center gap-1.5 font-bold font-sans text-[10px] xs:text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis"
            >
              <Navigation className="w-3.5 h-3.5 text-white fill-white shrink-0" /> Como chegar
            </button>
            
            <button 
              type="button"
              onClick={() => {
                if (isDeveloper) {
                  onOpenPriceUpdate();
                } else {
                  setShowDevOnlyPrompt(true);
                }
              }}
              className={`h-11 px-3 border rounded-lg flex items-center justify-center gap-1.5 font-bold font-sans text-[10px] xs:text-xs uppercase tracking-wider transition-all active:scale-95 cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis ${
                isDeveloper 
                  ? 'border-blue-800 text-blue-800 hover:text-blue-950 hover:bg-blue-50/55' 
                  : 'border-amber-600 bg-amber-50/40 text-amber-900 hover:bg-amber-50'
              }`}
            >
              {isDeveloper ? (
                <>
                  <Edit3 className="w-3.5 h-3.5 text-blue-800 shrink-0" /> Atualizar Preço
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-700 shrink-0" /> Atualizar Preço
                </>
              )}
            </button>
          </div>

        </div>
      </article>

      {/* Fuel pricing Bento Grid */}
      <section className="mt-6">
        <h2 className="font-bold text-base text-gray-900 mb-3 border-l-4 border-blue-800 pl-2.5 font-sans">
          Preços de Combustível
        </h2>
        
        <div className="grid grid-cols-1 gap-4">
          
          {/* Main Primary highlight Card */}
          <div className="bg-white p-5 rounded-xl border-2 border-emerald-600 flex justify-between items-center relative overflow-hidden ring-4 ring-emerald-500/10">
            <div className="absolute top-0 right-0 bg-[#006c49] text-white px-3 py-1 rounded-bl-lg font-bold text-[9px] uppercase tracking-wider font-mono">
              MAIS BARATO NA ÁREA
            </div>
            
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider font-mono">
                {getFuelPortuguese(selectedFuel)}
              </span>
              <div className="flex items-baseline gap-1 mt-1.5 flex-wrap">
                <span className="text-[32px] font-extrabold text-[#002113] leading-none tracking-tight font-sans">
                  R$ {station.prices[selectedFuel].toFixed(2)}
                </span>
                <span className="text-[13px] text-gray-500 font-bold font-mono">/L</span>
              </div>
            </div>
          </div>

          {/* Secondary smaller fuel card boxes */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'GASOLINA COMUM', key: 'Gasoline', price: station.prices.Gasoline },
              { label: 'GASOLINA ADITIVADA', key: 'GasolineAdit', price: station.prices.GasolineAdit },
              { label: 'ETANOL', key: 'Ethanol', price: station.prices.Ethanol },
              { label: 'DIESEL COMUM', key: 'Diesel', price: station.prices.Diesel },
              { label: 'DIESEL S10', key: 'DieselS10', price: station.prices.DieselS10 },
            ].filter(f => f.key !== selectedFuel).map((f) => (
              <div key={f.key} className="bg-white p-4 rounded-xl border border-gray-150 shadow-xs">
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider font-mono">{f.label}</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-extrabold text-gray-900 font-sans">
                    R$ {f.price.toFixed(2)}
                  </span>
                  <span className="text-[11px] text-gray-400 font-bold font-mono">/L</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Services and Amenities panel */}
      <section className="mt-6">
        <h2 className="font-bold text-base text-gray-900 mb-3 border-l-4 border-blue-800 pl-2.5 font-sans">
          Serviços &amp; Comodidades
        </h2>
        
        <div className="flex flex-wrap gap-3">
          {station.services.map((service) => (
            <div 
              key={service}
              className="flex-1 min-w-[130px] bg-blue-50/30 p-4 rounded-xl border border-gray-150 flex flex-col items-center text-center gap-2.5 hover:bg-blue-50 transition-colors justify-center select-none"
            >
              {renderServiceIcon(service)}
              <span className="font-bold text-xs text-gray-800 font-sans">
                {getServiceLabel(service)}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Map location section */}
      <section className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-base text-gray-900 border-l-4 border-blue-800 pl-2.5 font-sans">
            Localização Real Do Posto
          </h2>
          <div className="flex gap-1.5 bg-gray-100 p-0.5 rounded-lg border border-gray-200">
            <button
              type="button"
              onClick={() => setMapType('streets')}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-md font-sans transition-all flex items-center gap-1 cursor-pointer ${
                mapType === 'streets'
                  ? 'bg-white text-blue-800 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" /> Mapa
            </button>
            <button
              type="button"
              onClick={() => setMapType('satellite')}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-md font-sans transition-all flex items-center gap-1 cursor-pointer ${
                mapType === 'satellite'
                  ? 'bg-white text-blue-800 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Globe className="w-3.5 h-3.5" /> Satélite
            </button>
          </div>
        </div>
        
        <div className="w-full h-48 rounded-xl overflow-hidden border border-gray-200 relative shadow-inner bg-slate-100">
          <img 
            alt="Localização do posto" 
            className="w-full h-full object-cover"
            src={
              mapType === 'streets'
                ? `https://static-maps.yandex.ru/1.x/?ll=${station.longitude},${station.latitude}&z=16&l=map&size=650,350&pt=${station.longitude},${station.latitude},pm2rdl`
                : `https://static-maps.yandex.ru/1.x/?ll=${station.longitude},${station.latitude}&z=17&l=sat,skl&size=650,350&pt=${station.longitude},${station.latitude},pm2rdl`
            }
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-2.5 left-2.5 bg-black/75 text-white text-[9px] px-2 py-1 rounded font-mono font-bold tracking-tight">
            Lat: {station.latitude.toFixed(6)}, Lng: {station.longitude.toFixed(6)}
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-10 h-10 bg-blue-800 rounded-full border-4 border-white shadow-xl flex items-center justify-center animate-pulse">
              <MapPin className="w-4.5 h-4.5 text-white animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Comments section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-150 p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-blue-800" />
          <h2 className="font-bold text-base text-gray-905 font-sans">
            Comentários da Comunidade ({ (station.comments || []).length + 2 })
          </h2>
        </div>

        {/* Comment input form */}
        <form onSubmit={handleCommentSubmit} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Escreva um comentário sobre o posto..."
              className="flex-1 h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs md:text-sm text-gray-900 focus:outline-hidden focus:ring-1 focus:ring-blue-800 focus:border-blue-800 focus:bg-white transition-all font-sans"
            />
            <button
              type="submit"
              className="h-10 px-4 bg-blue-800 hover:bg-blue-900 text-white rounded-lg flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </form>

        {/* Comments list bubble stack */}
        <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
          {/* Real comments entered by state */}
          {(station.comments || []).map((comment) => (
            <div key={comment.id} className="flex gap-3 items-start text-xs border-b border-gray-100 pb-3 last:border-0 last:pb-0 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <img
                src={comment.userAvatarUrl}
                alt={comment.userName}
                className="w-8 h-8 rounded-full object-cover border border-gray-200 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-gray-901 font-sans">{comment.userName}</span>
                  <span className="text-[10px] text-gray-400 font-mono">{comment.timestamp}</span>
                </div>
                <p className="text-gray-650 font-sans leading-relaxed">{comment.text}</p>
              </div>
            </div>
          ))}

          {/* Fallback default comments */}
          <div className="flex gap-3 items-start text-xs border-b border-gray-100 pb-3 last:border-0 last:pb-0">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
              alt="Felipe Souza"
              className="w-8 h-8 rounded-full object-cover border border-gray-200 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-gray-901 font-sans">Felipe Souza</span>
                <span className="text-[10px] text-gray-400 font-mono">Há 2h</span>
              </div>
              <p className="text-gray-650 font-sans leading-relaxed">Preço atualizado e excelente atendimento na loja de conveniência!</p>
            </div>
          </div>

          <div className="flex gap-3 items-start text-xs">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
              alt="Camila Lima"
              className="w-8 h-8 rounded-full object-cover border border-gray-200 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-gray-901 font-sans">Camila Lima</span>
                <span className="text-[10px] text-gray-400 font-mono">Ontem</span>
              </div>
              <p className="text-gray-650 font-sans leading-relaxed">Filas organizadas e bicos de combustível funcionando perfeitamente.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dev-only Permission Dialog Overlay */}
      {showDevOnlyPrompt && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-gray-150 p-6 max-w-sm w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 mb-4 border border-amber-100 shadow-xs">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h3 className="font-extrabold text-gray-900 text-lg font-sans">
                Acesso Restrito
              </h3>
              <p className="text-sm text-gray-650 mt-2 font-sans">
                Somente o desenvolvedor cadastrado tem permissão para alterar ou atualizar os valores dos combustíveis nesta plataforma.
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 w-full my-4 font-mono text-[11px] text-gray-650 break-all select-all">
                Permissão concedida apenas para:<br />
                <span className="font-semibold text-blue-800">quintilloalef@gmail.com</span>
              </div>
              <button
                type="button"
                onClick={() => setShowDevOnlyPrompt(false)}
                className="w-full py-2.5 bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-lg text-xs tracking-wider uppercase transition-colors shadow-md active:scale-95 cursor-pointer mt-1"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
