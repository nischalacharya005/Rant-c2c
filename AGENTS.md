# Rant C2C Project Guidelines

This file outlines the architecture, database configurations, and standard guidelines for continuing development on the **Rant C2C** Flutter application.

## 📱 App Concept & Structure
Rant C2C is a Consumer-to-Consumer (C2C) rental marketplace designed to act as a **pure matchmaking broker**. The platform coordinates direct communication and handovers between renters (Consumers) and lenders (Lords). It explicitly bypasses in-app payments, commissions, or escrows.

### Core User Roles
1. **Consumer (Renter)**: Browses listings, triggers native calls, WhatsApp messages, or initiates secure in-app direct chats with Lords.
2. **Lord (Lender)**: Uploads rental assets, describes pickup rules, and registers phone numbers for direct communication.

---

## 🗄️ Firebase Database Schema Blueprint

### 1. `/users/{userId}` (User Profiles)
Stores verified credentials collected during profile setup.
- `name` (String): Full Name
- `email` (String): User Email Address
- `phone` (String): Direct contact phone
- `activeRole` (String): `'Consumer'` or `'Lord'`
- `fcmToken` (String - Optional): Mobile device token for Cloud Messaging notifications.

### 2. `/listings/{listingId}` (Rental Assets)
Publicly browsable listings posted by Lords.
- `title` (String): Product / Asset name
- `description` (String): Condition, pick-up hours, security criteria
- `price` (Double): Per-day rental rate
- `category` (String): Strictly matches 1 of 6 classes (`'Clothing'`, `'Motorcycle'`, `'Car'`, `'Pickups'`, `'Gadgets'`, `'Housing'`)
- `imageUrl` (String): Storage reference URL
- `lordName` (String): Publisher's profile name
- `lordPhone` (String): Direct contact phone

### 3. `/chats/{chatId}` (Direct Chat Threads)
Private real-time peer-to-peer discussions.
- `participants` (Array of Strings): Exactly two user IDs `[userId_1, userId_2]`
- `lastMessage` (String): Text preview of the last message
- `lastMessageSenderId` (String): UID of the sender
- `lastMessageTime` (Timestamp): Server timestamp
- `itemTitle` (String): Associated rental asset
- `itemPrice` (Double): Rental cost
- `receiverName` (String): Thread recipient preview

### 4. `/chats/{chatId}/messages/{messageId}` (Subcollection)
Individual chat bubble entries.
- `senderId` (String): Sending user UID
- `receiverId` (String): Recipient user UID
- `message` (String): Text content
- `timestamp` (Timestamp): ServerTimestamp

---

## 🔒 Firestore Security Rules
All read and write operations are strictly audited via Attribute-Based Access Control (ABAC):

```javascript
rules_version = '2';
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
}
```

---

## 🔔 Mobile Notification Architecture
1. **Firebase Cloud Messaging (FCM)**: Configured in `notification_service.dart` to listen for background data payloads.
2. **Flutter Local Notifications**: Integrates custom channel groupings (`rant_c2c_notifications`) for foreground push alert overlays.
3. **Trigger Events**:
   - New message incoming from a peer
   - Successful publishing of active rental assets
   - Role swapping verification triggers
