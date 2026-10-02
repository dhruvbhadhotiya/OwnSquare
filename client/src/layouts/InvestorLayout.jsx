import React, { useEffect, useState } from 'react';
import { formatINR } from '../utils/formatINR.js';
import { StatusChip } from '../components/StatusChip.jsx';

export function InvestorLayout({
  activeTab = 'dashboard',
  setActiveTab,
  walletBalance = 30000000, // Default ₹3 Lakh in paise per Aman fixture
  kycStatus = 'APPROVED',
  userName = 'Aman Sharma',
  userEmail = 'aman@demo.com',
  onQuickTopUp,
  children
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      return window.localStorage.getItem('ownsquare-investor-theme') === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('ownsquare-investor-theme', theme);
    } catch {
      return;
    }
  }, [theme]);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', description: 'Overview & KPIs' },
    { id: 'portfolio', label: 'My Portfolio', icon: '🏢', description: 'Holdings & performance' },
    { id: 'marketplace', label: 'Marketplace', icon: '🛒', description: 'Browse live properties' },
    { id: 'wallet', label: 'Wallet & Ledger', icon: '💳', description: 'Top-up & transactions' },
    { id: 'kyc', label: 'Identity & KYC', icon: '🛡️', description: 'Document verification' },
    { id: 'enquiries', label: 'Enquiries', icon: '💬', description: 'Broker message threads' }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <div className="investor-shell min-h-screen bg-[#F7F8FA] flex flex-col font-sans" data-theme={theme}>
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex md:w-64 md:flex-col bg-[#0F2A4A] text-white border-r border-[#1A3D66] flex-shrink-0">
          {/* Brand Logo & Role */}
          <div className="p-6 border-b border-white/10 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10B981] to-[#0F2A4A] border border-white/20 flex items-center justify-center font-bold text-white text-lg shadow-sm">
              OS
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight text-white flex items-center">
                OwnSquare
              </div>
              <p className="text-[11px] text-gray-400">Fractional Real Estate</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
            {navigationItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left group ${
                    isActive
                      ? 'bg-[#10B981] text-white shadow-md'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-lg mr-3 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <div className="flex-1 truncate">
                    <span className="block truncate">{item.label}</span>
                    <span
                      className={`block text-[10px] truncate ${
                        isActive ? 'text-white/80' : 'text-gray-400'
                      }`}
                    >
                      {item.description}
                    </span>
                  </div>
                  {isActive && (
                    <span className="w-1.5 h-4 rounded-full bg-white ml-2 opacity-80" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Quick Info */}
          <div className="p-4 border-t border-white/10 bg-black/20">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-[#10B981] text-white flex items-center justify-center font-bold text-sm shadow">
                {userName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">{userName}</p>
                <p className="text-[10px] text-gray-400 truncate">{userEmail}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Bar */}
          <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-xs">
            <div className="px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
              {/* Mobile menu button */}
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]"
                  aria-label="Toggle navigation menu"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {mobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>

                <div className="hidden sm:block">
                  <h2 className="text-base font-bold text-[#0F2A4A] capitalize">
                    {navigationItems.find((item) => item.id === activeTab)?.label || 'Investor Portal'}
                  </h2>
                </div>
              </div>

              {/* Right: Live Wallet Balance, KYC status, and User Profile */}
              <div className="flex items-center space-x-3 sm:space-x-4">
                {/* Live Wallet Balance Pill */}
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 sm:px-3 sm:py-1.5 shadow-2xs">
                  <div className="text-right mr-2 hidden sm:block">
                    <p className="text-[10px] uppercase font-semibold text-gray-400 leading-tight">Available Cash</p>
                    <p className="text-xs sm:text-sm font-bold text-[#0F2A4A] leading-tight">
                      {formatINR(walletBalance)}
                    </p>
                  </div>
                  <div className="text-right mr-2 sm:hidden">
                    <p className="text-xs font-bold text-[#0F2A4A]">
                      {formatINR(walletBalance)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (onQuickTopUp) onQuickTopUp();
                      else setActiveTab('wallet');
                    }}
                    className="p-1 sm:px-2 sm:py-1 bg-[#10B981] hover:bg-[#0EA271] text-white rounded-md text-xs font-bold transition-colors flex items-center space-x-1"
                    title="Quick Top-up Wallet"
                  >
                    <span>+</span>
                    <span className="hidden sm:inline">Add</span>
                  </button>
                </div>

                <button
                  type="button"
                  className="investor-theme-toggle"
                  onClick={() => setTheme((currentTheme) => currentTheme === 'dark' ? 'light' : 'dark')}
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                  title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  {theme === 'dark' ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                      <circle cx="12" cy="12" r="3.5" />
                      <path strokeLinecap="round" d="M12 2.5v2m0 15v2m9.5-9.5h-2m-15 0h-2m16.22-6.72-1.42 1.42M6.7 17.3l-1.42 1.42m13.44 0-1.42-1.42M6.7 6.7 5.28 5.28" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.3 15.2A8.5 8.5 0 0 1 8.8 3.7 8.5 8.5 0 1 0 20.3 15.2Z" />
                    </svg>
                  )}
                </button>

                {/* Profile Pill */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#0F2A4A] text-white flex items-center justify-center font-bold text-xs">
                      {userName.charAt(0)}
                    </div>
                    <span className="text-xs font-semibold text-gray-700 hidden lg:inline">
                      {userName}
                    </span>
                    <svg className="w-3.5 h-3.5 text-gray-400 hidden lg:inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Profile Dropdown */}
                  {profileDropdownOpen && (
                    <div className="investor-profile-dropdown absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-30">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs font-bold text-gray-900">{userName}</p>
                        <p className="text-[11px] text-gray-500 truncate">{userEmail}</p>
                        <div className="mt-1.5 flex items-center space-x-1.5">
                          <span className="text-[10px] text-gray-400">KYC Status:</span>
                          <StatusChip status={kycStatus} className="text-[10px] py-0" />
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setActiveTab('kyc');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                      >
                        <span>🛡️</span>
                        <span>KYC Verification</span>
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab('wallet');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                      >
                        <span>💳</span>
                        <span>Manage Wallet</span>
                      </button>
                      <div className="border-t border-gray-100 my-1"></div>
                      <div className="px-4 py-1.5 text-[10px] text-gray-400">
                        Role: INVESTOR &bull; Session Active
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Drawer Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden border-t border-gray-200 bg-[#0F2A4A] text-white p-4 space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium ${
                      activeTab === item.id
                        ? 'bg-[#10B981] text-white'
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-xl mr-3">{item.icon}</span>
                    <div className="text-left">
                      <div className="font-semibold">{item.label}</div>
                      <div className="text-xs text-white/70">{item.description}</div>
                    </div>
                  </button>
                ))}

              </div>
            )}
          </header>

          {/* Main Viewport */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>

          {/* Platform Footer */}
          <footer className="bg-white border-t border-gray-200 py-4 px-6 text-center text-xs text-gray-500">
            <p className="font-medium text-gray-600">
              OwnSquare &mdash; Fractional Real Estate Sourcing &amp; Investment Ecosystem
            </p>
            <p className="mt-1 text-[11px] text-gray-400">
              This is an academic project. No real money or securities are involved. All monetary values are integer paise simulations.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default InvestorLayout;
