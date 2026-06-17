import React, { useState } from 'react';
import { GasStation, FuelType, getSanitizedLogoUrl, getBrandLogoFallback } from '../types';
import { Search, SlidersHorizontal, CheckCircle, MapPin, Navigation, Compass } from 'lucide-react';

interface NearbyListProps {
  stations: GasStation[];
  onSelectStation: (station: GasStation) => void;
  selectedFuel: FuelType;
  setSelectedFuel: (fuel: FuelType) => void;
  onOpenUpdateModal: (station: GasStation) => void;
  onGoToMap: () => void;
}

export default function NearbyList({
  stations,
  onSelectStation,
  selectedFuel,
  setSelectedFuel,
  onOpenUpdateModal,
  onGoToMap
}: NearbyListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'verified' | 'close' | 'cheapest'>('all');
  const [selectedRegion, setSelectedRegion] = useState('TODAS');

  // Compute unique regions dynamically
  const uniqueRegions = ['TODAS', ...Array.from(new Set(stations.map(s => s.region).filter(Boolean).map(r => r.trim().toUpperCase())))];

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

  // 1. Filter stations by search query, region & custom chips
  const filteredStations = stations.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    // Filter by Region
    if (selectedRegion !== 'TODAS') {
      const stationRegion = (s.region || '').trim().toUpperCase();
      if (stationRegion !== selectedRegion) return false;
    }

    if (activeFilter === 'verified') return s.verified;
    if (activeFilter === 'close') return s.distance <= 1.5;
    
    return true;
  });

  // Sort by cheapest if selected
  const sortedStations = [...filteredStations].sort((a, b) => {
    if (activeFilter === 'cheapest') {
      return a.prices[selectedFuel] - b.prices[selectedFuel];
    }
    // Default sort by distance
    return a.distance - b.distance;
  });

  // 2. Identify the absolute cheapest station in the full list for the active fuel type
  const cheapestStation = [...stations].reduce((cheapest, current) => {
    return current.prices[selectedFuel] < cheapest.prices[selectedFuel] ? current : cheapest;
  }, stations[0]);

  return (
    <div className="w-full flex flex-col pb-20">
      
      {/* Search Input */}
      <section className="py-3 space-y-3">
        <div className="relative w-full">
          <input
            type="text"
            className="w-full h-12 pl-12 pr-4 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-hidden focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-all font-sans"
            placeholder="Buscar postos ou bairros..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {/* Region selection row */}
        <div className="space-y-1 pt-1">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest font-mono pl-1 block">Região de Palmas</span>
          <div className="flex gap-1.5 overflow-x-auto pb-1.5 hide-scrollbar">
            {uniqueRegions.map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => setSelectedRegion(region)}
                className={`px-3.5 h-8 rounded-lg text-[10px] font-black font-mono uppercase tracking-wider transition-all border shrink-0 ${
                  selectedRegion === region
                    ? 'bg-blue-800 text-white border-blue-800 shadow-xs'
                    : 'bg-white text-gray-500 border-gray-200 hover:text-gray-900 hover:border-gray-350'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Fuel selector chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          <button 
            type="button"
            onClick={() => setSelectedFuel('Gasoline')}
            className={`px-5 h-9 rounded-full text-xs font-bold font-sans flex items-center shrink-0 uppercase tracking-wider transition-all shadow-xs ${
              selectedFuel === 'Gasoline' 
                ? 'bg-blue-800 text-white' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Gasolina
          </button>
          
          <button 
            type="button"
            onClick={() => setSelectedFuel('GasolineAdit')}
            className={`px-5 h-9 rounded-full text-xs font-bold font-sans flex items-center shrink-0 uppercase tracking-wider transition-all shadow-xs ${
              selectedFuel === 'GasolineAdit' 
                ? 'bg-blue-800 text-white' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Aditivada
          </button>

          <button 
            type="button"
            onClick={() => setSelectedFuel('Ethanol')}
            className={`px-5 h-9 rounded-full text-xs font-bold font-sans flex items-center shrink-0 uppercase tracking-wider transition-all shadow-xs ${
              selectedFuel === 'Ethanol' 
                ? 'bg-blue-800 text-white' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Etanol
          </button>
          
          <button 
            type="button"
            onClick={() => setSelectedFuel('Diesel')}
            className={`px-5 h-9 rounded-full text-xs font-bold font-sans flex items-center shrink-0 uppercase tracking-wider transition-all shadow-xs ${
              selectedFuel === 'Diesel' 
                ? 'bg-blue-800 text-white' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Diesel Comum
          </button>

          <button 
            type="button"
            onClick={() => setSelectedFuel('DieselS10')}
            className={`px-5 h-9 rounded-full text-xs font-bold font-sans flex items-center shrink-0 uppercase tracking-wider transition-all shadow-xs ${
              selectedFuel === 'DieselS10' 
                ? 'bg-blue-800 text-white' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Diesel S10
          </button>

          <div className="w-[1px] h-9 bg-gray-200 shrink-0 self-center"></div>

          <button 
            type="button"
            onClick={() => setActiveFilter(activeFilter === 'close' ? 'all' : 'close')}
            className={`px-4 h-9 rounded-full text-xs font-bold font-sans flex items-center gap-1.5 shrink-0 transition-all shadow-xs ${
              activeFilter === 'close'
                ? 'bg-blue-700 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <MapPin className="w-4 h-4" /> Até 1.5 km
          </button>

          <button 
            type="button"
            onClick={() => setActiveFilter(activeFilter === 'cheapest' ? 'all' : 'cheapest')}
            className={`px-4 h-9 rounded-full text-xs font-bold font-sans flex items-center gap-1.5 shrink-0 transition-all shadow-xs ${
              activeFilter === 'cheapest'
                ? 'bg-rose-700 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" /> Mais Barato
          </button>
        </div>
      </section>

      {/* Best Price Prominent Banner */}
      {cheapestStation && (
        <div 
          onClick={() => onSelectStation(cheapestStation)}
          className="mb-5 rounded-xl overflow-hidden relative min-h-[140px] bg-[#6cf8bb]/20 border-2 border-[#006c49] p-5 flex items-center cursor-pointer shadow-md hover:bg-[#6cf8bb]/30 transition-all transform active:scale-[0.99] group"
        >
          {/* Accent Glow Circle */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#006c49]/5 rounded-full filter blur-xl group-hover:scale-110 transition-transform"></div>
          
          <div className="z-10 w-full flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#006c49] text-white flex items-center justify-center text-xs font-bold font-mono">
                  ★
                </span>
                <p className="text-xs font-bold text-[#00714d] uppercase tracking-wider font-mono">
                  Melhor Preço Próximo
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-[20px] font-extrabold text-[#002113] leading-none mb-2 group-hover:text-blue-900 transition-colors">
                {cheapestStation.name} - {cheapestStation.distance} km
              </h2>
              
              <div className="flex flex-wrap items-end gap-x-6 gap-y-2 mt-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-[10px] font-bold text-gray-600 uppercase mr-1.5 font-mono">
                    {getFuelPortuguese(selectedFuel)}
                  </span>
                  <span className="text-[32px] font-bold text-[#002113] leading-none tracking-tight font-sans">
                    R$ {cheapestStation.prices[selectedFuel].toFixed(2)}
                  </span>
                  <span className="text-[14px] font-semibold text-gray-600">/L</span>
                </div>

                {/* Show secondary fuel price inside the banner for convenience */}
                {selectedFuel !== 'Gasoline' && (
                  <div className="flex items-baseline gap-1 border-l border-[#006c49]/20 pl-4">
                    <span className="text-[10px] font-bold text-gray-500 uppercase mr-1.5 font-mono">
                      Gasolina
                    </span>
                    <span className="text-lg font-bold text-[#005236] leading-none">
                      R$ {cheapestStation.prices.Gasoline.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Nearby Stations List Section Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-gray-900 font-sans tracking-tight">
          Postos Próximos
        </h3>
        <button 
          onClick={onGoToMap}
          className="text-blue-800 hover:text-blue-900 font-bold text-xs flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-blue-50 transition-colors font-mono"
        >
          <Compass className="w-4 h-4" /> VER NO MAPA
        </button>
      </div>

      {/* Station Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedStations.length === 0 ? (
          <div className="py-12 bg-white rounded-xl border border-gray-200 text-center text-gray-500 text-sm md:col-span-2">
            Nenhum posto encontrado para este filtro.
          </div>
        ) : (
          sortedStations.map((station) => {
            const isLowestPrice = cheapestStation && station.id === cheapestStation.id;

            return (
              <article 
                key={station.id}
                onClick={() => onSelectStation(station)}
                className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-4 hover:border-blue-700 transition-all cursor-pointer shadow-xs hover:shadow-md transform active:scale-[0.99] group relative"
              >
                {/* Station general details */}
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    {/* Brand logo container */}
                    <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-150 p-1.5 shrink-0">
                      <img 
                        alt={station.name} 
                        className="w-full h-full object-contain" 
                        src={getSanitizedLogoUrl(station.logoUrl, station.name)}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = getBrandLogoFallback(station.name);
                        }}
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-gray-900 text-base leading-tight group-hover:text-blue-800 transition-colors font-sans">
                          {station.name}
                        </h4>
                      </div>
                      
                      <p className="text-xs text-gray-500 mt-1 font-sans">
                        {station.address} • <span className="font-semibold text-gray-700">{station.distance} km</span>
                      </p>
                    </div>
                  </div>

                  {/* Navigation directions icon launcher */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectStation(station);
                    }}
                    className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-800 rounded-full hover:bg-blue-100 font-medium text-sm transition-colors active:scale-95 shrink-0"
                    title="Detalhes e Rota"
                  >
                    <Navigation className="w-4 h-4 fill-blue-800" />
                  </button>
                </div>

                {/* Pricing row showing all five fuels */}
                <div className="flex gap-2 overflow-x-auto pb-1.5 pt-3.5 border-t border-gray-100 hide-scrollbar">
                  {[
                    { label: 'Gasolina', val: station.prices.Gasoline, key: 'Gasoline' },
                    { label: 'Aditivada', val: station.prices.GasolineAdit, key: 'GasolineAdit' },
                    { label: 'Etanol', val: station.prices.Ethanol, key: 'Ethanol' },
                    { label: 'Diesel Comum', val: station.prices.Diesel, key: 'Diesel' },
                    { label: 'Diesel S10', val: station.prices.DieselS10, key: 'DieselS10' },
                  ].map((fuel) => {
                    const isSelected = selectedFuel === fuel.key;
                    const isCheapestForFuel = isLowestPrice && isSelected;
                    return (
                      <div 
                        key={fuel.key}
                        className={`min-w-[92px] flex-1 p-2 rounded-lg border transition-all ${
                          isCheapestForFuel
                            ? 'bg-emerald-50/40 border-emerald-300 ring-2 ring-emerald-500/10'
                            : isSelected
                            ? 'bg-blue-50/40 border-blue-200'
                            : 'border-gray-100 bg-gray-50/20'
                        }`}
                      >
                        {isCheapestForFuel && (
                          <span className="block text-center bg-[#006c49] text-white text-[7px] font-bold px-1 py-0.5 rounded-md uppercase mb-1 font-mono tracking-widest leading-none">
                            BARATO
                          </span>
                        )}
                        <p className={`text-[8px] font-bold uppercase font-mono tracking-wider ${isSelected ? 'text-blue-800' : 'text-gray-500'}`}>
                          {fuel.label}
                        </p>
                        <div className="flex items-baseline gap-0.5 mt-0.5">
                          <span className={`text-[13px] font-bold font-mono ${
                            isCheapestForFuel ? 'text-[#006c49]' : isSelected ? 'text-blue-900' : 'text-gray-900'
                          }`}>
                            R$ {fuel.val.toFixed(2)}
                          </span>
                          <span className="text-[8px] text-gray-500 font-semibold font-mono">/L</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </article>
            );
          })
        )}
      </div>

    </div>
  );
}
