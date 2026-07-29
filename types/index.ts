export type UserRole = "buyer" | "owner" | "agent" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  walletAddress?: string;
  isVerified?: boolean;
}

export interface Wallet {
  address: string;
  network: string;
  chainId: number;
  balance: string;
}

export interface PropertyImage {
  url: string;
  alt?: string;
  isPrimary?: boolean;
}

export interface PropertyLocation {
  address?: string;
  city?: string;
  country?: string;
  lat?: number;
  lng?: number;
}

export interface PropertyVerification {
  status: "pending" | "verified" | "rejected";
  verifiedAt?: string;
}

export interface Property {
  id: string;
  title: string;
  description?: string;
  price: number;
  priceEth?: number;
  status: "active" | "pending" | "sold" | "inactive";
  listingType?: "sale" | "rent";
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  images?: PropertyImage[];
  location?: PropertyLocation;
  verification?: PropertyVerification;
  ownerId?: string;
  agentId?: string;
  chainId?: string;
  tokenId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PropertyFilters {
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  city?: string;
  country?: string;
  search?: string;
}

export interface Inquiry {
  id: string;
  propertyId: string;
  buyerId: string;
  message?: string;
  status: "pending" | "accepted" | "rejected";
  createdAt?: string;
}
