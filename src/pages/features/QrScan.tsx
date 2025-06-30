import React, { useState, useRef, useEffect } from 'react';
import { QrCode, Camera, Settings, History, CheckCircle2, XCircle, Image, 
         RotateCcw, Layers, ZoomIn, ZoomOut, Lightbulb, Filter, Share2, 
         CreditCard, ChevronLeft, ChevronRight, ArrowUpCircle, Lock, LogIn, Trash2, AlertCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react'; 
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Feature Template component for page layout
const FeatureTemplate: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, description, icon, children }) => {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50/20 to-white min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative">
        {/* Enhanced decorative elements */}
        <div className="absolute top-20 right-20 w-48 h-48 bg-indigo-100/40 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-20 w-56 h-56 bg-blue-100/30 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-40 left-10 w-24 h-24 bg-purple-100/30 rounded-full blur-2xl -z-10"></div>
        
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
          {/* Redesigned header section */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-blue-500/5 to-purple-500/10 z-0"></div>
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-100/30 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row md:items-center gap-8 border-b border-slate-200/50">
              {/* Enhanced icon container */}
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl shadow-lg flex items-center justify-center relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {React.cloneElement(icon as React.ReactElement, { 
                  className: "h-12 w-12 text-indigo-600 relative z-10 transition-transform duration-300 group-hover:scale-110" 
                })}
              </div>
              
              <div className="space-y-2">
                <div className="inline-block rounded-full px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 mb-1">
                  Feature
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-700 via-blue-700 to-indigo-800 bg-clip-text text-transparent mb-3">{title}</h1>
                <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">{description}</p>
              </div>
            </div>
          </div>
          
          {/* Improved content section */}
          <div className="p-8 md:p-12 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-indigo-50/5 to-blue-50/10 opacity-70"></div>
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </div>
        
        {/* Redesigned bottom accent */}
        <div className="relative h-1 mx-auto w-60 mt-6">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-full shadow-lg opacity-70"></div>
          <div className="absolute inset-0 bg-white rounded-full shadow blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-full opacity-90"></div>
        </div>
      </div>
    </div>
  );
};

// Add new interfaces
interface CardData {
  id: string;
  type: 'credit' | 'debit' | 'pass' | 'membership';
  title: string;
  number: string;
  expiryDate?: string;
  holderName: string;
  issuer: string;
  backgroundColor: string | { gradient: string };
  textColor: string;
  qrData: string;
  logo?: string;
}

interface ScanResult {
  id: string;
  timestamp: Date;
  type: 'pass' | 'ticket' | 'membership';
  content: string;
  status: 'success' | 'failed';
}

interface ScanSettings {
  enableAutoFocus: boolean;
  enableBeep: boolean;
  enableVibration: boolean;
  saveHistory: boolean;
  preferredCamera: 'back' | 'front';
}

interface ScanQuality {
  brightness: number;
  contrast: number;
  zoom: number;
  resolution: 'low' | 'medium' | 'high';
}

interface BatchScanConfig {
  enabled: boolean;
  delay: number;
  maxItems: number;
  autoSave: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  user: { name: string; email: string; } | null;
}

// Add new card images
const cardImages = {
  mastercard: '/images/mastercard-logo.png',
  visa: '/images/visa-logo.png',
  amex: '/images/amex-logo.png',
  cinema: '/images/cinema-logo.png',
  transit: '/images/transit-logo.png',
  membership: '/images/membership-logo.png'
};

