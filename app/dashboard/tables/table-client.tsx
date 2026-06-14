'use client';

import { useState, useTransition, useEffect } from 'react';
import {
  Plus,
  Trash2,
  QrCode as QrIcon,
  Download,
  Printer,
  Loader2,
  Layers,
  X,
  ExternalLink
} from 'lucide-react';
import QRCode from 'qrcode';
import { createTable, bulkCreateTables, deleteTable } from '@/app/actions/table';

interface QrCodeRecord {
  id: string;
  code: string;
  url: string;
}

interface Table {
  id: string;
  name: string;
  qrCode: QrCodeRecord | null;
  createdAt: Date;
}

interface Restaurant {
  id: string;
  name: string;
  slug: string;
  themeColor: string;
  logoUrl: string | null;
}

interface Props {
  initialTables: Table[];
  restaurant: Restaurant;
}

export default function TableManagerClient({
  initialTables,
  restaurant,
}: Props) {
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Forms
  const [singleName, setSingleName] = useState('');
  const [bulkPrefix, setBulkPrefix] = useState('Table');
  const [bulkStart, setBulkStart] = useState(1);
  const [bulkCount, setBulkCount] = useState(5);

  // Active View QR Modal State
  const [viewingTable, setViewingTable] = useState<Table | null>(null);
  const [modalQrUrl, setModalQrUrl] = useState<string>('');

  // Render QR inside Canvas for downloading
  const generateQrBase64 = async (url: string): Promise<string> => {
    try {
      const absoluteUrl = `${window.location.origin}${url}`;
      return await QRCode.toDataURL(absoluteUrl, {
        width: 600,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      });
    } catch (err) {
      console.error(err);
      return '';
    }
  };

  // Triggers print view in a new popup window
  const handlePrintCard = async (table: Table) => {
    if (!table.qrCode) return;
    const absoluteUrl = `${window.location.origin}${table.qrCode.url}`;
    
    try {
      const qrDataUrl = await QRCode.toDataURL(absoluteUrl, {
        width: 400,
        margin: 1,
      });

      const printWindow = window.open('', '_blank');
      if (!printWindow) return;

      printWindow.document.write(`
        <html>
          <head>
            <title>Print QR - ${table.name}</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                margin: 0;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                background-color: #fafafa;
              }
              .card {
                background: white;
                border-radius: 12px;
                padding: 40px;
                text-align: center;
                max-width: 380px;
                border: 1px solid #eaeaea;
              }
              .logo {
                max-height: 48px;
                margin-bottom: 20px;
              }
              .rest-name {
                font-size: 20px;
                font-weight: 800;
                margin: 0 0 8px 0;
                color: #111827;
              }
              .table-name {
                font-size: 14px;
                font-weight: 700;
                color: #f97316;
                background: #f9731610;
                padding: 4px 12px;
                border-radius: 6px;
                display: inline-block;
                margin-bottom: 24px;
              }
              .qr-img {
                width: 240px;
                height: 240px;
                display: block;
                margin: 0 auto 24px auto;
              }
              .instructions {
                font-size: 12px;
                font-weight: 600;
                color: #6b7280;
                margin: 0;
                line-height: 1.6;
              }
              .scan-prompt {
                font-size: 10px;
                font-weight: 700;
                color: #9ca3af;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                margin-top: 20px;
              }
              @media print {
                body {
                  background: white;
                }
                .card {
                  border: 1px solid #eaeaea;
                  page-break-inside: avoid;
                }
              }
            </style>
          </head>
          <body>
            <div class="card">
              ${
                restaurant.logoUrl
                  ? `<img class="logo" src="${restaurant.logoUrl}" alt="Logo" />`
                  : `<h2 class="rest-name">${restaurant.name}</h2>`
              }
              <div class="table-name">${table.name}</div>
              <img class="qr-img" src="${qrDataUrl}" alt="QR Code" />
              <p class="instructions">Scan this QR Code with your phone camera to view our live digital menu & place your request.</p>
              <p class="scan-prompt">Powered by MenuQuick</p>
            </div>
            <script>
              window.onload = function() {
                window.print();
                setTimeout(function() { window.close(); }, 500);
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownloadPng = async (table: Table) => {
    if (!table.qrCode) return;
    const dataUrl = await generateQrBase64(table.qrCode.url);
    if (!dataUrl) return;

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${restaurant.slug}-${table.name.replace(/\s+/g, '-')}-qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate QR for modal display
  useEffect(() => {
    if (viewingTable && viewingTable.qrCode) {
      const absoluteUrl = `${window.location.origin}${viewingTable.qrCode.url}`;
      QRCode.toDataURL(absoluteUrl, { width: 300, margin: 1 })
        .then(setModalQrUrl)
        .catch(console.error);
    }
  }, [viewingTable]);

  // SINGLE TABLE CREATE
  const handleCreateSingle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!singleName.trim()) return;

    setError(null);
    startTransition(async () => {
      const res = await createTable(singleName, restaurant.id);
      if (res.success && res.table) {
        setTables(prev => [...prev, res.table as Table]);
        setSingleName('');
      } else {
        setError(res.error || 'Failed to create table.');
      }
    });
  };

  // BULK TABLES CREATE
  const handleCreateBulk = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const res = await bulkCreateTables(bulkPrefix, bulkStart, bulkCount, restaurant.id);
      if (res.success) {
        // Refetch tables directly by reloading client state
        window.location.reload();
      } else {
        setError(res.error || 'Failed to bulk-create tables.');
      }
    });
  };

  // DELETE TABLE
  const handleDeleteTable = async (tableId: string) => {
    if (!confirm('Are you sure you want to delete this table and its associated QR code?')) return;
    setError(null);

    startTransition(async () => {
      const res = await deleteTable(tableId, restaurant.id);
      if (res.success) {
        setTables(prev => prev.filter(t => t.id !== tableId));
      } else {
        setError(res.error || 'Failed to delete table.');
      }
    });
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Forms Sidebar */}
      <div className="space-y-6">
        {/* Single Table Creation */}
        <div className="bg-white border border-[#EAEAEA] rounded-xl p-6">
          <h2 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#F97316]" /> Create Single Table
          </h2>
          <form onSubmit={handleCreateSingle} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Table Identifier
              </label>
              <input
                type="text"
                required
                value={singleName}
                onChange={e => setSingleName(e.target.value)}
                placeholder="e.g. Table 5, Patio 2, Bar A"
                className="w-full bg-white border border-[#EAEAEA] rounded-lg px-3.5 py-2.5 text-xs text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#F97316] focus:border-[#F97316]"
              />
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#F97316] hover:bg-[#ea580c] text-white font-bold py-2.5 px-4 rounded-lg text-xs transition-colors flex items-center justify-center gap-2 shadow-2xs"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Table'}
            </button>
          </form>
        </div>

        {/* Bulk Tables Creation */}
        <div className="bg-white border border-[#EAEAEA] rounded-xl p-6">
          <h2 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#F97316]" /> Bulk Create Tables
          </h2>
          <form onSubmit={handleCreateBulk} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Table Name Prefix
              </label>
              <input
                type="text"
                required
                value={bulkPrefix}
                onChange={e => setBulkPrefix(e.target.value)}
                placeholder="e.g. Table, T-"
                className="w-full bg-white border border-[#EAEAEA] rounded-lg px-3.5 py-2.5 text-xs text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#F97316] focus:border-[#F97316]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Start Number
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={bulkStart}
                  onChange={e => setBulkStart(parseInt(e.target.value) || 1)}
                  className="w-full bg-white border border-[#EAEAEA] rounded-lg px-3 py-2.5 text-xs text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Count (Max 50)
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  max={50}
                  value={bulkCount}
                  onChange={e => setBulkCount(parseInt(e.target.value) || 1)}
                  className="w-full bg-white border border-[#EAEAEA] rounded-lg px-3 py-2.5 text-xs text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#F97316] hover:bg-[#ea580c] text-white font-bold py-2.5 px-4 rounded-lg text-xs transition-colors flex items-center justify-center gap-2 shadow-2xs"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Bulk Generate'}
            </button>
          </form>
        </div>
      </div>

      {/* Tables List */}
      <div className="lg:col-span-2 bg-white border border-[#EAEAEA] rounded-xl p-6">
        <h2 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-6">Dining Tables & Active QRs ({tables.length})</h2>

        {error && (
          <div className="mb-4 bg-rose-50 border border-rose-100 text-rose-600 text-xs p-3 rounded-lg font-medium">
            {error}
          </div>
        )}

        <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
          {tables.length === 0 ? (
            <div className="text-center py-16 text-slate-400 text-xs font-medium border border-dashed border-[#EAEAEA] rounded-lg flex flex-col items-center justify-center gap-2">
              <QrIcon className="w-6 h-6 text-slate-350" />
              No tables or QR codes generated yet.
            </div>
          ) : (
            tables.map(table => (
              <div
                key={table.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-[#EAEAEA] p-4 rounded-lg hover:border-slate-350 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs bg-[#FAFAFA] text-[#F97316] border border-[#EAEAEA]">
                    T
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-[#111827]">{table.name}</h3>
                    {table.qrCode && (
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] text-slate-500 font-mono select-all truncate max-w-[150px] sm:max-w-xs font-medium">
                          {table.qrCode.url}
                        </span>
                        <a
                          href={table.qrCode.url}
                          target="_blank"
                          className="text-slate-400 hover:text-[#111827]"
                          title="Open live URL"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0 border-t border-[#EAEAEA] pt-3 sm:border-none sm:pt-0">
                  {table.qrCode && (
                    <>
                      <button
                        onClick={() => setViewingTable(table)}
                        className="inline-flex items-center gap-1 bg-white border border-[#EAEAEA] hover:border-slate-350 text-slate-600 hover:text-[#111827] px-2.5 py-1.5 rounded-lg text-[10px] font-bold"
                      >
                        <QrIcon className="w-3.5 h-3.5" /> View
                      </button>
                      <button
                        onClick={() => handleDownloadPng(table)}
                        className="p-1.5 rounded-lg bg-white border border-[#EAEAEA] hover:border-slate-350 text-slate-500 hover:text-emerald-600"
                        title="Download PNG"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handlePrintCard(table)}
                        className="p-1.5 rounded-lg bg-white border border-[#EAEAEA] hover:border-slate-350 text-slate-500 hover:text-[#F97316]"
                        title="Print QR Sign Card"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <button
                    disabled={isPending}
                    onClick={() => handleDeleteTable(table.id)}
                    className="p-1.5 rounded-lg bg-white border border-[#EAEAEA] hover:border-rose-200 text-slate-500 hover:text-rose-600"
                    title="Delete Table"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* VIEW QR DIALOG MODAL */}
      {viewingTable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-xs">
          <div className="bg-white border border-[#EAEAEA] w-full max-w-sm rounded-xl p-6 shadow-md relative text-center">
            <button
              onClick={() => {
                setViewingTable(null);
                setModalQrUrl('');
              }}
              className="absolute top-4 right-4 p-1 rounded-lg bg-white text-slate-400 hover:text-[#111827] border border-[#EAEAEA]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-1">Table QR Preview</h3>
            <span className="inline-block px-3 py-1 rounded-md text-[10px] font-bold bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/20 mb-6">
              {viewingTable.name}
            </span>

            <div className="bg-[#FAFAFA] p-6 rounded-lg inline-block border border-[#EAEAEA] mx-auto">
              {modalQrUrl ? (
                <img src={modalQrUrl} alt="QR Code" className="w-48 h-48 block" />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center text-slate-400">
                  <Loader2 className="w-5 h-5 animate-spin text-[#F97316]" />
                </div>
              )}
            </div>

            <p className="text-[10px] text-slate-500 mt-6 leading-relaxed font-medium">
              Scan from mobile to view: <br />
              <span className="font-mono text-[#F97316] break-all select-all font-semibold mt-1 inline-block">
                {viewingTable.qrCode?.url}
              </span>
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <button
                onClick={() => handleDownloadPng(viewingTable)}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FAFAFA] border border-[#EAEAEA] text-[#111827] font-bold py-2.5 rounded-lg text-xs"
              >
                <Download className="w-4 h-4" /> Download PNG
              </button>
              <button
                onClick={() => {
                  handlePrintCard(viewingTable);
                  setViewingTable(null);
                }}
                className="inline-flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#ea580c] text-white font-bold py-2.5 rounded-lg text-xs shadow-2xs"
              >
                <Printer className="w-4 h-4" /> Print Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
