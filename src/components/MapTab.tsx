import React, { useState } from 'react';
import { GasStation, FuelType, getSanitizedLogoUrl, getBrandLogoFallback } from '../types';
import { MAP_IMAGE_URL } from '../data';
import { Check, Info, Navigation, Star, ChevronDown, RefreshCw, MessageSquare } from 'lucide-react';

interface MapTabProps {
  stations: GasStation[];
  selectedStation: GasStation | null;
  onSelectStation: (station: GasStation) => void;
  selectedFuel: FuelType;
  setSelectedFuel: (fuel: FuelType) => void;
  onOpenDetails: (station: GasStation) => void;
}

export default function MapTab({
  stations,
  selectedStation,
  onSelectStation,
  selectedFuel,
  setSelectedFuel,
  onOpenDetails
}: MapTabProps) {
  const [activeChipFilter, setActiveChipFilter] = useState<'all' | 'close' | 'verified'>('all');

  // Multi fuel label helper
  const getFuelPortuguese = (type: FuelType): string => {
    switch (type) {
      case 'Gasoline': return 'Gasolina';
      case 'GasolineAdit': return 'Aditivada';
      case 'Ethanol': return 'Etanol';
      case 'Diesel': return 'Diesel Comum';
      case 'DieselS10': return 'Diesel S10';
    }
  };

  // Cheapest gas station for the highlighted indicator
  const cheapestStation = [...stations].reduce((cheapest, current) => {
    return current.prices[selectedFuel] < cheapest.prices[selectedFuel] ? current : cheapest;
  }, stations[0]);

  // Filters
  const mapStationsList = stations.filter(s => {
    if (activeChipFilter === 'close') return s.distance <= 1.5;
    if (activeChipFilter === 'verified') return s.verified;
    return true;
  });

  const activeStation = selectedStation || mapStationsList[0] || stations[0];

  // Boundaries for dynamic GPS projection based on Palmas coordinates
  const lats = stations.map(s => s.latitude);
  const lngs = stations.map(s => s.longitude);
  const minLat = lats.length > 0 ? Math.min(...lats) : -10.35;
  const maxLat = lats.length > 0 ? Math.max(...lats) : -10.15;
  const minLng = lngs.length > 0 ? Math.min(...lngs) : -48.40;
  const maxLng = lngs.length > 0 ? Math.max(...lngs) : -48.25;

  const getPercentageTop = (lat: number) => {
    if (maxLat === minLat) return 50;
    const fraction = (maxLat - lat) / (maxLat - minLat);
    return 10 + fraction * 80; // project inside 10% to 90%
  };

  const getPercentageLeft = (lng: number) => {
    if (maxLng === minLng) return 50;
    const fraction = (lng - minLng) / (maxLng - minLng);
    return 10 + fraction * 80; // project inside 10% to 90%
  };

  return (
    <div className="absolute inset-0 top-16 bottom-16 overflow-hidden flex flex-col font-sans">
      
      {/* Search & Filter Chips (Floating Overlay) */}
      <div className="absolute top-4 left-0 w-full px-4 z-30 flex flex-col gap-2 pointer-events-none">
        <div className="flex overflow-x-auto gap-2 hide-scrollbar pb-1 pointer-events-auto">
          {/* Fuel type dropchip selector */}
          <div className="relative shrink-0">
            <select
              value={selectedFuel}
              onChange={(e) => setSelectedFuel(e.target.value as FuelType)}
              className="appearance-none bg-blue-800 text-white font-bold font-sans text-[11px] uppercase tracking-wider px-4 pr-8 py-2 rounded-full shadow-md border-hidden h-9 cursor-pointer outline-hidden flex items-center"
            >
              <option value="Gasoline">Gasolina</option>
              <option value="GasolineAdit">Aditivada</option>
              <option value="Ethanol">Etanol</option>
              <option value="Diesel">Diesel Comum</option>
              <option value="DieselS10">Diesel S10</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-white absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button 
            type="button"
            onClick={() => setActiveChipFilter(activeChipFilter === 'close' ? 'all' : 'close')}
            className={`shrink-0 px-4 h-9 rounded-full font-bold font-sans text-[11px] uppercase tracking-wider shadow-sm transition-all border ${
              activeChipFilter === 'close'
                ? 'bg-blue-700 text-white border-blue-700'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            Até 1.5 KM
          </button>
        </div>
      </div>

      {/* Main Map Box */}
      <div className="relative w-full h-full bg-slate-200 overflow-hidden">
        
        {/* Map Background Image */}
        <img 
          alt="Vista aérea de mapa de satélite" 
          className="w-full h-full object-cover filter brightness-[0.93] contrast-[1.05]"
          src={MAP_IMAGE_URL}
          referrerPolicy="no-referrer"
        />

        {/* Map Interactive Pins Overlay */}
        {mapStationsList.map((station) => {
          const isSelected = activeStation && station.id === activeStation.id;
          const isCheapest = cheapestStation && station.id === cheapestStation.id;

          const fuelPrice = station.prices[selectedFuel];

          // Determine style variant
          let pinBgColor = 'bg-blue-800 text-white border-white';
          if (isCheapest) {
            pinBgColor = 'bg-[#006c49] text-white border-white';
          }
          if (isSelected) {
            pinBgColor = 'bg-blue-900 text-white border-white ring-4 ring-blue-500/30';
          }

          return (
            <button
               key={station.id}
               onClick={() => onSelectStation(station)}
               style={{
                 top: `${getPercentageTop(station.latitude)}%`,
                 left: `${getPercentageLeft(station.longitude)}%`
               }}
               className="absolute z-20 -translate-x-1/2 -translate-y-full flex flex-col items-center select-none cursor-pointer group transition-transform hover:scale-108 active:scale-95 duration-200"
            >
              {/* Pin Head */}
              <div className={`shadow-lg border-2 rounded-full font-bold font-sans flex items-center gap-1 leading-tight py-1.5 transition-all text-xs ${
                isSelected ? 'px-4 py-2 text-sm border-white scale-110 shadow-2xl' : 'px-3'
              } ${pinBgColor}`}>
                
                {isSelected && (
                  <span className="w-2.5 h-2.5 bg-sky-200 rounded-full animate-ping inline-block shrink-0"></span>
                )}
                
                <span>R$ {fuelPrice.toFixed(2)}</span>

                {isCheapest && (
                  <span className="bg-emerald-500 text-white text-[8px] rounded-full p-0.5" title="Mais Barato">
                    ✓
                  </span>
                )}
              </div>

              {/* Pin Pointer Tail */}
              <div className={`w-1 h-3 -mt-0.5 shadow-xl transition-all ${
                isSelected ? 'h-4 w-1.5 bg-blue-900' : isCheapest ? 'bg-[#006c49]' : 'bg-blue-800'
              }`}></div>
              
              {/* Optional dynamic shadow bulb */}
              <div className="w-5 h-1.5 bg-black/25 rounded-full filter blur-xs -mt-1 opacity-70 group-hover:scale-110"></div>
            </button>
          );
        })}
      </div>

      {/* Floating Gas Station Detail Card (Bottom Overlay) */}
      {activeStation && (
        <div className="absolute bottom-4 left-0 w-full px-4 z-40">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-2xl flex flex-col gap-3.5 max-w-lg mx-auto">
            
            <div className="flex justify-between items-start gap-2">
              <div className="flex gap-3">
                {/* Brand Logo */}
                <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-150 p-1 shrink-0">
                  <img 
                    alt={activeStation.name} 
                    className="w-10 h-10 object-contain" 
                    src={getSanitizedLogoUrl(activeStation.logoUrl, activeStation.name)}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = getBrandLogoFallback(activeStation.name);
                    }}
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-gray-900 text-[17px] font-sans">
                      {activeStation.name}
                    </h3>
                    {cheapestStation && activeStation.id === cheapestStation.id && (
                      <span className="bg-[#6cf8bb] text-[#00714d] text-[10px] px-2 py-0.5 rounded font-extrabold font-mono uppercase tracking-wider">
                        MELHOR PREÇO
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-0.5 font-sans leading-tight">
                    {activeStation.address}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[11px] text-gray-500 font-semibold flex items-center gap-0.5">
                      <Navigation className="w-3.5 h-3.5 text-gray-400 rotate-45" />
                      {activeStation.distance} km
                    </span>
                  </div>
                </div>
              </div>

              {/* Float Pricing Column */}
              <div className="text-right flex flex-col gap-1.5 shrink-0 pl-1">
                <div className="flex flex-col items-end">
                  <span className="text-[9px] font-bold text-gray-500 leading-none uppercase font-mono tracking-wider">Gasolina</span>
                  <span className="font-bold text-sm text-blue-800">
                    R$ {activeStation.prices.Gasoline.toFixed(2)}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[9px] font-bold text-gray-500 leading-none uppercase font-mono tracking-wider">Etanol</span>
                  <span className="font-semibold text-xs text-gray-700">
                    R$ {activeStation.prices.Ethanol.toFixed(2)}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[9px] font-bold text-gray-500 leading-none uppercase font-mono tracking-wider">Diesel</span>
                  <span className="font-semibold text-xs text-gray-700">
                    R$ {activeStation.prices.Diesel.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons Details and Route */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button 
                type="button"
                onClick={() => onOpenDetails(activeStation)}
                className="h-11 flex items-center justify-center gap-1.5 border border-blue-800 text-blue-800 hover:text-blue-900 font-bold font-sans text-xs uppercase tracking-wider rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <Info className="w-4 h-4" /> Detalhes
              </button>
              
              <button 
                type="button"
                onClick={() => onOpenDetails(activeStation)}
                className="h-11 flex items-center justify-center gap-1.5 bg-blue-800 hover:bg-blue-900 text-white font-bold font-sans text-xs uppercase tracking-wider rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer transform active:scale-98"
              >
                <Navigation className="w-4 h-4 text-white fill-white" /> Rota rápida
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