// Add new sample cards
const sampleCards: CardData[] = [
  {
    id: '1',
    type: 'credit',
    title: 'Premium Credit Card',
    number: '**** **** **** 1234',
    expiryDate: '12/25',
    holderName: 'Rahul Singh',
    issuer: 'Master Card',
    backgroundColor: { gradient: 'linear-gradient(135deg, #1a1a1a 0%, #2d3436 100%)' },
    textColor: '#ffffff',
    qrData: 'credit-card-1234',
    logo: cardImages.mastercard
  },
  {
    id: '2',
    type: 'debit',
    title: 'Platinum Debit',
    number: '**** **** **** 5678',
    expiryDate: '03/26',
    holderName: 'Rahul Singh',
    issuer: 'Visa',
    backgroundColor: { gradient: 'linear-gradient(135deg, #000428 0%, #004e92 100%)' },
    textColor: '#ffffff',
    qrData: 'debit-card-5678',
    logo: cardImages.visa
  },
  {
    id: '3',
    type: 'pass',
    title: 'Cinema Elite Pass',
    number: 'PASS-123',
    holderName: 'Rahul Singh',
    issuer: 'Cinema Plus',
    backgroundColor: { gradient: 'linear-gradient(135deg, #d31027 0%, #ea384d 100%)' },
    textColor: '#ffffff',
    qrData: 'movie-pass-123',
    logo: cardImages.cinema
  },
  {
    id: '4',
    type: 'membership',
    title: 'Gold Membership',
    number: 'MEM-789',
    expiryDate: '12/24',
    holderName: 'Rahul Singh',
    issuer: 'Premium Club',
    backgroundColor: { gradient: 'linear-gradient(135deg, #b78628 0%, #dba514 100%)' },
    textColor: '#ffffff',
    qrData: 'membership-789',
    logo: cardImages.membership
  },
  {
    id: '5',
    type: 'credit',
    title: 'Travel Rewards Card',
    number: '**** **** **** 9012',
    expiryDate: '06/25',
    holderName: 'Rahul Singh',
    issuer: 'American Express',
    backgroundColor: { gradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)' },
    textColor: '#ffffff',
    qrData: 'credit-card-9012',
    logo: cardImages.amex
  },
  {
    id: '6',
    type: 'pass',
    title: 'Transit Pass',
    number: 'TRN-456',
    expiryDate: '12/23',
    holderName: 'Rahul Singh',
    issuer: 'City Transit',
    backgroundColor: { gradient: 'linear-gradient(135deg, #3494e6 0%, #ec6ead 100%)' },
    textColor: '#ffffff',
    qrData: 'transit-pass-456',
    logo: cardImages.transit
  }
];

