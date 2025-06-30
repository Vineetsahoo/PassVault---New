import React, { useState, useEffect } from 'react';
import { 
  Clock, Bell, BellOff, Calendar, Settings, AlertTriangle, History,
  PauseCircle, Clock4, Lock, LogIn
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

interface Alert {
  id: string;
  passName: string;
  expiryDate: Date;
  status: 'upcoming' | 'expired' | 'active';
  notificationType: 'email' | 'push' | 'both';
  daysRemaining: number;
}

interface AlertRule {
  id: string;
  category: 'pass' | 'subscription' | 'ticket';
  notifyBefore: number[];
  priority: 'high' | 'medium' | 'low';
}

interface FeatureTemplateProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const FeatureTemplate: React.FC<FeatureTemplateProps> = ({ title, description, icon, children }) => {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50/20 to-white min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative">
        <div className="absolute top-20 right-20 w-48 h-48 bg-indigo-100/40 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-20 w-56 h-56 bg-blue-100/30 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-40 left-10 w-24 h-24 bg-purple-100/30 rounded-full blur-2xl -z-10"></div>
        
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-blue-500/5 to-purple-500/10 z-0"></div>
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-100/30 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row md:items-center gap-8 border-b border-slate-200/50">
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
          
          <div className="p-8 md:p-12 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-indigo-50/5 to-blue-50/10 opacity-70"></div>
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </div>
        
        <div className="relative h-1 mx-auto w-60 mt-6">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-full shadow-lg opacity-70"></div>
          <div className="absolute inset-0 bg-white rounded-full shadow blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-full opacity-90"></div>
        </div>
      </div>
    </div>
  );
};

const AuthPrompt = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white border border-slate-200/60 p-8 rounded-xl shadow-lg text-center backdrop-blur-sm">
      <div className="bg-indigo-50 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
        <Lock className="h-10 w-10 text-indigo-600" />
      </div>
      <h3 className="text-xl font-semibold text-slate-800 mb-3">Sign in Required</h3>
      <p className="text-slate-600 mb-6">Please sign in to manage your alerts</p>
      <button 
        onClick={() => navigate('/signin')}
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-md hover:shadow-lg"
      >
        <LogIn className="h-5 w-5" />
        Sign In
      </button>
    </div>
  );
};

