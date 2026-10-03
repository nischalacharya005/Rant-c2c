import React from 'react';
import DeveloperGuide from './components/DeveloperGuide';
import PhoneSimulator from './components/PhoneSimulator';
import { Shield, Sparkles, Smartphone, Layers, CheckCircle } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      
      {/* Top Professional Workspace Navigation Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 px-6 py-4 sticky top-0 z-40 shadow-sm shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center font-extrabold text-xl shadow-md shadow-amber-500/20 text-slate-950">
              🤝
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black tracking-tight text-white">Rant C2C</h1>
                <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-md text-[10px] font-bold uppercase tracking-wider">
                  Broker Matchmaker Spec
                </span>
              </div>
              <p className="text-xs text-slate-400">Mobile Flutter & Firebase Architecture Companion</p>
            </div>
          </div>

          {/* Quick Stats / Active Specifications badges */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-300">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Direct Matching (No Escrow)
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-300">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              7 Category Grid Specs
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              No-Code Setup Config
            </div>
          </div>

        </div>
      </header>

      {/* Main Content Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Flutter Workspace, Files Explorer, and Guides (7/12 Width) */}
        <div className="lg:col-span-7 h-full flex flex-col gap-6">
          
          {/* Welcome Intro Banner */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-sm border border-slate-800 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 top-0 opacity-10 flex items-center justify-center translate-x-12 select-none pointer-events-none">
              <Layers className="w-64 h-64 text-white" />
            </div>
            <div className="relative z-10 max-w-lg space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-amber-500 text-slate-950 rounded text-[10px] font-bold uppercase tracking-wider">
                  Lead Dev Blueprint
                </span>
                <span className="text-xs text-slate-300">• Zero Coding Experience Needed</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight leading-snug">
                Welcome to Rant C2C!
              </h2>
              <p className="text-slate-300 text-xs leading-relaxed">
                As your Lead Developer, I have mapped out the entire architecture for your P2P marketplace app. Below is your structured interactive space. You can preview screens inside the live simulator on the right, inspect the exact directory layout, copy clean code files, or read simple instructions for FlutterFlow!
              </p>
              
              {/* Highlight Requirements Checklist */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-slate-200">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  2 Profile Roles Screen
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  Direct Contact triggers
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  7 Specific Grid Categories
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  Lord Listing Creation form
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Developer Handbooks / Tab panel */}
          <DeveloperGuide />
        </div>

        {/* RIGHT COLUMN: Smartphone Simulator (5/12 Width) */}
        <div className="lg:col-span-5 lg:sticky lg:top-[90px] flex flex-col items-center">
          <div className="w-full bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col items-center">
            
            {/* Header info */}
            <div className="text-center mb-6 max-w-sm">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-500/10 text-amber-600 rounded-full text-xs font-bold mb-1">
                <Smartphone className="w-3.5 h-3.5" />
                Interactive App Simulator
              </div>
              <h3 className="text-sm font-bold text-slate-800">Direct-Touch Simulator</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Try out the flows below! Choose roles, complete setups, explore listings, call Lords, or post new items as a Lord to watch them list live!
              </p>
            </div>

            {/* Smartphone simulator */}
            <PhoneSimulator />

          </div>
        </div>

      </main>

      {/* Footer copyright and summary info */}
      <footer className="bg-slate-900 text-slate-500 text-xs border-t border-slate-800 py-6 px-6 mt-12 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-slate-400">Rant C2C Matchmaker Marketplace Specification</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Approved Architecture Blueprint • Powered by Google AI Studio Build</p>
          </div>
          <div className="text-right text-[11px]">
            <p>Designed strictly under Broker and Direct matching guidelines.</p>
            <p className="text-slate-600">No payment gate required • Standard url_launcher dialers • Uncapped peer matching</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
