import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { APIProvider, Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import { AnimatePresence, motion } from 'motion/react';
import { 
  MapPin, Phone, Pill, Activity, Navigation, Search, Clock, CheckCircle2, 
  Route, Target, Plus, Minus, AlertCircle, Globe, X, ShieldAlert, Stethoscope,
  ChevronRight, Hospital
} from 'lucide-react';
import { Clinic } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { useUser } from '../../contexts/UserContext';
import { GOOGLE_MAPS_KEY } from "../../lib/config";

const API_KEY = GOOGLE_MAPS_KEY;
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

const MapContext = createContext<google.maps.Map | null>(null);

const SAMPLE_CLINICS: (Clinic & { isOpen?: boolean })[] = [
  { id: '1', name: 'Hospital Central', type: 'hospital', sector: 'public', location: { lat: 12.1362, lng: -86.2514 }, address: 'Managua', phone: '2222-2222', open24h: true, rating: 4.5, reviews: 150 },
  { id: '2', name: 'Farmacia La Popular', type: 'pharmacy', sector: 'private', location: { lat: 12.1340, lng: -86.2490 }, address: 'Centro', phone: '2222-1111', open24h: true, rating: 4.2, reviews: 80 },
  { id: '3', name: 'Centro de Salud San Juan', type: 'health-center', sector: 'public', location: { lat: 12.1300, lng: -86.2550 }, address: 'San Juan', phone: '2222-3333', open24h: false, isOpen: true, rating: 4.0, reviews: 45 },
  { id: '4', name: 'Clínica Privada Santa María', type: 'clinic', sector: 'private', location: { lat: 12.1380, lng: -86.2480 }, address: 'Carrera a Masaya', phone: '2222-4444', open24h: false, isOpen: false, rating: 4.8, reviews: 200 },
  { id: '5', name: 'Emergency Medical', type: 'emergency', sector: 'private', location: { lat: 12.1350, lng: -86.2520 }, address: 'Pista Roosevelt', phone: '2222-9111', open24h: true, rating: 4.7, reviews: 300 },
];

const ClinicMarker: React.FC<{ clinic: Clinic & { isOpen?: boolean }, onClick: (c: Clinic & { isOpen?: boolean }) => void }> = ({ clinic, onClick }) => {
  const isOpen = clinic.isOpen !== undefined ? clinic.isOpen : clinic.open24h;
  const colors: Record<string, { bg: string; border: string }> = {
    pharmacy: { bg: '#51df8e', border: '#2ecc71' },
    emergency: { bg: '#F04438', border: '#c0392b' },
    default: { bg: '#a6c8ff', border: '#2E90FA' },
  };
  const color = clinic.type === 'pharmacy' ? colors.pharmacy : clinic.type === 'emergency' ? colors.emergency : colors.default;

  return (
    <AdvancedMarker position={clinic.location} onClick={() => onClick(clinic)}>
      <div className="relative flex flex-col items-center cursor-pointer group hover:scale-110 transition-transform">
        <div style={{
          width: '44px', height: '44px',
          background: isOpen ? color.bg : '#404753',
          border: `3px solid ${color.border}`,
          borderRadius: '14px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
          opacity: !isOpen ? 0.6 : 1
        }}>
          {clinic.type === 'pharmacy' ? <Pill className="w-5 h-5 text-white" /> : 
           clinic.type === 'emergency' ? <ShieldAlert className="w-5 h-5 text-white" /> : 
           <Hospital className="w-5 h-5 text-white" />}
        </div>
        <div style={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: `10px solid ${isOpen ? color.bg : '#404753'}`, marginTop: '-2px' }} />
        {isOpen && <div style={{ width: '10px', height: '10px', background: color.bg, borderRadius: '50%', position: 'absolute', bottom: '18px', right: '-2px', border: '2px solid white', boxShadow: `0 0 10px ${color.bg}` }} />}
      </div>
    </AdvancedMarker>
  );
};

function UserLocationMarker({ position }: { position: google.maps.LatLngLiteral }) {
  return (
    <AdvancedMarker position={position} zIndex={100}>
      <div className="relative flex items-center justify-center group">
        <div className="absolute w-16 h-16 bg-primary/10 rounded-full animate-ping opacity-30" />
        <div className="absolute w-10 h-10 bg-primary/25 rounded-full animate-ping opacity-50" />
        <div className="relative w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(46,144,250,0.8)] border-[3px] border-primary">
          <div className="w-2.5 h-2.5 bg-primary rounded-full" />
        </div>
      </div>
    </AdvancedMarker>
  );
}

