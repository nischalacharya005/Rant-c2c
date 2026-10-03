import React, { useState, useEffect } from 'react';
import { 
  Phone, MessageSquare, User, Plus, ChevronLeft, Search, LogOut, 
  MapPin, ShieldCheck, Check, Sparkles, Send, Grid, ArrowRight,
  Shirt, Bike, Car, Truck, Smartphone, Home, Play, HelpCircle,
  Bell, MessageCircle, Info, UploadCloud, Image as ImageIcon, Trash2,
  BookOpen
} from 'lucide-react';

interface RentalItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'Clothing' | 'Motorcycle' | 'Car' | 'Pickups' | 'Gadgets' | 'Housing' | 'Books';
  imageUrl: string;
  lordName: string;
  lordPhone: string;
  rating?: number;
  reviews?: number;
  specs?: string[];
  isRantChoice?: boolean;
}

export interface CountryConfig {
  name: string;
  code: string;
  flag: string;
  currencySymbol: string;
  currencyCode: string;
  placeholder: string;
  exchangeRate: number;
  features: string[];
  gateway: string;
}

export const COUNTRIES: CountryConfig[] = [
  { 
    name: 'United States', 
    code: '+1', 
    flag: '🇺🇸', 
    currencySymbol: '$', 
    currencyCode: 'USD', 
    placeholder: '(555) 012-3456', 
    exchangeRate: 1.0, 
    features: ['Direct Handshakes Venmo', 'Secure Cellular Calls'],
    gateway: 'Venmo / CashApp'
  },
  { 
    name: 'Nepal', 
    code: '+977', 
    flag: '🇳🇵', 
    currencySymbol: 'रू', 
    currencyCode: 'NPR', 
    placeholder: '9841234567', 
    exchangeRate: 133.5, 
    features: ['eSewa & Khalti Direct Transfers', 'Local Handover Hubs'],
    gateway: 'eSewa / Khalti / Cash'
  },
  { 
    name: 'India', 
    code: '+91', 
    flag: '🇮🇳', 
    currencySymbol: '₹', 
    currencyCode: 'INR', 
    placeholder: '98765 43210', 
    exchangeRate: 83.4, 
    features: ['UPI Brokerage (GPay/PhonePe)', 'Handover Security Checks'],
    gateway: 'UPI / GPay / Cash'
  },
  { 
    name: 'United Kingdom', 
    code: '+44', 
    flag: '🇬🇧', 
    currencySymbol: '£', 
    currencyCode: 'GBP', 
    placeholder: '7911 123456', 
    exchangeRate: 0.79, 
    features: ['Revolut Quick Settlements', 'UK Safe Handover Codes'],
    gateway: 'Revolut / Bank'
  },
  { 
    name: 'Eurozone', 
    code: '+49', 
    flag: '🇪🇺', 
    currencySymbol: '€', 
    currencyCode: 'EUR', 
    placeholder: '151 2345678', 
    exchangeRate: 0.92, 
    features: ['SEPA Transfer Support', 'EU Direct Rent Compliance'],
    gateway: 'SEPA / Cash'
  },
  { 
    name: 'United Arab Emirates', 
    code: '+971', 
    flag: '🇦🇪', 
    currencySymbol: 'AED ', 
    currencyCode: 'AED', 
    placeholder: '50 123 4567', 
    exchangeRate: 3.67, 
    features: ['Careem Pay Matches', 'Direct Lord Concierge'],
    gateway: 'Careem Pay / Cash'
  }
];

export const formatPriceValue = (usdPrice: number, country: CountryConfig) => {
  const localPrice = Math.round(usdPrice * country.exchangeRate);
  return `${country.currencySymbol}${localPrice.toLocaleString()}`;
};

const CATEGORY_ICONS = {
  Clothing: Shirt,
  Motorcycle: Bike,
  Car: Car,
  Pickups: Truck,
  Gadgets: Smartphone,
  Housing: Home,
  Books: BookOpen,
};

const CATEGORY_IMAGES = {
  Clothing: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop',
  Motorcycle: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=500&auto=format&fit=crop',
  Car: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format&fit=crop',
  Pickups: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&auto=format&fit=crop',
  Gadgets: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop',
  Housing: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&auto=format&fit=crop',
  Books: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&auto=format&fit=crop',
};

const INITIAL_ITEMS: RentalItem[] = [
  {
    id: 'item_1',
    title: 'Harley Davidson Iron 883',
    description: 'Excellent beast of a motorcycle. Comes with full fuel tank and a clean extra helmet. Handover near Central Plaza, cash/venmo upon inspection.',
    price: 85,
    category: 'Motorcycle',
    imageUrl: CATEGORY_IMAGES.Motorcycle,
    lordName: 'Marcus Aurelius',
    lordPhone: '+1 (415) 555-0199',
    rating: 4.8,
    reviews: 14,
    specs: ["883cc V-Twin cruiser engine", "Includes black helmet", "Full fuel tank on pickup"],
    isRantChoice: true,
  },
  {
    id: 'item_2',
    title: 'Wedding Designer Tuxedo',
    description: 'Black slim-fit designer tuxedo, size L (jacket 40R, pants 32W). Ideal for weddings or galas. Return dry-cleaned or add $15 fee.',
    price: 45,
    category: 'Clothing',
    imageUrl: CATEGORY_IMAGES.Clothing,
    lordName: 'Lord Tailor',
    lordPhone: '+1 (415) 555-0244',
    rating: 4.5,
    reviews: 8,
    specs: ["Premium Italian Wool Blend", "Adjustable trouser waist 32-34", "Slim fit tailoring profile"],
    isRantChoice: false,
  },
  {
    id: 'item_3',
    title: 'Ford Raptor F-150 pickup',
    description: 'Powerful 4x4 pickup truck. Excellent for moving furniture, payloads, or weekend getaways. Clean record required.',
    price: 120,
    category: 'Pickups',
    imageUrl: CATEGORY_IMAGES.Pickups,
    lordName: 'Cargo Hank',
    lordPhone: '+1 (415) 555-0388',
    rating: 4.7,
    reviews: 21,
    specs: ["Twin-Turbo EcoBoost V6", "4-Wheel Drive system", "Spacious 5.5-foot pickup bed"],
    isRantChoice: true,
  },
  {
    id: 'item_4',
    title: 'Sony Alpha III Mirrorless Camera',
    description: 'Includes 24-70mm f/2.8 lens, 2 batteries, charger, and a 128GB high-speed SD card. Must sign physical waiver.',
    price: 55,
    category: 'Gadgets',
    imageUrl: CATEGORY_IMAGES.Gadgets,
    lordName: 'Click Shutter',
    lordPhone: '+1 (415) 555-0111',
    rating: 4.9,
    reviews: 32,
    specs: ["24.2 Megapixel Full-Frame Sensor", "Includes 24-70 f2.8 professional lens", "Dual SD backup slots"],
    isRantChoice: true,
  },
  {
    id: 'item_5',
    title: 'Downtown Modern Studio Loft',
    description: 'Compact loft with stunning balcony views, high speed wifi, cozy workdesk. Available for daily rentals only.',
    price: 150,
    category: 'Housing',
    imageUrl: CATEGORY_IMAGES.Housing,
    lordName: 'Lady Beatrice',
    lordPhone: '+1 (415) 555-0999',
    rating: 4.6,
    reviews: 19,
    specs: ["Gigabit Fiber internet connection", "Skyline-view outdoor deck balcony", "Free resident underground parking"],
    isRantChoice: false,
  },
  {
    id: 'item_6',
    title: 'University Engineering Calculus Textbook & Stationery Kit',
    description: 'Calculus Early Transcendentals 9th edition + premium drawing scale, drafting compass set, and standard math notebooks. Perfect for engineering students doing short term exam prep. Safe handoff on campus.',
    price: 15,
    category: 'Books',
    imageUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop',
    lordName: 'Dr. Hari Sharma',
    lordPhone: '+977 9841223344',
    rating: 4.8,
    reviews: 16,
    specs: ["Calculus 9th Edition paperback", "Drafting board & geometric compass", "2 grid-ruled practice notebooks"],
    isRantChoice: true,
  },
  {
    id: 'item_7',
    title: 'Rare Premium Fiction Collector’s Novels (Classic Hardcovers)',
    description: 'A box set of five beautifully bound classical masterpiece novels including Pride & Prejudice and Wuthering Heights. Perfect for photo shoots, literature classes, or peaceful weekend stays.',
    price: 10,
    category: 'Books',
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop',
    lordName: 'Elena Rostova',
    lordPhone: '+1 (415) 555-0761',
    rating: 4.9,
    reviews: 24,
    specs: ["5-volume gold-foil deluxe box set", "Acid-free archival paper binding", "Comes in premium wooden display crate"],
    isRantChoice: false,
  }
];

