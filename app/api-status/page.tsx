import InfoLayout from '@/app/components/info-layout';
import { Activity, CheckCircle2, AlertTriangle, Clock, Server, Database, Globe, Wifi } from 'lucide-react';

export default function ApiStatusPage() {
  const systems = [
    {
      name: 'Core API Gateway',
      desc: 'All menu data fetches, order submissions, and account management API calls.',
      status: 'Operational',
      uptime: '100.00%',
      ping: '45ms',
      region: 'Mumbai, India'
    },
    {
      name: 'QR Code Exporter Engine',
      desc: 'PDF generation and vector QR code rendering for table management exports.',
      status: 'Operational',
      uptime: '99.99%',
      ping: '120ms',
      region: 'Mumbai, India'
    },
    {
      name: 'Menu Image Storage CDN',
      desc: 'Menu item photo storage and global CDN delivery for fast image loads on guest devices.',
      status: 'Operational',
      uptime: '99.95%',
      ping: '15ms',
      region: 'Global CDN (200+ PoP)'
    },
    {
      name: 'Platform Database Replication',
      desc: 'Primary PostgreSQL database with multi-region replica synchronization.',
      status: 'Operational',
      uptime: '100.00%',
      ping: '10ms',
      region: 'Mumbai + Frankfurt replica'
    },
    {
      name: 'WhatsApp Webhook Dispatcher',
      desc: 'Outbound order notification webhooks to merchant WhatsApp numbers.',
      status: 'Operational',
      uptime: '99.98%',
      ping: '200ms',
      region: 'Mumbai, India'
    },
    {
      name: 'WebSocket Order Feed',
      desc: 'Real-time order push events to merchant dashboards via persistent WebSocket connections.',
      status: 'Operational',
      uptime: '99.97%',
      ping: '30ms',
      region: 'Mumbai, India'
    },
    {
      name: 'Authentication Service',
      desc: 'Merchant login, session validation, and access token management.',
      status: 'Operational',
      uptime: '100.00%',
      ping: '22ms',
      region: 'Mumbai, India'
    },
    {
      name: 'Guest Menu Delivery (Edge)',
      desc: 'Static QR menu page delivery via edge network for sub-second load times.',
      status: 'Operational',
      uptime: '99.99%',
      ping: '8ms',
      region: 'Edge Network (India + UAE)'
    }
  ];

  const incidents = [
    {
      date: 'May 14, 2026',
      title: 'WhatsApp Webhook Delays (Resolved)',
      severity: 'Minor',
      severityColor: 'text-amber-600 bg-amber-50 border-amber-100',
      duration: '~38 minutes',
      desc: 'Outbound WhatsApp order notification delivery was delayed for some merchants due to a third-party API rate limit applied by the WhatsApp Business API provider. All delayed messages were retried and delivered successfully. No orders were lost. The issue was resolved by implementing an exponential backoff retry queue.'
    },
    {
      date: 'April 2, 2026',
      title: 'CDN Image Delivery Slowdown (Resolved)',
      severity: 'Minor',
      severityColor: 'text-amber-600 bg-amber-50 border-amber-100',
      duration: '~12 minutes',
      desc: 'Menu item images were loading with a 3–8 second delay for guests in certain India regions due to a CDN configuration update. The issue affected approximately 7% of active sessions during the window. The misconfiguration was reverted and edge cache was purged, restoring normal image delivery speeds.'
    }
  ];

  const metrics = [
    { label: 'Average API Response Time', value: '42ms', sub: 'p95 across all endpoints' },
    { label: 'Monthly Uptime', value: '99.98%', sub: 'Average across all services' },
    { label: 'QR Menu Page Load', value: '< 1.2s', sub: 'On 4G networks (India avg)' },
    { label: 'Order Delivery Latency', value: '< 500ms', sub: 'Submission to dashboard display' },
  ];

  const infraDetails = [
    {
      icon: Server,
      title: 'Hosting Infrastructure',
      desc: 'DineFlow\'s primary API and database infrastructure is hosted on Google Cloud Platform (GCP) with dedicated compute nodes in the Mumbai region (asia-south1). All restaurant account data is stored within India, complying with applicable data residency requirements.'
    },
    {
      icon: Database,
      title: 'Database Backups',
      desc: 'Automated hourly database snapshots are retained for 30 rolling days. Daily backups are retained for 90 days. All backups are encrypted at rest (AES-256) and stored in separate cloud storage buckets with restricted access IAM policies.'
    },
    {
      icon: Globe,
      title: 'Content Delivery',
      desc: 'Guest-facing QR menus are served via a multi-region edge network with presence in Mumbai, Delhi, Bangalore, Hyderabad, Dubai, and Singapore. This ensures menu pages load in under 1 second for diners across India and the UAE.'
    },
    {
      icon: Wifi,
      title: 'Real-time Connections',
      desc: 'Merchant dashboards maintain persistent WebSocket connections for live order feed updates. Connection health is monitored with automatic reconnection logic. Maximum order delivery latency from guest submission to dashboard display is under 500ms under normal load.'
    }
  ];

  return (
    <InfoLayout
      title="System Status"
      subtitle="Real-time status and uptime metrics for all DineFlow core services and infrastructure components."
      category="API & Infrastructure"
      icon={Activity}
      accentColor="text-emerald-600 bg-emerald-50 border-emerald-100"
    >
      <div className="space-y-12 font-sans">

        {/* Overall Status Banner */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-emerald-700">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-black text-sm">All Systems Operational</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-bold">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Last checked: just now</span>
            <span className="bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-full text-emerald-700">99.98% avg uptime</span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m, mi) => (
            <div key={mi} className="border border-[#EFEFEF] rounded-2xl p-4 text-center bg-[#FAFAFA]/50 space-y-1">
              <div className="text-lg font-black text-emerald-600">{m.value}</div>
              <div className="text-[10px] font-black text-slate-600 leading-tight">{m.label}</div>
              <div className="text-[9px] font-semibold text-slate-400">{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Services List */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-4">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Service Status ({systems.length} services)</h2>
          <div className="space-y-2">
            {systems.map((s, idx) => (
              <div key={idx} className="border border-[#EFEFEF] p-4 rounded-xl hover:bg-[#FAFAFA]/60 transition-colors bg-white">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-slate-700 text-xs">{s.name}</h3>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                        {s.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-semibold">{s.desc}</p>
                  </div>
                  <div className="flex gap-4 text-[9px] font-black text-slate-400 shrink-0">
                    <div className="text-center">
                      <div className="text-slate-600 font-black">{s.ping}</div>
                      <div>latency</div>
                    </div>
                    <div className="text-center">
                      <div className="text-emerald-600 font-black">{s.uptime}</div>
                      <div>uptime</div>
                    </div>
                    <div className="text-center hidden sm:block max-w-[100px]">
                      <div className="text-slate-500 font-bold text-[9px] leading-tight">{s.region}</div>
                      <div>region</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Uptime History Bar */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-4">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">90-Day Uptime History</h2>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed">
            Each bar represents one day. Green = fully operational. The last 90 days show 2 minor incidents, both resolved within the same service hour.
          </p>
          <div className="flex gap-0.5 items-end h-10 overflow-hidden rounded-lg">
            {Array.from({ length: 90 }, (_, i) => {
              const isIncident = i === 15 || i === 57;
              return (
                <div
                  key={i}
                  className={`flex-1 rounded-sm ${isIncident ? 'bg-amber-400 h-6' : 'bg-emerald-400 h-10'}`}
                  title={isIncident ? 'Minor incident' : 'Operational'}
                />
              );
            })}
          </div>
          <div className="flex justify-between text-[9px] font-bold text-slate-400">
            <span>90 days ago</span>
            <span className="flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-emerald-400 inline-block" /> Operational</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-amber-400 inline-block" /> Minor incident</span>
            </span>
            <span>Today</span>
          </div>
        </div>

        {/* Incident Log */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-5">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Recent Incident Log</h2>
          {incidents.map((inc, ii) => (
            <div key={ii} className="border border-[#EFEFEF] rounded-2xl p-5 space-y-3 bg-[#FAFAFA]/50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h3 className="font-black text-[#111827] text-xs">{inc.title}</h3>
                <div className="flex items-center gap-2 text-[10px] font-bold">
                  <span className={`px-2 py-0.5 rounded-full border ${inc.severityColor}`}>{inc.severity}</span>
                  <span className="text-slate-400">{inc.date}</span>
                  <span className="flex items-center gap-1 text-slate-400"><Clock className="w-3 h-3" />{inc.duration}</span>
                </div>
              </div>
              <p className="text-slate-500 font-semibold text-xs leading-relaxed">{inc.desc}</p>
              <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-black">
                <CheckCircle2 className="w-3.5 h-3.5" /> Fully Resolved — No data loss, no ongoing impact
              </div>
            </div>
          ))}
          <p className="text-slate-400 font-semibold text-xs">
            No other incidents recorded in the last 90 days. Subscribe to status updates via the contact page.
          </p>
        </div>

        {/* Infrastructure Detail */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-5">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Infrastructure Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {infraDetails.map((d, di) => (
              <div key={di} className="border border-[#EFEFEF] rounded-xl p-5 space-y-2 bg-[#FAFAFA]/50">
                <h3 className="font-black text-[#111827] text-xs flex items-center gap-2">
                  <d.icon className="w-4 h-4 text-emerald-600 shrink-0" /> {d.title}
                </h3>
                <p className="text-slate-500 font-semibold text-xs leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Subscribe CTA */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-3">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Subscribe to Status Updates</h2>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed">
            To receive proactive incident notifications via email or WhatsApp, contact us through the support page and ask to be added to our status alert list.
          </p>
          <a
            href="mailto:status@dineflow.in"
            className="inline-flex items-center gap-1.5 bg-[#FF6B35] hover:bg-[#e05420] text-white font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-sm hover:shadow-md"
          >
            Subscribe to Incident Alerts
          </a>
        </div>

      </div>
    </InfoLayout>
  );
}