function MapControls({ onCenter, onZoomIn, onZoomOut }: { onCenter: () => void; onZoomIn: () => void; onZoomOut: () => void }) {
  return (
    <div className="absolute bottom-6 right-6 flex flex-col gap-3 z-30">
      <button onClick={onCenter} className="w-12 h-12 bg-surface/90 backdrop-blur-md border border-outline-variant/30 rounded-2xl shadow-xl flex items-center justify-center hover:bg-surface-container-high transition-colors" title="Centrar en mi ubicación">
        <Target className="w-6 h-6" />
      </button>
      <button onClick={onZoomIn} className="w-12 h-12 bg-surface/90 backdrop-blur-md border border-outline-variant/30 rounded-2xl shadow-xl flex items-center justify-center hover:bg-surface-container-high transition-colors" title="Acercar">
        <Plus className="w-6 h-6" />
      </button>
      <button onClick={onZoomOut} className="w-12 h-12 bg-surface/90 backdrop-blur-md border border-outline-variant/30 rounded-2xl shadow-xl flex items-center justify-center hover:bg-surface-container-high transition-colors" title="Alejar">
        <Minus className="w-6 h-6" />
      </button>
    </div>
  );
}

function MapContent({ 
  clinics, 
  userLocation, 
  onClinicSelect,
  onCenterChange 
}: { 
  clinics: (Clinic & { isOpen?: boolean })[]; 
  userLocation: { lat: number; lng: number };
  onClinicSelect: (c: Clinic & { isOpen?: boolean }) => void;
  onCenterChange: (map: google.maps.Map) => void;
}) {
  const map = useMap();
  
  useEffect(() => {
    if (map) {
      onCenterChange(map);
    }
  }, [map, onCenterChange]);

  return (
    <>
      {clinics.map(clinic => (
        <ClinicMarker key={clinic.id} clinic={clinic} onClick={onClinicSelect} />
      ))}
      <UserLocationMarker position={userLocation} />
    </>
  );
}

