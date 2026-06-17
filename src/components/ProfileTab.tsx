import React from 'react';
import { UserProfile, GasStation, getSanitizedLogoUrl, getBrandLogoFallback } from '../types';
import { Award, Star, Compass, Shield, Flame, MapPin, Heart, ArrowRight } from 'lucide-react';

interface ProfileTabProps {
  user: UserProfile;
  stations: GasStation[];
  onSelectStation: (station: GasStation) => void;
  onUpdateUser?: (updated: Partial<UserProfile>) => void;
}

export default function ProfileTab({ user, stations, onSelectStation, onUpdateUser }: ProfileTabProps) {
  
  // Get corresponding saved gas station items
  const savedStationsList = stations.filter(s => user.savedStations.includes(s.id));

  // Next level progress config
  const pointsToNextLevel = 500;
  const progressPercent = Math.min((user.points / pointsToNextLevel) * 100, 100);

  return (
    <div className="w-full flex flex-col pb-24 font-sans animate-in fade-in duration-200">
      
      {/* User Profile Info Card */}
      <section className="bg-white rounded-xl border border-gray-150 p-5 shadow-xs mb-6 relative overflow-hidden">
        <div className="flex items-center gap-4">
          
          {/* Avatar Picture with custom Level indicator badge */}
          <div className="relative">
            <img 
              alt={user.name}
              src={user.avatarUrl}
              className="w-16 h-16 rounded-full object-cover border-2 border-blue-800 shadow-md"
              referrerPolicy="no-referrer"
            />
            <span className="absolute -bottom-1 -right-1 bg-blue-800 text-white p-1 rounded-full text-xs font-bold w-6 h-6 flex items-center justify-center border-2 border-white font-mono scale-95 shadow-sm" title="Nível 3">
              3
            </span>
          </div>

          <div>
            <h2 className="font-extrabold text-gray-900 text-lg leading-tight font-sans">
              {user.name}
            </h2>
            <p className="text-xs text-gray-500 font-sans mt-0.5">{user.email}</p>
            
            <span className="inline-block bg-blue-50/50 text-blue-800 text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded border border-blue-100 font-mono mt-1.5">
              {user.tier}
            </span>
          </div>
        </div>

        {/* Level metrics and progress bar block */}
        <div className="mt-5 pt-4 border-t border-gray-100">
          <div className="flex justify-between text-xs font-bold uppercase font-mono mb-1.5">
            <span className="text-gray-500">Progresso do Nível</span>
            <span className="text-blue-800">{user.points} / {pointsToNextLevel} PTS</span>
          </div>
          
          {/* Progress bar container */}
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-blue-800 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-gray-400 font-mono mt-1">
            Faltam {pointsToNextLevel - user.points} PTS para subir para o Nível 4!
          </p>
        </div>

        {/* User impact simple scoreboard */}
        <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100">
          <div className="bg-gray-50/75 p-3 rounded-lg text-center border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider font-mono">
              Pontuação total
            </p>
            <p className="text-xl font-extrabold text-blue-800 font-mono mt-0.5">
              {user.points} PTS
            </p>
          </div>
          <div className="bg-gray-50/75 p-3 rounded-lg text-center border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider font-mono">
              Colaborações
            </p>
            <p className="text-xl font-extrabold text-[#006c49] font-sans mt-0.5">
              {user.contributionsCount} envios
            </p>
          </div>
        </div>

        {/* Simulador de Papel de Usuário */}
        <div className="mt-5 pt-4 border-t border-dashed border-gray-200 bg-amber-50/30 p-3 rounded-xl border border-amber-100/75 flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 shadow-xs">
          <div>
            <p className="text-xs font-bold text-amber-900 font-sans">Simulador de Permissões</p>
            <p className="text-[10px] text-gray-500 font-sans mt-0.5">Mude o e-mail ativo para testar a trava de preços.</p>
          </div>
          <div className="flex gap-1.5 self-end xs:self-auto">
            <button
              onClick={() => onUpdateUser && onUpdateUser({ email: 'quintilloalef@gmail.com', name: 'Alef Quintillo', tier: 'Informante de Elite ✪' })}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono tracking-wider transition-all cursor-pointer ${
                user.email === 'quintilloalef@gmail.com'
                  ? 'bg-blue-800 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 text-gray-500'
              }`}
            >
              DESENVOLVEDOR
            </button>
            <button
              onClick={() => onUpdateUser && onUpdateUser({ email: 'usuario@teste.com', name: 'Visitante Comum', tier: 'Colaborador Bronze ③' })}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono tracking-wider transition-all cursor-pointer ${
                user.email !== 'quintilloalef@gmail.com'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 text-gray-500'
              }`}
            >
              VISITANTE
            </button>
          </div>
        </div>
      </section>

      {/* Badges Achievements board drawer */}
      <section className="mb-6">
        <div className="flex items-center gap-2 mb-3.5">
          <Award className="w-5 h-5 text-gray-700" />
          <h3 className="font-bold text-base text-gray-901 tracking-tight">
            Conquistas e Emblemas
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-3">
          
          {/* Achievement 1 */}
          <div className="bg-white p-3 rounded-xl border border-gray-150 text-center flex flex-col items-center justify-center gap-1.5 hover:bg-gray-50 transition-colors select-none">
            <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 border border-amber-100 shadow-xs">
              <Shield className="w-5 h-5" />
            </div>
            <p className="font-bold text-[10px] text-gray-800 tracking-tight leading-tight">
              Informante Elite
            </p>
            <p className="text-[8px] text-gray-400 font-sans tracking-wide leading-none">
              Nível Superior
            </p>
          </div>

          {/* Achievement 2 */}
          <div className="bg-white p-3 rounded-xl border border-gray-150 text-center flex flex-col items-center justify-center gap-1.5 hover:bg-gray-50 transition-colors select-none">
            <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 border border-emerald-100 shadow-xs">
              <Flame className="w-5 h-5" />
            </div>
            <p className="font-bold text-[10px] text-gray-800 tracking-tight leading-tight">
              Combustor Ativo
            </p>
            <p className="text-[8px] text-gray-400 font-sans tracking-wide leading-none">
              7 dias seguidos
            </p>
          </div>

          {/* Achievement 3 */}
          <div className="bg-white p-3 rounded-xl border border-gray-150 text-center flex flex-col items-center justify-center gap-1.5 hover:bg-gray-50 transition-colors select-none opacity-50 relative">
            <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 border border-purple-100 shadow-xs">
              <Star className="w-5 h-5" />
            </div>
            <p className="font-bold text-[10px] text-gray-800 tracking-tight leading-tight">
              Pioneiro Eco
            </p>
            <p className="text-[8px] text-gray-400 font-sans tracking-wide leading-none">
              Bloqueado
            </p>
          </div>

        </div>
      </section>

      {/* Saved/Favorite stations list panel */}
      <section className="mb-6">
        <div className="flex items-center gap-2 mb-3.5">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
          <h3 className="font-bold text-base text-gray-901 tracking-tight">
            Postos Favoritos
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {savedStationsList.length === 0 ? (
            <div className="py-6 bg-white rounded-xl border border-gray-150 text-center text-gray-400 text-xs md:col-span-2">
              Você ainda não favoritou nenhum posto.
            </div>
          ) : (
            savedStationsList.map((station) => (
              <div 
                key={station.id}
                onClick={() => onSelectStation(station)}
                className="bg-white rounded-xl p-3 border border-gray-200 flex justify-between items-center hover:border-blue-700 hover:shadow-xs transition-all cursor-pointer group"
              >
                <div className="flex gap-3 items-center">
                  <div className="w-9 h-9 bg-gray-50 border border-gray-150 rounded flex items-center justify-center p-1 font-mono">
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
                    <h4 className="font-bold text-gray-900 text-xs group-hover:text-blue-800 font-sans leading-tight">
                      {station.name}
                    </h4>
                    <p className="text-[10px] text-gray-500 font-sans mt-0.5">
                      {station.address} • <strong className="text-gray-700">{station.distance} km</strong>
                    </p>
                  </div>
                </div>

                <div className="text-right flex items-center gap-3">
                  <div>
                    <p className="text-[8px] text-gray-400 uppercase font-mono font-bold leading-none">Gasolina</p>
                    <p className="text-xs font-bold font-mono text-blue-800 mt-0.5">R$ {station.prices.Gasoline.toFixed(2)}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-800 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Dados para Contato */}
      <section className="bg-white rounded-xl border border-gray-150 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h4 className="font-bold text-gray-901 text-xs md:text-sm font-sans tracking-tight">Suporte & Contato</h4>
          <p className="text-[11px] text-gray-500 font-sans mt-0.5">Fale com o desenvolvedor do AbastecePMW</p>
        </div>
        <div className="flex items-center gap-2">
          {/* WhatsApp */}
          <a
            href="https://wa.me/5563992113224"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-bold transition-all shadow-xs"
          >
            <svg className="w-4 h-4 fill-current text-emerald-600" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.489 0 9.954-4.417 9.957-9.847.002-2.63-1.019-5.101-2.873-6.958C16.491 1.983 14.032 1.96 12.005 1.96c-5.49 0-9.956 4.417-9.959 9.848-.001 1.93.513 3.812 1.488 5.484L2.52 21.439l4.127-1.285zm12.515-5.54c-.11-.18-.4-.287-.79-.481-.39-.193-2.308-1.139-2.662-1.267-.353-.128-.61-.193-.867.193-.257.387-.993 1.267-1.214 1.522-.221.255-.443.287-.833.093-.39-.193-1.646-.607-3.134-1.932-1.157-1.031-1.938-2.307-2.165-2.693-.227-.387-.024-.596.171-.789.175-.175.39-.452.584-.678.195-.226.259-.387.39-.645.13-.258.064-.483-.033-.677-.097-.194-.867-2.091-1.187-2.863-.312-.753-.629-.652-.867-.664-.224-.011-.48-.013-.738-.013-.257 0-.677.097-1.031.483-.353.387-1.35 1.321-1.35 3.221s1.381 3.737 1.574 3.996c.193.258 2.718 4.148 6.582 5.814.919.396 1.637.632 2.196.81.924.293 1.764.252 2.428.153.74-.11 2.308-.942 2.632-1.852.324-.91.324-1.691.226-1.851z"/>
            </svg>
            <span>WhatsApp</span>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/alefquintillo/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-800 rounded-lg text-xs font-bold transition-all shadow-xs"
          >
            <svg className="w-4 h-4 fill-none stroke-current stroke-[2] text-pink-600" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span>Instagram</span>
          </a>
        </div>
      </section>

    </div>
  );
}