export default function PhoneSimulator() {
  // Mobile Simulator Navigation Screens
  const [screen, setScreen] = useState<'PHONE_LOGIN' | 'OTP_VERIFY' | 'ROLE_SELECTION' | 'PROFILE_SETUP' | 'DASHBOARD' | 'ITEM_DETAIL' | 'CREATE_LISTING'>('PHONE_LOGIN');
  const [phoneInput, setPhoneInput] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryConfig>(COUNTRIES[0]);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  
  const [selectedRole, setSelectedRole] = useState<'Consumer' | 'Lord'>('Consumer');
  const [userProfile, setUserProfile] = useState({ name: 'Alexander', email: 'alex@example.com', phone: '+1 (555) 321-4567' });
  const [listings, setListings] = useState<RentalItem[]>(INITIAL_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<RentalItem | null>(null);

  // Bottom Navigation tabs (when on DASHBOARD screen)
  const [bottomTab, setBottomTab] = useState<'BROWSE' | 'CHATS' | 'NOTIFICATIONS'>('BROWSE');

  // In-App Chat state
  const [activeInAppChat, setActiveInAppChat] = useState<any | null>(null);
  const [inAppChats, setInAppChats] = useState<any[]>([
    {
      id: 'chat_marcus',
      receiverName: 'Marcus Aurelius',
      receiverId: '+1 (415) 555-0199',
      itemTitle: 'Harley Davidson Iron 883',
      lastMessage: 'Hi Alexander! Let’s coordinate physical pick-up.',
      time: '10:42 AM',
      unread: true,
      messages: [
        { sender: 'lord', text: 'Welcome to Rant C2C! I saw your request.', time: '10:40 AM' },
        { sender: 'user', text: 'Great! Is the Harley available for tomorrow afternoon?', time: '10:41 AM' },
        { sender: 'lord', text: 'Hi Alexander! Let’s coordinate physical pick-up.', time: '10:42 AM' },
      ]
    },
    {
      id: 'chat_beatrice',
      receiverName: 'Lady Beatrice',
      receiverId: '+1 (415) 555-0999',
      itemTitle: 'Downtown Modern Studio Loft',
      lastMessage: 'Perfect, see you tomorrow afternoon.',
      time: 'Yesterday',
      unread: false,
      messages: [
        { sender: 'user', text: 'Is the studio loft clean for check-in?', time: '3:15 PM' },
        { sender: 'lord', text: 'Yes, fully serviced! Perfect, see you tomorrow afternoon.', time: '3:20 PM' },
      ]
    }
  ]);

  // Notifications state
  const [notifications, setNotifications] = useState<any[]>([
    { id: 'n1', title: '🛡️ Profile Activated', body: 'Rant C2C peer-to-peer account setup completed. Start renting!', time: 'Just now', read: false },
    { id: 'n2', title: '📈 High Category Demand', body: 'Motorcycle and Pickup rentals are trending high in your local neighborhood.', time: '2h ago', read: true }
  ]);

  // Real-time Push Notification Dropdown Banner state
  const [banner, setBanner] = useState<{ title: string; body: string } | null>(null);

  // Listing creation form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState<'Clothing' | 'Motorcycle' | 'Car' | 'Pickups' | 'Gadgets' | 'Housing' | 'Books'>('Gadgets');
  const [newPhone, setNewPhone] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  // Secure Handoff Verification System
  const [handoffCode, setHandoffCode] = useState<string>('8419');
  const [enteredHandoffCode, setEnteredHandoffCode] = useState<string>('');
  const [handoffVerified, setHandoffVerified] = useState<boolean>(false);
  const [handoffError, setHandoffError] = useState<string>('');

  // Overlay Triggers (For direct third-party calls & WhatsApp mockups)
  const [callActive, setCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [whatsappActive, setWhatsappActive] = useState(false);
  const [whatsappMessages, setWhatsappMessages] = useState<{ sender: 'user' | 'lord', text: string }[]>([]);
  const [typedWhatsappMessage, setTypedWhatsappMessage] = useState('');

  // In-App active message input
  const [typedInAppMessage, setTypedInAppMessage] = useState('');

  // Call timer effect
  useEffect(() => {
    let timer: any;
    if (callActive) {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [callActive]);

  // Push notification poster function
  const postNotification = (title: string, body: string) => {
    const newAlert = {
      id: `notif_${Date.now()}`,
      title,
      body,
      time: 'Just now',
      read: false
    };
    setNotifications(prev => [newAlert, ...prev]);
    setBanner({ title, body });
    
    // Auto remove dropdown banner after 4.5 seconds
    setTimeout(() => {
      setBanner(null);
    }, 4500);
  };

  // OTP Verification request
  const handleSendOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!phoneInput.trim() || phoneInput.length < 5) {
      setOtpError('Please enter a valid phone number');
      return;
    }
    
    setOtpError('');
    // Generate a secure 4-digit verification code
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setScreen('OTP_VERIFY');
    
    // Broadcast via push notification dropdown banner so user has it immediately
    setTimeout(() => {
      postNotification('🔑 Rant SMS Code Received', `Your phone verification OTP code is ${code}. Enter this code to authenticate.`);
    }, 1000);
  };

  // Confirm verification code
  const handleVerifyOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (otpInput === generatedOtp || otpInput === '1234') {
      setOtpError('');
      const fullPhone = `${selectedCountry.code} ${phoneInput}`;
      setUserProfile(prev => ({ ...prev, phone: fullPhone }));
      setNewPhone(fullPhone);
      setScreen('ROLE_SELECTION');
      postNotification('🛡️ Phone Verified', 'Authenticating Rant Direct Broker account...');
    } else {
      setOtpError('Invalid 4-digit code. Please enter the correct code shown in the notification banner (or "1234" to bypass).');
    }
  };

  // Format call duration
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  // Launch simulated phone call
  const triggerSimulatedCall = () => {
    setCallActive(true);
    postNotification('📞 Native Dialer Active', `Simulating system dialer for Lord ${selectedItem?.lordName}.`);
  };

  // Launch simulated WhatsApp chat (External match representation)
  const triggerSimulatedWhatsApp = () => {
    if (!selectedItem) return;
    const initialText = `Hi ${selectedItem.lordName}, I saw your '${selectedItem.title}' listing on Rant C2C (${formatPriceValue(selectedItem.price, selectedCountry)}/day). Is it still available for rent?`;
    setWhatsappMessages([
      { sender: 'user', text: initialText }
    ]);
    setWhatsappActive(true);
    postNotification('📱 External Matchmaker', `Redirecting to WhatsApp to chat with ${selectedItem.lordName}.`);

    // Simulated reply after delay
    setTimeout(() => {
      setWhatsappMessages(prev => [
        ...prev,
        { sender: 'lord', text: `Hello! Yes, the '${selectedItem.title}' is available. Direct cash or venmo is fine upon handshake handover near downtown Central Plaza tomorrow.` }
      ]);
    }, 2800);
  };

  const handleSendWhatsappMessage = () => {
    if (!typedWhatsappMessage.trim() || !selectedItem) return;
    const userMsg = typedWhatsappMessage.trim();
    setWhatsappMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setTypedWhatsappMessage('');

    setTimeout(() => {
      setWhatsappMessages(prev => [
        ...prev,
        { sender: 'lord', text: `Sounds like a deal. Remember to verify the condition together when we meet in person!` }
      ]);
      postNotification('🔔 WhatsApp Response', `${selectedItem.lordName} replied to your message.`);
    }, 2000);
  };

  // In-App Chat triggers
  const startInAppChat = () => {
    if (!selectedItem) return;
    
    // Check if chat thread already exists
    const existingIndex = inAppChats.findIndex(c => c.receiverId === selectedItem.lordPhone);
    if (existingIndex !== -1) {
      const existingChat = inAppChats[existingIndex];
      // Mark as read
      const updatedChats = [...inAppChats];
      updatedChats[existingIndex] = { ...existingChat, unread: false };
      setInAppChats(updatedChats);
      
      setActiveInAppChat(existingChat);
      setBottomTab('CHATS');
      setScreen('DASHBOARD');
    } else {
      // Create new thread
      const firstMsgText = `Hi ${selectedItem.lordName}, I saw your '${selectedItem.title}' listing on Rant C2C (${formatPriceValue(selectedItem.price, selectedCountry)}/day). I would love to rent it!`;
      const newRoom = {
        id: `chat_${Date.now()}`,
        receiverName: selectedItem.lordName,
        receiverId: selectedItem.lordPhone,
        itemTitle: selectedItem.title,
        lastMessage: firstMsgText,
        time: 'Just now',
        unread: false,
        messages: [
          { sender: 'user', text: firstMsgText, time: 'Just now' }
        ]
      };
      
      setInAppChats(prev => [newRoom, ...prev]);
      setActiveInAppChat(newRoom);
      setBottomTab('CHATS');
      setScreen('DASHBOARD');

      postNotification('💬 In-App Chat Room Opened', `Connection request initiated securely with Lord ${selectedItem.lordName}.`);

      // Simulated auto-reply in chat thread
      setTimeout(() => {
        const replyText = `Hey there! Yes, the ${selectedItem.title} is available. Where would you like to meet up? I am around downtown.`;
        
        // Update thread with incoming message
        setInAppChats(currentChats => currentChats.map(c => {
          if (c.receiverId === selectedItem.lordPhone) {
            return {
              ...c,
              lastMessage: replyText,
              time: 'Just now',
              messages: [
                ...c.messages,
                { sender: 'lord', text: replyText, time: 'Just now' }
              ]
            };
          }
          return c;
        }));

        // If user is currently in this room, update active state too
        setActiveInAppChat(currentActive => {
          if (currentActive && currentActive.receiverId === selectedItem.lordPhone) {
            return {
              ...currentActive,
              messages: [
                ...currentActive.messages,
                { sender: 'lord', text: replyText, time: 'Just now' }
              ]
            };
          }
          return currentActive;
        });

        // Trigger floating push alert banner!
        postNotification(`💬 Reply from ${selectedItem.lordName}`, replyText);
      }, 3500);
    }
  };

  const handleSendInAppMessage = () => {
    if (!typedInAppMessage.trim() || !activeInAppChat) return;
    const text = typedInAppMessage.trim();
    const timeNow = 'Just now';
    
    const senderRole = selectedRole === 'Lord' ? 'lord' : 'user';
    const counterRole = selectedRole === 'Lord' ? 'user' : 'lord';
    
    // 1. Update active chat room screen
    const updatedActive = {
      ...activeInAppChat,
      lastMessage: text,
      time: timeNow,
      messages: [...activeInAppChat.messages, { sender: senderRole, text, time: timeNow }]
    };
    setActiveInAppChat(updatedActive);

    // 2. Update list array
    setInAppChats(prev => prev.map(c => c.id === activeInAppChat.id ? updatedActive : c));
    setTypedInAppMessage('');

    // 3. Simulated Counterparty Reply
    setTimeout(() => {
      const responseText = selectedRole === 'Lord'
        ? `Thanks for coordinating! That pick-up arrangement sounds great. I'll see you tomorrow and pay the agreed amount directly.`
        : `Perfect. Sounds good, let's meet tomorrow. Cash or peer-to-peer cashapps at handover works best!`;
      
      setInAppChats(currentChats => currentChats.map(c => {
        if (c.id === activeInAppChat.id) {
          return {
            ...c,
            lastMessage: responseText,
            time: 'Just now',
            messages: [
              ...c.messages,
              { sender: counterRole, text: responseText, time: 'Just now' }
            ]
          };
        }
        return c;
      }));

      setActiveInAppChat(currentActive => {
        if (currentActive && currentActive.id === activeInAppChat.id) {
          return {
            ...currentActive,
            messages: [
              ...currentActive.messages,
              { sender: counterRole, text: responseText, time: 'Just now' }
            ]
          };
        }
        return currentActive;
      });

      // Post banner
      const counterpartyName = selectedRole === 'Lord' 
        ? (activeInAppChat.id === 'chat_marcus' || activeInAppChat.id === 'chat_beatrice' ? 'Alexander (Renter)' : 'Renter Inquirer')
        : activeInAppChat.receiverName;
      postNotification(`💬 ${counterpartyName}`, responseText);
    }, 2500);
  };

  // Submit listing creation
  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPrice || !newPhone.trim()) return;

    const newItem: RentalItem = {
      id: `custom_item_${Date.now()}`,
      title: newTitle.trim(),
      description: newDesc.trim() || 'Lender offered direct handoff negotiations.',
      price: parseFloat(newPrice) / selectedCountry.exchangeRate,
      category: newCategory,
      imageUrl: newImageUrl || CATEGORY_IMAGES[newCategory],
      lordName: userProfile.name || 'Anonymous Lord',
      lordPhone: newPhone.trim(),
    };

    setListings(prev => [newItem, ...prev]);
    
    // Post active notification
    postNotification('👑 Listing Published Live', `Your ${newCategory} listing "${newTitle}" was posted to Rant Board!`);
    
    // Clear form
    setNewTitle('');
    setNewDesc('');
    setNewPrice('');
    setNewPhone('');
    setNewImageUrl('');
    
    // Route back to dashboard browse
    setBottomTab('BROWSE');
    setScreen('DASHBOARD');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImageUrl(reader.result as string);
        postNotification('📸 Image Uploaded', `Successfully loaded "${file.name}" product photo.`);
      };
      reader.readAsDataURL(file);
    }
  };

  // Filter listings
  const filteredListings = listings.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Count unread chats
  const unreadCount = inAppChats.filter(c => c.unread).length;
  // Count unread notifications
  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <div className="flex flex-col items-center">
      {/* Phone outer container (Sleek Device Frame design) */}
      <div className="relative w-[360px] h-[720px] bg-slate-900 rounded-[50px] p-3.5 shadow-2xl border-4 border-slate-800 ring-12 ring-slate-950 overflow-hidden select-none">
        
        {/* Notch Camera / Speaker */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-slate-900 rounded-b-2xl z-50 flex items-center justify-center">
          <div className="w-12 h-1 bg-slate-800 rounded-full mb-1"></div>
          <div className="w-2.5 h-2.5 bg-slate-800 rounded-full absolute right-8 top-1.5"></div>
        </div>

        {/* Live Simulator Screen Viewport */}
        <div className="w-full h-full bg-slate-50 rounded-[38px] overflow-hidden relative flex flex-col pt-6 font-sans">
          
          {/* Simulated Floating Push Notification Dropdown Banner */}
          {banner && (
            <div className="absolute top-2 left-3 right-3 bg-slate-900/95 text-white p-3 rounded-2xl shadow-xl z-50 flex items-start gap-2.5 border border-slate-800 animate-in slide-in-from-top duration-300">
              <div className="bg-amber-500 text-white p-1.5 rounded-lg text-xs shrink-0 flex items-center justify-center">
                <Bell className="w-4.5 h-4.5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold font-sans text-slate-100 truncate">{banner.title}</h4>
                <p className="text-[10px] text-slate-300 leading-tight mt-0.5 truncate">{banner.body}</p>
              </div>
              <button 
                onClick={() => setBanner(null)} 
                className="text-slate-400 hover:text-white text-xs font-bold px-1"
              >
                ×
              </button>
            </div>
          )}

          {/* Internal Screen Content */}
          <div className="flex-1 overflow-y-auto flex flex-col text-slate-800 relative">
            {/* 0A. PHONE NUMBER LOGIN SCREEN */}
            {screen === 'PHONE_LOGIN' && (
              <div className="flex-1 flex flex-col p-6 justify-between bg-slate-50 relative">
                <div className="my-auto space-y-6">
                  {/* Logo block */}
                  <div className="flex justify-center">
                    <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center border border-amber-500/20">
                      <span className="text-4xl">🤝</span>
                    </div>
                  </div>

                  <div className="text-center space-y-1.5">
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Rant C2C</h1>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">SMS Authentication Broker</p>
                    <p className="text-xs text-slate-500 max-w-[240px] mx-auto leading-relaxed">
                      Only login or register using your phone number to activate country-dedicated currency & matchmaking.
                    </p>
                  </div>

                  {/* Input Fields */}
                  <div className="space-y-4 pt-2">
                    {/* Country code Selector */}
                    <div className="relative">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Country / Currency Zone</label>
                      <button
                        type="button"
                        onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs flex items-center justify-between font-medium hover:border-amber-500 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base leading-none">{selectedCountry.flag}</span>
                          <span className="text-slate-800">{selectedCountry.name} ({selectedCountry.code})</span>
                        </div>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                          {selectedCountry.currencyCode} ({selectedCountry.currencySymbol.trim()})
                        </span>
                      </button>

                      {/* Custom dropdown menu list */}
                      {isCountryDropdownOpen && (
                        <div className="absolute top-[102%] left-0 right-0 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 max-h-48 overflow-y-auto p-1.5 space-y-0.5 animate-in fade-in zoom-in-95 duration-100">
                          {COUNTRIES.map((country) => (
                            <button
                              key={country.name}
                              type="button"
                              onClick={() => {
                                setSelectedCountry(country);
                                setIsCountryDropdownOpen(false);
                              }}
                              className={`w-full p-2.5 rounded-xl text-left text-xs flex items-center justify-between transition-colors ${
                                selectedCountry.name === country.name 
                                  ? 'bg-amber-500/10 text-amber-700 font-bold' 
                                  : 'hover:bg-slate-50 text-slate-700'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-sm leading-none">{country.flag}</span>
                                <span>{country.name} ({country.code})</span>
                              </div>
                              <span className="text-[10px] text-slate-400 font-bold">
                                {country.currencySymbol} • {country.currencyCode}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Phone Number input */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Your Phone Number</label>
                      <div className="flex bg-white border border-slate-200 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-amber-500">
                        <span className="bg-slate-100 text-slate-600 px-3.5 flex items-center justify-center text-xs font-bold border-r border-slate-200">
                          {selectedCountry.code}
                        </span>
                        <input
                          type="tel"
                          value={phoneInput}
                          onChange={(e) => {
                            setPhoneInput(e.target.value.replace(/[^0-9]/g, ''));
                            setOtpError('');
                          }}
                          placeholder={selectedCountry.placeholder}
                          className="flex-1 px-4 py-3 text-xs outline-none font-bold tracking-wide"
                        />
                      </div>
                      {otpError && (
                        <p className="text-[10px] text-red-500 font-semibold mt-1.5">{otpError}</p>
                      )}
                      <p className="text-[9px] text-slate-400 mt-1.5">
                        🌐 App currency & brokerage rules will localize to **{selectedCountry.name}**
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mt-6">
                  <button
                    onClick={() => handleSendOtp()}
                    className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
                  >
                    Send Verification Code <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-center">
                    <p className="text-[9px] text-slate-400">
                      Standard sandbox OTP matches whatever is sent to your status banner.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 0B. OTP CODE VERIFICATION SCREEN */}
            {screen === 'OTP_VERIFY' && (
              <div className="flex-1 flex flex-col p-6 justify-between bg-slate-50">
                <div className="space-y-5 my-auto">
                  {/* Mini Back */}
                  <button 
                    onClick={() => setScreen('PHONE_LOGIN')}
                    className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800"
                  >
                    <ChevronLeft className="w-4 h-4" /> Change phone
                  </button>

                  <div className="space-y-1.5">
                    <h2 className="text-xl font-black text-slate-900">Enter Verification Code</h2>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Enter the 4-digit verification code sent via simulated SMS to:
                      <strong className="block mt-0.5 text-amber-600 font-mono text-xs">{selectedCountry.code} {phoneInput}</strong>
                    </p>
                  </div>

                  {/* Sandbox Environment Information Banner */}
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-2">
                    <p className="text-[10px] text-amber-800 font-bold flex items-center gap-1">
                      <span>🔌</span> Sandbox Environment Alert
                    </p>
                    <p className="text-[10px] text-slate-600 leading-relaxed">
                      Because this is a sandboxed web preview, we do not transmit real SMS texts to physical carriers.
                    </p>
                    <div className="flex items-center justify-between pt-1 border-t border-amber-500/10">
                      <span className="text-[10px] text-slate-500">Your simulated code: <strong className="text-amber-700 font-mono text-xs">{generatedOtp || '1234'}</strong></span>
                      <button
                        type="button"
                        onClick={() => {
                          setOtpInput(generatedOtp || '1234');
                          setOtpError('');
                        }}
                        className="text-[10px] font-black text-amber-600 hover:text-amber-700 bg-white border border-amber-500/20 px-2 py-0.5 rounded shadow-sm hover:scale-105 transition-transform"
                      >
                        ⚡ Auto-Fill Code
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4 pt-1">
                    <div className="flex justify-center gap-2">
                      <input
                        type="text"
                        maxLength={4}
                        value={otpInput}
                        onChange={(e) => {
                          setOtpInput(e.target.value.replace(/[^0-9]/g, ''));
                          setOtpError('');
                        }}
                        placeholder="••••"
                        className="w-36 text-center tracking-[12px] text-lg font-black bg-white border border-slate-200 rounded-xl p-3 focus:ring-1 focus:ring-amber-500 outline-none"
                      />
                    </div>
                    {otpError && (
                      <p className="text-[10px] text-red-500 font-semibold text-center">{otpError}</p>
                    )}
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => handleSendOtp()}
                        className="text-[10px] text-amber-600 font-bold hover:underline"
                      >
                        Resend Code
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => handleVerifyOtp()}
                    className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
                  >
                    Verify & Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* 1. ROLE SELECTION SCREEN */}
            {screen === 'ROLE_SELECTION' && (
              <div className="flex-1 flex flex-col p-6 justify-between bg-slate-50">
                <div className="my-auto space-y-6">
                  {/* handshake Logo */}
                  <div className="flex justify-center">
                    <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center border border-amber-500/20">
                      <span className="text-4xl">🤝</span>
                    </div>
                  </div>

                  <div className="text-center space-y-2">
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight font-sans">Rant C2C</h1>
                    <p className="text-xs text-amber-600 font-bold tracking-wider uppercase">Verified Contact Active</p>
                    <p className="text-xs text-slate-500 max-w-[240px] mx-auto leading-relaxed">
                      Your phone number <strong className="font-mono text-slate-700">{selectedCountry.code} {phoneInput}</strong> is verified! Choose your workspace role.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-center">
                    <span className="text-[11px] font-bold uppercase text-slate-400 tracking-widest">Select your active role:</span>
                  </div>

                  {/* Rent Option */}
                  <button
                    onClick={() => {
                      setSelectedRole('Consumer');
                      setScreen('PROFILE_SETUP');
                    }}
                    className="w-full p-4 bg-white border-2 border-slate-100 hover:border-amber-500 rounded-2xl text-left flex items-center gap-4 transition-all shadow-sm group active:scale-[0.98]"
                  >
                    <div className="w-10 h-10 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-all">
                      🛍️
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">Consumer (Renter)</h3>
                      <p className="text-[11px] text-slate-400">Discover items & message lords in person</p>
                    </div>
                  </button>

                  {/* Lend Option */}
                  <button
                    onClick={() => {
                      setSelectedRole('Lord');
                      setScreen('PROFILE_SETUP');
                    }}
                    className="w-full p-4 bg-white border-2 border-slate-100 hover:border-slate-800 rounded-2xl text-left flex items-center gap-4 transition-all shadow-sm group active:scale-[0.98]"
                  >
                    <div className="w-10 h-10 bg-slate-800/10 text-slate-800 rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:bg-slate-800 group-hover:text-white transition-all">
                      👑
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">Lord (Lender)</h3>
                      <p className="text-[11px] text-slate-400">List items, chats, and receive direct inquiries</p>
                    </div>
                  </button>
                </div>

                <div className="text-center pt-4">
                  <p className="text-[10px] text-slate-400">Fully Simulating Firebase SDK Live</p>
                </div>
              </div>
            )}

            {/* 2. PROFILE SETUP SCREEN */}
            {screen === 'PROFILE_SETUP' && (
              <div className="flex-1 flex flex-col p-6 justify-between bg-slate-50">
                <div className="space-y-6">
                  {/* Mini Back Navigation */}
                  <button 
                    onClick={() => setScreen('ROLE_SELECTION')}
                    className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800"
                  >
                    <ChevronLeft className="w-4 h-4" /> Role Selection
                  </button>

                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{selectedRole} Setup</h2>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {selectedRole === 'Lord' 
                        ? 'Your contact phone is displayed on listings so renter consumers can contact you.'
                        : 'Submit details so lords can recognize your connection request instantly.'
                      }
                    </p>
                  </div>

                  {/* Input form */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
                      <input 
                        type="text" 
                        value={userProfile.name}
                        onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                        placeholder="Johnny Cash"
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-amber-500 outline-none font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
                      <input 
                        type="email" 
                        value={userProfile.email}
                        onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                        placeholder="johnny@cash.com"
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-amber-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Phone Number (Verified)</label>
                      <input 
                        type="text" 
                        value={userProfile.phone}
                        disabled
                        className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs outline-none font-bold text-slate-500 cursor-not-allowed font-mono"
                      />
                      <p className="text-[9px] text-amber-600 mt-1 font-bold">✓ Secure SMS verified. Locked to profile.</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setNewPhone(userProfile.phone);
                    setScreen('DASHBOARD');
                    setBottomTab('BROWSE');
                    postNotification('👤 Welcome to Rant C2C', `Logged in as ${userProfile.name} (${selectedRole}) in ${selectedCountry.name}.`);
                  }}
                  className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 text-white shadow-md active:scale-95 transition-all ${
                    selectedRole === 'Lord' ? 'bg-slate-800' : 'bg-amber-500'
                  }`}
                >
                  Complete Setup & Launch <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* 3. MAIN DASHBOARD SCREEN */}
            {screen === 'DASHBOARD' && (
              <div className="flex-1 flex flex-col bg-slate-50 h-full relative">
                
                {/* 3A. BROWSE TAB SCREEN */}
                {bottomTab === 'BROWSE' && (
                  <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Amazon-Style Header Bar */}
                    <div className="bg-[#131921] text-white px-4 py-3.5 flex items-center justify-between shrink-0 shadow-md">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🤝</span>
                        <div>
                          <div className="flex items-center">
                            <span className="font-black text-base text-white tracking-tight font-sans">rant</span>
                            <span className="font-extrabold text-base text-[#febd69] tracking-tight font-sans">c2c</span>
                            <span className="text-[9px] bg-[#febd69] text-slate-900 font-extrabold px-1 rounded ml-1 uppercase">match</span>
                          </div>
                          <div className="flex items-center gap-0.5 text-[8px] text-[#00e9a3] font-bold">
                            <ShieldCheck className="w-3 h-3" /> Secure C2C Direct Broker
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => {
                            setScreen('ROLE_SELECTION');
                          }}
                          className="p-1.5 hover:bg-white/10 rounded-full text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-[10px] font-bold"
                          title="Change role"
                        >
                          <LogOut className="w-3.5 h-3.5 text-[#febd69]" />
                          <span>Exit</span>
                        </button>
                      </div>
                    </div>

                    {/* Amazon-Style "Deliver To" / Country Currency Bar */}
                    <div className="bg-[#232f3e] text-white text-[10px] px-3.5 py-2 flex items-center justify-between shrink-0 shadow-xs">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <MapPin className="w-3.5 h-3.5 text-[#febd69] shrink-0" />
                        <span className="truncate text-slate-200">
                          Renting in <strong className="text-white font-bold">{selectedCountry.flag} {selectedCountry.name}</strong> • Currency: <strong className="text-[#febd69] font-mono">{selectedCountry.currencyCode} ({selectedCountry.currencySymbol.trim()})</strong>
                        </span>
                      </div>
                      <div className="text-[8px] uppercase bg-slate-800 text-[#00e9a3] px-1.5 py-0.5 rounded font-black tracking-wider shrink-0 flex items-center gap-0.5">
                        <span className="w-1.5 h-1.5 bg-[#00e9a3] rounded-full animate-ping" /> Live Broker
                      </div>
                    </div>

                    {/* Scrollable grid area */}
                    <div className="flex-1 overflow-y-auto pb-12">
                      <div className="px-4 py-3.5 bg-gradient-to-b from-slate-100 to-slate-50 border-b border-slate-200 flex items-center justify-between">
                        <div>
                          <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Active Safe Protocol</div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold text-white flex items-center gap-1 shadow-xs ${
                              selectedRole === 'Lord' ? 'bg-[#131921]' : 'bg-amber-500'
                            }`}>
                              {selectedRole === 'Lord' ? '👑 LENDER (LORD)' : '🛍️ BUYER (RENTER)'}
                            </span>
                            <button 
                              onClick={() => {
                                const newRole = selectedRole === 'Lord' ? 'Consumer' : 'Lord';
                                setSelectedRole(newRole);
                                postNotification('🔄 Role Swapped', `Now browsing listings as a ${newRole}.`);
                              }}
                              className="text-[10px] text-blue-600 font-extrabold hover:underline"
                            >
                              (Swap Profile View)
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-black text-[#111111] block">Secure Verification Code:</span>
                          <span className="text-xs font-mono font-extrabold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 block mt-0.5">#{handoffCode}</span>
                        </div>
                      </div>

                      {/* Amazon-Style Search Bar */}
                      <div className="px-3 py-2.5 bg-slate-50">
                        <div className="flex rounded-lg overflow-hidden border border-slate-300 focus-within:ring-2 focus-within:ring-[#febd69] focus-within:border-[#febd69] bg-white shadow-xs">
                          <div className="relative flex-1">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                            <input 
                              type="text" 
                              placeholder="Search camera, clothing, lofts, pickup..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full bg-transparent py-2 pl-9 pr-4 text-xs outline-none text-[#111111]"
                            />
                          </div>
                          <button className="bg-[#febd69] hover:bg-[#f0c14b] text-slate-900 px-4 flex items-center justify-center transition-colors">
                            <Search className="w-4 h-4 stroke-[2.5]" />
                          </button>
                        </div>
                      </div>

                      {/* 6 Category Icons Grid */}
                      <div className="px-4 py-2">
                        <h3 className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Shop by category</h3>
                        <div className="grid grid-cols-4 gap-1.5">
                          <button 
                            onClick={() => setSelectedCategory('All')}
                            className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-all border ${
                              selectedCategory === 'All' 
                                ? 'bg-[#131921] border-[#131921] text-[#febd69] font-black shadow-md scale-105' 
                                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-600'
                            }`}
                          >
                            <Grid className="w-4 h-4" />
                            <span className="text-[9px] font-medium">All</span>
                          </button>

                          {Object.keys(CATEGORY_ICONS).map((catName) => {
                            const IconComponent = CATEGORY_ICONS[catName as keyof typeof CATEGORY_ICONS];
                            const isSelected = selectedCategory === catName;
                            return (
                              <button 
                                key={catName}
                                onClick={() => setSelectedCategory(catName)}
                                className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-all border ${
                                  isSelected 
                                    ? 'bg-[#131921] border-[#131921] text-[#febd69] font-black shadow-md scale-105' 
                                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-600'
                                }`}
                              >
                                <IconComponent className="w-4 h-4" />
                                <span className="text-[9px] font-medium truncate max-w-full">{catName}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Amazon Security Escrow-Free Alert banner */}
                      <div className="mx-4 my-2 p-2.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2">
                        <span className="text-sm shrink-0">🛡️</span>
                        <div>
                          <h4 className="text-[10px] font-bold text-amber-900">Amazon-Style Security System Active</h4>
                          <p className="text-[9px] text-amber-700 leading-tight mt-0.5">
                            Rant C2C acts as a verified broker. Secure direct handovers are completed using the 4-digit in-app Handoff Code <strong>#{handoffCode}</strong>. No online payment risks!
                          </p>
                        </div>
                      </div>

                      {/* Listings Grid */}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            {selectedCategory === 'All' ? 'Broker Listings' : `${selectedCategory} category`}
                          </h3>
                          <span className="text-[10px] text-[#0f1111] font-bold">{filteredListings.length} available</span>
                        </div>

                        {filteredListings.length === 0 ? (
                          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-4">
                            <p className="text-xs font-semibold text-slate-400">No active matches found</p>
                            <p className="text-[10px] text-slate-300 mt-1">Try another category filter!</p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2.5">
                            {filteredListings.map((item) => (
                              <div 
                                key={item.id}
                                onClick={() => {
                                  setSelectedItem(item);
                                  setScreen('ITEM_DETAIL');
                                }}
                                className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-95 flex flex-col justify-between"
                              >
                                <div>
                                  <div className="relative aspect-square w-full bg-slate-100">
                                    <img 
                                      src={item.imageUrl} 
                                      alt={item.title}
                                      className="w-full h-full object-cover"
                                    />
                                    <span className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-black/60 text-white text-[8px] font-black rounded uppercase tracking-wider">
                                      {item.category}
                                    </span>
                                    
                                    {/* Amazon Choice style tag */}
                                    {item.isRantChoice && (
                                      <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 bg-[#232f3e] text-[#febd69] text-[8px] font-black rounded-sm shadow-xs">
                                        RANT CHOICE
                                      </span>
                                    )}
                                  </div>
                                  <div className="p-2.5 space-y-1">
                                    <h4 className="font-bold text-[#111111] text-[11px] line-clamp-2 leading-snug">{item.title}</h4>
                                    
                                    {/* Star rating similar to Amazon */}
                                    <div className="flex items-center gap-1">
                                      <div className="flex text-amber-500 text-[10px] font-bold">
                                        {'★'.repeat(Math.floor(item.rating || 5))}
                                        {(item.rating || 5) % 1 >= 0.5 ? '½' : ''}
                                      </div>
                                      <span className="text-[9px] text-[#007185] font-semibold hover:underline">
                                        {(item.rating || 4.8).toFixed(1)} ({item.reviews || 12})
                                      </span>
                                    </div>
                                    
                                    <p className="text-[9px] text-slate-500 font-medium">Lord: <strong className="text-slate-700">{item.lordName}</strong></p>
                                  </div>
                                </div>
                                
                                <div className="p-2.5 pt-0 border-t border-slate-50 flex items-center justify-between bg-slate-50/50">
                                  <div className="flex items-baseline gap-0.5">
                                    <span className="text-xs font-black text-[#111111]">{formatPriceValue(item.price, selectedCountry)}</span>
                                    <span className="text-[8px] text-slate-500">/day</span>
                                  </div>
                                  <span className="text-[8px] text-emerald-600 font-extrabold flex items-center gap-0.5">
                                    <ShieldCheck className="w-3 h-3 text-emerald-500" /> Secure
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3B. IN-APP CHATS TAB */}
                {bottomTab === 'CHATS' && (
                  <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
                    {/* Header with Amazon Deep Slate Theme */}
                    <div className="bg-[#131921] text-white px-4 py-3 flex items-center justify-between shrink-0 shadow-md">
                      <div className="flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4 text-[#febd69]" />
                        <h2 className="font-black text-xs text-white uppercase tracking-wider font-sans">
                          {activeInAppChat ? 'Secure Chat Terminal' : 'In-App Secure Chats'}
                        </h2>
                      </div>
                      <span className="text-[9px] text-[#00e9a3] bg-slate-800 border border-slate-700 px-2 py-0.5 rounded font-bold uppercase tracking-widest">
                        🛡️ Locked
                      </span>
                    </div>

                    {activeInAppChat ? (
                      /* Individual Chat Room Screen inside Bottom tab view */
                      <div className="flex-1 flex flex-col h-full bg-slate-100 overflow-hidden relative">
                        {/* Room Header Info */}
                        <div className="bg-white border-b border-slate-200 px-3.5 py-2.5 flex items-center justify-between shrink-0">
                          <button 
                            onClick={() => setActiveInAppChat(null)}
                            className="text-xs font-black text-[#007185] hover:underline flex items-center gap-0.5"
                          >
                            <ChevronLeft className="w-4 h-4 stroke-[2.5]" /> Threads
                          </button>
                          
                          <div className="text-center min-w-0 flex-1 px-4">
                            <div className="flex items-center justify-center gap-1">
                              <h4 className="text-xs font-extrabold text-[#111111] truncate">
                                {selectedRole === 'Lord'
                                  ? (activeInAppChat.id === 'chat_marcus' || activeInAppChat.id === 'chat_beatrice' ? 'Alexander (Renter Customer)' : 'Renter Inquirer')
                                  : `${activeInAppChat.receiverName} (Lender Lord)`}
                              </h4>
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />
                            </div>
                            <p className="text-[9px] text-slate-500 font-bold truncate">Rental Asset: {activeInAppChat.itemTitle}</p>
                          </div>
                          
                          <div className="w-8 shrink-0 flex justify-end">
                            <span className="text-lg">🤝</span>
                          </div>
                        </div>

                        {/* Collapsible Safe Handover Checklist Card */}
                        <div className="bg-amber-50 border-b border-[#febd69]/30 p-2.5 space-y-2 shrink-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs">📋</span>
                              <h5 className="text-[10px] font-black text-amber-900 uppercase tracking-wider">Physical Handoff Safety Protocol</h5>
                            </div>
                            
                            <span className="text-[8px] uppercase font-bold text-[#232f3e] bg-[#febd69] px-1 rounded">
                              Direct Match
                            </span>
                          </div>

                          <div className="grid grid-cols-3 gap-1.5 text-[9px]">
                            <div className="bg-white/80 p-1.5 rounded border border-[#febd69]/20 text-center">
                              <div className="text-emerald-600 font-extrabold flex items-center justify-center gap-0.5">✓ Identity</div>
                              <div className="text-[8px] text-slate-500 mt-0.5">SMS Verified</div>
                            </div>

                            <div className="bg-white/80 p-1.5 rounded border border-[#febd69]/20 text-center">
                              <div className="text-emerald-600 font-extrabold flex items-center justify-center gap-0.5">✓ Contact</div>
                              <div className="text-[8px] text-slate-500 mt-0.5">Match Opened</div>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                if (!handoffVerified) {
                                  setHandoffVerified(true);
                                  postNotification('✓ Security Handoff Verified', `Handoff passcode match succeeded inside secure chat room!`);
                                } else {
                                  setHandoffVerified(false);
                                }
                              }}
                              className={`p-1.5 rounded border text-center transition-all ${
                                handoffVerified 
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold' 
                                  : 'bg-[#febd69] hover:bg-[#f0c14b] border-[#febd69] text-slate-900 font-extrabold shadow-sm active:scale-95'
                              }`}
                            >
                              <div>{handoffVerified ? '✓ Code Match' : '🔑 Lock Code'}</div>
                              <div className="text-[8px] text-slate-700 mt-0.5">#{handoffCode}</div>
                            </button>
                          </div>
                        </div>

                        {/* Interactive Sandbox perspective switcher helper */}
                        <div className="bg-slate-800 text-slate-200 px-3.5 py-2 flex items-center justify-between text-[10px] select-none shrink-0 border-b border-slate-700">
                          <span className="text-slate-300 font-medium">
                            Viewing as: <strong className="text-[#febd69] font-black">{selectedRole === 'Lord' ? '👑 Lord (Lender)' : '🛍️ Consumer (Renter)'}</strong>
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const nextRole = selectedRole === 'Lord' ? 'Consumer' : 'Lord';
                              setSelectedRole(nextRole);
                              postNotification('🔄 Perspective Shifted', `Now replying as ${nextRole}!`);
                            }}
                            className="text-[9px] font-black text-slate-900 bg-[#febd69] hover:bg-[#f0c14b] px-2 py-0.5 rounded shadow-sm flex items-center gap-1 transition-colors"
                          >
                            Swap Identity
                          </button>
                        </div>

                        {/* Message Stream */}
                        <div className="flex-1 overflow-y-auto p-3.5 space-y-3 pb-24">
                          {activeInAppChat.messages.map((m: any, idx: number) => {
                            // Correct perspective detection: If viewing as Lord, Lord messages are 'isMe'. Else user messages are 'isMe'.
                            const isMe = selectedRole === 'Lord' ? m.sender === 'lord' : m.sender === 'user';
                            return (
                              <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-2.5 rounded-lg max-w-[85%] text-xs shadow-xs ${
                                  isMe 
                                    ? 'bg-[#131921] text-white rounded-tr-none border border-slate-800' 
                                    : 'bg-white text-slate-800 rounded-tl-none border border-slate-200'
                                }`}>
                                  {/* Sender Label */}
                                  <div className="text-[8px] font-bold uppercase tracking-wider mb-0.5 opacity-70">
                                    {isMe 
                                      ? (selectedRole === 'Lord' ? 'Lender Lord (You)' : 'Renter Customer (You)')
                                      : (selectedRole === 'Lord' ? 'Renter Customer' : 'Lender Lord')
                                    }
                                  </div>
                                  <p className="leading-normal font-sans">{m.text}</p>
                                  <span className="text-[7px] text-right block mt-1 opacity-60 font-mono">{m.time}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Action Pills for conversation starters */}
                        <div className="absolute bottom-[52px] left-0 right-0 px-3 py-1 bg-slate-50 border-t border-slate-200 flex gap-1.5 overflow-x-auto shrink-0 z-10 select-none">
                          <button
                            type="button"
                            onClick={() => {
                              setTypedInAppMessage(selectedRole === 'Lord' 
                                ? "Hi! Let's meet at Central Square to verify the handoff passcode."
                                : "Hello Lord! Where is the best public space to meet for pickup?"
                              );
                            }}
                            className="text-[9px] font-bold text-[#007185] bg-white border border-slate-300 hover:border-[#007185] px-2 py-1 rounded-full whitespace-nowrap shadow-xs shrink-0"
                          >
                            📍 Propose Meeting
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => {
                              setTypedInAppMessage(selectedRole === 'Lord'
                                ? "I inspected it. Are you ready to submit the code on-screen?"
                                : "Everything looks perfect. I've entered the code on my screen."
                              );
                            }}
                            className="text-[9px] font-bold text-[#007185] bg-white border border-slate-300 hover:border-[#007185] px-2 py-1 rounded-full whitespace-nowrap shadow-xs shrink-0"
                          >
                            🔑 Verify Handoff Code
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setTypedInAppMessage("Is there any cash deposit or insurance waiver I need to sign?");
                            }}
                            className="text-[9px] font-bold text-[#007185] bg-white border border-slate-300 hover:border-[#007185] px-2 py-1 rounded-full whitespace-nowrap shadow-xs shrink-0"
                          >
                            📑 Deposit & Paperwork
                          </button>
                        </div>

                        {/* Input bar */}
                        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-2 flex items-center gap-1.5 shrink-0 z-10">
                          <input 
                            type="text" 
                            placeholder={selectedRole === 'Lord' ? "Reply to renter customer..." : "Ask lender about pickup rules..."}
                            value={typedInAppMessage}
                            onChange={(e) => setTypedInAppMessage(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSendInAppMessage();
                            }}
                            className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-[#febd69] font-sans"
                          />
                          <button 
                            onClick={handleSendInAppMessage}
                            className="w-8.5 h-8.5 bg-[#febd69] hover:bg-[#f0c14b] text-slate-900 rounded-lg flex items-center justify-center shrink-0 active:scale-90 transition-transform border border-amber-400"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Chats List Screen */
                      <div className="flex-1 overflow-y-auto p-4 space-y-2 pb-12 bg-slate-50">
                        {inAppChats.length === 0 ? (
                          <div className="text-center py-16 bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
                            <p className="text-xs font-bold text-slate-400">No active conversations</p>
                            <p className="text-[10px] text-slate-300 mt-1">Initiate an in-app chat secure thread from any item details page!</p>
                          </div>
                        ) : (
                          inAppChats.map((chat) => {
                            const chatDisplayName = selectedRole === 'Lord'
                              ? (chat.id === 'chat_marcus' || chat.id === 'chat_beatrice' ? 'Alexander (Renter)' : 'Renter Inquirer')
                              : chat.receiverName;
                            
                            const isLenderThread = selectedRole !== 'Lord';
                            
                            return (
                              <div 
                                key={chat.id}
                                onClick={() => {
                                  // Mark as read
                                  chat.unread = false;
                                  setActiveInAppChat(chat);
                                }}
                                className="bg-white border border-slate-200 hover:border-[#febd69] p-3.5 rounded-lg flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] shadow-xs"
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className="relative shrink-0">
                                    <div className="w-10 h-10 bg-[#131921] text-[#febd69] rounded-full flex items-center justify-center text-xs font-black border border-slate-700">
                                      {chatDisplayName[0].toUpperCase()}
                                    </div>
                                    {chat.unread && (
                                      <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                                    )}
                                  </div>
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <h4 className="font-extrabold text-[#111111] text-xs truncate">{chatDisplayName}</h4>
                                      <span className={`text-[8px] font-black uppercase px-1 rounded-sm shrink-0 ${
                                        isLenderThread 
                                          ? 'bg-[#febd69]/20 text-[#855e00] border border-[#febd69]/30' 
                                          : 'bg-emerald-50 text-emerald-800 border border-emerald-100'
                                      }`}>
                                        {isLenderThread ? 'LENDER LORD' : 'RENTER CUSTOMER'}
                                      </span>
                                    </div>
                                    <p className="text-[9px] text-[#007185] font-bold uppercase tracking-wide mt-0.5 truncate max-w-[180px]">{chat.itemTitle}</p>
                                    <p className="text-[10px] text-slate-500 truncate max-w-[180px] mt-0.5">{chat.lastMessage}</p>
                                  </div>
                                </div>
                                <div className="text-right shrink-0 pl-2">
                                  <span className="text-[8px] text-slate-400 font-mono block">{chat.time}</span>
                                  <span className="text-[8px] text-emerald-600 font-extrabold mt-1 inline-flex items-center gap-0.5 bg-emerald-50 px-1 py-0.5 rounded border border-emerald-100">
                                    <ShieldCheck className="w-2.5 h-2.5 text-emerald-500" /> Secure
                                  </span>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* 3C. NOTIFICATIONS TAB */}
                {bottomTab === 'NOTIFICATIONS' && (
                  <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
                    <div className="bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between shrink-0">
                      <h2 className="font-extrabold text-sm text-slate-800">Alert Center</h2>
                      <button 
                        onClick={() => {
                          setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                        }}
                        className="text-[10px] text-amber-600 font-bold hover:underline"
                      >
                        Mark all read
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-2 pb-12">
                      {notifications.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 p-4">
                          <p className="text-xs font-bold text-slate-400">Quiet alerts inbox</p>
                          <p className="text-[10px] text-slate-300 mt-1">Triggers match alerts during transactions.</p>
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <div 
                            key={notif.id}
                            onClick={() => {
                              setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
                            }}
                            className={`p-3 rounded-2xl border transition-all ${
                              notif.read 
                                ? 'bg-white border-slate-100 opacity-75' 
                                : 'bg-amber-500/5 border-amber-500/10 font-medium'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-1">
                              <h4 className="text-xs font-bold text-slate-800">{notif.title}</h4>
                              <span className="text-[8px] text-slate-400 font-mono shrink-0">{notif.time}</span>
                            </div>
                            <p className="text-[10px] text-slate-600 leading-normal mt-1">{notif.body}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* Simulated Bottom Navigation Bar on Dashboard screens */}
                <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 py-1.5 px-6 flex items-center justify-between shrink-0 z-20">
                  <button 
                    onClick={() => {
                      setBottomTab('BROWSE');
                      setActiveInAppChat(null);
                    }}
                    className={`flex flex-col items-center justify-center transition-all ${
                      bottomTab === 'BROWSE' ? 'text-amber-500 font-bold' : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    <Grid className="w-4.5 h-4.5" />
                    <span className="text-[8px] mt-0.5">Browse grid</span>
                  </button>

                  <button 
                    onClick={() => {
                      setBottomTab('CHATS');
                    }}
                    className={`flex flex-col items-center justify-center transition-all relative ${
                      bottomTab === 'CHATS' ? 'text-amber-500 font-bold' : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    <MessageCircle className="w-4.5 h-4.5" />
                    <span className="text-[8px] mt-0.5">In-App Chat</span>
                    {unreadCount > 0 && (
                      <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  <button 
                    onClick={() => {
                      setBottomTab('NOTIFICATIONS');
                      setActiveInAppChat(null);
                    }}
                    className={`flex flex-col items-center justify-center transition-all relative ${
                      bottomTab === 'NOTIFICATIONS' ? 'text-amber-500 font-bold' : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    <Bell className="w-4.5 h-4.5" />
                    <span className="text-[8px] mt-0.5">Alerts inbox</span>
                    {unreadNotifications > 0 && (
                      <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                        {unreadNotifications}
                      </span>
                    )}
                  </button>
                </div>

                {/* Floating Create Listing button if role is Lord */}
                {selectedRole === 'Lord' && bottomTab === 'BROWSE' && (
                  <button
                    onClick={() => setScreen('CREATE_LISTING')}
                    className="absolute bottom-16 right-4 bg-slate-800 text-white font-bold p-3.5 rounded-full shadow-lg flex items-center justify-center hover:bg-slate-700 transition-colors active:scale-90 z-20"
                    title="Add listing"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}

            {/* 4. ITEM DETAIL SCREEN */}
            {screen === 'ITEM_DETAIL' && selectedItem && (
              <div className="flex-1 flex flex-col bg-white">
                {/* Header Navigation */}
                <div className="px-4 py-3 flex items-center justify-between shrink-0 bg-[#131921] text-white">
                  <button 
                    onClick={() => {
                      setSelectedItem(null);
                      setScreen('DASHBOARD');
                    }}
                    className="p-1 hover:bg-white/10 rounded-lg text-[#febd69] flex items-center gap-1 text-xs font-black"
                  >
                    <ChevronLeft className="w-4 h-4 stroke-[3]" /> Back to Search
                  </button>
                  <span className="text-[10px] text-slate-300 font-extrabold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00e9a3]" /> Secured Matchmaker
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto pb-6 bg-white">
                  {/* Category Breadcrumbs */}
                  <div className="px-4 py-2 bg-slate-50 text-[10px] text-[#007185] font-semibold flex items-center gap-1.5 border-b border-slate-200">
                    <span>Rentals</span>
                    <span>&gt;</span>
                    <span className="uppercase">{selectedItem.category}</span>
                    <span>&gt;</span>
                    <span className="text-slate-500 font-normal truncate max-w-[120px]">{selectedItem.title}</span>
                  </div>

                  {/* Cover Image with Rant Choice Badge Overlay */}
                  <div className="relative aspect-video w-full bg-slate-100 border-b border-slate-200">
                    <img 
                      src={selectedItem.imageUrl} 
                      alt={selectedItem.title} 
                      className="w-full h-full object-cover"
                    />
                    
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-[#131921]/90 text-[#febd69] text-[9px] font-black rounded shadow-md border border-[#febd69]/20 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-[#00e9a3] rounded-full" /> Verified Active Lord Asset
                    </div>

                    {selectedItem.isRantChoice && (
                      <div className="absolute bottom-2.5 left-2.5 px-3 py-1 bg-[#232f3e] text-[#febd69] text-[10px] font-black rounded shadow-md border-l-4 border-amber-500">
                        🏆 RANT CHOICE
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-4">
                    {/* Brand Name & Title */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-[#007185] font-bold tracking-wide hover:underline">
                          Lord Profile: {selectedItem.lordName}
                        </span>
                        
                        {/* Amazon-style prime delivery text */}
                        <span className="text-[10px] text-[#00e9a3] bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded font-bold">
                          ✓ Direct Handoff
                        </span>
                      </div>
                      
                      <h2 className="text-sm font-extrabold text-[#111111] leading-snug">{selectedItem.title}</h2>
                      
                      {/* Amazon Rating Block */}
                      <div className="flex items-center gap-1.5 pt-0.5">
                        <div className="flex text-amber-500 text-xs font-bold">
                          {'★'.repeat(Math.floor(selectedItem.rating || 4))}
                          {(selectedItem.rating || 4.8) % 1 >= 0.5 ? '½' : ''}
                        </div>
                        <span className="text-xs text-[#007185] font-bold">
                          {(selectedItem.rating || 4.8).toFixed(1)} out of 5 stars
                        </span>
                        <span className="text-xs text-[#565959]">•</span>
                        <span className="text-xs text-[#007185] hover:underline">
                          {selectedItem.reviews || 12} customer reviews
                        </span>
                      </div>
                    </div>

                    {/* Rent price block style like Amazon's custom price box */}
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs text-[#565959] font-medium">Daily rate:</span>
                        <span className="text-2xl font-extrabold text-[#111111]">{formatPriceValue(selectedItem.price, selectedCountry)}</span>
                        <span className="text-xs text-[#565959] font-medium">/ per rental day</span>
                      </div>
                      
                      <div className="text-[10px] text-slate-500 leading-tight flex items-center gap-1.5 font-medium">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shrink-0" /> 
                        Available immediately in {selectedCountry.name} zone.
                      </div>
                    </div>

                    {/* Description Paragraph */}
                    <div className="space-y-1">
                      <h4 className="text-xs font-black text-[#111111]">Product Description</h4>
                      <p className="text-xs text-[#333333] leading-relaxed">
                        {selectedItem.description}
                      </p>
                    </div>

                    {/* Specifications List */}
                    <div className="space-y-1.5 border-t border-slate-200 pt-3">
                      <h4 className="text-xs font-black text-[#111111]">Product Specifications</h4>
                      <div className="grid grid-cols-1 gap-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        {(selectedItem.specs || ["Standard model", "Full accessories included", "Meet lender in person"]).map((spec, sidx) => (
                          <div key={sidx} className="flex items-start gap-2 text-xs text-[#333333]">
                            <span className="text-amber-500 font-bold shrink-0">•</span>
                            <span className="font-medium">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* SECURE HANDOFF VERIFICATION BOX */}
                    <div className="border-2 border-[#febd69]/30 bg-amber-50/40 rounded-xl p-3.5 space-y-3 shadow-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base shrink-0">🛡️</span>
                        <div>
                          <h4 className="text-xs font-black text-slate-900">Direct Handoff Security Protocol</h4>
                          <p className="text-[9px] text-slate-500">Physical peer verification checklist</p>
                        </div>
                      </div>

                      <div className="bg-white p-2.5 rounded-lg border border-slate-200 space-y-2">
                        <p className="text-[10px] text-slate-600 leading-normal">
                          Lords must inspect the user ID and key. Renters must inspect the item condition in person. Upon agreement, verify using the security code:
                        </p>
                        
                        <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-500">Your secure handoff passcode:</span>
                          <span className="text-xs font-mono font-black text-[#131921] bg-[#febd69] px-2 py-0.5 rounded shadow-xs">
                            #{handoffCode}
                          </span>
                        </div>

                        {/* Interactive Verification Input */}
                        {!handoffVerified ? (
                          <div className="space-y-1.5 pt-1.5">
                            <label className="block text-[10px] font-bold text-slate-600 uppercase">Simulate Verification Code Entry:</label>
                            <div className="flex gap-1.5">
                              <input 
                                type="text"
                                maxLength={4}
                                placeholder="Enter code here"
                                value={enteredHandoffCode}
                                onChange={(e) => {
                                  setEnteredHandoffCode(e.target.value.replace(/[^0-9]/g, ''));
                                  setHandoffError('');
                                }}
                                className="flex-1 px-2 py-1.5 bg-white border border-slate-300 rounded text-xs text-center font-mono font-bold outline-none focus:ring-1 focus:ring-amber-500"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (enteredHandoffCode === handoffCode) {
                                    setHandoffVerified(true);
                                    setHandoffError('');
                                    postNotification('✓ Security Handoff Verified', `Secure transaction code match succeeded for ${selectedItem.title}!`);
                                  } else {
                                    setHandoffError('Incorrect passcode! Check code above.');
                                  }
                                }}
                                className="px-3 py-1.5 bg-[#131921] hover:bg-slate-800 text-[#febd69] text-xs font-bold rounded shadow-sm transition-colors"
                              >
                                Submit
                              </button>
                            </div>
                            {handoffError && (
                              <p className="text-[9px] text-red-500 font-bold">{handoffError}</p>
                            )}
                            <div className="text-right">
                              <button
                                type="button"
                                onClick={() => {
                                  setEnteredHandoffCode(handoffCode);
                                  setHandoffError('');
                                }}
                                className="text-[9px] text-amber-700 font-bold hover:underline"
                              >
                                ⚡ Autofill code
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200 flex items-center justify-center gap-2 animate-bounce">
                            <Check className="w-4.5 h-4.5 text-emerald-600 stroke-[3]" />
                            <span className="text-[10px] font-black">SECURITY HANDOFF VERIFIED SUCCESSFUL!</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Lord profile Card */}
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-900 text-white font-extrabold rounded-full flex items-center justify-center text-sm shadow-xs border border-slate-200">
                        {selectedItem.lordName[0].toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-black text-slate-800">{selectedItem.lordName} (Lender)</h4>
                        <div className="flex items-center gap-1">
                          <span className="text-[9px] text-emerald-600 font-bold">★ 4.9 Verified Lord</span>
                          <span className="text-slate-300 text-[9px]">•</span>
                          <span className="text-[9px] text-slate-500 font-mono">{selectedItem.lordPhone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Connection buttons (In-App Chat, WhatsApp, Call) */}
                    <div className="space-y-2 pt-2 border-t border-slate-200">
                      <h4 className="text-[9px] font-extrabold uppercase tracking-widest text-[#565959]">Choose a secure connection method:</h4>
                      
                      {/* Secure In-App Messaging direct button - HIGHLY PROMINENT */}
                      <button
                        onClick={startInAppChat}
                        className="w-full p-3 bg-gradient-to-r from-[#ffd814] to-[#f7ca00] hover:from-[#f7ca00] hover:to-[#f5b800] text-[#111111] font-black text-xs rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md border border-[#f0c14b]"
                      >
                        <MessageCircle className="w-4.5 h-4.5 text-[#111111] fill-[#111111]" />
                        <span>Open Secure In-App Chat Room</span>
                      </button>

                      {/* Other external direct channels */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={triggerSimulatedCall}
                          className="p-2.5 bg-white border border-slate-300 hover:border-[#131921] rounded-xl text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs"
                        >
                          <Phone className="w-3.5 h-3.5 text-slate-700" />
                          <span>Call Direct</span>
                        </button>

                        <button
                          onClick={triggerSimulatedWhatsApp}
                          className="p-2.5 bg-[#25d366] hover:bg-[#20ba5a] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs border border-emerald-600"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp Messenger</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. CREATE LISTING SCREEN */}
            {screen === 'CREATE_LISTING' && (
              <form onSubmit={handleCreateListing} className="flex-1 flex flex-col bg-slate-50 justify-between">
                {/* Header Navigation */}
                <div className="px-4 py-3 flex items-center justify-between shrink-0 bg-white border-b border-slate-100">
                  <button 
                    type="button"
                    onClick={() => {
                      setBottomTab('BROWSE');
                      setScreen('DASHBOARD');
                    }}
                    className="p-1 hover:bg-slate-100 rounded-full text-slate-600 flex items-center gap-1 text-xs font-bold"
                  >
                    <ChevronLeft className="w-4 h-4" /> Cancel
                  </button>
                  <span className="text-xs font-bold text-slate-800">Add Listing</span>
                  <div className="w-4" />
                </div>

                {/* Form fields scroll */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
                  {/* Category */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Category Group</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:border-amber-500 font-medium"
                    >
                      <option value="Clothing">Clothing</option>
                      <option value="Motorcycle">Motorcycle</option>
                      <option value="Car">Car</option>
                      <option value="Pickups">Pickups</option>
                      <option value="Gadgets">Gadgets</option>
                      <option value="Housing">Housing</option>
                      <option value="Books">Books & Stationery</option>
                    </select>
                  </div>

                  {/* Image Upload Option */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Product / Material / Service Image</label>
                    
                    {newImageUrl ? (
                      <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-white aspect-video group">
                        <img 
                          src={newImageUrl} 
                          alt="Product preview" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => setNewImageUrl('')}
                            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition-all active:scale-95 flex items-center gap-1 font-bold text-[10px]"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Remove Image
                          </button>
                        </div>
                        {/* Overlay quick deletion for small phone viewport too */}
                        <button
                          type="button"
                          onClick={() => setNewImageUrl('')}
                          className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-600 text-white rounded-lg shadow-sm backdrop-blur-sm transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div 
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const file = e.dataTransfer.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setNewImageUrl(reader.result as string);
                              postNotification('📸 Image Uploaded', `Successfully loaded "${file.name}" product photo via drag & drop.`);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="border border-dashed border-slate-300 hover:border-amber-500 bg-white rounded-xl p-4 flex flex-col items-center justify-center text-center transition-colors cursor-pointer group relative"
                        onClick={() => document.getElementById('product-image-file-input')?.click()}
                      >
                        <input 
                          type="file"
                          id="product-image-file-input"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <UploadCloud className="w-7 h-7 text-slate-400 group-hover:text-amber-500 transition-colors mb-1" />
                        <span className="font-bold text-slate-700 text-[10.5px]">Upload Product Image</span>
                        <span className="text-[9px] text-slate-400 mt-0.5">Drag & drop or tap to select image</span>
                        
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Generate custom category placeholder image
                            const randomId = Math.floor(Math.random() * 1000);
                            const simulatedUrl = `https://images.unsplash.com/photo-${randomId % 2 === 0 ? '1540555700478-4be289fbecef' : '1505740420928-5e560c06d30e'}?w=500&auto=format&fit=crop`;
                            setNewImageUrl(simulatedUrl);
                            postNotification('⚡ Demo Image Generated', 'Loaded matching product demonstration placeholder!');
                          }}
                          className="mt-2 text-[9px] text-amber-600 font-bold hover:underline bg-amber-500/5 hover:bg-amber-500/10 px-2 py-1 rounded"
                        >
                          Or use random demo photo
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Rental Asset Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. BMW Sports Car"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                      className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Rental Price ({selectedCountry.currencyCode} / day)</label>
                    <input 
                      type="number" 
                      placeholder={`e.g. 50 (in ${selectedCountry.currencySymbol.trim()})`}
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      required
                      className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:border-amber-500 font-bold"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Handoff Instructions / Specs</label>
                    <textarea 
                      placeholder="e.g. Fuel tank is full. Meet up near Central Station. Bring ID cards."
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      rows={3}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:border-amber-500 leading-relaxed"
                    />
                  </div>

                  {/* Contact Phone */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Contact Phone</label>
                    <input 
                      type="text" 
                      placeholder="+1 (415) 555-0123"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      required
                      className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="p-4 bg-white border-t border-slate-100">
                  <button
                    type="submit"
                    className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                  >
                    Publish Broker Listing
                  </button>
                </div>
              </form>
            )}

          </div>

          {/* SIMULATED DIRECT MATCHER INTERACTION: PHONE CALL OVERLAY */}
          {callActive && selectedItem && (
            <div className="absolute inset-0 bg-slate-950/95 z-50 flex flex-col justify-between p-8 text-white font-sans">
              <div className="text-center pt-16 space-y-4">
                {/* Outgoing ring */}
                <div className="flex justify-center">
                  <div className="w-24 h-24 bg-amber-500/10 border-2 border-amber-500 animate-pulse rounded-full flex items-center justify-center">
                    <span className="text-4xl text-amber-500 animate-bounce">📞</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-[11px] font-bold text-amber-500 uppercase tracking-widest animate-pulse">Dialing Matchmaker Link</p>
                  <h3 className="text-xl font-bold mt-2">{selectedItem.lordName}</h3>
                  <p className="text-xs text-slate-400 mt-1 font-mono">{selectedItem.lordPhone}</p>
                </div>

                <div className="text-xs text-emerald-400 font-mono bg-emerald-500/10 px-3 py-1 rounded-full inline-block">
                  Duration: {formatTime(callDuration)}
                </div>
              </div>

              <div className="space-y-6 text-center pb-12">
                <p className="text-[10px] text-slate-500 max-w-[200px] mx-auto leading-relaxed">
                  In the live Flutter app, this triggers native dialer packages like <code>url_launcher</code> on physical devices.
                </p>

                {/* Decline Button */}
                <button 
                  onClick={() => setCallActive(false)}
                  className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors mx-auto active:scale-90 shadow-lg"
                >
                  <Phone className="w-6 h-6 rotate-135 text-white" />
                </button>
              </div>
            </div>
          )}

          {/* SIMULATED DIRECT MATCHER INTERACTION: WHATSAPP OVERLAY */}
          {whatsappActive && selectedItem && (
            <div className="absolute inset-0 bg-[#E5DDD5] z-50 flex flex-col justify-between font-sans">
              
              {/* WhatsApp Header */}
              <div className="bg-[#075E54] text-white px-4 py-3 pt-8 flex items-center gap-3 shadow-sm shrink-0">
                <button 
                  onClick={() => setWhatsappActive(false)}
                  className="text-white hover:opacity-80 flex items-center"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="w-8 h-8 bg-slate-800 text-white font-bold rounded-full flex items-center justify-center text-xs">
                  {selectedItem.lordName[0]}
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-none">{selectedItem.lordName}</h4>
                  <p className="text-[9px] text-teal-100 mt-0.5 font-semibold">online • Rant Matchmaker</p>
                </div>
              </div>

              {/* Chat timeline */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
                {whatsappMessages.map((msg, i) => (
                  <div 
                    key={i}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`p-3 rounded-xl max-w-[80%] text-xs shadow-sm ${
                      msg.sender === 'user' 
                        ? 'bg-[#DCF8C6] text-slate-800 rounded-tr-none' 
                        : 'bg-white text-slate-800 rounded-tl-none'
                    }`}>
                      <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                      <span className="text-[8px] text-slate-400 block text-right mt-1.5 font-bold uppercase tracking-wider">
                        {msg.sender === 'user' ? 'delivered' : 'Lord response'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Chat Box */}
              <div className="bg-[#f0f0f0] p-2 flex items-center gap-2 border-t border-slate-200 shrink-0">
                <input 
                  type="text" 
                  placeholder="Type simulated whatsapp msg..."
                  value={typedWhatsappMessage}
                  onChange={(e) => setTypedWhatsappMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendWhatsappMessage();
                  }}
                  className="flex-1 bg-white rounded-full px-4 py-2 text-xs outline-none border border-slate-200"
                />
                <button 
                  onClick={handleSendWhatsappMessage}
                  className="w-9 h-9 bg-[#075E54] hover:bg-[#128C7E] text-white rounded-full flex items-center justify-center shrink-0 active:scale-90 transition-all shadow"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          )}

          {/* Mobile Bottom Home Indicator */}
          <div className="h-6 bg-white flex items-center justify-center shrink-0">
            <div className="w-28 h-1 bg-slate-200 rounded-full"></div>
          </div>

        </div>
      </div>
      
      {/* Visual Helpers Info */}
      <div className="mt-4 flex flex-col items-center gap-1">
        <div className="flex gap-4 text-center">
          <span className="text-[10px] font-bold text-amber-600 flex items-center gap-1 uppercase tracking-wide">
            🟢 Interactive P2P Chat Simulator
          </span>
          <span className="text-[10px] font-bold text-amber-600 flex items-center gap-1 uppercase tracking-wide">
            🟢 Sliding Push Notification Banner
          </span>
        </div>
        <p className="text-[10px] text-slate-400 mt-1 max-w-sm text-center leading-normal">
          Click <strong>Start Secure In-App Chat</strong> on any item page to experience the dual-client stream with Firestore simulation and system alerts.
        </p>
      </div>
    </div>
  );
}
