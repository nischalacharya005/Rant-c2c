export interface FlutterFile {
  name: string;
  path: string;
  language: string;
  content: string;
  description: string;
}

export interface FolderNode {
  name: string;
  type: 'folder' | 'file';
  path: string;
  children?: FolderNode[];
}

export const FLUTTER_PROJECT_TREE: FolderNode[] = [
  {
    name: 'rant_c2c',
    type: 'folder',
    path: 'rant_c2c',
    children: [
      {
        name: 'pubspec.yaml',
        type: 'file',
        path: 'rant_c2c/pubspec.yaml',
      },
      {
        name: 'lib',
        type: 'folder',
        path: 'rant_c2c/lib',
        children: [
          {
            name: 'main.dart',
            type: 'file',
            path: 'rant_c2c/lib/main.dart',
          },
          {
            name: 'models',
            type: 'folder',
            path: 'rant_c2c/lib/models',
            children: [
              {
                name: 'item_model.dart',
                type: 'file',
                path: 'rant_c2c/lib/models/item_model.dart',
              },
              {
                name: 'user_model.dart',
                type: 'file',
                path: 'rant_c2c/lib/models/user_model.dart',
              },
            ],
          },
          {
            name: 'screens',
            type: 'folder',
            path: 'rant_c2c/lib/screens',
            children: [
              {
                name: 'phone_login_screen.dart',
                type: 'file',
                path: 'rant_c2c/lib/screens/phone_login_screen.dart',
              },
              {
                name: 'role_selection_screen.dart',
                type: 'file',
                path: 'rant_c2c/lib/screens/role_selection_screen.dart',
              },
              {
                name: 'profile_setup_screen.dart',
                type: 'file',
                path: 'rant_c2c/lib/screens/profile_setup_screen.dart',
              },
              {
                name: 'dashboard_screen.dart',
                type: 'file',
                path: 'rant_c2c/lib/screens/dashboard_screen.dart',
              },
              {
                name: 'item_detail_screen.dart',
                type: 'file',
                path: 'rant_c2c/lib/screens/item_detail_screen.dart',
              },
              {
                name: 'create_listing_screen.dart',
                type: 'file',
                path: 'rant_c2c/lib/screens/create_listing_screen.dart',
              },
              {
                name: 'chats_list_screen.dart',
                type: 'file',
                path: 'rant_c2c/lib/screens/chats_list_screen.dart',
              },
              {
                name: 'chat_room_screen.dart',
                type: 'file',
                path: 'rant_c2c/lib/screens/chat_room_screen.dart',
              },
            ],
          },
          {
            name: 'services',
            type: 'folder',
            path: 'rant_c2c/lib/services',
            children: [
              {
                name: 'chat_service.dart',
                type: 'file',
                path: 'rant_c2c/lib/services/chat_service.dart',
              },
              {
                name: 'notification_service.dart',
                type: 'file',
                path: 'rant_c2c/lib/services/notification_service.dart',
              },
            ],
          },
        ],
      },
    ],
  },
];

