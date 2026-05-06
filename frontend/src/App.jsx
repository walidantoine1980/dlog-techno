import React, { useState } from 'react';
import { 
  Activity, 
  Target, 
  Cpu, 
  Settings, 
  Search, 
  Bell, 
  Shield, 
  Zap, 
  Database,
  BarChart3,
  Globe2,
  CalendarDays,
  ExternalLink,
  MapPin,
  Link as LinkIcon
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Real Data from DLOG Veille Technologique
const innovationCategories = [
  { name: 'IA & Vision Industrielle', value: 35 },
  { name: 'Diagnostics & Connectés', value: 25 },
  { name: 'NDT & Drones Autonomes', value: 20 },
  { name: 'Gouvernance & Assurance IA', value: 10 },
  { name: 'Capteurs & Hardware', value: 10 },
];

const scanHistory = [
  { date: 'Lun', scans: 140, threats: 2 },
  { date: 'Mar', scans: 165, threats: 5 },
  { date: 'Mer', scans: 210, threats: 3 },
  { date: 'Jeu', scans: 185, threats: 1 },
  { date: 'Ven', scans: 250, threats: 8 },
  { date: 'Sam', scans: 120, threats: 0 },
  { date: 'Dim', scans: 135, threats: 1 },
];

const recentInnovations = [
  { id: 1, company: 'TRIGO / Scortex', title: 'Spark Multi View (3 parts/sec, DL)', category: 'IA & Vision Industrielle', date: 'Mai 2022 / 2024', score: 95 },
  { id: 2, company: 'Bureau Veritas', title: 'Augmented Surveyor 3D (Jumeaux 3D)', category: 'NDT & Drones Autonomes', date: '2025', score: 90 },
  { id: 3, company: 'Applus+', title: 'IA pour NDT en Oil & Gas (Abyss)', category: 'NDT & Drones Autonomes', date: '2024', score: 88 },
  { id: 4, company: 'Waygate Tech.', title: 'Intelligent Borescope (ADR)', category: 'IA & Vision Industrielle', date: 'Récemment', score: 85 },
  { id: 5, company: 'DEKRA', title: 'Diagnostic Batterie EV 15min', category: 'Diagnostics & Connectés', date: '2024', score: 86 },
  { id: 6, company: 'SGS', title: 'QiiQ Remote Inspection & CertX', category: 'Gouvernance & Assurance IA', date: '2024-2025', score: 92 },
  { id: 7, company: 'TÜV SÜD', title: 'AI Procured Platform', category: 'Gouvernance & Assurance IA', date: '2024', score: 89 },
  { id: 8, company: 'Intertek', title: 'Intertek AI² (Assurance IA)', category: 'Gouvernance & Assurance IA', date: '2025', score: 91 },
  { id: 9, company: 'Valeo', title: 'LiDAR SCALA 3', category: 'Capteurs & Hardware', date: 'CES 2024', score: 87 },
  { id: 10, company: 'Energy Robotics', title: 'Drones d\'inspection (Ultrason/Vision)', category: 'NDT & Drones Autonomes', date: 'Récemment', score: 84 },
];

const radarInnovations = [
  { id: 1, company: 'TRIGO / Scortex', title: 'Spark & Spark Multi View', category: 'IA & Vision Industrielle', description: 'Système d\'inspection optique par deep learning (jusqu\'à 3 pièces/sec, 4 caméras, apprentissage avec 30 pièces).', link: 'https://scortex.io' },
  { id: 2, company: 'Bureau Veritas', title: 'Augmented Surveyor 3D (AGS 3D)', category: 'NDT & Drones', description: 'Inspection à distance avec IA/ML, capture par drones et jumeaux numériques 3D.', link: 'https://marine-offshore.bureauveritas.com' },
  { id: 3, company: 'Applus+', title: 'IA pour NDT (Abyss Solutions)', category: 'NDT & Drones', description: 'Machine Learning et vision par drone pour automatiser l\'inspection dans les milieux Oil & Gas.', link: 'https://www.applus.com' },
  { id: 4, company: 'Waygate Technologies', title: 'Intelligent Borescope (ADR)', category: 'IA & Vision Industrielle', description: 'Assisted Defect Recognition pour l\'inspection ultrarapide des pales de turbines.', link: 'https://www.bakerhughes.com/waygate-technologies' },
  { id: 5, company: 'Energy Robotics', title: 'Robots d\'inspection autonomes', category: 'NDT & Drones', description: 'Logiciels IA pour robots/drones avec caméras HR, sondes infrarouges et ultrasoniques.', link: 'https://www.energy-robotics.com' },
  { id: 6, company: 'DEKRA', title: 'Diagnostic Batterie EV & Drones', category: 'Diagnostics Connectés', description: 'Test de l\'état de santé (SOH) des batteries en 15min. Inspection d\'éoliennes par drone.', link: 'https://www.dekra.com' },
  { id: 7, company: 'SGS', title: 'QiiQ Remote Inspection & CertX', category: 'Gouvernance & Assurance IA', description: 'Inspections guidées à distance avec piste d\'audit. Label de confiance numérique et sécurité fonctionnelle.', link: 'https://www.sgs.com' },
  { id: 8, company: 'TÜV SÜD', title: 'Plateforme AI Procured', category: 'Gouvernance & Assurance IA', description: 'Évaluation des solutions IA et tests de conformité réglementaire (EU AI Act).', link: 'https://www.tuvsud.com' },
  { id: 9, company: 'Intertek', title: 'Intertek AI² (Assurance IA)', category: 'Gouvernance & Assurance IA', description: 'Cadre d\'évaluation et de validation de bout en bout pour s\'assurer de la fiabilité et l\'éthique de l\'IA.', link: 'https://www.intertek.com' },
  { id: 10, company: 'Continental', title: 'Crystal Center Display (MicroLED)', category: 'Capteurs & Hardware', description: 'Vision 3D en cristal et authentification faciale biométrique invisible.', link: 'https://www.continental.com' },
  { id: 11, company: 'Valeo', title: 'LiDAR SCALA 3', category: 'Capteurs & Hardware', description: 'Capteur matériel de perception de pointe propulsant les algorithmes d\'IA.', link: 'https://www.valeo.com' },
  { id: 12, company: 'Sipotek / Hikrobot (Chine)', title: 'Bancs de Contrôle (In-Line & Off-Line)', category: 'IA & Vision Industrielle', description: 'Bancs de test optiques automatisés (AOI) intégrés en chaîne de production ou en laboratoire pour l\'inspection des pièces (dimensionnel, défauts) avec et sans IA.', link: 'https://www.sipotek.net' },
  { id: 13, company: 'QEIS', title: 'Advanced Systems Implementation', category: 'Diagnostics Connectés', description: 'Déploiement de systèmes de contrôle qualité avancés et de bancs de tests sur mesure pour garantir l\'excellence de la production.', link: 'https://qeis.ro/services/advanced-systems-implementation/' },
  { id: 14, company: 'QEIS', title: 'Stylo de Détection de Fissures (ECT)', category: 'Diagnostics Sans IA', description: 'Détecteur portable (Sonde Crayon) fonctionnant par Courants de Foucault (Eddy Current). Induit un champ magnétique pour détecter les micro-fissures (perturbation d\'impédance) hors chaîne de production.', link: 'https://qeis.ro/services/testing-services/' },
  
  // NOUVELLES ENTREES: Inspection, Firewall, CS1/CS2, OTS, Task Force
  { id: 15, company: 'Landing AI', title: 'LandingLens (Automated Inspection)', category: 'IA & Vision Industrielle', description: 'Plateforme de vision par ordinateur (Deep Learning) pour l\'inspection visuelle automatisée des défauts de fabrication avec un apprentissage ultra-rapide.', link: 'https://landing.ai' },
  { id: 16, company: 'Cognex / Sipotek', title: 'Automated Quality Firewall (Mur Qualité IA)', category: 'Automatisation Intralogistique', description: 'Mur Qualité automatisé utilisant des scanners 3D multi-angles et un tri en ligne par IA pour garantir zéro défaut avant expédition.', link: 'https://www.cognex.com' },
  { id: 17, company: 'Tulip Interfaces', title: 'Digital Connected Worker (CS1 / CS2)', category: 'Traçabilité & Gouvernance', description: 'Application digitale pour le confinement CS1/CS2 imposant des workflows stricts avec capture photographique IA pour 100% des pièces triées.', link: 'https://tulip.co' },
  { id: 18, company: 'Symbio Robotics', title: 'Cellules Robotiques IA (OTS)', category: 'IA & Vision Industrielle', description: 'Robots industriels pilotés par l\'IA pour des Opérations Techniques Spécifiques (OTS) comme l\'ébavurage automatisé, l\'assemblage de précision ou le réusinage dynamique.', link: 'https://symbiorobotics.com' },
  { id: 19, company: 'Oculavis', title: 'AR Remote Expert (Task Force Quality)', category: 'Diagnostics Connectés', description: 'Système d\'assistance par réalité augmentée (AR) permettant à une Task Force Qualité d\'intervenir instantanément à distance pour guider les opérateurs locaux lors de crises aiguës.', link: 'https://oculavis.de/en/' },
  { id: 20, company: 'Instrumental', title: 'Anomaly Detection & Proactive Intervention', category: 'Gouvernance & Assurance IA', description: 'Système ingérant les données d\'inspection visuelle pour identifier les dérives de qualité en amont et déclencher une Task Force avant que les défauts n\'atteignent le client.', link: 'https://instrumental.com' }
];

const tradeShows = [
  { id: 1, name: 'Control 2025', location: 'Stuttgart, Allemagne', date: '6-9 Mai 2025', focus: 'Assurance Qualité & Vision IA', status: 'upcoming' },
  { id: 2, name: 'VISION 2026', location: 'Stuttgart, Allemagne', date: '6-8 Octobre 2026', focus: 'Machine Vision & Deep Learning', status: 'long-term' },
  { id: 3, name: 'DIR 2025', location: 'Paris, France', date: '1-3 Juillet 2025', focus: 'Radiologie Indus. & Tomographie IA', status: 'upcoming' },
  { id: 4, name: 'ICMV 2025', location: 'Paris, France', date: '19-22 Octobre 2025', focus: 'Machine Vision', status: 'planning' },
  { id: 5, name: 'EMVF 2025', location: 'Fürth, Allemagne', date: '16-17 Octobre 2025', focus: 'European Machine Vision Forum', status: 'planning' },
  { id: 6, name: 'LogiMAT 2025', location: 'Stuttgart, Allemagne', date: 'Mars 2025', focus: 'Intralogistique & Automatisation', status: 'upcoming' },
];

const companiesData = [
  { id: 1, name: 'TRIGO Group / Scortex', region: 'France / Global', hq: 'Paris, France', tech: 'IA Vision (Spark), Tri Qualité', link: 'https://trigo-group.com' },
  { id: 2, name: 'Bureau Veritas', region: 'France / Global', hq: 'Neuilly-sur-Seine, France', tech: 'AGS 3D, Jumeaux Numériques', link: 'https://bureauveritas.com' },
  { id: 3, name: 'Applus+', region: 'Espagne / Global', hq: 'Barcelone, Espagne', tech: 'NDT Assisté par IA, Drones', link: 'https://applus.com' },
  { id: 4, name: 'Waygate Technologies', region: 'Allemagne / USA', hq: 'Hürth, Allemagne', tech: 'Borescope Intelligent, ADR', link: 'https://bakerhughes.com/waygate-technologies' },
  { id: 5, name: 'Energy Robotics', region: 'Allemagne', hq: 'Darmstadt, Allemagne', tech: 'Logiciels IA pour Robots Autonomes', link: 'https://energy-robotics.com' },
  { id: 6, name: 'DEKRA', region: 'Allemagne / Global', hq: 'Stuttgart, Allemagne', tech: 'Diagnostic EV, Inspection Éoliennes', link: 'https://dekra.com' },
  { id: 7, name: 'SGS', region: 'Suisse / Global', hq: 'Genève, Suisse', tech: 'QiiQ Remote, CertX', link: 'https://sgs.com' },
  { id: 8, name: 'TÜV SÜD', region: 'Allemagne / Global', hq: 'Munich, Allemagne', tech: 'AI Procured, Certification IA', link: 'https://tuvsud.com' },
  { id: 9, name: 'Intertek', region: 'Royaume-Uni', hq: 'Londres, UK', tech: 'Intertek AI² (Assurance IA)', link: 'https://intertek.com' },
  { id: 10, name: 'Sipotek Technology', region: 'Chine', hq: 'Shenzhen, Chine', tech: 'Bancs de test AOI In-Line', link: 'https://sipotek.net' },
  { id: 11, name: 'Hikrobot', region: 'Chine', hq: 'Hangzhou, Chine', tech: 'Machine Vision & Robots', link: 'https://hikrobotics.com' },
  { id: 12, name: 'QEIS', region: 'Roumanie', hq: 'Pitesti, Roumanie', tech: 'Sonde Courants Foucault, Bancs Custom', link: 'https://qeis.ro' },
  { id: 13, name: 'Cognex', region: 'USA / Global', hq: 'Natick, MA, USA', tech: 'Vision Industrielle 2D/3D', link: 'https://cognex.com' },
  { id: 14, name: 'Keyence', region: 'Japon / Global', hq: 'Osaka, Japon', tech: 'Capteurs Qualité, Profilomètres 3D', link: 'https://keyence.com' },
  { id: 15, name: 'Continental', region: 'Allemagne', hq: 'Hanovre, Allemagne', tech: 'Capteurs Intégrés, MicroLED', link: 'https://continental.com' },
  { id: 16, name: 'Valeo', region: 'France', hq: 'Paris, France', tech: 'Perception LiDAR, Scanners', link: 'https://valeo.com' },
];

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#ef4444', '#f59e0b'];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-background flex text-gray-100 font-sans">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 bg-surface/50 p-4 flex flex-col backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-10 px-2 mt-4">
          <div className="w-8 h-8 rounded bg-primary/20 border border-primary flex items-center justify-center text-primary">
            <Target size={20} />
          </div>
          <h1 className="text-xl font-bold tracking-wider">DLOG OSINT</h1>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem icon={<Activity size={20} />} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={<Globe2 size={20} />} label="Radar Techno" active={activeTab === 'radar'} onClick={() => setActiveTab('radar')} />
          <NavItem icon={<Database size={20} />} label="Entreprises" active={activeTab === 'companies'} onClick={() => setActiveTab('companies')} />
          <NavItem icon={<CalendarDays size={20} />} label="Salons & Événements" active={activeTab === 'events'} onClick={() => setActiveTab('events')} />
          <NavItem icon={<Settings size={20} />} label="Configuration" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>

        <div className="mt-auto p-4 glass-panel rounded-lg bg-primary/5 border-primary/20">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
            <span className="text-gray-400">Scraping Engine: <span className="text-secondary font-medium">Online</span></span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-16 border-b border-white/10 bg-surface/30 backdrop-blur-md flex items-center justify-between px-8">
          <div className="flex items-center bg-black/40 rounded-lg px-3 py-1.5 border border-white/5 w-96">
            <Search size={16} className="text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Rechercher une entreprise, une techno..." 
              className="bg-transparent border-none outline-none text-sm w-full text-gray-300 placeholder-gray-600"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-white/5 rounded-full transition-colors">
              <Bell size={20} className="text-gray-400" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-danger"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent border border-white/20"></div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Header */}
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Veille Technologique DLOG & Concurrentielle</h2>
                  <p className="text-gray-400 text-sm">Analyse sectorielle: Automobile, Contrôle Qualité, Logistique Intelligente</p>
                </div>
                <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                  <Zap size={16} /> Lancer un Scan Profond
                </button>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="glass-panel p-5 relative overflow-hidden group hover:border-primary/30 transition-colors cursor-pointer" onClick={() => window.open('/analysis_results.md', '_blank')}>
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm z-20">
                    <span className="text-primary font-medium text-sm flex items-center gap-2"><Globe2 size={16}/> Voir le Rapport</span>
                  </div>
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <h4 className="text-gray-400 text-sm font-medium">Acteurs Identifiés</h4>
                    <div className="p-2 bg-surface rounded-lg border border-white/5"><Database size={20} className="text-primary" /></div>
                  </div>
                  <div className="relative z-10">
                    <div className="text-3xl font-bold text-white mb-1">14</div>
                    <div className="text-xs text-gray-500">TRIGO, SGS, DEKRA...</div>
                  </div>
                </div>
                <KpiCard title="Percées Vision IA" value="4" icon={<Cpu size={20} className="text-accent" />} trend="Scortex, AGS 3D, ADR..." />
                <KpiCard title="Nouvelles Normes IA" value="3" icon={<Shield size={20} className="text-danger" />} trend="Intertek AI², CertX..." />
                <KpiCard title="Salons Imminents" value="6" icon={<CalendarDays size={20} className="text-secondary" />} trend="Control 2025, DIR 2025" />
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="glass-panel p-6 lg:col-span-2">
                  <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <BarChart3 size={18} className="text-primary" /> Volume de Détections (Semaine)
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={scanHistory}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <XAxis dataKey="date" stroke="#666" tick={{fill: '#888'}} />
                        <YAxis stroke="#666" tick={{fill: '#888'}} />
                        <Tooltip contentStyle={{backgroundColor: '#12121a', borderColor: '#333'}} />
                        <Line type="monotone" dataKey="scans" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, fill: '#0a0a0f', strokeWidth: 2}} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="glass-panel p-6">
                  <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <Target size={18} className="text-accent" /> Taxonomie Technologique
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={innovationCategories}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {innovationCategories.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{backgroundColor: '#12121a', borderColor: '#333'}} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4 justify-center">
                    {innovationCategories.map((cat, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-gray-400">
                        <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[i]}}></div>
                        {cat.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Table Row */}
              <div className="glass-panel p-6">
                <h3 className="text-lg font-semibold mb-6">Dernières Innovations Stratégiques (Benchmark DLOG)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="text-gray-500 border-b border-white/10">
                        <th className="pb-3 font-medium">Entreprise</th>
                        <th className="pb-3 font-medium">Innovation (Sujet)</th>
                        <th className="pb-3 font-medium">Catégorie DLOG</th>
                        <th className="pb-3 font-medium">Date de Détection</th>
                        <th className="pb-3 font-medium">Score Disruption</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentInnovations.map((item) => (
                        <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                          <td className="py-4 font-medium text-white">{item.company}</td>
                          <td className="py-4 text-gray-300 group-hover:text-primary transition-colors">{item.title}</td>
                          <td className="py-4">
                            <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                              {item.category}
                            </span>
                          </td>
                          <td className="py-4 text-gray-400">{item.date}</td>
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-primary to-accent" 
                                  style={{width: `${item.score}%`}}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-400">{item.score}/100</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Calendrier des Salons & Événements</h2>
                  <p className="text-gray-400 text-sm">Roadmap 2025-2026 pour la veille technologique sur site</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tradeShows.map(show => (
                  <div key={show.id} className="glass-panel p-6 hover:border-primary/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <CalendarDays size={24} />
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        show.status === 'upcoming' ? 'bg-secondary/20 text-secondary' : 
                        show.status === 'planning' ? 'bg-accent/20 text-accent' : 
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {show.status.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{show.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{show.location} • {show.date}</p>
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-sm text-gray-300"><span className="text-gray-500">Focus:</span> {show.focus}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'radar' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Radar Technologique DLOG</h2>
                  <p className="text-gray-400 text-sm">Innovations majeures identifiées dans les systèmes de vision et contrôle qualité</p>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {radarInnovations.map((item) => (
                  <div key={item.id} className="glass-panel p-6 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors pointer-events-none"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <div>
                        <span className="px-2.5 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-medium mb-3 inline-block shadow-[0_0_10px_rgba(59,130,246,0.1)]">
                          {item.category}
                        </span>
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                        <p className="text-gray-400 text-sm font-medium">{item.company}</p>
                      </div>
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 hover:bg-primary/20 rounded-lg text-gray-400 hover:text-primary transition-all duration-300 cursor-pointer border border-white/5 hover:border-primary/30 hover:scale-110">
                        <ExternalLink size={20} />
                      </a>
                    </div>
                    <div className="pt-4 border-t border-white/10 mt-4 relative z-10">
                      <p className="text-sm text-gray-300 leading-relaxed group-hover:text-white transition-colors">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'companies' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Annuaire des Entreprises Tech</h2>
                  <p className="text-gray-400 text-sm">Fournisseurs et leaders en vision, contrôle qualité et IA (EU, USA, Asie)</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {companiesData.map((company) => (
                  <div key={company.id} className="glass-panel p-6 hover:border-primary/50 transition-all duration-300 group flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center font-bold text-lg text-white border border-white/5 shadow-inner">
                        {company.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white leading-tight group-hover:text-primary transition-colors">{company.name}</h3>
                        <span className="text-xs text-secondary font-medium bg-secondary/10 px-2 py-0.5 rounded-full inline-block mt-1">
                          {company.region}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-6 flex-1">
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin size={16} className="text-gray-500 mt-0.5 shrink-0" />
                        <span className="text-gray-300">{company.hq}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <Cpu size={16} className="text-gray-500 mt-0.5 shrink-0" />
                        <span className="text-gray-300">{company.tech}</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/5">
                      <a 
                        href={company.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center justify-center gap-2 w-full py-2 bg-white/5 hover:bg-primary/20 rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-colors border border-white/5 hover:border-primary/30"
                      >
                        <LinkIcon size={14} />
                        Visiter le Site Web
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab !== 'dashboard' && activeTab !== 'events' && activeTab !== 'radar' && activeTab !== 'companies' && (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Target size={48} className="mx-auto mb-4 opacity-20" />
                <p>Module "{activeTab}" en cours de construction...</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
        active 
          ? 'bg-primary/10 text-primary font-medium border border-primary/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
          : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function KpiCard({ title, value, icon, trend }) {
  return (
    <div className="glass-panel p-5 relative overflow-hidden group hover:border-primary/30 transition-colors">
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
      <div className="flex justify-between items-start mb-4 relative z-10">
        <h4 className="text-gray-400 text-sm font-medium">{title}</h4>
        <div className="p-2 bg-surface rounded-lg border border-white/5">
          {icon}
        </div>
      </div>
      <div className="relative z-10">
        <div className="text-3xl font-bold text-white mb-1">{value}</div>
        <div className="text-xs text-gray-500">{trend}</div>
      </div>
    </div>
  );
}
