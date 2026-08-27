# Firestore Security Rules

Copy and paste these rules into your Firebase Console → Firestore Database → Rules tab, then click **Publish**.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users collection - each user can only read/write their own document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Diary entries - users can only access their own entries
    match /entries/{entryId} {
      allow read, write: if request.auth != null && resource.data.uid == request.auth.uid;
      allow create: if request.auth != null && request.resource.data.uid == request.auth.uid;
    }

    // Profile pictures
    match /profiles/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## How Collections Auto-Create

Firestore collections are **lazy** — they auto-create when the first document is written. No manual setup needed.

When a user signs up, this code will create the `users` collection automatically:

```js
import { db, collection, addDoc } from './Firebase/index.js';

// This auto-creates the "users" collection + first document
await addDoc(collection(db, 'users'), {
  uid: user.uid,
  name: user.displayName,
  email: user.email,
  createdAt: new Date().toISOString()
});
```

When a diary entry is saved, the `entries` collection auto-creates the same way.

## Setup Steps

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select project **tomatos-diary**
3. Go to **Firestore Database** → click **Create Database**
4. Choose **Start in test mode** (or production mode with the rules above)
5. Select a location (closest to your users)
6. Go to **Rules** tab → paste the rules above → click **Publish**

## Collections Structure

| Collection | Document ID | Fields |
|-----------|-------------|--------|
| `users` | auto-generated | uid, name, email, username, securityQuestion, createdAt |
| `entries` | auto-generated | uid, title, content, mood, date, createdAt, updatedAt |
| `profiles` | user.uid | avatarUrl, displayName |
