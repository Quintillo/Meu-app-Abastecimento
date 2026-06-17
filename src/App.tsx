import React, { useState } from 'react';
import { DEFAULT_STATIONS, DEFAULT_USER, DEFAULT_HISTORY } from './data';
import { GasStation, FuelType, HistoryItem, UserProfile } from './types';
import NearbyList from './components/NearbyList';
import MapTab from './components/MapTab';
import HistoricTab from './components/HistoricTab';
import ProfileTab from './components/ProfileTab';
import StationDetails from './components/StationDetails';
import PriceUpdateModal from './components/PriceUpdateModal';
import NavigationModal from './components/NavigationModal';
import { 
  Fuel, Map, History, User, Search, MapPin, 
  HelpCircle, ChevronRight, Bookmark, ArrowLeft 
} from 'lucide-react';

export default function App() {
  const [stations, setStations] = useState<GasStation[]>(DEFAULT_STATIONS);
  const [history, setHistory] = useState<HistoryItem[]>(DEFAULT_HISTORY);
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  
  const [activeTab, setActiveTab] = useState<'list' | 'map' | 'history' | 'profile' | 'detail'>('list');
  const [selectedStation, setSelectedStation] = useState<GasStation | null>(null);
  const [selectedFuel, setSelectedFuel] = useState<FuelType>('Gasoline');
  
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [stationToUpdate, setStationToUpdate] = useState<GasStation | null>(null);
  const [navigationStation, setNavigationStation] = useState<GasStation | null>(null);

  // Helper inside history tab to approve/moderation items
  const handleVoteApproval = (historyId: string, status: 'APPROVED' | 'REJECTED') => {
    setHistory((prev) =>
      prev.map((item) => {
        if (item.id === historyId) {
          // If status shifts to approved, award the extra points
          if (status === 'APPROVED' && item.status !== 'APPROVED') {
            setUser((prevUser) => ({
              ...prevUser,
              points: prevUser.points + 20
            }));
            // Mark the referenced station as verified
            setStations((prevStations) =>
              prevStations.map((st) => {
                if (st.id === item.stationId) {
                  return { ...st, verified: true };
                }
                return st;
              })
            );
          }
          return { ...item, status };
        }
        return item;
      })
    );
  };

  // Map coordinate select helper
  const handleSelectStation = (station: GasStation) => {
    setSelectedStation(station);
    // Switch to details section automatically if click card
    if (activeTab === 'list' || activeTab === 'profile') {
      setActiveTab('detail');
    }
  };

  const handleOpenPriceUpdate = (station: GasStation) => {
    if (user.email !== 'quintilloalef@gmail.com') {
      return; // Handled nicely in UI, but added here as security block
    }
    setStationToUpdate(station);
    setIsUpdateModalOpen(true);
  };

  const handleBackToMain = () => {
    setActiveTab('list');
    setSelectedStation(null);
  };

  // React state synchronous update handler
  const handleUpdateStationPrices = (
    stationId: string,
    prices: { Gasoline: number; GasolineAdit: number; Ethanol: number; Diesel: number; DieselS10: number },
    photoUrl?: string
  ) => {
    setStations((prevStations) =>
      prevStations.map((station) => {
        if (station.id === stationId) {
          // Identify changes for history logs
          const updates: { type: string; old: number; new: number }[] = [];
          if (station.prices.Gasoline !== prices.Gasoline) {
            updates.push({ type: 'Gasolina Comum', old: station.prices.Gasoline, new: prices.Gasoline });
          }
          if (station.prices.GasolineAdit !== prices.GasolineAdit) {
            updates.push({ type: 'G. Aditivada', old: station.prices.GasolineAdit, new: prices.GasolineAdit });
          }
          if (station.prices.Ethanol !== prices.Ethanol) {
            updates.push({ type: 'Etanol', old: station.prices.Ethanol, new: prices.Ethanol });
          }
          if (station.prices.Diesel !== prices.Diesel) {
            updates.push({ type: 'Diesel Comum', old: station.prices.Diesel, new: prices.Diesel });
          }
          if (station.prices.DieselS10 !== prices.DieselS10) {
            updates.push({ type: 'Diesel S10', old: station.prices.DieselS10, new: prices.DieselS10 });
          }

          // Generate history entries
          if (updates.length > 0) {
            const calculatedPoints = photoUrl ? 30 : 15;

            const newHistoryEntries: HistoryItem[] = updates.map((up, index) => ({
              id: `dyn-hist-${Date.now()}-${index}`,
              stationId,
              stationName: station.name,
              fuelType: up.type,
              oldPrice: up.old,
              newPrice: up.new,
              timestamp: 'Agora mesmo',
              userName: user.name,
              userPoints: calculatedPoints,
              photoUrl: photoUrl,
              status: photoUrl ? 'PENDING' : 'APPROVED'
            }));

            setHistory((prevHistory) => [...newHistoryEntries, ...prevHistory]);

            // Award points
            setUser((prevUser) => ({
              ...prevUser,
              points: prevUser.points + calculatedPoints * updates.length,
              contributionsCount: prevUser.contributionsCount + updates.length
            }));
          }

          const updatedStation: GasStation = {
            ...station,
            prices,
            updatedAt: 'Agora mesmo',
            updatedTimestamp: Date.now(),
            verified: photoUrl ? false : true // sets false initially till community votes if photo is pending
          };

          // Keep selection synced too if active
          if (selectedStation?.id === stationId) {
            setSelectedStation(updatedStation);
          }

          return updatedStation;
        }
        return station;
      })
    );
  };

  const handleAddComment = (stationId: string, text: string) => {
    const newComment = {
      id: `comment-${Date.now()}`,
      userName: user.name,
      userAvatarUrl: user.avatarUrl,
      text,
      timestamp: 'Agora mesmo'
    };

    setStations((prevStations) =>
      prevStations.map((station) => {
        if (station.id === stationId) {
          const currentComments = station.comments || [];
          return {
            ...station,
            comments: [newComment, ...currentComments]
          };
        }
        return station;
      })
    );

    setSelectedStation((prev) => {
      if (prev && prev.id === stationId) {
        const currentComments = prev.comments || [];
        return {
          ...prev,
          comments: [newComment, ...currentComments]
        };
      }
      return prev;
    });

    setUser((prevUser) => ({
      ...prevUser,
      points: prevUser.points + 10,
      contributionsCount: prevUser.contributionsCount + 1
    }));
  };

  return (
    <div className="w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto min-h-screen bg-[#f8f9ff] text-[#121c2a] flex flex-col relative select-none shadow-xl border-x border-gray-150">
      
      {/* Dynamic Header (Sticky Top Layout) */}
      {activeTab !== 'detail' && (
        <header className="sticky top-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-white border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Fuel className="w-6 h-6 text-blue-800" />
            <h1 className="text-xl font-extrabold tracking-tight text-blue-800 font-sans">
              AbastecePMW
            </h1>
          </div>
          <button 
            onClick={() => setActiveTab('list')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            title="Buscar"
          >
            <Search className="w-5 h-5 text-gray-500" />
          </button>
        </header>
      )}

      {/* Main Orchestrator Canvas Section */}
      <main className={`flex-1 ${activeTab !== 'detail' ? 'px-4' : 'px-4 pt-4'}`}>
        
        {/* Tab switcher renderer */}
        {activeTab === 'list' && (
          <NearbyList 
            stations={stations}
            onSelectStation={handleSelectStation}
            selectedFuel={selectedFuel}
            setSelectedFuel={setSelectedFuel}
            onOpenUpdateModal={handleOpenPriceUpdate}
            onGoToMap={() => {
              setActiveTab('map');
            }}
          />
        )}

        {activeTab === 'map' && (
          <MapTab 
            stations={stations}
            selectedStation={selectedStation}
            onSelectStation={(s) => setSelectedStation(s)}
            selectedFuel={selectedFuel}
            setSelectedFuel={setSelectedFuel}
            onOpenDetails={(s) => {
              setSelectedStation(s);
              setActiveTab('detail');
            }}
          />
        )}

        {activeTab === 'history' && (
          <HistoricTab 
            history={history}
            onVoteApproval={handleVoteApproval}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileTab 
            user={user}
            stations={stations}
            onSelectStation={handleSelectStation}
            onUpdateUser={(updated) => setUser((prev) => ({ ...prev, ...updated }))}
          />
        )}

        {activeTab === 'detail' && selectedStation && (
          <StationDetails 
            station={selectedStation}
            selectedFuel={selectedFuel}
            onBack={handleBackToMain}
            onOpenPriceUpdate={() => handleOpenPriceUpdate(selectedStation)}
            onOpenNavigation={(s) => setNavigationStation(s)}
            onAddComment={handleAddComment}
            isDeveloper={user.email === 'quintilloalef@gmail.com'}
          />
        )}

      </main>

      {/* Floating Price Edit Modal layer */}
      {isUpdateModalOpen && stationToUpdate && (
        <PriceUpdateModal 
          station={stationToUpdate}
          onClose={() => {
            setIsUpdateModalOpen(false);
            setStationToUpdate(null);
          }}
          onUpdate={handleUpdateStationPrices}
        />
      )}

      {/* Floating GPS Navigation Assist Modal */}
      {navigationStation && (
        <NavigationModal 
          station={navigationStation}
          onClose={() => setNavigationStation(null)}
        />
      )}

      {/* Persistent Bottom Tab Navigation Bar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl z-50 flex justify-around items-center bg-white h-16 border-t border-gray-200">
        
        {/* List trigger button */}
        <button 
          onClick={() => {
            setActiveTab('list');
            setSelectedStation(null);
          }}
          className={`flex-1 flex flex-col items-center justify-center h-full transition-all cursor-pointer ${
            activeTab === 'list' ? 'text-blue-800 font-bold scale-[1.03]' : 'text-gray-400 hover:text-gray-650'
          }`}
        >
          <Fuel className="w-5 h-5 mb-0.5 shrink-0" />
          <span className="text-[10px] tracking-wider uppercase font-mono">Próximos</span>
        </button>

        {/* Map trigger button */}
        <button 
          onClick={() => {
            setActiveTab('map');
          }}
          className={`flex-1 flex flex-col items-center justify-center h-full transition-all cursor-pointer ${
            activeTab === 'map' ? 'text-blue-800 font-bold scale-[1.03]' : 'text-gray-400 hover:text-gray-650'
          }`}
        >
          <Map className="w-5 h-5 mb-0.5 shrink-0" />
          <span className="text-[10px] tracking-wider uppercase font-mono">Mapa</span>
        </button>

        {/* History trigger button */}
        <button 
          onClick={() => {
            setActiveTab('history');
            setSelectedStation(null);
          }}
          className={`flex-1 flex flex-col items-center justify-center h-full transition-all cursor-pointer ${
            activeTab === 'history' ? 'text-blue-800 font-bold scale-[1.03]' : 'text-gray-400 hover:text-gray-650'
          }`}
        >
          <History className="w-5 h-5 mb-0.5 shrink-0" />
          <span className="text-[10px] tracking-wider uppercase font-mono">Histórico</span>
        </button>

        {/* Profile trigger button */}
        <button 
          onClick={() => {
            setActiveTab('profile');
            setSelectedStation(null);
          }}
          className={`flex-1 flex flex-col items-center justify-center h-full transition-all cursor-pointer ${
            activeTab === 'profile' ? 'text-blue-800 font-bold scale-[1.03]' : 'text-gray-400 hover:text-gray-650'
          }`}
        >
          <User className="w-5 h-5 mb-0.5 shrink-0" />
          <span className="text-[10px] tracking-wider uppercase font-mono">Perfil</span>
        </button>

      </nav>

    </div>
  );
}
