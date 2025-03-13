# Round-Robin Coupon Distribution System

A secure and fair system for distributing promotional coupons to guest users in a round-robin fashion with built-in abuse prevention.

## Features

- **Round-Robin Distribution**: Coupons are distributed sequentially, ensuring fair and even allocation
- **Multiple Abuse Prevention Mechanisms**:
  - IP address tracking with time-based restrictions
  - Cookie-based client identification
  - Clear user feedback on claim status and wait times
- **Full-Stack TypeScript Implementation**: Type-safe code for both frontend and backend

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- TypeScript

### Frontend

- Next.js
- Tailwind CSS
- TypeScript

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Backend Setup

1. Clone the repository and navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file with the following content:

   ```
   PORT=5000
   MONGO_URI=mongodb:MONGO_URI=mongodb+srv://username:<password>@clustername.mongodb.net/coupon-system?retryWrites=true&w=majority
   FRONTEND_URL=http://localhost:3000
   NODE_ENV=development
   ```

4. Seed the database with sample coupons:

   ```bash
   npm run seed
   # or
   yarn seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The backend server will be running at http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file with the following content:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The frontend application will be running at http://localhost:3000

## Abuse Prevention Details
The system implements multiple layers of abuse prevention:

1. IP Address Tracking

- Records user IP addresses with timestamps
- Enforces a 1-hour cooldown period between claims from the same IP


2. Cookie-Based Tracking

- Assigns each browser a unique client ID via cookie
- Prevents multiple claims even across network changes
- Cookies configured with security best practices


3. Round-Robin Distribution

- Coupons are distributed in sequential order
- System tracks the last distributed coupon for rotation


4. User Feedback

- Clear messaging for successful claims
- Time remaining before next available claim
- Appropriate error messages

## Testing the System

1. Open the application in your browser
2. Click "Claim Your Coupon" to receive a coupon
3. Try claiming again - you'll see the time remaining before you can claim another
4. Test with different browsers/incognito windows to verify IP restrictions
5. Wait for the restriction period to pass and claim again to see round-robin distribution