const Alerts = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notificationPrefs, setNotificationPrefs] = useState({
    emailEnabled: true,
    pushEnabled: true,
    advanceNotificationDays: 7
  });
  const [alertRules, setAlertRules] = useState<AlertRule[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [alertHistory, setAlertHistory] = useState<Alert[]>([]);

  useEffect(() => {
    const checkAuthAndLoadAlerts = async () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(authStatus);
      
      if (authStatus) {
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          setAlerts([
            {
              id: '1',
              passName: 'Gym Membership',
              expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
              status: 'upcoming',
              notificationType: 'both',
              daysRemaining: 5
            },
            {
              id: '2',
              passName: 'Concert Pass',
              expiryDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
              status: 'expired',
              notificationType: 'email',
              daysRemaining: 0
            }
          ]);
        } catch (err) {
          setError('Failed to load alerts');
        } finally {
          setLoading(false);
        }
      }
    };

    checkAuthAndLoadAlerts();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-amber-700 bg-amber-50 border border-amber-200';
      case 'expired': return 'text-rose-700 bg-rose-50 border border-rose-200';
      default: return 'text-emerald-700 bg-emerald-50 border border-emerald-200';
    }
  };

  const handleSnoozeAlert = (alertId: string, days: number) => {
    setAlerts(prev => prev.map(alert => {
      if (alert.id === alertId) {
        const newDate = new Date(alert.expiryDate);
        newDate.setDate(newDate.getDate() + days);
        return { ...alert, expiryDate: newDate, daysRemaining: alert.daysRemaining + days };
      }
      return alert;
    }));
  };

  return (
    <>
      <Navbar />
      <FeatureTemplate
        title="Expiration Alerts"
        description="Never miss an expiration date with smart notifications."
        icon={<Clock className="h-8 w-8 text-slate-700" />}
      >
        {!isAuthenticated ? (
          <AuthPrompt />
        ) : (
          <div className="space-y-8">
            <div className="bg-white border border-slate-200/60 rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 border-b border-slate-200/60">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-slate-800">
                  <Settings className="h-5 w-5 text-indigo-600" />
                  Notification Preferences
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <label className="flex items-center gap-3 cursor-pointer w-full">
                        <div className={`relative w-12 h-6 transition-colors duration-300 rounded-full ${notificationPrefs.emailEnabled ? 'bg-indigo-500' : 'bg-slate-300'}`}>
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={notificationPrefs.emailEnabled}
                            onChange={e => setNotificationPrefs(prev => ({
                              ...prev,
                              emailEnabled: e.target.checked
                            }))}
                          />
                          <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${notificationPrefs.emailEnabled ? 'transform translate-x-6' : ''}`}></div>
                        </div>
                        <span className="text-slate-700 font-medium">Email Notifications</span>
                      </label>
                      <Bell className={`h-5 w-5 ${notificationPrefs.emailEnabled ? 'text-indigo-600' : 'text-slate-400'}`} />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <label className="flex items-center gap-3 cursor-pointer w-full">
                        <div className={`relative w-12 h-6 transition-colors duration-300 rounded-full ${notificationPrefs.pushEnabled ? 'bg-indigo-500' : 'bg-slate-300'}`}>
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={notificationPrefs.pushEnabled}
                            onChange={e => setNotificationPrefs(prev => ({
                              ...prev,
                              pushEnabled: e.target.checked
                            }))}
                          />
                          <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${notificationPrefs.pushEnabled ? 'transform translate-x-6' : ''}`}></div>
                        </div>
                        <span className="text-slate-700 font-medium">Push Notifications</span>
                      </label>
                      <Bell className={`h-5 w-5 ${notificationPrefs.pushEnabled ? 'text-indigo-600' : 'text-slate-400'}`} />
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-slate-700 mb-3">Notification Timing</h4>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-700">Notify me</span>
                      <div className="relative flex-1">
                        <select
                          value={notificationPrefs.advanceNotificationDays}
                          onChange={e => setNotificationPrefs(prev => ({
                            ...prev,
                            advanceNotificationDays: Number(e.target.value)
                          }))}
                          className="appearance-none w-full bg-white border border-slate-200 rounded-lg px-4 py-2 pr-8 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        >
                          {[3, 5, 7, 14, 30].map(days => (
                            <option key={days} value={days}>{days} days</option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <Calendar className="h-4 w-4 text-slate-500" />
                        </div>
                      </div>
                      <span className="text-slate-700">before expiration</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200/60 rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 border-b border-slate-200/60">
                <h3 className="text-lg font-semibold text-slate-800">Alert Categories</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: 'pass', icon: <Clock className="h-5 w-5" /> },
                    { name: 'subscription', icon: <Calendar className="h-5 w-5" /> },
                    { name: 'ticket', icon: <Bell className="h-5 w-5" /> }
                  ].map(category => (
                    <div key={category.name} className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all hover:shadow-md">
                      <div className="bg-gradient-to-r from-indigo-50 to-blue-50/30 p-3 flex items-center gap-3 border-b border-slate-200/60">
                        <div className="bg-white p-2 rounded-lg shadow-sm">
                          {category.icon}
                        </div>
                        <h4 className="font-medium capitalize text-slate-800">{category.name} Alerts</h4>
                      </div>
                      <div className="p-4 space-y-3">
                        <label className="flex items-center justify-between gap-2 text-slate-700 p-2 hover:bg-slate-50 rounded-lg transition-colors">
                          <span className="text-sm font-medium">Enable</span>
                          <input
                            type="checkbox"
                            defaultChecked
                            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </label>
                        <div>
                          <label className="text-xs font-medium text-slate-500 block mb-1">Priority Level</label>
                          <select className="w-full text-sm p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white">
                            <option value="high">High Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="low">Low Priority</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200/60 rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 border-b border-slate-200/60">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-slate-800">
                  <Bell className="h-5 w-5 text-indigo-600" />
                  Active Alerts
                </h3>
              </div>
              
              <div className="p-6">
                {loading ? (
                  <div className="bg-slate-50 rounded-lg p-8 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-200 border-t-indigo-600 mb-3"></div>
                    <p className="text-slate-500">Loading alerts...</p>
                  </div>
                ) : error ? (
                  <div className="bg-rose-50 border border-rose-200 p-4 rounded-lg flex items-center gap-3">
                    <AlertTriangle className="h-6 w-6 text-rose-500" />
                    <p className="text-rose-600 font-medium">{error}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {alerts.length === 0 ? (
                      <div className="bg-slate-50 rounded-lg p-8 text-center">
                        <BellOff className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                        <p className="text-slate-600 font-medium">No active alerts</p>
                        <p className="text-slate-500 text-sm mt-1">You're all caught up!</p>
                      </div>
                    ) : (
                      alerts.map(alert => (
                        <div
                          key={alert.id}
                          className={`bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all ${
                            alert.status === 'expired' ? 'border-rose-200' : 'border-slate-200'
                          }`}
                        >
                          <div className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                            alert.status === 'expired' ? 'bg-rose-50/50' : 'bg-white'
                          }`}>
                            <div className="flex items-center gap-4">
                              <div className={`rounded-full p-3 ${
                                alert.status === 'expired' 
                                  ? 'bg-rose-100 text-rose-600' 
                                  : 'bg-amber-100 text-amber-600'
                              }`}>
                                {alert.status === 'expired' 
                                  ? <AlertTriangle className="h-6 w-6" /> 
                                  : <Clock className="h-6 w-6" />}
                              </div>
                              <div>
                                <h4 className="font-medium text-lg">{alert.passName}</h4>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <Calendar className="h-4 w-4" />
                                  <span>Expires: {alert.expiryDate.toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                              <span className={`px-4 py-2 rounded-full text-sm font-medium inline-flex items-center gap-1 ${
                                alert.status === 'upcoming' 
                                  ? 'text-amber-700 bg-amber-50 border border-amber-200' 
                                  : 'text-rose-700 bg-rose-50 border border-rose-200'
                              }`}>
                                {alert.status === 'upcoming' ? (
                                  <>
                                    <Clock4 className="h-4 w-4" />
                                    {alert.daysRemaining} days left
                                  </>
                                ) : (
                                  <>
                                    <AlertTriangle className="h-4 w-4" />
                                    {alert.status}
                                  </>
                                )}
                              </span>
                              <div className="flex items-center gap-2 p-1">
                                <button
                                  onClick={() => handleSnoozeAlert(alert.id, 1)}
                                  className="px-3 py-1 text-sm bg-white border border-slate-200 rounded-lg shadow-sm flex items-center gap-1 hover:bg-slate-50 transition-colors"
                                >
                                  <PauseCircle className="h-4 w-4 text-indigo-600" />
                                  <span>1d</span>
                                </button>
                                <button
                                  onClick={() => handleSnoozeAlert(alert.id, 7)}
                                  className="px-3 py-1 text-sm bg-white border border-slate-200 rounded-lg shadow-sm flex items-center gap-1 hover:bg-slate-50 transition-colors"
                                >
                                  <Clock4 className="h-4 w-4 text-indigo-600" />
                                  <span>1w</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            <div>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center gap-2 px-4 py-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors mb-4"
              >
                <History className="h-4 w-4" />
                {showHistory ? 'Hide History' : 'Show History'}
              </button>
              
              {showHistory && (
                <div className="bg-white border border-slate-200/60 rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-4 border-b border-slate-200/60">
                    <h4 className="font-medium text-slate-800 flex items-center gap-2">
                      <History className="h-4 w-4 text-slate-600" />
                      Previous Alerts
                    </h4>
                  </div>
                  <div className="p-6">
                    <ul className="divide-y divide-slate-100">
                      {[
                        { passName: 'Movie Pass', date: '2024-01-15', action: 'Expired', icon: <AlertTriangle className="h-4 w-4 text-rose-500" /> },
                        { passName: 'Gym Pass', date: '2024-01-10', action: 'Renewed', icon: <Clock className="h-4 w-4 text-green-500" /> }
                      ].map((item, index) => (
                        <li key={index} className="py-3 px-2 hover:bg-slate-50 rounded-lg transition-colors">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="bg-slate-100 p-2 rounded-full">
                                {item.icon}
                              </div>
                              <span className="font-medium text-slate-700">{item.passName}</span>
                            </div>
                            <div className="text-sm text-slate-500">
                              {item.action} on {item.date}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </FeatureTemplate>
      <Footer />
    </>
  );
};

export default Alerts;
