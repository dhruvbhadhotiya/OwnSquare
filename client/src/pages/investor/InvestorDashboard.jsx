import React from 'react';
import { AllocationDonut } from '../../components/charts/AllocationDonut.jsx';
import { PropertyCard } from '../../components/property/PropertyCard.jsx';
import { KpiCard } from '../../components/ui/Card.jsx';
import { formatDateIN, formatINR } from '../../utils/formatINR.js';
import { PerformanceChart } from './InvestorScreens.jsx';

export function InvestorDashboard({ walletData, properties = [], transactions = [], onNavigate, onSelectPropertyForInvest, onSelectPropertyDetail, onTopUpClick }) {
  const invested = 30000000;
  const value = 33600000;
  const wallet = walletData?.availableBalance ?? 20500000;
  const allocation = [
    { propertyId: 'noida', title: '2BHK, Sector 150, Noida', amount: 20000000 },
    { propertyId: 'whitefield', title: 'Commercial Retail Hub', amount: 10000000 }
  ];
  const activity = transactions.length ? transactions.slice(0, 4) : [
    { _id: 'demo-invest', type: 'INVESTMENT', direction: 'DEBIT', amount: 10000000, refId: 'Commercial Retail Hub', createdAt: '2026-10-01T07:15:00Z' },
    { _id: 'demo-payout', type: 'PAYOUT', direction: 'CREDIT', amount: 500000, refId: 'Sector 150 rental', createdAt: '2026-10-01T07:30:00Z' }
  ];
  const totalPayouts = transactions.length
    ? transactions.filter((item) => item.type === 'PAYOUT').reduce((total, item) => total + item.amount, 0)
    : 500000;
  return <div className="investor-dashboard space-y-7 animate-fade-in-up">
    <header className="investor-dashboard-hero">
      <div className="investor-dashboard-greeting">
        <p className="investor-dashboard-eyebrow">Investor overview</p>
        <h1>Good morning, Aman</h1>
        <p className="investor-dashboard-subtitle">Your real estate portfolio is building steadily.</p>
        <button onClick={() => onNavigate?.('marketplace')} className="investor-dashboard-hero-action">Explore properties <span aria-hidden="true">→</span></button>
      </div>
      <div className="investor-dashboard-hero-value">
        <p>Portfolio value</p>
        <strong>{formatINR(value)}</strong>
        <span><b>+{formatINR(value - invested)}</b> · 12% estimated growth</span>
      </div>
    </header>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
      <KpiCard className="investor-dashboard-kpi" title="Total invested" value={formatINR(invested)} subtitle="Across 2 holdings" icon="▤"/>
      <KpiCard className="investor-dashboard-kpi investor-dashboard-kpi-primary" title="Current value" value={formatINR(value)} subtitle="Estimated portfolio value" icon="⌂"/>
      <KpiCard className="investor-dashboard-kpi" title="Total payouts" value={formatINR(totalPayouts)} subtitle="Rental and sale distributions" icon="↙"/>
      <KpiCard className="investor-dashboard-kpi" title="Overall ROI" value="+13.7%" subtitle="Return on invested capital" icon="％"/>
      <KpiCard className="investor-dashboard-kpi investor-dashboard-cash" title="Wallet balance" value={formatINR(wallet)} subtitle="Available to invest" icon="₹" onClick={() => onNavigate?.('wallet')}/>
    </div>
    <nav aria-label="Dashboard quick actions" className="investor-dashboard-actions grid grid-cols-2 gap-3 sm:grid-cols-4">
      {[
        { label: 'Invest now', tab: 'marketplace', icon: '↗' },
        { label: 'Add money', tab: 'wallet', icon: '+' },
        { label: 'View portfolio', tab: 'portfolio', icon: '▤' },
        { label: 'Transactions', tab: 'wallet', icon: '⇄' }
      ].map(({ label, tab, icon }) => (
        <button key={label} onClick={() => label === 'Add money' ? onTopUpClick?.() : onNavigate?.(tab)}>
          <span className="investor-dashboard-action-icon" aria-hidden="true">{icon}</span>
          <span>{label}</span>
          <span className="investor-dashboard-action-arrow" aria-hidden="true">→</span>
        </button>
      ))}
    </nav>
    <div className="investor-dashboard-performance"><PerformanceChart/></div>
    <div className="grid gap-5 lg:grid-cols-2">
      <section className="investor-dashboard-panel rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="investor-dashboard-section-heading">
          <div><h2>Portfolio allocation</h2><p>By current invested value</p></div>
          <button onClick={() => onNavigate?.('portfolio')}>Portfolio <span aria-hidden="true">→</span></button>
        </div>
        <AllocationDonut data={allocation} totalInvested={invested}/>
      </section>
      <section className="investor-dashboard-panel investor-dashboard-activity rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="investor-dashboard-section-heading">
          <div><h2>Recent activity</h2><p>Latest account movements</p></div>
          <button onClick={() => onNavigate?.('wallet')}>Ledger <span aria-hidden="true">→</span></button>
        </div>
        <div className="investor-dashboard-activity-list">
          {activity.map((item) => (
            <div key={item._id} className="investor-dashboard-activity-row">
              <span className={`investor-dashboard-activity-icon ${item.direction === 'CREDIT' ? 'is-credit' : ''}`} aria-hidden="true">{item.direction === 'CREDIT' ? '↓' : '↑'}</span>
              <div className="investor-dashboard-activity-copy">
                <p>{item.label || item.type}</p>
                <span>{item.refId} · {formatDateIN(item.createdAt, true)}</span>
              </div>
              <strong className={item.direction === 'CREDIT' ? 'is-credit' : ''}>{item.direction === 'CREDIT' ? '+' : '-'}{formatINR(item.amount)}</strong>
            </div>
          ))}
        </div>
      </section>
    </div>
    <section className="investor-dashboard-opportunities">
      <div className="investor-dashboard-section-heading">
        <div><h2>Recommended opportunities</h2><p>Live fractional property investments</p></div>
        <button onClick={() => onNavigate?.('marketplace')}>View marketplace <span aria-hidden="true">→</span></button>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {properties.slice(0, 3).map((property) => <PropertyCard key={property._id} className="investor-dashboard-property" property={property} onInvest={onSelectPropertyForInvest} onViewDetail={onSelectPropertyDetail}/>)}</div>
    </section>
  </div>;
}
