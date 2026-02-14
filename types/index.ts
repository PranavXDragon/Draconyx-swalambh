export type UserRole = 'supplier' | 'business' | 'client' | 'delivery';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company?: string;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
}

export type UrgencyLevel = 'critical' | 'high' | 'normal';
export type OrderStatus = 'pending' | 'matched' | 'accepted' | 'in_transit' | 'delivered' | 'cancelled';

export interface SparePartRequest {
  id: string;
  buyerId: string;
  partName: string;
  machineType: string;
  urgency: UrgencyLevel;
  quantity: number;
  requiredDeliveryTime: string;
  imageUrl?: string;
  costPerHourDowntime: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: OrderStatus;
  createdAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  email: string;
  company: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  rating: number;
  responseTime: number;
  inventory: InventoryItem[];
}

export interface InventoryItem {
  id: string;
  supplierId: string;
  partName: string;
  stock: number;
  price: number;
  emergencyAvailable: boolean;
}

export interface MatchResult {
  supplier: Supplier;
  distance: number;
  eta: number;
  price: number;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  matchScore: number;
}

export interface Order {
  id: string;
  requestId: string;
  buyerId: string;
  supplierId: string;
  partName: string;
  machineType: string;
  urgency: UrgencyLevel;
  quantity: number;
  price: number;
  status: OrderStatus;
  estimatedDelivery: string;
  actualDelivery?: string;
  downtimeSaved?: number;
  timeline: OrderTimelineEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderTimelineEvent {
  id: string;
  status: OrderStatus;
  timestamp: string;
  description: string;
}

export interface Analytics {
  totalRequests: number;
  avgDeliveryTime: number;
  downtimeSaved: number;
  activeOrders: number;
  monthlyRequests: {
    month: string;
    count: number;
  }[];
  deliveryTimetrends: {
    month: string;
    avgTime: number;
  }[];
}