export default function HealthMap() {
  const { t } = useLanguage();
  const { isPremium } = useUser();
  const [clinics, setClinics] = useState<(Clinic & { isOpen?: boolean })[]>(SAMPLE_CLINICS);
  const [selectedClinic, setSelectedClinic] = useState<(Clinic & { isOpen?: boolean }) | null>(null);
  const [center, setCenter] = useState({ lat: 12.1328, lng: -86.2504 });
  const [userLocation, setUserLocation] = useState({ lat: 12.1328, lng: -86.2504 });
  const [isNavigating, setIsNavigating] = useState(false);
  const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string } | null>(null);
  const [filter, setFilter] = useState<'all' | 'pharmacy' | 'emergency' | 'hospital' | 'health-center'>('all');
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => console.warn('Geolocation denied')
      );
    }
  }, []);

  const filteredClinics = clinics.filter(c => filter === 'all' || c.type === filter);

  const handleClinicSelect = (clinic: Clinic & { isOpen?: boolean }) => {
    setSelectedClinic(clinic);
    setIsNavigating(false);
  };

  const handleCenterToUser = () => {
    if (mapInstance) {
      mapInstance.setCenter(userLocation);
      mapInstance.setZoom(15);
    }
  };

  const handleZoomIn = () => {
    if (mapInstance) {
      mapInstance.setZoom((mapInstance.getZoom() || 14) + 1);
    }
  };

  const handleZoomOut = () => {
    if (mapInstance) {
      mapInstance.setZoom((mapInstance.getZoom() || 14) - 1);
    }
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      hospital: 'Hospital', pharmacy: 'Farmacia', 'health-center': 'Centro de Salud',
      emergency: 'Emergencia', clinic: 'Clínica', laboratory: 'Laboratorio'
    };
    return labels[type] || type;
  };

  if (!hasValidKey) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background p-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-error/10 rounded-full flex items-center justify-center">
            <MapPin className="w-10 h-10 text-error" />
          </div>
          <h2 className="text-xl font-black text-on-surface">{t('maps.key_required.title') || 'API Key requerida'}</h2>
          <p className="text-sm text-on-surface-variant">{t('maps.key_required.description') || 'Configure su API key de Google Maps para usar el mapa.'}</p>
          <button onClick={() => setFilter('all')} className="w-full py-4 bg-surface-container-highest rounded-2xl text-xs font-black uppercase tracking-widest">
            Ver Lista de Centros
          </button>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={API_KEY}>
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-background relative">
        <section className="absolute inset-0 z-0">
          <Map 
            defaultCenter={center} 
            defaultZoom={14} 
            mapId="DARK_MODE_MAP" 
            className="w-full h-full" 
            gestureHandling="greedy" 
            disableDefaultUI
            onCenterChanged={() => {
              // Optional: track center changes
            }}
          >
            <MapContent 
              clinics={filteredClinics} 
              userLocation={userLocation}
              onClinicSelect={handleClinicSelect}
              onCenterChange={setMapInstance}
            />
          </Map>
        </section>

        <AnimatePresence>
          {isEmergencyMode && (
            <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-lg bg-error-container text-on-error-container shrink-0 z-50 shadow-2xl border border-error/50 rounded-2xl overflow-hidden p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center border border-error/20">
                  <ShieldAlert className="w-6 h-6 text-error animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-error">Modo Emergencia</h3>
                  <p className="text-[10px] font-bold opacity-80">Buscando atención de urgencias</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute top-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-surface/95 backdrop-blur-md rounded-2xl shadow-xl border border-outline-variant/20 z-40 overflow-hidden">
          <div className="p-3 border-b border-outline-variant/20">
            <div className="flex items-center gap-2 mb-2">
              <Search className="w-4 h-4 text-on-surface-variant" />
              <input type="text" placeholder="Buscar centro de salud..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none" />
            </div>
            <div className="flex gap-1 overflow-x-auto pb-1">
              {(['all', 'hospital', 'pharmacy', 'emergency', 'health-center'] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase whitespace-nowrap transition-colors ${filter === f ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}>
                  {f === 'all' ? 'Todos' : getTypeLabel(f)}
                </button>
              ))}
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {filteredClinics.filter(c => !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase())).map(clinic => (
              <button key={clinic.id} onClick={() => handleClinicSelect(clinic)}
                className={`w-full p-3 flex items-start gap-3 border-b border-outline-variant/10 hover:bg-surface-container-high transition-colors ${selectedClinic?.id === clinic.id ? 'bg-primary/10' : ''}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${clinic.type === 'emergency' ? 'bg-error/20 text-error' : clinic.type === 'pharmacy' ? 'bg-green-100 text-green-600' : 'bg-primary/20 text-primary'}`}>
                  {clinic.type === 'pharmacy' ? <Pill className="w-4 h-4" /> : clinic.type === 'emergency' ? <ShieldAlert className="w-4 h-4" /> : <Hospital className="w-4 h-4" />}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-xs font-bold text-on-surface">{clinic.name}</p>
                  <p className="text-[10px] text-on-surface-variant">{clinic.address}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {clinic.open24h || clinic.isOpen ? <span className="text-[9px] font-bold text-green-600">Abierto</span> : <span className="text-[9px] text-error">Cerrado</span>}
                    {clinic.rating && <span className="text-[9px] text-primary">★ {clinic.rating.toFixed(1)}</span>}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-on-surface-variant shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {selectedClinic && !isNavigating && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="absolute bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-96 bg-surface rounded-3xl shadow-2xl border border-outline-variant/20 z-50 overflow-hidden">
            <div className={`p-4 border-b ${selectedClinic.type === 'emergency' ? 'bg-error/10' : 'bg-primary/10'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase">{getTypeLabel(selectedClinic.type)}</span>
                {selectedClinic.sector === 'public' && <span className="text-[9px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">PÚBLICO</span>}
              </div>
              <h3 className="text-base font-black text-on-surface">{selectedClinic.name}</h3>
              <p className="text-xs text-on-surface-variant">{selectedClinic.address}</p>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
              <div className="bg-surface-container/50 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Phone className="w-3.5 h-3.5 text-on-surface-variant" />
                  <span className="text-[9px] font-bold text-on-surface-variant uppercase">Teléfono</span>
                </div>
                <p className="text-xs font-bold text-on-surface">{selectedClinic.phone || 'N/A'}</p>
              </div>
              <div className="bg-surface-container/50 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-3.5 h-3.5 text-on-surface-variant" />
                  <span className="text-[9px] font-bold text-on-surface-variant uppercase">Horario</span>
                </div>
                <p className="text-xs font-bold text-on-surface">{selectedClinic.open24h ? '24 horas' : selectedClinic.isOpen ? 'Abierto' : 'Cerrado'}</p>
              </div>
            </div>
            <div className="p-4 pt-0 flex gap-2">
              <button onClick={() => setIsNavigating(true)}
                className="flex-1 py-3 bg-primary text-on-primary font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                <Navigation className="w-4 h-4" /> Cómo Llegar
              </button>
              <button onClick={() => setSelectedClinic(null)}
                className="px-4 py-3 bg-surface-container text-on-surface font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-surface-container-high">
                Cerrar
              </button>
            </div>
          </motion.div>
        )}

        <MapControls onCenter={handleCenterToUser} onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
      </div>
    </APIProvider>
  );
}