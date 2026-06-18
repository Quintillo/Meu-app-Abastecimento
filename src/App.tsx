import React, { useState, useMemo, useEffect } from 'react';
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

function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth ratio in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export default function App() {
  const [stations, setStations] = useState<GasStation[]>(DEFAULT_STATIONS);
  const [history, setHistory] = useState<HistoryItem[]>(DEFAULT_HISTORY);
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [userCoords, setUserCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  
  const [activeTab, setActiveTab] = useState<'list' | 'map' | 'history' | 'profile' | 'detail'>('list');
  const [selectedStation, setSelectedStation] = useState<GasStation | null>(null);
  const [selectedFuel, setSelectedFuel] = useState<FuelType>('Gasoline');

  // Compute stations with dynamic distances from user location if active
  const stationsWithDynamicDistance = useMemo(() => {
    if (!userCoords) return stations;
    return stations.map(station => {
      const dist = calculateDistanceKm(userCoords.latitude, userCoords.longitude, station.latitude, station.longitude);
      return {
        ...station,
        distance: parseFloat(dist.toFixed(1))
      };
    });
  }, [stations, userCoords]);

  const selectedStationWithDynamicDistance = useMemo(() => {
    if (!selectedStation) return null;
    return stationsWithDynamicDistance.find(s => s.id === selectedStation.id) || selectedStation;
  }, [selectedStation, stationsWithDynamicDistance]);

  
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [stationToUpdate, setStationToUpdate] = useState<GasStation | null>(null);
  const [navigationStation, setNavigationStation] = useState<GasStation | null>(null);

  // Load live data from Cloud SQL database server on mount
  useEffect(() => {
    fetch('/api/stations')
      .then(res => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setStations((prev) => {
            return prev.map(localStation => {
              const serverMatch = data.find(s => s.name.toLowerCase() === localStation.name.toLowerCase() || s.id === localStation.id);
              if (serverMatch) {
                return {
                  ...localStation,
                  id: serverMatch.id,
                  prices: {
                    ...localStation.prices,
                    ...serverMatch.prices
                  }
                };
              }
              return localStation;
            });
          });
        }
      })
      .catch(err => console.warn("Using offline stations cache:", err));

    fetch('/api/history')
      .then(res => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setHistory(data);
        }
      })
      .catch(err => console.warn("Using offline history cache:", err));
  }, []);

  // Helper inside history tab to approve/moderation items
  const handleVoteApproval = (historyId: string, status: 'APPROVED' | 'REJECTED') => {
    const simulatedUser = {
      uid: user.email === 'quintilloalef@gmail.com' ? 'admin' : 'simulated-user',
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl
    };

    fetch(`/api/history/${historyId}/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Simulated-User": JSON.stringify(simulatedUser)
      },
      body: JSON.stringify({
        type: status === 'APPROVED' ? 'upvote' : 'downvote'
      })
    })
    .catch(err => console.error("Database voting synchronization error:", err));

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

            // Send background sync request to DB for each price update
            const simulatedUser = {
              uid: user.email === 'quintilloalef@gmail.com' ? 'admin' : 'simulated-user',
              email: user.email,
              name: user.name,
              avatarUrl: user.avatarUrl
            };

            updates.forEach(up => {
              const keyMap: Record<string, string> = {
                'Gasolina Comum': 'Gasoline',
                'G. Aditivada': 'GasolineAdit',
                'Etanol': 'Ethanol',
                'Diesel Comum': 'Diesel',
                'Diesel S10': 'DieselS10'
              };

              const fuelKey = keyMap[up.type];
              if (fuelKey) {
                fetch(`/api/stations/${stationId}/report`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'X-Simulated-User': JSON.stringify(simulatedUser)
                  },
                  body: JSON.stringify({
                    fuelType: fuelKey,
                    newPrice: up.new,
                    oldPrice: up.old
                  })
                })
                .then(res => res.json())
                .then(() => {
                  fetch('/api/history')
                    .then(r => r.json())
                    .then(data => {
                      if (Array.isArray(data) && data.length > 0) {
                        setHistory(data);
                      }
                    });
                })
                .catch(err => console.error("Database price report synchronization error:", err));
              }
            });

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
    <div className="w-full min-h-screen bg-[#f8f9ff] text-[#121c2a] flex flex-col md:flex-row relative select-none">
      
      {/* Sleek Sidebar Navigation for Desktop/Tablets */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 shrink-0 sticky top-0 h-screen p-5 justify-between z-40">
        <div className="flex flex-col gap-8">
          {/* Logo Brand */}
          <div className="flex items-center gap-2.5 px-2">
            <Fuel className="w-7 h-7 text-blue-800" />
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-blue-800 font-sans leading-none">
                AbastecePMW
              </h1>
              <p className="text-[9px] text-gray-400 font-mono tracking-wider font-bold uppercase mt-1">Palmas • TO</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            {[
              { id: 'list', label: 'Próximos Postos', icon: Fuel },
              { id: 'map', label: 'Mapa Interativo', icon: Map },
              { id: 'history', label: 'Histórico', icon: History },
              { id: 'profile', label: 'Meu Perfil', icon: User },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id || (tab.id === 'list' && activeTab === 'detail');
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    if (tab.id !== 'list') setSelectedStation(null);
                  }}
                  className={`w-full flex items-center gap-3.5 px-4 h-12 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-blue-50 text-blue-800 font-extrabold border-l-4 border-blue-800 pl-3.5 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-blue-800' : 'text-gray-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Small Active User Badge Footer inside Sidebar */}
        <div 
          onClick={() => {
            setActiveTab('profile');
            setSelectedStation(null);
          }}
          className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200/60 rounded-xl cursor-pointer transition-colors"
        >
          <img 
            alt={user.name} 
            src={user.avatarUrl} 
            className="w-9 h-9 rounded-full object-cover border border-blue-600 shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="min-w-0">
            <p className="text-xs font-bold text-gray-901 truncate font-sans">{user.name}</p>
            <p className="text-[9px] font-mono text-blue-800 font-bold leading-none mt-1">{user.points} PTS</p>
          </div>
        </div>
      </aside>

      {/* Main Content Pane Wrapper */}
      <div className="flex-1 flex flex-col min-h-screen relative pb-16 md:pb-0 h-screen overflow-y-auto">
        
        {/* Dynamic Header (Sticky Top Layout - Mobile Only) */}
        {activeTab !== 'detail' && (
          <header className="md:hidden sticky top-0 w-full z-40 flex justify-between items-center px-4 h-16 bg-white border-b border-gray-200 shrink-0">
            <div className="flex items-center gap-2">
              <Fuel className="w-6 h-6 text-blue-800" />
              <h1 className="text-lg font-black tracking-tight text-blue-800 font-sans leading-none">
                AbastecePMW
              </h1>
            </div>
            <button 
              onClick={() => setActiveTab('list')}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              title="Buscar"
            >
              <Search className="w-5 h-5 text-gray-500" />
            </button>
          </header>
        )}

        {/* Content Wrapper */}
        <main className={`flex-1 ${activeTab === 'map' ? 'p-0 relative h-full' : 'p-4 md:p-6 lg:p-8'}`}>
          
          {/* Tab switcher renderer */}
          {activeTab === 'list' && (
            <div className="flex flex-col lg:flex-row gap-6 h-full items-stretch">
              {/* Left Scrollable list column */}
              <div className="flex-1 lg:max-w-[480px] xl:max-w-[540px] shrink-0">
                <NearbyList 
                  stations={stationsWithDynamicDistance}
                  onSelectStation={handleSelectStation}
                  selectedFuel={selectedFuel}
                  setSelectedFuel={setSelectedFuel}
                  onOpenUpdateModal={handleOpenPriceUpdate}
                  onGoToMap={() => {
                    setActiveTab('map');
                  }}
                />
              </div>

              {/* Right Interactive Map Preview column (Hidden on mobile/tablets, beautiful on desktop) */}
              <div className="hidden lg:block flex-1 relative min-h-[500px] border border-gray-200 bg-white rounded-2xl overflow-hidden shadow-md">
                <MapTab 
                  stations={stationsWithDynamicDistance}
                  selectedStation={selectedStationWithDynamicDistance}
                  onSelectStation={(s) => setSelectedStation(s)}
                  selectedFuel={selectedFuel}
                  setSelectedFuel={setSelectedFuel}
                  onOpenDetails={(s) => {
                    setSelectedStation(s);
                    setActiveTab('detail');
                  }}
                  userCoords={userCoords}
                  setUserCoords={setUserCoords}
                />
              </div>
            </div>
          )}

          {activeTab === 'map' && (
            <MapTab 
              stations={stationsWithDynamicDistance}
              selectedStation={selectedStationWithDynamicDistance}
              onSelectStation={(s) => setSelectedStation(s)}
              selectedFuel={selectedFuel}
              setSelectedFuel={setSelectedFuel}
              onOpenDetails={(s) => {
                setSelectedStation(s);
                setActiveTab('detail');
              }}
              userCoords={userCoords}
              setUserCoords={setUserCoords}
            />
          )}

          {activeTab === 'history' && (
            <div className="max-w-4xl mx-auto">
              <HistoricTab 
                history={history}
                onVoteApproval={handleVoteApproval}
              />
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="max-w-4xl mx-auto">
              <ProfileTab 
                user={user}
                stations={stationsWithDynamicDistance}
                onSelectStation={handleSelectStation}
                onUpdateUser={(updated) => setUser((prev) => ({ ...prev, ...updated }))}
              />
            </div>
          )}

          {activeTab === 'detail' && selectedStationWithDynamicDistance && (
            <div className="max-w-3xl mx-auto">
              <StationDetails 
                station={selectedStationWithDynamicDistance}
                selectedFuel={selectedFuel}
                onBack={handleBackToMain}
                onOpenPriceUpdate={() => handleOpenPriceUpdate(selectedStationWithDynamicDistance)}
                onOpenNavigation={(s) => setNavigationStation(s)}
                onAddComment={handleAddComment}
                isDeveloper={user.email === 'quintilloalef@gmail.com'}
              />
            </div>
          )}

        </main>
      </div>

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

      {/* Persistent Bottom Tab Navigation Bar - Hidden on desktop */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden flex justify-around items-center bg-white h-16 border-t border-gray-200 shadow-lg">
        
        {/* List trigger button */}
        <button 
          onClick={() => {
            setActiveTab('list');
            setSelectedStation(null);
          }}
          className={`flex-1 flex flex-col items-center justify-center h-full transition-all cursor-pointer ${
            activeTab === 'list' ? 'text-blue-800 font-black scale-[1.03]' : 'text-gray-400 hover:text-gray-650'
          }`}
        >
          <Fuel className="w-5 h-5 mb-0.5 shrink-0" />
          <span className="text-[9px] tracking-wider uppercase font-mono font-bold">Próximos</span>
        </button>

        {/* Map trigger button */}
        <button 
          onClick={() => {
            setActiveTab('map');
          }}
          className={`flex-1 flex flex-col items-center justify-center h-full transition-all cursor-pointer ${
            activeTab === 'map' ? 'text-blue-800 font-black scale-[1.03]' : 'text-gray-400 hover:text-gray-650'
          }`}
        >
          <Map className="w-5 h-5 mb-0.5 shrink-0" />
          <span className="text-[9px] tracking-wider uppercase font-mono font-bold">Mapa</span>
        </button>

        {/* History trigger button */}
        <button 
          onClick={() => {
            setActiveTab('history');
            setSelectedStation(null);
          }}
          className={`flex-1 flex flex-col items-center justify-center h-full transition-all cursor-pointer ${
            activeTab === 'history' ? 'text-blue-800 font-black scale-[1.03]' : 'text-gray-400 hover:text-gray-650'
          }`}
        >
          <History className="w-5 h-5 mb-0.5 shrink-0" />
          <span className="text-[9px] tracking-wider uppercase font-mono font-bold">Histórico</span>
        </button>

        {/* Profile trigger button */}
        <button 
          onClick={() => {
            setActiveTab('profile');
            setSelectedStation(null);
          }}
          className={`flex-1 flex flex-col items-center justify-center h-full transition-all cursor-pointer ${
            activeTab === 'profile' ? 'text-blue-800 font-black scale-[1.03]' : 'text-gray-400 hover:text-gray-650'
          }`}
        >
          <User className="w-5 h-5 mb-0.5 shrink-0" />
          <span className="text-[9px] tracking-wider uppercase font-mono font-bold">Perfil</span>
        </button>

      </nav>

    </div>
  );
}
