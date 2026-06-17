import React, { useState, useRef } from 'react';
import { GasStation } from '../types';
import { X, Check, Camera, Upload, Eye, RefreshCw, AlertCircle } from 'lucide-react';

interface PriceUpdateModalProps {
  station: GasStation;
  onClose: () => void;
  onUpdate: (
    stationId: string, 
    prices: { Gasoline: number; GasolineAdit: number; Ethanol: number; Diesel: number; DieselS10: number }, 
    photoUrl?: string
  ) => void;
}

// Visual sample photo of a real station price sign for testing
const SAMPLE_PRICE_BOARD_URL = 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?q=80&w=600&auto=format&fit=crop';

export default function PriceUpdateModal({ station, onClose, onUpdate }: PriceUpdateModalProps) {
  const [gasoline, setGasoline] = useState(station.prices.Gasoline.toString());
  const [gasolineAdit, setGasolineAdit] = useState((station.prices.GasolineAdit || station.prices.Gasoline).toString());
  const [ethanol, setEthanol] = useState(station.prices.Ethanol.toString());
  const [diesel, setDiesel] = useState(station.prices.Diesel.toString());
  const [dieselS10, setDieselS10] = useState((station.prices.DieselS10 || station.prices.Diesel).toString());
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // Photo uploading states
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleUseSamplePhoto = () => {
    setPhotoPreview(SAMPLE_PRICE_BOARD_URL);
    setPhotoFile(null); // represent with sample link
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const gasNum = parseFloat(parseFloat(gasoline).toFixed(2));
    const gasAditNum = parseFloat(parseFloat(gasolineAdit).toFixed(2));
    const ethNum = parseFloat(parseFloat(ethanol).toFixed(2));
    const dieNum = parseFloat(parseFloat(diesel).toFixed(2));
    const dieS10Num = parseFloat(parseFloat(dieselS10).toFixed(2));

    if (isNaN(gasNum) || isNaN(gasAditNum) || isNaN(ethNum) || isNaN(dieNum) || isNaN(dieS10Num)) {
      alert('Por favor, insira valores de preços válidos.');
      return;
    }

    const compiledPrices = {
      Gasoline: gasNum,
      GasolineAdit: gasAditNum,
      Ethanol: ethNum,
      Diesel: dieNum,
      DieselS10: dieS10Num
    };

    // Trigger AI photo scanning effect if photo is attached
    if (photoPreview) {
      setIsScanning(true);
      setTimeout(() => {
        setIsScanning(false);
        onUpdate(
          station.id, 
          compiledPrices, 
          photoPreview
        );
        setIsSuccess(true);
        setTimeout(() => {
          onClose();
        }, 1800);
      }, 2000);
    } else {
      // Direct post if no photo
      onUpdate(
        station.id, 
        compiledPrices
      );
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  return (
    <div id="price-update-modal" className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200 relative flex flex-col max-h-[92vh]">
        
        {/* Animated Laser Scanner Overlay */}
        {isScanning && (
          <div className="absolute inset-0 z-50 bg-slate-900/95 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
            <div className="relative w-56 h-40 bg-slate-800 rounded-xl overflow-hidden border border-slate-700 flex items-center justify-center p-1 shadow-inner">
              <img 
                src={photoPreview || ""} 
                className="w-full h-full object-cover rounded-lg filter brightness-75 contrast-125" 
                alt="Scanning..." 
              />
              
              {/* Laser line effect */}
              <div className="absolute inset-x-0 h-1 bg-cyan-400 shadow-[0_0_15px_#22d3ee] animate-[bounce_2s_infinite] top-0"></div>
              
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-slate-900/90 text-cyan-400 px-3 py-1 rounded text-[9px] uppercase tracking-wider font-mono font-bold flex items-center gap-1.5 border border-cyan-500/20">
                <RefreshCw className="w-3 h-3 animate-spin" /> Escaneando OCR
              </div>
            </div>

            <h4 className="text-base font-extrabold text-white mt-5">Visualizando comprovante de preço</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
              Carregando foto e transmitindo para a fila de auditores comunitários aprovarem!
            </p>
          </div>
        )}

        {/* Modal Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100 bg-gray-50 shrink-0">
          <div>
            <h3 className="font-extrabold text-gray-905 text-base">Informar Novo Preço</h3>
            <p className="text-xs text-blue-800 font-bold font-mono mt-0.5">{station.name}</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="py-12 px-6 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4 animate-bounce">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-gray-905">Preço Enviado!</h4>
              
              {photoPreview ? (
                <>
                  <p className="text-xs text-gray-600 mt-2 max-w-xs">
                    Sua atualização foi registrada com foto! Ela está listada como <strong className="text-[#006c49]">Pendente de Aprovação</strong> no histórico.
                  </p>
                  <div className="mt-4 px-3 py-1.5 bg-blue-50 text-blue-850 rounded-lg text-xs font-semibold uppercase tracking-wide font-mono border border-blue-100">
                    Aprovação Pendente (+30 PTS)
                  </div>
                </>
              ) : (
                <>
                  <p className="text-xs text-gray-600 mt-2">
                    Obrigado por ajudar no reajuste das tarifas!
                  </p>
                  <div className="mt-4 px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-semibold uppercase tracking-wide font-mono">
                    +15 Pontos de Contribuição
                  </div>
                </>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              
              <div className="p-3 bg-blue-50 border border-blue-100 text-blue-900 rounded-xl text-xs flex gap-2.5">
                <span className="font-semibold text-blue-700">💡 Dica:</span>
                <span>Insira as tarifas observadas no painel físico do estabelecimento comercial.</span>
              </div>

              {/* Grid pricing values inputs */}
              <div className="grid grid-cols-2 gap-3">
                
                {/* Gasoline */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider font-mono">
                    Gasolina Comum (L)
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 font-bold text-gray-400 text-xs">R$</span>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={gasoline}
                      onChange={(e) => setGasoline(e.target.value)}
                      className="w-full h-10 pl-7 pr-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-xs focus:bg-white focus:border-blue-500 transition-all font-mono"
                    />
                  </div>
                </div>

                {/* Gasoline Adit */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider font-mono">
                    Aditivada (L)
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 font-bold text-gray-400 text-xs">R$</span>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={gasolineAdit}
                      onChange={(e) => setGasolineAdit(e.target.value)}
                      className="w-full h-10 pl-7 pr-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-xs focus:bg-white focus:border-blue-500 transition-all font-mono"
                    />
                  </div>
                </div>

                {/* Ethanol */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider font-mono">
                    Etanol (L)
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 font-bold text-gray-400 text-xs">R$</span>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={ethanol}
                      onChange={(e) => setEthanol(e.target.value)}
                      className="w-full h-10 pl-7 pr-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-xs focus:bg-white focus:border-blue-500 transition-all font-mono"
                    />
                  </div>
                </div>

                {/* Diesel Comum */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider font-mono">
                    Diesel Comum (L)
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 font-bold text-gray-400 text-xs">R$</span>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={diesel}
                      onChange={(e) => setDiesel(e.target.value)}
                      className="w-full h-10 pl-7 pr-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-xs focus:bg-white focus:border-blue-500 transition-all font-mono"
                    />
                  </div>
                </div>

                {/* Diesel S10 */}
                <div className="space-y-1 col-span-2">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider font-mono">
                    Diesel S10 (L)
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 font-bold text-gray-400 text-xs">R$</span>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={dieselS10}
                      onChange={(e) => setDieselS10(e.target.value)}
                      className="w-full h-10 pl-7 pr-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-xs focus:bg-white focus:border-blue-500 transition-all font-mono"
                    />
                  </div>
                </div>

              </div>

              {/* Photo upload component block with drag & drop */}
              <div className="space-y-2">
                <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider font-mono">
                  Foto Comprovante (Recomendado para aprovação)
                </span>

                {photoPreview ? (
                  <div className="relative rounded-xl border border-gray-200 overflow-hidden bg-gray-50 group flex items-center justify-between p-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 shrink-0 bg-white">
                        <img 
                          src={photoPreview} 
                          alt="Pre-visualization sign" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-800 flex items-center gap-1.5 uppercase font-mono">
                          <Camera className="w-3.5 h-3.5 text-blue-700" /> Foto Carregada
                        </p>
                        <p className="text-[10px] text-gray-400 font-sans mt-0.5">
                          {photoFile ? `${(photoFile.size / 1024).toFixed(0)} KB` : 'Foto de demonstração'}
                        </p>
                        <span className="inline-block mt-1 bg-yellow-50 text-yellow-800 text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded border border-yellow-100 font-mono">
                          🕒 Fila de Moderação
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="text-xs font-bold font-mono text-rose-600 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg border border-rose-100 transition-all cursor-pointer"
                    >
                      Remover
                    </button>
                  </div>
                ) : (
                  <div 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all gap-1.5 bg-gray-50/50 ${
                      isDragOver 
                        ? 'border-blue-600 bg-blue-50/20' 
                        : 'border-gray-250 hover:border-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*" 
                      className="hidden" 
                    />
                    
                    <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-800 shadow-xs">
                      <Upload className="w-5 h-5 text-blue-700" />
                    </div>

                    <h5 className="font-extrabold text-xs text-gray-800">
                      Solte a foto ou clique para buscar
                    </h5>
                    <p className="text-[10px] text-gray-400 max-w-[260px] leading-tight mt-0.5 font-sans">
                      Arraste um print ou tire foto da tabela de preços. Suporta PNG, JPG e JPEG.
                    </p>

                    {/* Quick Button for Fast Sandbox Tests */}
                    <div className="pt-2 w-full flex justify-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUseSamplePhoto();
                        }}
                        className="px-3 py-1 bg-white hover:bg-gray-150 text-blue-800 border border-gray-200 rounded-lg text-[9px] font-bold uppercase tracking-wider font-mono flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
                      >
                        <Camera className="w-3 h-3" /> Usar Foto Demonstrativa
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Warning about photo review */}
              <div className="p-3 bg-yellow-50/55 border border-yellow-105 rounded-xl text-[11px] text-gray-700 flex gap-2 leading-tight">
                <AlertCircle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Aviso de Auditoria:</strong> Atualizações enviadas sem foto comprovante pagam menos pontos (+15 PTS) e podem demorar mais para serem verificadas. Envios com foto pagam mais (+30 PTS) e entram diretamente na fila rápida!
                </span>
              </div>

              {/* Action Buttons inside overlay */}
              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100 shrink-0">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 h-11 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center shadow-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 h-11 rounded-lg bg-blue-800 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-blue-900 transition-all transform active:scale-98 cursor-pointer flex items-center justify-center"
                >
                  Confirmar e Enviar
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
