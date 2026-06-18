import React, { useState, useEffect, useRef } from 'react';
import { GasStation, FuelType, getSanitizedLogoUrl, getBrandLogoFallback } from '../types';
import { MAP_IMAGE_URL } from '../data';
import { 
  Check, Info, Navigation, Star, ChevronDown, RefreshCw, MessageSquare,
  Locate, Compass, LocateOff, ZoomIn, ZoomOut, Maximize2
} from 'lucide-react';

interface MapTabProps {
  stations: GasStation[];
  selectedStation: GasStation | null;
  onSelectStation: (station: GasStation) => void;
  selectedFuel: FuelType;
  setSelectedFuel: (fuel: FuelType) => void;
  onOpenDetails: (station: GasStation) => void;
  userCoords: { latitude: number; longitude: number } | null;
  setUserCoords: (coords: { latitude: number; longitude: number } | null) => void;
}

export default function MapTab({
  stations,
  selectedStation,
  onSelectStation,
  selectedFuel,
  setSelectedFuel,
  onOpenDetails,
  userCoords,
  setUserCoords
}: MapTabProps) {
  const [activeChipFilter, setActiveChipFilter] = useState<'all' | 'close' | 'verified'>('all');
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [simulationActive, setSimulationActive] = useState(false);

  // High performance zoom and pan state mechanisms for raster maps
  const [zoom, setZoom] = useState(1.0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const requestRealGPS = () => {
    setIsLocating(true);
    setGpsError(null);
    if (!navigator.geolocation) {
      setGpsError("Seu navegador não suporta geolocalização.");
      setIsLocating(false);
      activateSimulation();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserCoords({ latitude, longitude });
        setSimulationActive(false);
        setIsLocating(false);
      },
      (error) => {
        console.error("GPS Error", error);
        setGpsError("Permissão de GPS negada. Ativando localização simulada em Palmas!");
        setIsLocating(false);
        activateSimulation();
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  const activateSimulation = () => {
    // Standard central location in Palmas, Tocantins
    setUserCoords({
      latitude: -10.2185,
      longitude: -48.3308
    });
    setSimulationActive(true);
  };

  const clearLocation = () => {
    setUserCoords(null);
    setSimulationActive(false);
    setGpsError(null);
  };

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

  // Boundaries calibrated for the Palmas screenshot raster map (100% matched with actual layout)
  const MAP_LAT_NORTH = -10.122;
  const MAP_LAT_SOUTH = -10.372;
  const MAP_LNG_WEST = -48.428;
  const MAP_LNG_EAST = -48.228;

  const getPercentageTop = (lat: number) => {
    const totalDiff = MAP_LAT_NORTH - MAP_LAT_SOUTH;
    const itemDiff = MAP_LAT_NORTH - lat;
    const pct = (itemDiff / totalDiff) * 100;
    return Math.max(0, Math.min(100, pct));
  };

  const getPercentageLeft = (lng: number) => {
    const totalDiff = MAP_LNG_EAST - MAP_LNG_WEST;
    const itemDiff = lng - MAP_LNG_WEST;
    const pct = (itemDiff / totalDiff) * 100;
    return Math.max(0, Math.min(100, pct));
  };

  // Center camera view smoothly on a specific lat/lng coordinate
  const centerOnCoordinate = (lat: number, lng: number, desiredZoom = 1.8) => {
    if (!mapContainerRef.current) return;
    const rect = mapContainerRef.current.getBoundingClientRect();
    const W = rect.width;
    const H = rect.height;
    if (W === 0 || H === 0) return;

    const pctLeft = getPercentageLeft(lng);
    const pctTop = getPercentageTop(lat);

    const tx = W * (0.5 - (pctLeft / 100) * desiredZoom);
    const ty = H * (0.5 - (pctTop / 100) * desiredZoom);

    // Limit coordinates translation so map does not drag off viewport
    const minX = W * (1 - desiredZoom);
    const minY = H * (1 - desiredZoom);
    const clampedX = Math.min(0, Math.max(minX, tx));
    const clampedY = Math.min(0, Math.max(minY, ty));

    setZoom(desiredZoom);
    setPan({ x: clampedX, y: clampedY });
  };

  const resetMap = () => {
    setZoom(1.0);
    setPan({ x: 0, y: 0 });
  };

  // Trigger camera centering automatically on selectedStation changes
  useEffect(() => {
    if (selectedStation) {
      const timer = setTimeout(() => {
        centerOnCoordinate(selectedStation.latitude, selectedStation.longitude, 1.8);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        resetMap();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedStation]);

  // Trigger camera centering automatically on GPS activation
  useEffect(() => {
    if (userCoords && !selectedStation) {
      const timer = setTimeout(() => {
        centerOnCoordinate(userCoords.latitude, userCoords.longitude, 1.6);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [userCoords]);

  // Click & Drag mouse events
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      (e.target as HTMLElement).closest('button') || 
      (e.target as HTMLElement).closest('select') ||
      (e.target as HTMLElement).closest('a')
    ) {
      return;
    }
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rawX = e.clientX - dragStart.x;
    const rawY = e.clientY - dragStart.y;

    if (mapContainerRef.current) {
      const rect = mapContainerRef.current.getBoundingClientRect();
      const minX = rect.width * (1 - zoom);
      const minY = rect.height * (1 - zoom);

      const clampedX = Math.min(0, Math.max(minX, rawX));
      const clampedY = Math.min(0, Math.max(minY, rawY));
      setPan({ x: clampedX, y: clampedY });
    } else {
      setPan({ x: rawX, y: rawY });
    }
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Touch triggers for mobile interactions
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (
      (e.target as HTMLElement).closest('button') || 
      (e.target as HTMLElement).closest('select') ||
      (e.target as HTMLElement).closest('a')
    ) {
      return;
    }
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({ x: touch.clientX - pan.x, y: touch.clientY - pan.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const rawX = touch.clientX - dragStart.x;
      const rawY = touch.clientY - dragStart.y;

      if (mapContainerRef.current) {
        const rect = mapContainerRef.current.getBoundingClientRect();
        const minX = rect.width * (1 - zoom);
        const minY = rect.height * (1 - zoom);

        const clampedX = Math.min(0, Math.max(minX, rawX));
        const clampedY = Math.min(0, Math.max(minY, rawY));
        setPan({ x: clampedX, y: clampedY });
      } else {
        setPan({ x: rawX, y: rawY });
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Zoom control multipliers plus focal alignment constraints
  const handleZoomIn = () => {
    const nextZoom = Math.min(4, zoom + 0.4);
    if (selectedStation) {
      centerOnCoordinate(selectedStation.latitude, selectedStation.longitude, nextZoom);
    } else if (userCoords) {
      centerOnCoordinate(userCoords.latitude, userCoords.longitude, nextZoom);
    } else {
      if (mapContainerRef.current) {
        const rect = mapContainerRef.current.getBoundingClientRect();
        const tx = rect.width * (0.5 - 0.5 * nextZoom);
        const ty = rect.height * (0.5 - 0.5 * nextZoom);
        setZoom(nextZoom);
        setPan({ x: tx, y: ty });
      } else {
        setZoom(nextZoom);
      }
    }
  };

  const handleZoomOut = () => {
    const nextZoom = Math.max(1, zoom - 0.4);
    if (nextZoom === 1) {
      resetMap();
    } else {
      if (selectedStation) {
        centerOnCoordinate(selectedStation.latitude, selectedStation.longitude, nextZoom);
      } else if (userCoords) {
        centerOnCoordinate(userCoords.latitude, userCoords.longitude, nextZoom);
      } else {
        if (mapContainerRef.current) {
          const rect = mapContainerRef.current.getBoundingClientRect();
          const tx = rect.width * (0.5 - 0.5 * nextZoom);
          const ty = rect.height * (0.5 - 0.5 * nextZoom);
          setZoom(nextZoom);
          setPan({ x: tx, y: ty });
        } else {
          setZoom(nextZoom);
        }
      }
    }
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

      {/* Toast message indicating status */}
      {userCoords && (
        <div className="absolute top-16 left-4 right-4 z-30 pointer-events-none flex justify-center">
          <div className="bg-slate-900/90 backdrop-blur-md text-white border border-slate-700/40 px-3.5 py-2 rounded-xl text-[10px] sm:text-xs font-bold flex items-center gap-2 shadow-xl pointer-events-auto animate-in fade-in slide-in-from-top-3 duration-250">
            {simulationActive ? (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0"></span>
                <span>Localização Simulada (Palmas, TO) Ativa • Distâncias recalculadas!</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                <span>Localização GPS Sincronizada • Distâncias calculadas em tempo real!</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Main Map Box */}
      <div className="relative w-full h-full bg-slate-50 flex items-center justify-center p-2 sm:p-4 overflow-hidden animate-in fade-in duration-200">
        
        {/* Map Wrapper with strict aspect ratio matching our boundaries */}
        <div 
          ref={mapContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`relative aspect-square w-full max-w-full max-h-full bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200 shrink-0 select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          
          {/* Inner zoomable/pannable canvas layer */}
          <div
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: 'top left',
              width: '100%',
              height: '100%',
              position: 'relative',
              transition: isDragging ? 'none' : 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Map Image Layer */}
            <img 
              alt="Vista aérea de mapa de Palmas" 
              className="w-full h-full object-fill filter brightness-[0.98] contrast-[1.01] pointer-events-none select-none"
              src={MAP_IMAGE_URL}
              referrerPolicy="no-referrer"
            />

            {/* User Pulsing Location Marker Pin */}
            {userCoords && (
              <div
                style={{
                  top: `${getPercentageTop(userCoords.latitude)}%`,
                  left: `${getPercentageLeft(userCoords.longitude)}%`
                }}
                className="absolute z-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-500"
              >
                <div className="relative flex h-8 w-8 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-4.5 w-4.5 bg-blue-600 border-2 border-white shadow-lg flex items-center justify-center text-white text-[10px] font-extrabold font-sans">
                    ★
                  </span>
                  <div className="bg-blue-950 text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow-sm border border-blue-400 absolute left-1/2 -translate-x-1/2 top-6.5 whitespace-nowrap">
                    VOCÊ
                  </div>
                </div>
              </div>
            )}

            {/* Gas Stations Pins */}
            {mapStationsList.map((station) => {
              const isSelected = activeStation && station.id === activeStation.id;
              const isCheapest = cheapestStation && station.id === cheapestStation.id;
              const fuelPrice = station.prices[selectedFuel];

              // Determine pin background style
              let pinBgColor = 'bg-blue-800 text-white border-white hover:bg-blue-900';
              if (isCheapest) {
                pinBgColor = 'bg-[#006c49] text-white border-white hover:bg-[#005137]';
              }
              if (isSelected) {
                pinBgColor = 'bg-blue-900 text-white border-white ring-4 ring-blue-500/30 scale-110 font-bold';
              }

              return (
                <button
                  key={station.id}
                  onClick={() => onSelectStation(station)}
                  style={{
                    top: `${getPercentageTop(station.latitude)}%`,
                    left: `${getPercentageLeft(station.longitude)}%`
                  }}
                  className="absolute z-20 -translate-x-1/2 -translate-y-full flex flex-col items-center select-none cursor-pointer group transition-all duration-155 active:scale-95 hover:z-30"
                >
                  {/* Pin Head */}
                  <div className={`shadow-lg border-2 rounded-full font-bold font-sans flex items-center gap-1 leading-tight py-1 transition-all text-[11px] sm:text-xs ${
                    isSelected ? 'px-3 py-1.5 scale-110 shadow-2xl z-30 font-black' : 'px-2.5'
                  } ${pinBgColor}`}>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 bg-sky-200 rounded-full animate-ping inline-block shrink-0"></span>
                    )}
                    <span>R$ {fuelPrice.toFixed(2)}</span>
                    {isCheapest && (
                      <span className="bg-emerald-500 text-white text-[8px] rounded-full p-0.5 px-1 font-extrabold shrink-0" title="Mais Barato">
                        ✓
                      </span>
                    )}
                  </div>

                  {/* Pin Pointer Tail */}
                  <div className={`w-0.5 h-2 -mt-0.5 shadow-xl transition-all ${
                    isSelected ? 'h-2.5 w-1 bg-blue-900' : isCheapest ? 'bg-[#006c49]' : 'bg-blue-800'
                  }`}></div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Floating Geo Tracker and Map Controller */}
        <div className="absolute top-4 right-4 z-35 flex flex-col gap-2 pointer-events-auto">
          <div className="bg-white/95 backdrop-blur-md p-1.5 rounded-xl shadow-xl border border-gray-250 flex flex-col items-center gap-1.5 animate-in slide-in-from-right duration-250">
            
            {/* GPS Controllers */}
            <button
              type="button"
              onClick={requestRealGPS}
              disabled={isLocating}
              title="Obter GPS Real"
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
                userCoords && !simulationActive
                  ? 'bg-blue-800 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {isLocating ? (
                <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
              ) : (
                <Compass className={`w-4 items-center h-4 shrink-0 ${userCoords && !simulationActive ? 'animate-pulse' : ''}`} />
              )}
            </button>

            <button
              type="button"
              onClick={activateSimulation}
              title="Simular Localização (Palmas)"
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
                simulationActive
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <Locate className="w-4 h-4 shrink-0" />
            </button>

            {userCoords && (
              <button
                type="button"
                onClick={clearLocation}
                title="Limpar Filtro de Distâncias"
                className="w-9 h-9 rounded-lg bg-rose-50 text-rose-700 border border-rose-100 flex items-center justify-center hover:bg-rose-100 transition-all cursor-pointer active:scale-95 shrink-0"
              >
                <Locate className="w-4 h-4 rotate-45 shrink-0" />
              </button>
            )}

            {/* Scale/Zoom Controls Divider */}
            <div className="w-full h-px bg-gray-200 my-0.5"></div>

            <button
              type="button"
              onClick={handleZoomIn}
              title="Aumentar Zoom (+)"
              className="w-9 h-9 rounded-lg bg-white text-gray-750 hover:bg-gray-100 border border-gray-200 flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0"
            >
              <ZoomIn className="w-4 h-4 text-gray-700" />
            </button>

            <button
              type="button"
              onClick={handleZoomOut}
              title="Diminuir Zoom (-)"
              className="w-9 h-9 rounded-lg bg-white text-gray-750 hover:bg-gray-100 border border-gray-200 flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0"
            >
              <ZoomOut className="w-4 h-4 text-gray-700" />
            </button>

            <button
              type="button"
              onClick={resetMap}
              title="Ajustar ao Mapa (⊙)"
              className="w-9 h-9 rounded-lg bg-white text-gray-750 hover:bg-gray-100 border border-gray-200 flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0"
            >
              <Maximize2 className="w-4 h-4 text-gray-700" />
            </button>

          </div>
        </div>

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