const QrScan = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);
  const [settings, setSettings] = useState<ScanSettings>({
    enableAutoFocus: true,
    enableBeep: true,
    enableVibration: true,
    saveHistory: true,
    preferredCamera: 'back'
  });
  const [showSettings, setShowSettings] = useState(false);
  const [lastScan, setLastScan] = useState<ScanResult | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [quality, setQuality] = useState<ScanQuality>({
    brightness: 100,
    contrast: 100,
    zoom: 1,
    resolution: 'high'
  });

  const [batchConfig, setBatchConfig] = useState<BatchScanConfig>({
    enabled: false,
    delay: 1000,
    maxItems: 10,
    autoSave: true
  });

  const [detectedFormat, setDetectedFormat] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [cards] = useState<CardData[]>(sampleCards);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Add auth state
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userData = localStorage.getItem('userData');
    
    setAuth({
      isAuthenticated,
      user: userData ? JSON.parse(userData) : null
    });
  }, []);

  // Add error handling for camera access
  const startScanning = async () => {
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('Camera access not supported');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: settings.preferredCamera === 'back' ? 'environment' : 'user',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsScanning(true);
      }
    } catch (err) {
      console.error('Failed to access camera:', err);
      setValidationErrors([`Camera access failed: ${err instanceof Error ? err.message : 'Unknown error'}`]);
    }
  };

  const stopScanning = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
    setIsScanning(false);
  };

  const handleScanResult = (result: string) => {
    const scanResult: ScanResult = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      type: 'pass',
      content: result,
      status: 'success'
    };

    setLastScan(scanResult);
    if (settings.saveHistory) {
      setScanHistory(prev => [scanResult, ...prev]);
    }
  };

  const adjustQuality = (property: keyof ScanQuality, value: any) => {
    setQuality(prev => ({ ...prev, [property]: value }));
    // Apply camera adjustments here
  };

  const toggleBatchMode = () => {
    setBatchConfig(prev => ({ ...prev, enabled: !prev.enabled }));
  };

  // Add scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update auth message component
  const AuthPrompt = () => (
    <div className="bg-white border border-slate-200/60 p-8 rounded-xl shadow-lg text-center backdrop-blur-sm">
      <div className="bg-indigo-50 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
        <Lock className="h-10 w-10 text-indigo-600" />
      </div>
      <h3 className="text-xl font-semibold text-slate-800 mb-3">Sign in Required</h3>
      <p className="text-slate-600 mb-6">Please sign in to view your cards and passes</p>
      <button 
        onClick={() => navigate('/signin')}
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-md hover:shadow-lg"
      >
        <LogIn className="h-5 w-5" />
        Sign In
      </button>
    </div>
  );

  // Add sign out functionality
  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
    setAuth({
      isAuthenticated: false,
      user: null
    });
    navigate('/sign-in');
  };

  // Add sign out button in the header
  const renderHeader = () => (
    auth.isAuthenticated && (
      <div className="flex justify-end mb-4">
        <button
          onClick={handleSignOut}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
        >
          <LogIn className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    )
  );

  // Update the CardDisplay component with modern design
  const CardDisplay: React.FC<{ card: CardData }> = ({ card }) => (
    <div 
      className="relative w-[340px] flex-shrink-0 rounded-2xl p-6 shadow-lg mx-2 overflow-hidden group transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
      style={{ 
        background: typeof card.backgroundColor === 'string' 
          ? card.backgroundColor 
          : card.backgroundColor.gradient,
        color: card.textColor,
        minHeight: '200px'
      }}
    >
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/card-pattern.svg')] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />
      </div>

      {/* Card Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold tracking-wide">{card.title}</h3>
            <p className="text-sm opacity-80 font-mono tracking-wider">{card.number}</p>
          </div>
          {card.logo && (
            <div className="bg-white/30 backdrop-blur-sm rounded-lg p-1.5 shadow-sm">
              <img 
                src={card.logo} 
                alt={card.issuer} 
                className="h-8 transition-transform group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>
        
        <div className="mt-auto space-y-3 pt-4">
          <div className="pt-4">
            <p className="text-sm opacity-90 uppercase tracking-wider font-medium">{card.holderName}</p>
            {card.expiryDate && (
              <p className="text-xs opacity-80 mt-1 font-medium">Valid Thru: {card.expiryDate}</p>
            )}
          </div>
          <div className="text-xs opacity-70 uppercase tracking-wider">{card.issuer}</div>
        </div>

        {/* Enhanced QR Code with hover effect */}
        <div className="absolute right-4 bottom-4 group-hover:scale-110 transition-all duration-300 transform-gpu">
          <div className="relative">
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-lg blur-sm"></div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 relative shadow-lg border border-white/50">
              <QRCodeSVG 
                value={card.qrData}
                size={84}
                level="H"
                includeMargin={true}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Update selected card QR code rendering
  const renderSelectedCardQR = () => {
    if (!selectedCard) return null;

    return (
      <div className="mt-4 p-4 bg-slate-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-slate-700">Selected Card QR Code</h4>
          <button 
            onClick={() => setSelectedCard(null)}
            className="text-slate-500 hover:text-slate-700"
          >
            <XCircle className="h-5 w-5" />
          </button>
        </div>
        <div className="flex justify-center p-4 bg-white rounded-lg">
          <QRCodeSVG 
            value={selectedCard.qrData}
            size={200}
            level="H"
            includeMargin={true}
            className="w-full h-full max-w-[200px]"
          />
        </div>
      </div>
    );
  };

  // Update the card carousel section with better scrolling
  const cardCarouselSection = auth.isAuthenticated ? (
    <div className="bg-white border border-slate-200/60 rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50/30 p-4 border-b border-slate-200/60 flex items-center justify-between">
        <h3 className="font-medium flex items-center gap-2 text-slate-800">
          <CreditCard className="h-5 w-5 text-indigo-600" />
          Your Cards & Passes
        </h3>
        <div className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
          Welcome, {auth.user?.name}
        </div>
      </div>
      
      <div className="p-6">
        <div className="relative">
          <div className="overflow-x-auto pb-6 scrollbar-hide -mx-2">
            <div className="flex flex-row space-x-6 px-2">
              {cards.map(card => (
                <div 
                  key={card.id}
                  onClick={() => setSelectedCard(card)}
                  className="cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                >
                  <CardDisplay card={card} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Enhanced scroll indicators */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />
          
          {/* Carousel navigation */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-slate-200/50 hover:bg-white transition-colors">
              <ChevronLeft className="h-5 w-5 text-slate-700" />
            </button>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-slate-200/50 hover:bg-white transition-colors">
              <ChevronRight className="h-5 w-5 text-slate-700" />
            </button>
          </div>
        </div>

        {selectedCard && (
          <div className="mt-8 bg-gradient-to-r from-indigo-50 to-blue-50/50 rounded-xl p-6 border border-indigo-100/50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-slate-800 flex items-center gap-2">
                <QrCode className="h-5 w-5 text-indigo-600" />
                Selected Card QR Code
              </h4>
              <button 
                onClick={() => setSelectedCard(null)}
                className="text-slate-500 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-white rounded-xl p-5 shadow-md border border-slate-200/60">
                <QRCodeSVG 
                  value={selectedCard.qrData}
                  size={200}
                  level="H"
                  includeMargin={true}
                  className="w-full h-full max-w-[200px]"
                />
              </div>
              <div className="space-y-2">
                <h5 className="text-lg font-medium">{selectedCard.title}</h5>
                <p className="text-slate-600">{selectedCard.issuer}</p>
                <div className="flex items-center gap-2 mt-4">
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 transition-colors flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                  <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
                    <Image className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <AuthPrompt />
  );

  const ScanHistorySection = () => (
    <div className="bg-white border border-slate-200/60 rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50/30 p-4 border-b border-slate-200/60">
        <h3 className="font-medium flex items-center gap-2 text-slate-800">
          <History className="h-5 w-5 text-indigo-600" />
          Recent Scans
        </h3>
      </div>
      <div className="divide-y divide-slate-200">
        {scanHistory.length === 0 ? (
          <div className="py-8 text-slate-500 text-center">
            <History className="h-12 w-12 mx-auto text-slate-300 mb-3" />
            <p className="font-medium">No scan history</p>
            <p className="text-sm text-slate-400 mt-1">Your scan results will appear here</p>
          </div>
        ) : (
          scanHistory.slice(0, 5).map(scan => (
            <div key={scan.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`rounded-full p-2 ${
                  scan.status === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                }`}>
                  {scan.status === 'success' ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <XCircle className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-slate-800">{scan.type}</div>
                  <div className="text-sm text-slate-500">
                    {scan.timestamp.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors">
                  <Share2 className="h-4 w-4" />
                </button>
                <button className="p-1.5 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-500 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <FeatureTemplate
        title="QR Code Scanning & Cards"
        description="Manage and scan your digital cards and passes"
        icon={<QrCode className="h-8 w-8 text-gray-700" />}
      >
        {renderHeader()}
        <div className="space-y-6 relative">
          {/* Camera View */}
          <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            {isScanning ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={stopScanning}
                  className="absolute bottom-4 right-4 bg-rose-500 text-white p-2 rounded-full hover:bg-rose-600 transition-colors"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-200">
                <Camera className="h-12 w-12 mb-4" />
                <button
                  onClick={startScanning}
                  className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Scanning
                </button>
              </div>
            )}
          </div>

          {/* Protected Sections */}
          {auth.isAuthenticated ? (
            <>
              {cardCarouselSection}
              <ScanHistorySection />
            </>
          ) : (
            <AuthPrompt />
          )}
        </div>
      </FeatureTemplate>
      <Footer />
    </>
  );
};

export default QrScan;