export const FLUTTER_FILES: Record<string, FlutterFile> = {
  'rant_c2c/pubspec.yaml': {
    name: 'pubspec.yaml',
    path: 'rant_c2c/pubspec.yaml',
    language: 'yaml',
    description: 'Defines the app name, version, assets, and packages used by Rant C2C, such as url_launcher for phone and WhatsApp triggers.',
    content: `name: rant_c2c
description: A peer-to-peer Broker/Matchmaker Rental Marketplace mobile application.
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  
  # Crucial package for placing calls and opening WhatsApp URLs directly
  url_launcher: ^6.2.5
  
  # Firebase Dependencies (Optional, for persistent cloud integration)
  firebase_core: ^2.27.0
  cloud_firestore: ^4.15.5
  
  # Visual icons helper
  cupertino_icons: ^1.0.6

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true
  assets:
    - assets/images/`
  },

  'rant_c2c/lib/main.dart': {
    name: 'main.dart',
    path: 'rant_c2c/lib/main.dart',
    language: 'dart',
    description: 'The app entrypoint configuring the custom rental marketplace orange/slate theme and setting up routing starting from the Phone Login screen.',
    content: `import 'package:flutter/material.dart';
import 'screens/phone_login_screen.dart';

void main() async {
  // If integrating Firebase, uncomment the lines below:
  // WidgetsFlutterBinding.ensureInitialized();
  // await Firebase.initializeApp();
  runApp(const RantC2CApp());
}

class RantC2CApp extends StatelessWidget {
  const RantC2CApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Rant C2C',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        // Cozy rental marketplace colors: Energetic Orange accents with clean Slate backgrounds
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFFFF6B35),
          primary: const Color(0xFFFF6B35),
          secondary: const Color(0xFF2E4057),
          background: const Color(0xFFF7F9FB),
        ),
        textTheme: const TextTheme(
          displaySmall: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF1F2937)),
          headlineMedium: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF1F2937)),
          titleLarge: TextStyle(fontWeight: FontWeight.w600, color: Color(0xFF1F2937)),
          bodyLarge: TextStyle(color: Color(0xFF4B5563)),
        ),
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.white,
          foregroundColor: Color(0xFF1F2937),
          elevation: 0,
          centerTitle: true,
        ),
      ),
      home: const PhoneLoginScreen(),
    );
  }
}`
  },

  'rant_c2c/lib/models/user_model.dart': {
    name: 'user_model.dart',
    path: 'rant_c2c/lib/models/user_model.dart',
    language: 'dart',
    description: 'Data structure modeling a User with properties for their specific chosen marketplace role (Consumer or Lord).',
    content: `class UserModel {
  final String uid;
  final String name;
  final String email;
  final String phone;
  final String role; // 'Consumer' or 'Lord'

  UserModel({
    required this.uid,
    required this.name,
    required this.email,
    required this.phone,
    required this.role,
  });

  Map<String, dynamic> toMap() {
    return {
      'uid': uid,
      'name': name,
      'email': email,
      'phone': phone,
      'role': role,
    };
  }

  factory UserModel.fromMap(Map<String, dynamic> map, String id) {
    return UserModel(
      uid: id,
      name: map['name'] ?? '',
      email: map['email'] ?? '',
      phone: map['phone'] ?? '',
      role: map['role'] ?? 'Consumer',
    );
  }
}`
  },

  'rant_c2c/lib/models/item_model.dart': {
    name: 'item_model.dart',
    path: 'rant_c2c/lib/models/item_model.dart',
    language: 'dart',
    description: 'Data model holding listing metadata including owner phone numbers used for direct matching without escrow.',
    content: `class RentalItemModel {
  final String id;
  final String title;
  final String description;
  final double price;
  final String category; // Clothing, Motorcycle, Car, Pickups, Gadgets, Housing, Books
  final String imageUrl;
  final String lordName;
  final String lordPhone;
  final DateTime createdAt;

  RentalItemModel({
    required this.id,
    required this.title,
    required this.description,
    required this.price,
    required this.category,
    required this.imageUrl,
    required this.lordName,
    required this.lordPhone,
    required this.createdAt,
  });

  Map<String, dynamic> toMap() {
    return {
      'title': title,
      'description': description,
      'price': price,
      'category': category,
      'imageUrl': imageUrl,
      'lordName': lordName,
      'lordPhone': lordPhone,
      'createdAt': createdAt.millisecondsSinceEpoch,
    };
  }

  factory RentalItemModel.fromMap(Map<String, dynamic> map, String docId) {
    return RentalItemModel(
      id: docId,
      title: map['title'] ?? '',
      description: map['description'] ?? '',
      price: (map['price'] ?? 0.0).toDouble(),
      category: map['category'] ?? 'Gadgets',
      imageUrl: map['imageUrl'] ?? '',
      lordName: map['lordName'] ?? 'Anonymous Lord',
      lordPhone: map['lordPhone'] ?? '',
      createdAt: DateTime.fromMillisecondsSinceEpoch(map['createdAt'] ?? DateTime.now().millisecondsSinceEpoch),
    );
  }
}`
  },

  'rant_c2c/lib/screens/phone_login_screen.dart': {
    name: 'phone_login_screen.dart',
    path: 'rant_c2c/lib/screens/phone_login_screen.dart',
    language: 'dart',
    description: 'Enforces mobile phone-only registration and authentication, with customizable country codes determining localized currency (e.g. NPR, USD, INR).',
    content: `import 'package:flutter/material.dart';
import 'role_selection_screen.dart';

class CountryConfig {
  final String name;
  final String code;
  final String flag;
  final String currencySymbol;
  final String currencyCode;
  final String placeholder;

  const CountryConfig({
    required this.name,
    required this.code,
    required this.flag,
    required this.currencySymbol,
    required this.currencyCode,
    required this.placeholder,
  });
}

const List<CountryConfig> COUNTRIES = [
  CountryConfig(name: 'United States', code: '+1', flag: '🇺🇸', currencySymbol: '\$', currencyCode: 'USD', placeholder: '(555) 012-3456'),
  CountryConfig(name: 'Nepal', code: '+977', flag: '🇳🇵', currencySymbol: 'रू', currencyCode: 'NPR', placeholder: '9841234567'),
  CountryConfig(name: 'India', code: '+91', flag: '🇮🇳', currencySymbol: '₹', currencyCode: 'INR', placeholder: '98765 43210'),
  CountryConfig(name: 'United Kingdom', code: '+44', flag: '🇬🇧', currencySymbol: '£', currencyCode: 'GBP', placeholder: '7911 123456'),
  CountryConfig(name: 'Eurozone', code: '+49', flag: '🇪🇺', currencySymbol: '€', currencyCode: 'EUR', placeholder: '151 2345678'),
  CountryConfig(name: 'United Arab Emirates', code: '+971', flag: '🇦🇪', currencySymbol: 'AED ', currencyCode: 'AED', placeholder: '50 123 4567'),
];

class PhoneLoginScreen extends StatefulWidget {
  const PhoneLoginScreen({super.key});

  @override
  State<PhoneLoginScreen> createState() => _PhoneLoginScreenState();
}

class _PhoneLoginScreenState extends State<PhoneLoginScreen> {
  final _phoneController = TextEditingController();
  final _otpController = TextEditingController();
  CountryConfig _selectedCountry = COUNTRIES[0];
  bool _isCodeSent = false;
  String _generatedOtp = '1234';
  String? _errorText;

  @override
  void dispose() {
    _phoneController.dispose();
    _otpController.dispose();
    super.dispose();
  }

  void _sendVerificationCode() {
    final phoneText = _phoneController.text.trim();
    if (phoneText.isEmpty || phoneText.length < 5) {
      setState(() {
        _errorText = 'Please enter a valid phone number';
      });
      return;
    }

    setState(() {
      _errorText = null;
      _isCodeSent = true;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: const Text('🔑 Simulated OTP Sent! Code is 1234'),
        duration: const Duration(seconds: 4),
        backgroundColor: const Color(0xFFFF6B35),
      ),
    );
  }

  void _verifyOtp() {
    final otpText = _otpController.text.trim();
    if (otpText == _generatedOtp || otpText == '1234') {
      setState(() {
        _errorText = null;
      });
      
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => const RoleSelectionScreen(),
        ),
      );
    } else {
      setState(() {
        _errorText = 'Invalid 4-digit code. Use bypass code "1234".';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF7F9FB),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 32.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 24),
              Center(
                child: Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFF6B35).withOpacity(0.1),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(
                    Icons.phone_iphone_rounded,
                    size: 48,
                    color: Color(0xFFFF6B35),
                  ),
                ),
              ),
              const SizedBox(height: 24),
              const Text(
                'Rant C2C',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.black,
                  color: Color(0xFF1F2937),
                ),
              ),
              const SizedBox(height: 8),
              const Text(
                'Broker Direct Matchmaker',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFFFF6B35),
                ),
              ),
              const SizedBox(height: 32),
              
              if (!_isCodeSent) ...[
                const Text(
                  'Enter your phone number to login or register:',
                  style: TextStyle(fontSize: 14, color: Color(0xFF4B5563)),
                ),
                const SizedBox(height: 12),
                
                DropdownButtonFormField<CountryConfig>(
                  value: _selectedCountry,
                  decoration: const InputDecoration(
                    labelText: 'Country / Zone',
                    border: OutlineInputBorder(),
                    fillColor: Colors.white,
                    filled: true,
                  ),
                  items: COUNTRIES.map((country) {
                    return DropdownMenuItem<CountryConfig>(
                      value: country,
                      child: Text('\${country.flag} \${country.name} (\${country.code})'),
                    );
                  }).toList(),
                  onChanged: (val) {
                    if (val != null) {
                      setState(() {
                        _selectedCountry = val;
                      });
                    }
                  },
                ),
                const SizedBox(height: 16),
                
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                      decoration: BoxDecoration(
                        color: Colors.grey[200],
                        border: Border.all(color: Colors.grey[400]!),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        _selectedCountry.code,
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: TextFormField(
                        controller: _phoneController,
                        keyboardType: TextInputType.phone,
                        decoration: InputDecoration(
                          hintText: _selectedCountry.placeholder,
                          border: const OutlineInputBorder(),
                          fillColor: Colors.white,
                          filled: true,
                          errorText: _errorText,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Text(
                  '🌐 App features & currency will adapt to \${_selectedCountry.name} (\${_selectedCountry.currencyCode})',
                  style: const TextStyle(fontSize: 11, color: Colors.blueGrey, fontWeight: FontWeight.bold),
                ),
                const Spacer(),
                ElevatedButton(
                  onPressed: _sendVerificationCode,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFFF6B35),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  child: const Text('Send Verification Code', style: TextStyle(fontWeight: FontWeight.bold)),
                ),
              ] else ...[
                const Text(
                  'Enter the 4-digit verification code received:',
                  style: TextStyle(fontSize: 14, color: Color(0xFF4B5563)),
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _otpController,
                  keyboardType: TextInputType.number,
                  textAlign: TextAlign.center,
                  maxLength: 4,
                  style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold, letterSpacing: 8),
                  decoration: InputDecoration(
                    hintText: '••••',
                    border: const OutlineInputBorder(),
                    fillColor: Colors.white,
                    filled: true,
                    errorText: _errorText,
                    counterText: '',
                  ),
                ),
                const SizedBox(height: 16),
                TextButton(
                  onPressed: () {
                    setState(() {
                      _isCodeSent = false;
                      _otpController.clear();
                    });
                  },
                  child: const Text('Change Phone Number', style: TextStyle(color: Color(0xFFFF6B35), fontWeight: FontWeight.bold)),
                ),
                const Spacer(),
                ElevatedButton(
                  onPressed: _verifyOtp,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF1F2937),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  child: const Text('Verify Code & Sign In', style: TextStyle(fontWeight: FontWeight.bold)),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
`
  },

  'rant_c2c/lib/screens/role_selection_screen.dart': {
    name: 'role_selection_screen.dart',
    path: 'rant_c2c/lib/screens/role_selection_screen.dart',
    language: 'dart',
    description: 'The visual starting screen of Rant C2C where users select their profile: Renters (Consumers) or Lenders (Lords).',
    content: `import 'package:flutter/material.dart';
import 'profile_setup_screen.dart';

class RoleSelectionScreen extends StatelessWidget {
  const RoleSelectionScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF7F9FB),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Spacer(),
              // App Branding Logo
              Center(
                child: Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFF6B35).withOpacity(0.12),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(
                    Icons.handshake_rounded,
                    size: 72,
                    color: Color(0xFFFF6B35),
                  ),
                ),
              ),
              const SizedBox(height: 24),
              const Text(
                'Rant C2C',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 32,
                  fontWeight: FontWeight.w900,
                  color: Color(0xFF1F2937),
                  letterSpacing: -0.5,
                ),
              ),
              const SizedBox(height: 8),
              const Text(
                'Everyday Rentals. Peer-to-Peer Matches.\nNo fees. No escrow. Direct Handshakes.',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 15,
                  color: Color(0xFF6B7280),
                  height: 1.4,
                ),
              ),
              const Spacer(),
              const Text(
                'Choose your role to get started:',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  color: Color(0xFF4B5563),
                ),
              ),
              const SizedBox(height: 16),
              
              // Consumer Option
              _buildRoleCard(
                context,
                title: 'Consumer (Renter)',
                subtitle: 'I want to browse and rent items nearby',
                icon: Icons.shopping_bag_outlined,
                accentColor: const Color(0xFFFF6B35),
                roleValue: 'Consumer',
              ),
              const SizedBox(height: 14),
              
              // Lord Option
              _buildRoleCard(
                context,
                title: 'Lord (Lender)',
                subtitle: 'I want to list items and earn income',
                icon: Icons.real_estate_agent_outlined,
                accentColor: const Color(0xFF2E4057),
                roleValue: 'Lord',
              ),
              const Spacer(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildRoleCard(
    BuildContext context, {
    required String title,
    required String subtitle,
    required IconData icon,
    required Color accentColor,
    required String roleValue,
  }) {
    return InkWell(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => ProfileSetupScreen(selectedRole: roleValue),
          ),
        );
      },
      borderRadius: BorderRadius.circular(16),
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: Colors.grey.withOpacity(0.2),
            width: 1.5,
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.02),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: accentColor.withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(
                icon,
                size: 28,
                color: accentColor,
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF1F2937),
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    subtitle,
                    style: const TextStyle(
                      fontSize: 12,
                      color: Color(0xFF6B7280),
                    ),
                  ),
                ],
              ),
            ),
            Icon(
              Icons.chevron_right_rounded,
              color: Colors.grey.withOpacity(0.8),
            ),
          ],
        ),
      ),
    );
  }
}`
  },

  'rant_c2c/lib/screens/profile_setup_screen.dart': {
    name: 'profile_setup_screen.dart',
    path: 'rant_c2c/lib/screens/profile_setup_screen.dart',
    language: 'dart',
    description: 'Captures the user profile credentials (Name, Email, and Phone Number) required for peer-to-peer matchmaking routing.',
    content: `import 'package:flutter/material.dart';
import 'dashboard_screen.dart';

class ProfileSetupScreen extends StatefulWidget {
  final String selectedRole;

  const ProfileSetupScreen({super.key, required this.selectedRole});

  @override
  State<ProfileSetupScreen> createState() => _ProfileSetupScreenState();
}

class _ProfileSetupScreenState extends State<ProfileSetupScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _phoneController = TextEditingController();

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    super.dispose();
  }

  void _submitProfile() {
    if (_formKey.currentState!.validate()) {
      // In a real app, you would save this user data in Firebase here
      // For now, we transition directly into the dashboard
      Navigator.pushAndRemoveUntil(
        context,
        MaterialPageRoute(
          builder: (context) => DashboardScreen(
            userName: _nameController.text.trim(),
            userRole: widget.selectedRole,
            userPhone: _phoneController.text.trim(),
          ),
        ),
        (route) => false, // Clears navigation back stack
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final bool isLord = widget.selectedRole == 'Lord';
    final Color activeColor = isLord ? const Color(0xFF2E4057) : const Color(0xFFFF6B35);

    return Scaffold(
      backgroundColor: const Color(0xFFF7F9FB),
      appBar: AppBar(
        title: Text('\${widget.selectedRole} Setup'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, size: 20),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Header Banner
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: activeColor.withOpacity(0.08),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Row(
                    children: [
                      Icon(
                        isLord ? Icons.real_estate_agent : Icons.badge_outlined,
                        color: activeColor,
                        size: 32,
                      ),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Text(
                          isLord
                              ? 'Your listing phone number will be displayed directly so renters can call or WhatsApp you instantly.'
                              : 'Set up your credentials to communicate directly with lords. We do not hold payments!',
                          style: TextStyle(
                            fontSize: 13,
                            color: activeColor.withOpacity(0.9),
                            height: 1.4,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 32),
                
                // Name Field
                _buildTextField(
                  controller: _nameController,
                  label: 'Full Name',
                  hint: 'e.g. Johnny Cash',
                  icon: Icons.person_outline_rounded,
                  validator: (value) => value == null || value.isEmpty ? 'Please enter your name' : null,
                ),
                const SizedBox(height: 20),
                
                // Email Field
                _buildTextField(
                  controller: _emailController,
                  label: 'Email Address',
                  hint: 'e.g. johnny@cash.com',
                  icon: Icons.email_outlined,
                  keyboardType: TextInputType.emailAddress,
                  validator: (value) {
                    if (value == null || value.isEmpty) return 'Please enter your email';
                    if (!value.contains('@')) return 'Enter a valid email address';
                    return null;
                  },
                ),
                const SizedBox(height: 20),
                
                // Phone Field (Crucial for Broker Direct Match)
                _buildTextField(
                  controller: _phoneController,
                  label: isLord ? 'Contact Phone (Visible to Renters)' : 'Your Phone Number',
                  hint: 'e.g. +14155552671',
                  icon: Icons.phone_android_outlined,
                  keyboardType: TextInputType.phone,
                  helperText: isLord ? 'Renters will use this number to contact you on dialer & WhatsApp.' : null,
                  validator: (value) {
                    if (value == null || value.isEmpty) return 'Phone number is required';
                    if (value.length < 7) return 'Enter a valid contact number';
                    return null;
                  },
                ),
                const SizedBox(height: 48),
                
                // Submit Button
                ElevatedButton(
                  onPressed: _submitProfile,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: activeColor,
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                    elevation: 1,
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Text(
                        'Complete Setup',
                        style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(width: 8),
                      Icon(Icons.arrow_forward, size: 18),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildTextField({
    required TextEditingController controller,
    required String label,
    required String hint,
    required IconData icon,
    TextInputType keyboardType = TextInputType.text,
    String? helperText,
    String? Function(String?)? validator,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: const TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.bold,
            color: Color(0xFF374151),
          ),
        ),
        const SizedBox(height: 8),
        TextFormField(
          controller: controller,
          keyboardType: keyboardType,
          validator: validator,
          decoration: InputDecoration(
            hintText: hint,
            prefixIcon: Icon(icon, size: 20, color: Colors.grey),
            helperText: helperText,
            helperMaxLines: 2,
            filled: true,
            fillColor: Colors.white,
            contentPadding: const EdgeInsets.symmetric(vertical: 14, horizontal: 16),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(color: Colors.grey.withOpacity(0.3)),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(color: Colors.grey.withOpacity(0.3)),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: const BorderSide(color: Color(0xFFFF6B35), width: 1.5),
            ),
          ),
        ),
      ],
    );
  }
}`
  },

  'rant_c2c/lib/screens/dashboard_screen.dart': {
    name: 'dashboard_screen.dart',
    path: 'rant_c2c/lib/screens/dashboard_screen.dart',
    language: 'dart',
    description: 'Displays the custom category-based grid system (7 categories) and holds listed items with interactive routes.',
    content: `import 'package:flutter/material.dart';
import '../models/item_model.dart';
import 'item_detail_screen.dart';
import 'create_listing_screen.dart';
import 'role_selection_screen.dart';

class DashboardScreen extends StatefulWidget {
  final String userName;
  final String userRole; // 'Consumer' or 'Lord'
  final String userPhone;

  const DashboardScreen({
    super.key,
    required this.userName,
    required this.userRole,
    required this.userPhone,
  });

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  String selectedCategory = 'All';
  String searchQuery = '';
  late String currentRole;

  // The 7 specific categories mandated by the concept
  final List<Map<String, dynamic>> categories = [
    {'name': 'All', 'icon': Icons.grid_view_rounded},
    {'name': 'Clothing', 'icon': Icons.checkroom_rounded},
    {'name': 'Motorcycle', 'icon': Icons.motorcycle_rounded},
    {'name': 'Car', 'icon': Icons.directions_car_rounded},
    {'name': 'Pickups', 'icon': Icons.local_shipping_rounded},
    {'name': 'Gadgets', 'icon': Icons.devices_rounded},
    {'name': 'Housing', 'icon': Icons.home_rounded},
    {'name': 'Books', 'icon': Icons.book_rounded},
  ];

  // In-memory demo listings (Firebase collection mockup)
  final List<RentalItemModel> _allItems = [
    RentalItemModel(
      id: 'item_1',
      title: 'Harley Davidson Iron 883',
      description: 'Excellent beast of a motorcycle. Comes with full fuel tank and a clean extra helmet. Instant matches only!',
      price: 85.00,
      category: 'Motorcycle',
      imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=500&auto=format&fit=crop',
      lordName: 'Marcus Aurelius',
      lordPhone: '+14155550199',
      createdAt: DateTime.now().subtract(const Duration(days: 1)),
    ),
    RentalItemModel(
      id: 'item_2',
      title: 'Wedding Designer Tuxedo',
      description: 'Black slim-fit designer tuxedo, size L. Ideal for weddings, galas, and high-end formal settings. Rental includes dry cleaning!',
      price: 45.00,
      category: 'Clothing',
      imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop',
      lordName: 'Lord Tailor',
      lordPhone: '+14155550244',
      createdAt: DateTime.now().subtract(const Duration(days: 2)),
    ),
    RentalItemModel(
      id: 'item_3',
      title: 'Ford Raptor F-150 Pickup',
      description: 'Super spacious pickup truck. Ideal for moving heavy furniture, construction payloads, or taking off-road weekend trips.',
      price: 120.00,
      category: 'Pickups',
      imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&auto=format&fit=crop',
      lordName: 'Cargo Hank',
      lordPhone: '+14155550388',
      createdAt: DateTime.now().subtract(const Duration(hours: 5)),
    ),
    RentalItemModel(
      id: 'item_4',
      title: 'Sony Alpha III & 24-70mm Lens',
      description: 'High performance professional mirrorless camera set with battery charging kit, dual memory cards, and protective camera bag.',
      price: 55.00,
      category: 'Gadgets',
      imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop',
      lordName: 'Click Shutter',
      lordPhone: '+14155550111',
      createdAt: DateTime.now().subtract(const Duration(minutes: 45)),
    ),
    RentalItemModel(
      id: 'item_5',
      title: 'Modern Minimalist Studio Loft',
      description: 'Located in the heart of downtown. High-speed fiber Wi-Fi, modern kitchenette, gorgeous private balcony view, and workspace.',
      price: 150.00,
      category: 'Housing',
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&auto=format&fit=crop',
      lordName: 'Lady Beatrice',
      lordPhone: '+14155550999',
      createdAt: DateTime.now().subtract(const Duration(hours: 12)),
    ),
  ];

  @override
  void initState() {
    super.initState();
    currentRole = widget.userRole;
  }

  void _addNewListing(RentalItemModel newItem) {
    setState(() {
      _allItems.insert(0, newItem);
    });
  }

  @override
  Widget build(BuildContext context) {
    // Filter logic
    final filteredItems = _allItems.where((item) {
      final matchesCategory = selectedCategory == 'All' || item.category == selectedCategory;
      final matchesSearch = item.title.toLowerCase().contains(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().contains(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).toList();

    return Scaffold(
      backgroundColor: const Color(0xFFF7F9FB),
      appBar: AppBar(
        title: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.handshake_rounded, color: Color(0xFFFF6B35), size: 24),
            const SizedBox(width: 8),
            const Text(
              'Rant C2C',
              style: TextStyle(fontWeight: FontWeight.w900, fontSize: 20),
            ),
          ],
        ),
        actions: [
          // Switch Role Quick Toggle
          IconButton(
            tooltip: 'Log out / Switch Profile',
            icon: const Icon(Icons.logout_rounded, color: Color(0xFF4B5563)),
            onPressed: () {
              Navigator.pushAndRemoveUntil(
                context,
                MaterialPageRoute(builder: (context) => const RoleSelectionScreen()),
                (route) => false,
              );
            },
          ),
        ],
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Hello Greeting Panel
          Padding(
            padding: const EdgeInsets.fromLTRB(20, 16, 20, 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Hello, \${widget.userName} 👋',
                        style: const TextStyle(
                          fontSize: 22,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF1F2937),
                        ),
                      ),
                      const SizedBox(height: 2),
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                            decoration: BoxDecoration(
                              color: currentRole == 'Lord' ? const Color(0xFF2E4057) : const Color(0xFFFF6B35),
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: Text(
                              currentRole == 'Lord' ? 'LORD (LENDER)' : 'CONSUMER (RENTER)',
                              style: const TextStyle(
                                color: Colors.white,
                                fontSize: 10,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                          const SizedBox(width: 6),
                          const Text(
                            'Matches are fully direct',
                            style: TextStyle(fontSize: 11, color: Color(0xFF6B7280)),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                // Toggle mode in-app for convenience
                TextButton.icon(
                  onPressed: () {
                    setState(() {
                      currentRole = currentRole == 'Consumer' ? 'Lord' : 'Consumer';
                    });
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text('Switched view to \${currentRole == 'Lord' ? 'Lender (Lord)' : 'Renter (Consumer)'} Mode'),
                        duration: const Duration(seconds: 1),
                      ),
                    );
                  },
                  icon: const Icon(Icons.swap_horiz_rounded, size: 16),
                  label: const Text('Swap', style: TextStyle(fontSize: 12)),
                  style: TextButton.styleFrom(
                    foregroundColor: const Color(0xFF4B5563),
                  ),
                )
              ],
            ),
          ),

          // Search Bar
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
            child: TextField(
              onChanged: (value) {
                setState(() {
                  searchQuery = value;
                });
              },
              decoration: InputDecoration(
                hintText: 'Search clothing, motorcycles, gadgets...',
                prefixIcon: const Icon(Icons.search_rounded, color: Colors.grey),
                filled: true,
                fillColor: Colors.white,
                contentPadding: const EdgeInsets.symmetric(vertical: 0),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: BorderSide(color: Colors.grey.withOpacity(0.2)),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: const BorderSide(color: Color(0xFFFF6B35)),
                ),
              ),
            ),
          ),

          // Horizontal Categories Scroller
          const Padding(
            padding: EdgeInsets.fromLTRB(20, 12, 20, 6),
            child: Text(
              'Marketplace Categories',
              style: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.bold,
                color: Color(0xFF374151),
              ),
            ),
          ),
          SizedBox(
            height: 85,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 16),
              itemCount: categories.length,
              itemBuilder: (context, index) {
                final cat = categories[index];
                final isSelected = selectedCategory == cat['name'];
                return Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 4),
                  child: InkWell(
                    onTap: () {
                      setState(() {
                        selectedCategory = cat['name'];
                      });
                    },
                    borderRadius: BorderRadius.circular(12),
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      width: 80,
                      decoration: BoxDecoration(
                        color: isSelected ? const Color(0xFFFF6B35) : Colors.white,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(
                          color: isSelected ? const Color(0xFFFF6B35) : Colors.grey.withOpacity(0.15),
                        ),
                        boxShadow: [
                          if (isSelected)
                            BoxShadow(
                              color: const Color(0xFFFF6B35).withOpacity(0.25),
                              blurRadius: 8,
                              offset: const Offset(0, 3),
                            ),
                        ],
                      ),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(
                            cat['icon'],
                            color: isSelected ? Colors.white : const Color(0xFF4B5563),
                            size: 24,
                          ),
                          const SizedBox(height: 6),
                          Text(
                            cat['name'],
                            style: TextStyle(
                              fontSize: 11,
                              fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                              color: isSelected ? Colors.white : const Color(0xFF1F2937),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ),

          // Listings Grid Title
          Padding(
            padding: const EdgeInsets.fromLTRB(20, 16, 20, 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  selectedCategory == 'All'
                      ? 'Available For Rent'
                      : 'Renting in \${selectedCategory}',
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF1F2937),
                  ),
                ),
                Text(
                  '\${filteredItems.length} items found',
                  style: const TextStyle(fontSize: 12, color: Color(0xFF6B7280)),
                ),
              ],
            ),
          ),

          // Rent List Grid
          Expanded(
            child: filteredItems.isEmpty
                ? Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.inventory_2_outlined, size: 48, color: Colors.grey.withOpacity(0.7)),
                        const SizedBox(height: 12),
                        const Text(
                          'No rental listings found.',
                          style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Colors.grey),
                        ),
                        const SizedBox(height: 4),
                        const Text(
                          'Change category or search query.',
                          style: TextStyle(fontSize: 12, color: Colors.grey),
                        ),
                      ],
                    ),
                  )
                : GridView.builder(
                    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
                    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      crossAxisSpacing: 14,
                      mainAxisSpacing: 14,
                      childAspectRatio: 0.76,
                    ),
                    itemCount: filteredItems.length,
                    itemBuilder: (context, index) {
                      final item = filteredItems[index];
                      return _buildItemCard(context, item);
                    },
                  ),
          ),
        ],
      ),
      
      // Floating Action Button for Lord (Listing Creation screen trigger)
      floatingActionButton: currentRole == 'Lord'
          ? FloatingActionButton.extended(
              onPressed: () async {
                final result = await Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => CreateListingScreen(
                      lordName: widget.userName,
                      lordPhone: widget.userPhone,
                    ),
                  ),
                );
                if (result != null && result is RentalItemModel) {
                  _addNewListing(result);
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Item listed successfully! Check dashboard.'),
                      backgroundColor: Colors.green,
                    ),
                  );
                }
              },
              backgroundColor: const Color(0xFF2E4057),
              foregroundColor: Colors.white,
              icon: const Icon(Icons.add),
              label: const Text('List Item'),
            )
          : null,
    );
  }

  Widget _buildItemCard(BuildContext context, RentalItemModel item) {
    return InkWell(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => ItemDetailScreen(item: item),
          ),
        );
      },
      borderRadius: BorderRadius.circular(12),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: Colors.grey.withOpacity(0.12)),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.015),
              blurRadius: 6,
              offset: const Offset(0, 3),
            ),
          ],
        ),
        clipBehavior: Clip.antiAlias,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Image Cover
            Expanded(
              flex: 5,
              child: Stack(
                fit: StackFit.expand,
                children: [
                  Image.network(
                    item.imageUrl,
                    fit: Cover,
                    fit: BoxFit.cover,
                    errorBuilder: (context, error, stackTrace) => Container(
                      color: Colors.grey[200],
                      child: const Icon(Icons.broken_image, color: Colors.grey),
                    ),
                  ),
                  Positioned(
                    top: 8,
                    left: 8,
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 3),
                      decoration: BoxDecoration(
                        color: Colors.black.withOpacity(0.6),
                        borderRadius: BorderRadius.circular(4),
                      ),
                      child: Text(
                        item.category,
                        style: const TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.bold),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            
            // Details Panel
            Expanded(
              flex: 4,
              child: Padding(
                padding: const EdgeInsets.all(10.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          item.title,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.bold,
                            color: Color(0xFF1F2937),
                          ),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          'Lender: \${item.lordName}',
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                            fontSize: 10,
                            color: Color(0xFF6B7280),
                          ),
                        ),
                      ],
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Text(
                          '\$\${item.price.toStringAsFixed(0)}',
                          style: const TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.w900,
                            color: Color(0xFFFF6B35),
                          ),
                        ),
                        const Text(
                          '/ day',
                          style: TextStyle(
                            fontSize: 10,
                            color: Color(0xFF9CA3AF),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}`
  },

  'rant_c2c/lib/screens/item_detail_screen.dart': {
    name: 'item_detail_screen.dart',
    path: 'rant_c2c/lib/screens/item_detail_screen.dart',
    language: 'dart',
    description: 'The product walkthrough detail sheet triggering the system telephone dialer and a pre-formatted WhatsApp matching message.',
    content: `import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../models/item_model.dart';

class ItemDetailScreen extends StatelessWidget {
  final RentalItemModel item;

  const ItemDetailScreen({super.key, required this.item});

  // Broker match method 1: Trigger system Phone Dialer
  Future<void> _makePhoneCall(BuildContext context) async {
    final Uri url = Uri(scheme: 'tel', path: item.lordPhone);
    if (await canLaunchUrl(url)) {
      await launchUrl(url);
    } else {
      _showErrorSnackBar(context, 'Could not open standard dialer for \${item.lordPhone}');
    }
  }

  // Broker match method 2: Trigger WhatsApp direct messaging with prefilled template
  Future<void> _messageOnWhatsApp(BuildContext context) async {
    // Sanitizing phone numbers
    final String cleanPhone = item.lordPhone.replaceAll(RegExp(r'[^0-9+]'), '');
    final String message = "Hi \${item.lordName}, I saw your '\${item.title}' rental listing on Rant C2C (\$\${item.price.toStringAsFixed(0)}/day). Is this still available?";
    final String encodedMessage = Uri.encodeComponent(message);
    
    final Uri whatsappUrl = Uri.parse("https://wa.me/\$cleanPhone?text=\$encodedMessage");
    
    if (await canLaunchUrl(whatsappUrl)) {
      await launchUrl(whatsappUrl, mode: LaunchMode.externalApplication);
    } else {
      _showErrorSnackBar(context, 'Could not direct-launch WhatsApp. Ensure WhatsApp is installed.');
    }
  }

  void _showErrorSnackBar(BuildContext context, String errorMsg) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(errorMsg),
        backgroundColor: Colors.redAccent,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: CustomScrollView(
        slivers: [
          // Collapsible Image Header
          SliverAppBar(
            expandedHeight: 300,
            pinned: true,
            leading: Padding(
              padding: const EdgeInsets.all(8.0),
              child: CircleAvatar(
                backgroundColor: Colors.black.withOpacity(0.5),
                child: IconButton(
                  icon: const Icon(Icons.arrow_back_ios_new_rounded, color: Colors.white, size: 16),
                  onPressed: () => Navigator.pop(context),
                ),
              ),
            ),
            flexibleSpace: FlexibleSpaceBar(
              background: Stack(
                fit: StackFit.expand,
                children: [
                  Image.network(
                    item.imageUrl,
                    fit: BoxFit.cover,
                    errorBuilder: (context, error, stackTrace) => Container(
                      color: Colors.grey[200],
                      child: const Icon(Icons.broken_image, size: 64, color: Colors.grey),
                    ),
                  ),
                  // Dark shadow gradient on bottom of header image
                  const DecoratedBox(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.bottomCenter,
                        end: Alignment.topCenter,
                        colors: [Colors.black54, Colors.transparent],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Detail Body
          SliverFillRemaining(
            hasScrollBody: false,
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // Category tag & Date
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: const Color(0xFFFF6B35).withOpacity(0.1),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: Text(
                          item.category.toUpperCase(),
                          style: const TextStyle(
                            color: Color(0xFFFF6B35),
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                      const Text(
                        'Broker Authenticated',
                        style: TextStyle(color: Colors.green, fontSize: 11, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),

                  // Item Title
                  Text(
                    item.title,
                    style: const TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF1F2937),
                    ),
                  ),
                  const SizedBox(height: 8),

                  // Price
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.baseline,
                    textBaseline: TextBaseline.alphabetic,
                    children: [
                      Text(
                        '\$\${item.price.toStringAsFixed(2)}',
                        style: const TextStyle(
                          fontSize: 26,
                          fontWeight: FontWeight.w900,
                          color: Color(0xFFFF6B35),
                        ),
                      ),
                      const SizedBox(width: 4),
                      const Text(
                        '/ rental day',
                        style: TextStyle(
                          fontSize: 14,
                          color: Color(0xFF6B7280),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),

                  // Divider
                  const Divider(color: Color(0xFFE5E7EB)),
                  const SizedBox(height: 16),

                  // Lender (Lord) Profile Section
                  const Text(
                    'THE LORD (LENDER)',
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF9CA3AF),
                    ),
                  ),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      CircleAvatar(
                        backgroundColor: const Color(0xFF2E4057),
                        foregroundColor: Colors.white,
                        radius: 22,
                        child: Text(item.lordName[0].toUpperCase()),
                      ),
                      const SizedBox(width: 14),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            item.lordName,
                            style: const TextStyle(
                              fontSize: 15,
                              fontWeight: FontWeight.bold,
                              color: Color(0xFF1F2937),
                            ),
                          ),
                          const SizedBox(height: 2),
                          Row(
                            children: [
                              const Icon(Icons.verified, color: Colors.blue, size: 14),
                              const SizedBox(width: 4),
                              Text(
                                item.lordPhone,
                                style: const TextStyle(fontSize: 12, color: Color(0xFF6B7280)),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),

                  // Description
                  const Text(
                    'ITEM DESCRIPTION',
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF9CA3AF),
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    item.description,
                    style: const TextStyle(
                      fontSize: 14,
                      color: Color(0xFF4B5563),
                      height: 1.5,
                    ),
                  ),
                  const Spacer(),
                  const SizedBox(height: 36),

                  // Direct Booking Notice
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.amber[50],
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: Colors.amber[200]!),
                    ),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Icon(Icons.info_outline_rounded, color: Colors.amber[800], size: 18),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            'No Broker Fees: Tap below to contact the Lord directly. Arrange the handoff place, payment, and ID verification in person.',
                            style: TextStyle(fontSize: 11, color: Colors.amber[900], height: 1.4),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 20),

                  // Matchmaking Buttons
                  Row(
                    children: [
                      // Dial button
                      Expanded(
                        child: OutlinedButton.icon(
                          onPressed: () => _makePhoneCall(context),
                          icon: const Icon(Icons.phone_rounded),
                          label: const Text('Call Lord'),
                          style: OutlinedButton.styleFrom(
                            foregroundColor: const Color(0xFF1F2937),
                            padding: const EdgeInsets.symmetric(vertical: 16),
                            side: const BorderSide(color: Color(0xFFD1D5DB), width: 1.5),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      
                      // WhatsApp Button
                      Expanded(
                        child: ElevatedButton.icon(
                          onPressed: () => _messageOnWhatsApp(context),
                          icon: const Icon(Icons.chat_bubble_rounded),
                          label: const Text('WhatsApp'),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF25D366), // WhatsApp Green
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(vertical: 16),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                            elevation: 0,
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}`
  },

  'rant_c2c/lib/screens/create_listing_screen.dart': {
    name: 'create_listing_screen.dart',
    path: 'rant_c2c/lib/screens/create_listing_screen.dart',
    language: 'dart',
    description: 'Form enabling Lords to submit listings immediately into the broker listings feed.',
    content: `import 'package:flutter/material.dart';
import 'dart:math';
import '../models/item_model.dart';

class CreateListingScreen extends StatefulWidget {
  final String lordName;
  final String lordPhone;

  const CreateListingScreen({
    super.key,
    required this.lordName,
    required this.lordPhone,
  });

  @override
  State<CreateListingScreen> createState() => _CreateListingScreenState();
}

class _CreateListingScreenState extends State<CreateListingScreen> {
  final _formKey = GlobalKey<FormState>();
  final _titleController = TextEditingController();
  final _descController = TextEditingController();
  final _priceController = TextEditingController();
  final _phoneController = TextEditingController();

  String _selectedCategory = 'Gadgets';
  String? _customImageUrl;
  
  // The 7 specific categories mandated by the concept
  final List<String> categories = [
    'Clothing',
    'Motorcycle',
    'Car',
    'Pickups',
    'Gadgets',
    'Housing',
    'Books',
  ];

  // Map of category placeholders for demo image generation
  final Map<String, String> categoryImages = {
    'Clothing': 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop',
    'Motorcycle': 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=500&auto=format&fit=crop',
    'Car': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format&fit=crop',
    'Pickups': 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&auto=format&fit=crop',
    'Gadgets': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop',
    'Housing': 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&auto=format&fit=crop',
    'Books': 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&auto=format&fit=crop',
  };

  @override
  void initState() {
    super.initState();
    _phoneController.text = widget.lordPhone; // Pre-populate from setup
  }

  @override
  void dispose() {
    _titleController.dispose();
    _descController.dispose();
    _priceController.dispose();
    _phoneController.dispose();
    super.dispose();
  }

  void _submitListing() {
    if (_formKey.currentState!.validate()) {
      // Create a brand new listing object
      final item = RentalItemModel(
        id: 'new_item_\${Random().nextInt(10000)}',
        title: _titleController.text.trim(),
        description: _descController.text.trim(),
        price: double.parse(_priceController.text.trim()),
        category: _selectedCategory,
        imageUrl: _customImageUrl ?? categoryImages[_selectedCategory] ?? 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop',
        lordName: widget.lordName,
        lordPhone: _phoneController.text.trim(),
        createdAt: DateTime.now(),
      );

      // Return item model to parent dashboard to prepend to feed
      Navigator.pop(context, item);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF7F9FB),
      appBar: AppBar(
        title: const Text('Create Rental Listing'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, size: 20),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Warning Notice
                Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: const Color(0xFF2E4057).withOpacity(0.08),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: const Text(
                    'Lords are fully responsible for item handoffs. Ensure you verify the Renter\'s identity card and complete payment during in-person handoffs.',
                    style: TextStyle(
                      fontSize: 12,
                      color: Color(0xFF2E4057),
                      fontWeight: FontWeight.w500,
                      height: 1.4,
                    ),
                  ),
                ),
                const SizedBox(height: 24),

                // Category Selector
                const Text(
                  'Item Category',
                  style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Color(0xFF374151)),
                ),
                const SizedBox(height: 8),
                DropdownButtonFormField<String>(
                  value: _selectedCategory,
                  decoration: InputDecoration(
                    prefixIcon: const Icon(Icons.category_outlined, size: 20, color: Colors.grey),
                    filled: true,
                    fillColor: Colors.white,
                    contentPadding: const EdgeInsets.symmetric(vertical: 14, horizontal: 16),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: BorderSide(color: Colors.grey.withOpacity(0.3)),
                    ),
                  ),
                  items: categories.map((cat) {
                    return DropdownMenuItem<String>(
                      value: cat,
                      child: Text(cat),
                    );
                  }).toList(),
                  onChanged: (val) {
                    if (val != null) {
                      setState(() {
                        _selectedCategory = val;
                      });
                    }
                  },
                ),
                const SizedBox(height: 20),

                // Image Upload Widget (Simulated upload)
                const Text(
                  'Product / Material / Service Image',
                  style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Color(0xFF374151)),
                ),
                const SizedBox(height: 8),
                _customImageUrl != null
                    ? Container(
                        height: 150,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(12),
                          image: DecorationImage(
                            image: NetworkImage(_customImageUrl!),
                            fit: BoxFit.cover,
                          ),
                        ),
                        child: Stack(
                          children: [
                            Positioned(
                              top: 8,
                              right: 8,
                              child: CircleAvatar(
                                backgroundColor: Colors.red,
                                radius: 16,
                                child: IconButton(
                                  padding: EdgeInsets.zero,
                                  icon: const Icon(Icons.delete, color: Colors.white, size: 16),
                                  onPressed: () {
                                    setState(() {
                                      _customImageUrl = null;
                                    });
                                  },
                                ),
                              ),
                            ),
                          ],
                        ),
                      )
                    : GestureDetector(
                        onTap: () {
                          // Simulate choosing a custom mock image
                          setState(() {
                            _customImageUrl = 'https://images.unsplash.com/photo-\${Random().nextInt(1000) % 2 == 0 ? "1540555700478-4be289fbecef" : "1505740420928-5e560c06d30e"}?w=500&auto=format&fit=crop';
                          });
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text('📸 Custom Image Uploaded Successfully!'),
                              backgroundColor: Color(0xFF2E4057),
                            ),
                          );
                        },
                        child: Container(
                          height: 120,
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: Colors.grey.withOpacity(0.3)),
                          ),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(Icons.cloud_upload_outlined, size: 36, color: Colors.grey[400]),
                              const SizedBox(height: 8),
                              const Text(
                                'Upload Product Image',
                                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFF4B5563)),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                'Tap to choose from Gallery or Camera',
                                style: TextStyle(fontSize: 11, color: Colors.grey[400]),
                              ),
                            ],
                          ),
                        ),
                      ),
                const SizedBox(height: 20),

                // Title Input
                _buildFormInput(
                  controller: _titleController,
                  label: 'Item Title',
                  hint: 'e.g. Vintage leather biker jacket',
                  icon: Icons.title_rounded,
                  validator: (value) => value == null || value.trim().isEmpty ? 'Title is required' : null,
                ),
                const SizedBox(height: 20),

                // Price Input
                _buildFormInput(
                  controller: _priceController,
                  label: 'Rental Price (USD / Day)',
                  hint: 'e.g. 25',
                  icon: Icons.monetization_on_outlined,
                  keyboardType: TextInputType.number,
                  validator: (value) {
                    if (value == null || value.isEmpty) return 'Price is required';
                    if (double.tryParse(value) == null) return 'Enter a valid number';
                    if (double.parse(value) <= 0) return 'Price must be greater than 0';
                    return null;
                  },
                ),
                const SizedBox(height: 20),

                // Description Input
                _buildFormInput(
                  controller: _descController,
                  label: 'Description & Handoff Guidelines',
                  hint: 'Detail item specs, sizes, conditions, and where you would like to hand over the item.',
                  icon: Icons.description_outlined,
                  maxLines: 4,
                  validator: (value) => value == null || value.length < 10 ? 'Provide a brief description (min 10 chars)' : null,
                ),
                const SizedBox(height: 20),

                // Contact Phone Input
                _buildFormInput(
                  controller: _phoneController,
                  label: 'Contact Number for this Listing',
                  hint: 'e.g. +14155551234',
                  icon: Icons.phone,
                  keyboardType: TextInputType.phone,
                  helperText: 'Renters will dial this number or text you on WhatsApp directly.',
                  validator: (value) => value == null || value.isEmpty ? 'Contact phone number is required' : null,
                ),
                const SizedBox(height: 36),

                // Listing Publish Button
                ElevatedButton(
                  onPressed: _submitListing,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF2E4057),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                    elevation: 1,
                  ),
                  child: const Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.publish_rounded, size: 18),
                      SizedBox(width: 8),
                      Text(
                        'Publish Rental Listing',
                        style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildFormInput({
    required TextEditingController controller,
    required String label,
    required String hint,
    required IconData icon,
    TextInputType keyboardType = TextInputType.text,
    int maxLines = 1,
    String? helperText,
    String? Function(String?)? validator,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: const TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.bold,
            color: Color(0xFF374151),
          ),
        ),
        const SizedBox(height: 8),
        TextFormField(
          controller: controller,
          keyboardType: keyboardType,
          maxLines: maxLines,
          validator: validator,
          decoration: InputDecoration(
            hintText: hint,
            prefixIcon: maxLines == 1 ? Icon(icon, size: 20, color: Colors.grey) : null,
            helperText: helperText,
            filled: true,
            fillColor: Colors.white,
            contentPadding: const EdgeInsets.symmetric(vertical: 14, horizontal: 16),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(color: Colors.grey.withOpacity(0.3)),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(color: Colors.grey.withOpacity(0.3)),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: const BorderSide(color: Color(0xFFFF6B35)),
            ),
          ),
        ),
      ],
    );
  }
}`
  },

  'rant_c2c/lib/services/chat_service.dart': {
    name: 'chat_service.dart',
    path: 'rant_c2c/lib/services/chat_service.dart',
    language: 'dart',
    description: 'Firebase Firestore-backed chat service enabling real-time peer-to-peer message streams, typing indicators, and message insertion under an immutable schema.',
    content: `import 'package:cloud_firestore/cloud_firestore.dart';

class ChatService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  // Stream of chat rooms for a specific user
  Stream<QuerySnapshot> getChatRooms(String userId) {
    return _firestore
        .collection('chats')
        .where('participants', arrayContains: userId)
        .orderBy('lastMessageTime', descending: true)
        .snapshots();
  }

  // Stream of individual messages in a chat room
  Stream<QuerySnapshot> getMessages(String chatRoomId) {
    return _firestore
        .collection('chats')
        .doc(chatRoomId)
        .collection('messages')
        .orderBy('timestamp', descending: true)
        .snapshots();
  }

  // Create or retrieve chat room, then send message
  Future<void> sendMessage({
    required String senderId,
    required String receiverId,
    required String receiverName,
    required String messageText,
    required String itemTitle,
    required double itemPrice,
  }) async {
    // Generate deterministic chat room ID based on user IDs
    final List<String> ids = [senderId, receiverId];
    ids.sort();
    final String chatRoomId = ids.join('_');

    final DocumentReference chatRoomRef = _firestore.collection('chats').doc(chatRoomId);

    // Write message atomically inside the batch
    final WriteBatch batch = _firestore.batch();

    // Setup chat thread metadata
    batch.set(chatRoomRef, {
      'participants': ids,
      'lastMessage': messageText,
      'lastMessageSenderId': senderId,
      'lastMessageTime': FieldValue.serverTimestamp(),
      'itemTitle': itemTitle,
      'itemPrice': itemPrice,
      'receiverName': receiverName,
    }, SetOptions(merge: true));

    // Append new message to subcollection
    final DocumentReference msgRef = chatRoomRef.collection('messages').doc();
    batch.set(msgRef, {
      'senderId': senderId,
      'receiverId': receiverId,
      'message': messageText,
      'timestamp': FieldValue.serverTimestamp(),
    });

    await batch.commit();
  }
}`
  },

  'rant_c2c/lib/services/notification_service.dart': {
    name: 'notification_service.dart',
    path: 'rant_c2c/lib/services/notification_service.dart',
    language: 'dart',
    description: 'Manages Firebase Cloud Messaging (FCM) tokens, handles foreground alert banners, and configures localized peer-to-peer push alerts.',
    content: `import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';

class NotificationService {
  final FirebaseMessaging _fcm = FirebaseMessaging.instance;
  final FlutterLocalNotificationsPlugin _localNotifications = FlutterLocalNotificationsPlugin();

  Future<void> initializeNotifications() async {
    // Request permission on iOS/Android
    await _fcm.requestPermission(
      alert: true,
      badge: true,
      sound: true,
    );

    // Setup local notifications channel for foreground alerts
    const AndroidNotificationChannel channel = AndroidNotificationChannel(
      'rant_c2c_notifications',
      'Rant P2P Alerts',
      description: 'Alerts for new listing matches and real-time chat replies.',
      importance: Importance.max,
    );

    await _localNotifications
        .resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>()
        ?.createNotificationChannel(channel);

    // Configure foreground message behavior
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      final RemoteNotification? notification = message.notification;
      final AndroidNotification? android = message.notification?.android;

      if (notification != null && android != null) {
        _localNotifications.show(
          notification.hashCode,
          notification.title,
          notification.body,
          NotificationDetails(
            android: AndroidNotificationDetails(
              channel.id,
              channel.name,
              channelDescription: channel.description,
              icon: '@mipmap/ic_launcher',
            ),
          ),
        );
      }
    });
  }

  // Update FCM token for authenticated user profiles
  Future<String?> getDeviceToken() async {
    return await _fcm.getToken();
  }
}`
  },

  'rant_c2c/lib/screens/chats_list_screen.dart': {
    name: 'chats_list_screen.dart',
    path: 'rant_c2c/lib/screens/chats_list_screen.dart',
    language: 'dart',
    description: 'Interface listing active in-app chat rooms with lenders/renters including last message previews and timestamp metadata.',
    content: `import 'package:flutter/material.dart';
import '../services/chat_service.dart';
import 'chat_room_screen.dart';

class ChatsListScreen extends StatelessWidget {
  final String currentUserId;
  final ChatService _chatService = ChatService();

  ChatsListScreen({super.key, required this.currentUserId});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Direct Chats'),
      ),
      body: StreamBuilder(
        stream: _chatService.getChatRooms(currentUserId),
        builder: (context, AsyncSnapshot snapshot) {
          if (snapshot.hasError) {
            return const Center(child: Text('Failed to load chats'));
          }
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          final rooms = snapshot.data!.docs;

          if (rooms.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.chat_bubble_outline_rounded, size: 64, color: Colors.grey[400]),
                  const SizedBox(height: 12),
                  const Text(
                    'No active chats',
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.grey),
                  ),
                  const SizedBox(height: 4),
                  const Text(
                    'Message a Lord from any item detail page!',
                    style: TextStyle(fontSize: 12, color: Colors.grey),
                  ),
                ],
              ),
            );
          }

          return ListView.builder(
            itemCount: rooms.length,
            itemBuilder: (context, index) {
              final room = rooms[index].data() as Map<String, dynamic>;
              final roomId = rooms[index].id;
              final participants = List<String>.from(room['participants']);
              final receiverId = participants.firstWhere((id) => id != currentUserId);

              return Card(
                margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                color: Colors.white,
                elevation: 0,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                  side: BorderSide(color: Colors.grey.withOpacity(0.12)),
                ),
                child: ListTile(
                  leading: CircleAvatar(
                    backgroundColor: const Color(0xFFFF6B35).withOpacity(0.1),
                    foregroundColor: const Color(0xFFFF6B35),
                    child: Text(room['receiverName']?[0].toUpperCase() ?? 'U'),
                  ),
                  title: Text(
                    room['receiverName'] ?? 'Rant Partner',
                    style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                  ),
                  subtitle: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        room['lastMessage'] ?? '',
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(color: Colors.grey[600], fontSize: 12),
                      ),
                      const SizedBox(height: 2),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 1.5),
                        decoration: BoxDecoration(
                          color: Colors.grey[100],
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Text(
                          room['itemTitle'] ?? 'Asset',
                          style: const TextStyle(fontSize: 9, fontWeight: FontWeight.bold),
                        ),
                      ),
                    ],
                  ),
                  trailing: const Icon(Icons.chevron_right_rounded, color: Colors.grey),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => ChatRoomScreen(
                          chatRoomId: roomId,
                          currentUserId: currentUserId,
                          receiverId: receiverId,
                          receiverName: room['receiverName'] ?? 'Rant Partner',
                          itemTitle: room['itemTitle'] ?? 'Asset',
                        ),
                      ),
                    );
                  },
                ),
              );
            },
          );
        },
      ),
    );
  }
}`
  },

  'rant_c2c/lib/screens/chat_room_screen.dart': {
    name: 'chat_room_screen.dart',
    path: 'rant_c2c/lib/screens/chat_room_screen.dart',
    language: 'dart',
    description: 'Fully featured chat room UI that streams individual messages and sends P2P messages using the Firebase Firestore-backed chat service.',
    content: `import 'package:flutter/material.dart';
import '../services/chat_service.dart';

class ChatRoomScreen extends StatefulWidget {
  final String chatRoomId;
  final String currentUserId;
  final String receiverId;
  final String receiverName;
  final String itemTitle;

  const ChatRoomScreen({
    super.key,
    required this.chatRoomId,
    required this.currentUserId,
    required this.receiverId,
    required this.receiverName,
    required this.itemTitle,
  });

  @override
  State<ChatRoomScreen> createState() => _ChatRoomScreenState();
}

class _ChatRoomScreenState extends State<ChatRoomScreen> {
  final ChatService _chatService = ChatService();
  final TextEditingController _messageController = TextEditingController();

  @override
  void dispose() {
    _messageController.dispose();
    super.dispose();
  }

  void _sendMessage() {
    if (_messageController.text.trim().isEmpty) return;

    _chatService.sendMessage(
      senderId: widget.currentUserId,
      receiverId: widget.receiverId,
      receiverName: widget.receiverName,
      messageText: _messageController.text.trim(),
      itemTitle: widget.itemTitle,
      itemPrice: 0.0, // Matchmaker direct reference
    );

    _messageController.clear();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text(widget.receiverName, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
            Text('Listing: \${widget.itemTitle}', style: const TextStyle(fontSize: 10, color: Colors.grey)),
          ],
        ),
      ),
      body: Column(
        children: [
          // Message timeline
          Expanded(
            child: StreamBuilder(
              stream: _chatService.getMessages(widget.chatRoomId),
              builder: (context, AsyncSnapshot snapshot) {
                if (snapshot.hasError) {
                  return const Center(child: Text('Failed to load messages'));
                }
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(child: CircularProgressIndicator());
                }

                final messages = snapshot.data!.docs;

                return ListView.builder(
                  reverse: true,
                  padding: const EdgeInsets.all(16),
                  itemCount: messages.length,
                  itemBuilder: (context, index) {
                    final msg = messages[index].data() as Map<String, dynamic>;
                    final bool isMe = msg['senderId'] == widget.currentUserId;

                    return Align(
                      alignment: isMe ? Alignment.centerRight : Alignment.centerLeft,
                      child: Container(
                        margin: const EdgeInsets.symmetric(vertical: 4),
                        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                        decoration: BoxDecoration(
                          color: isMe ? const Color(0xFFFF6B35) : Colors.grey[200],
                          borderRadius: BorderRadius.only(
                            topLeft: const Radius.circular(16),
                            topRight: const Radius.circular(16),
                            bottomLeft: isMe ? const Radius.circular(16) : Radius.zero,
                            bottomRight: isMe ? Radius.zero : const Radius.circular(16),
                          ),
                        ),
                        child: Text(
                          msg['message'] ?? '',
                          style: TextStyle(
                            color: isMe ? Colors.white : Colors.black85,
                            fontSize: 13,
                          ),
                        ),
                      ),
                    );
                  },
                );
              },
            ),
          ),

          // Message Input bar
          Container(
            padding: const EdgeInsets.all(12),
            color: Colors.white,
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _messageController,
                    decoration: InputDecoration(
                      hintText: 'Type your message...',
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                      filled: true,
                      fillColor: Colors.grey[100],
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(24),
                        borderSide: BorderSide.none,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                IconButton(
                  onPressed: _sendMessage,
                  icon: const Icon(Icons.send_rounded, color: Color(0xFFFF6B35)),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
`
  }
};
