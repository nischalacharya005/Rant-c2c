import React, { useState } from 'react';
import { FLUTTER_FILES, FLUTTER_PROJECT_TREE, FolderNode, FlutterFile } from '../data/flutterProject';
import { Folder, File, Copy, Check, ChevronRight, ChevronDown, BookOpen, Layers, Terminal, Database, ShieldAlert, Sparkles } from 'lucide-react';

export default function DeveloperGuide() {
  const [activeTab, setActiveTab] = useState<'flow' | 'explorer' | 'firebase' | 'guide'>('flow');
  const [selectedFilePath, setSelectedFilePath] = useState<string>('rant_c2c/lib/screens/role_selection_screen.dart');
  const [copied, setCopied] = useState<boolean>(false);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'rant_c2c': true,
    'rant_c2c/lib': true,
    'rant_c2c/lib/screens': true,
    'rant_c2c/lib/models': true,
    'rant_c2c/lib/services': true,
  });

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => ({ ...prev, [path]: !prev[path] }));
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedFile = FLUTTER_FILES[selectedFilePath];

  const renderTree = (node: FolderNode, depth = 0) => {
    const isFolder = node.type === 'folder';
    const isExpanded = expandedFolders[node.path];
    const isSelected = selectedFilePath === node.path;

    return (
      <div key={node.path} className="select-none">
        <div
          onClick={() => {
            if (isFolder) {
              toggleFolder(node.path);
            } else {
              setSelectedFilePath(node.path);
            }
          }}
          className={`flex items-center gap-2 py-1.5 px-2 rounded-md cursor-pointer transition-colors text-sm ${
            isSelected 
              ? 'bg-amber-500/10 text-amber-600 font-medium' 
              : 'hover:bg-slate-100 text-slate-700'
          }`}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          {isFolder ? (
            <>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              )}
              <Folder className={`w-4 h-4 shrink-0 ${isExpanded ? 'text-amber-500 fill-amber-500/20' : 'text-amber-500'}`} />
            </>
          ) : (
            <>
              <span className="w-4" /> {/* align with chevron */}
              <File className={`w-4 h-4 shrink-0 ${isSelected ? 'text-amber-500' : 'text-slate-400'}`} />
            </>
          )}
          <span className="truncate">{node.name}</span>
        </div>
        {isFolder && isExpanded && node.children && (
          <div className="mt-0.5">
            {node.children.map(child => renderTree(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm" id="dev-workspace-guide">
      {/* Workspace Navigation Header */}
      <div className="bg-slate-50 border-b border-slate-100 px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 rounded-full text-xs font-semibold">Flutter & Firebase</span>
              <span className="text-xs text-slate-400">Matchmaker Broker Spec</span>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mt-1">Rant C2C Code Workspace</h2>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex bg-slate-200/60 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('flow')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'flow'
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Intro & Flow
            </button>
            <button
              onClick={() => setActiveTab('explorer')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'explorer'
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              Flutter Files
            </button>
            <button
              onClick={() => setActiveTab('firebase')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'firebase'
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              Database Specs
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'guide'
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              No-Code Guide
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Pane */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'flow' && (
          <div className="space-y-6">
            {/* Lead Dev Letter */}
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-sm">
                  JD
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Your Lead Developer Assistant</h4>
                  <p className="text-xs text-slate-400">Rant C2C Project Team</p>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                    Hello! I'm thrilled to assist you with launching **Rant C2C**. Since you have **zero coding experience**, we are going to do this in the most robust, visual, and educational way possible.
                  </p>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    Our concept is brilliant in its simplicity: a **brokerage matchmaker** model. By bypassing in-app escrow and payment handling, we evade complex legal, compliance, and banking hurdles. Users find items, tap a button, and do handshakes in person.
                  </p>
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200/50 rounded-xl flex items-center gap-3">
                    <span className="text-xl">💡</span>
                    <p className="text-xs text-amber-800">
                      <strong>Check out the phone on the right!</strong> It's a live interactive simulator of our app. Use it to visualize the exact screen transitions before creating the actual build!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* App Screen Roadmap */}
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-500" />
                The Core User Flow Explained
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-slate-100 rounded-xl hover:border-slate-200 transition-colors bg-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 bg-amber-500/10 text-amber-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <h4 className="font-semibold text-slate-800 text-sm">Role Selection Screen</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    The entry gate. Users choose to act as either a **Consumer** (renting from others) or a **Lord** (listing their property/items). This sets their workspace persona.
                  </p>
                </div>

                <div className="p-4 border border-slate-100 rounded-xl hover:border-slate-200 transition-colors bg-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 bg-amber-500/10 text-amber-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <h4 className="font-semibold text-slate-800 text-sm">Profile Setup</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Gathers basic contact cards (Name, Email, Phone). For **Lords**, this phone number acts as the main gateway that renters will call or text to make offline bids.
                  </p>
                </div>

                <div className="p-4 border border-slate-100 rounded-xl hover:border-slate-200 transition-colors bg-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 bg-amber-500/10 text-amber-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <h4 className="font-semibold text-slate-800 text-sm">Main Category Dashboard</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    A beautiful, clean grid separating rentals into **6 exact categories**: Clothing, Motorcycles, Cars, Pickups, Gadgets, and Housing. Features real-time queries.
                  </p>
                </div>

                <div className="p-4 border border-slate-100 rounded-xl hover:border-slate-200 transition-colors bg-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 bg-amber-500/10 text-amber-600 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    <h4 className="font-semibold text-slate-800 text-sm">Matchmaker Screen</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Product card showing descriptions and price. Houses the **Call Lord** dialer button and the **Message on WhatsApp** button which formats ready-to-send messages.
                  </p>
                </div>
              </div>
            </div>

            {/* Compliance Info */}
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex gap-3">
              <ShieldAlert className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-emerald-800 uppercase">Compliance & Broker Model Benefits</h4>
                <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
                  By strictly avoiding in-app credit card transactions, Rant C2C avoids the need for payment gateways like Stripe or Adyen, saving 3%+ transaction fees, avoiding chargebacks, and eliminating the need for complicated KYC (Know Your Customer) escrow licenses. It is the leanest way to deploy a marketplace.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'explorer' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[550px]">
            {/* Directory Sidebar */}
            <div className="lg:col-span-4 border border-slate-100 rounded-xl p-3 bg-slate-50/50 overflow-y-auto h-full">
              <div className="text-xs font-bold text-slate-400 uppercase mb-3 px-2">Workspace File Tree</div>
              <div className="space-y-0.5">
                {FLUTTER_PROJECT_TREE.map(node => renderTree(node))}
              </div>
            </div>

            {/* Code Code Viewer */}
            <div className="lg:col-span-8 flex flex-col border border-slate-100 rounded-xl overflow-hidden h-full">
              {selectedFile ? (
                <>
                  <div className="bg-slate-800 text-slate-300 px-4 py-2.5 flex items-center justify-between text-xs font-mono border-b border-slate-900 shrink-0">
                    <span className="text-amber-400 font-semibold">{selectedFile.path}</span>
                    <button
                      onClick={() => handleCopy(selectedFile.content)}
                      className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 hover:text-white transition-all text-[11px] font-sans font-medium cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy Code
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-4 bg-slate-50 border-b border-slate-100 shrink-0">
                    <h5 className="text-xs font-bold text-slate-800 uppercase mb-1">File Explanation</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">{selectedFile.description}</p>
                  </div>
                  <div className="flex-1 overflow-auto bg-slate-950 p-4 font-mono text-[11px] leading-relaxed text-slate-300">
                    <pre className="whitespace-pre">{selectedFile.content}</pre>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8">
                  <File className="w-12 h-12 text-slate-300 mb-4" />
                  <p className="text-sm font-medium">Select a file from the explorer to view production code</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'firebase' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">Firebase Integration Schema</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Since Rant C2C is built on Firebase, our matchmaker app works by reading and writing to **Cloud Firestore**. Because we don't have transaction layers, we only need two core databases: `users` and `listings`.
              </p>
            </div>

            {/* Collection 1: Users */}
            <div className="border border-slate-100 rounded-xl overflow-hidden bg-white">
              <div className="bg-amber-500/10 px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-amber-700 font-mono">/users/&#123;userId&#125;</span>
                <span className="px-2 py-0.5 bg-amber-500 text-white rounded text-[10px] font-bold">Document</span>
              </div>
              <div className="p-4">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400">
                      <th className="pb-2 font-semibold">Field Name</th>
                      <th className="pb-2 font-semibold">Type</th>
                      <th className="pb-2 font-semibold">Description</th>
                      <th className="pb-2 font-semibold">Example Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 font-mono text-slate-600">
                    <tr>
                      <td className="py-2.5 font-bold text-slate-800">uid</td>
                      <td className="py-2.5 text-blue-600">String</td>
                      <td className="py-2.5 text-slate-500">Firebase User Unique ID</td>
                      <td className="py-2.5">"jK92lA18b76S"</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-slate-800">name</td>
                      <td className="py-2.5 text-blue-600">String</td>
                      <td className="py-2.5 text-slate-500">Full Name of Renter or Lender</td>
                      <td className="py-2.5">"Johnny Cash"</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-slate-800">email</td>
                      <td className="py-2.5 text-blue-600">String</td>
                      <td className="py-2.5 text-slate-500">Authentication email</td>
                      <td className="py-2.5">"johnny@cash.com"</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-slate-800">phone</td>
                      <td className="py-2.5 text-blue-600">String</td>
                      <td className="py-2.5 text-slate-500">Active contact number</td>
                      <td className="py-2.5 font-bold text-emerald-600 font-sans">+14155552671</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-slate-800">role</td>
                      <td className="py-2.5 text-blue-600">String</td>
                      <td className="py-2.5 text-slate-500">Workspace view selection</td>
                      <td className="py-2.5">"Lord" | "Consumer"</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Collection 2: Listings */}
            <div className="border border-slate-100 rounded-xl overflow-hidden bg-white">
              <div className="bg-slate-800 text-slate-200 px-4 py-3 border-b border-slate-900 flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-amber-400">/listings/&#123;listingId&#125;</span>
                <span className="px-2 py-0.5 bg-slate-700 text-slate-300 rounded text-[10px] font-bold">Document</span>
              </div>
              <div className="p-4">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400">
                      <th className="pb-2 font-semibold">Field Name</th>
                      <th className="pb-2 font-semibold">Type</th>
                      <th className="pb-2 font-semibold">Description</th>
                      <th className="pb-2 font-semibold">Example Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 font-mono text-slate-600">
                    <tr>
                      <td className="py-2.5 font-bold text-slate-800">title</td>
                      <td className="py-2.5 text-blue-600">String</td>
                      <td className="py-2.5 text-slate-500">Title of the rental listing</td>
                      <td className="py-2.5">"Harley Davidson Iron 883"</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-slate-800">price</td>
                      <td className="py-2.5 text-purple-600">Double</td>
                      <td className="py-2.5 text-slate-500">Rental cost per active day</td>
                      <td className="py-2.5">85.00</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-slate-800">category</td>
                      <td className="py-2.5 text-blue-600">String</td>
                      <td className="py-2.5 text-slate-500">1 of the 7 core categories</td>
                      <td className="py-2.5 font-bold">"Motorcycle"</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-slate-800">lordPhone</td>
                      <td className="py-2.5 text-blue-600">String</td>
                      <td className="py-2.5 text-slate-500">Lender contact for match triggers</td>
                      <td className="py-2.5 font-bold text-emerald-600 font-sans">+14155550199</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-slate-800">imageUrl</td>
                      <td className="py-2.5 text-blue-600">String</td>
                      <td className="py-2.5 text-slate-500">Public image URL from Firebase Storage</td>
                      <td className="py-2.5 truncate max-w-[200px]">"https://images.unsplash..."</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Collection 3: Chats & Messages */}
            <div className="border border-slate-100 rounded-xl overflow-hidden bg-white">
              <div className="bg-slate-800 text-slate-200 px-4 py-3 border-b border-slate-900 flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-amber-400">/chats/&#123;chatId&#125;/messages/&#123;messageId&#125;</span>
                <span className="px-2 py-0.5 bg-slate-700 text-slate-300 rounded text-[10px] font-bold">Subcollection</span>
              </div>
              <div className="p-4">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400">
                      <th className="pb-2 font-semibold">Field Name</th>
                      <th className="pb-2 font-semibold">Type</th>
                      <th className="pb-2 font-semibold">Description</th>
                      <th className="pb-2 font-semibold">Example Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 font-mono text-slate-600">
                    <tr>
                      <td className="py-2.5 font-bold text-slate-800">senderId</td>
                      <td className="py-2.5 text-blue-600">String</td>
                      <td className="py-2.5 text-slate-500">ID of the user sending the chat</td>
                      <td className="py-2.5">"jK92lA18b76S"</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-slate-800">receiverId</td>
                      <td className="py-2.5 text-blue-600">String</td>
                      <td className="py-2.5 text-slate-500">ID of the lord/renter receiving the chat</td>
                      <td className="py-2.5">"mR45aB92c81K"</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-slate-800">message</td>
                      <td className="py-2.5 text-blue-600">String</td>
                      <td className="py-2.5 text-slate-500">Text message content</td>
                      <td className="py-2.5">"Hi Marcus, can I meet you tomorrow for the Harley?"</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-slate-800">timestamp</td>
                      <td className="py-2.5 text-purple-600">Timestamp</td>
                      <td className="py-2.5 text-slate-500">Server timing of the sent message</td>
                      <td className="py-2.5 font-sans font-medium">ServerTimestamp</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Security Rules */}
            <div className="bg-amber-50 border border-amber-200/50 p-4 rounded-xl">
              <h5 className="text-xs font-bold text-amber-800 uppercase mb-1">🔒 Matchmaker Firestore Security Rules (With Chat Guard)</h5>
              <p className="text-xs text-amber-700 leading-relaxed">
                We use secure Attribute-Based Access Control (ABAC). Chat rooms and messages are fully private; they can only be read and written if the requesting user's UID is list-approved inside the thread's <code className="bg-slate-100 px-1 rounded text-red-600">participants</code> array:
              </p>
              <pre className="mt-3 p-3 bg-slate-900 text-slate-300 font-mono text-[10px] rounded-lg overflow-x-auto">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /listings/{listingId} {
      allow read: if true; // Publicly browsable
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && resource.data.lordId == request.auth.uid;
    }
    match /chats/{chatId} {
      allow read: if request.auth != null && request.auth.uid in resource.data.participants;
      allow create: if request.auth != null;
      allow update: if request.auth != null && request.auth.uid in resource.data.participants;
      
      match /messages/{messageId} {
        allow read: if request.auth != null && request.auth.uid in get(/databases/$(database)/documents/chats/$(chatId)).data.participants;
        allow create: if request.auth != null && request.resource.data.senderId == request.auth.uid;
      }
    }
  }
}`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="space-y-6">
            {/* Guide 1: FlutterFlow */}
            <div className="border border-slate-100 rounded-xl p-5 bg-white space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-amber-500 rounded-full" />
                <h3 className="font-bold text-slate-800 text-sm">Deploying in FlutterFlow (No-Code Method)</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                FlutterFlow is a visual website builder for Flutter. Since you have **zero coding experience**, this is the recommended path! Here is how to map this app visually:
              </p>
              <div className="space-y-3 pl-4 border-l border-slate-100 text-xs">
                <div>
                  <h4 className="font-bold text-slate-700">1. Setup Pages & Navigation</h4>
                  <p className="text-slate-500">Create 5 blank pages in your panel: <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-amber-600">RoleSelection</code>, <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-amber-600">ProfileSetup</code>, <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-amber-600">Dashboard</code>, <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-amber-600">ItemDetails</code>, and <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-amber-600">CreateListing</code>.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-700">2. Configure State Managers</h4>
                  <p className="text-slate-500">Create two App State variables: <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-purple-600">currentRole</code> (String: default 'Consumer') and <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-purple-600">userPhone</code> (String).</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-700">3. Setting up Call & WhatsApp Triggers</h4>
                  <p className="text-slate-500">FlutterFlow buttons support launching URLs without writing code! 
                    For **Call Lord**: Add an Action → select **"Launch URL"** → configure URL scheme to: <code className="font-mono bg-emerald-50 text-emerald-700 px-1 rounded">tel:$&#123;lordPhone&#125;</code>.<br />
                    For **Message on WhatsApp**: Add an Action → select **"Launch URL"** → configure URL text to: <code className="font-mono bg-emerald-50 text-emerald-700 px-1 rounded">https://wa.me/$&#123;lordPhone&#125;?text=Hi! I am interested in your listing...</code>
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-700">4. Hooking Up the Listings Grid</h4>
                  <p className="text-slate-500">Use a **GridView** widget with 2 columns. Set the source to query your Firestore <code className="font-mono bg-slate-100 px-1 rounded text-blue-600">listings</code> collection, filtering by category if the horizontal category widget value matches.</p>
                </div>
              </div>
            </div>

            {/* Guide 2: VS Code */}
            <div className="border border-slate-100 rounded-xl p-5 bg-white space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-slate-800 rounded-full" />
                <h3 className="font-bold text-slate-800 text-sm">Running in VS Code (Developer Method)</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                If you choose to use VS Code or run it locally on your computer, here is your command script blueprint:
              </p>
              <div className="space-y-3 pl-4 border-l border-slate-100 text-xs">
                <div>
                  <h4 className="font-bold text-slate-700">1. Install Flutter</h4>
                  <p className="text-slate-500">Download the Flutter SDK from <a href="https://flutter.dev" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">flutter.dev</a> and install the Flutter extension in VS Code.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-700">2. Bootstrap the project</h4>
                  <p className="text-slate-500">Open your terminal and create a clean template:</p>
                  <pre className="mt-2 p-2 bg-slate-900 text-slate-300 font-mono text-[10px] rounded">flutter create rant_c2c</pre>
                </div>
                <div>
                  <h4 className="font-bold text-slate-700">3. Paste files</h4>
                  <p className="text-slate-500">Replace the contents of <code className="bg-slate-100 text-slate-700 px-1 rounded">pubspec.yaml</code> and code files in <code className="bg-slate-100 text-slate-700 px-1 rounded">lib/</code> with the files you copy from our **Flutter Files** tab here!</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-700">4. Run the code</h4>
                  <p className="text-slate-500">Type this command to get all libraries and start your Android/iOS emulator or browser:</p>
                  <pre className="mt-2 p-2 bg-slate-900 text-slate-300 font-mono text-[10px] rounded">flutter pub get
flutter run</pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
