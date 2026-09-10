import { BusinessSettingsType } from "@/data/businessSettings";

export type BookingStatus =
  | "new"
  | "accepted"
  | "assigned"
  | "technician_en_route"
  | "inspection"
  | "consultation_completed"
  | "quote_provided"
  | "approved"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface BookingRecord {
  id: string;
  reference: string;
  customerName: string;
  customerPhone: string;
  customerWhatsapp: string;
  customerEmail?: string;
  country: string;
  city: string;
  area: string;
  address: {
    building: string;
    apartment?: string;
    street: string;
    landmark?: string;
    mapsLink?: string;
  };
  serviceId: string;
  serviceTitle: string;
  brand: string;
  model?: string;
  problemCategory: string;
  description: string;
  appointmentDate: string;
  appointmentSlot: string;
  status: BookingStatus;
  assignedTechnicianId?: string;
  assignedTechnicianName?: string;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StatusHistoryItem {
  id: string;
  bookingRef: string;
  status: BookingStatus;
  note: string;
  timestamp: string;
  actor: string;
}

export interface TechnicianRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  specialties: string[];
  serviceAreas: string[];
  active: boolean;
  assignedJobsCount: number;
}

export interface ContactMessageRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
  status?: "new" | "read" | "contacted" | "converted" | "resolved" | "spam" | "archived";
  assignedTo?: string;
  convertedBookingRef?: string;
  internalNotes?: string;
  updatedAt?: string;
}

export interface BlogPostRecord {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  category: string;
  categoryAr: string;
  author: string;
  publishedDate: string;
  readTime: string;
  image: string;
  excerptEn: string;
  excerptAr: string;
  contentEn: string;
  contentAr: string;
}

export type UserRole = "admin" | "staff";

export interface AuthUserRecord {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  phone?: string;
  specialties?: string[];
}

export interface AdminCredentialsRecord {
  email: string;
  username: string;
  password: string;
  name: string;
  updatedAt: string;
}

export interface AuditLogRecord {
  id: string;
  actorId: string;
  actorRole: "admin" | "staff" | "system";
  action: string;
  entityType: string;
  entityId?: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

export interface StaffMemberRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "staff" | "technician";
  active: boolean;
  assignedAreas: string[];
  createdAt: string;
  lastLogin?: string;
}

export interface FleetVehicleRecord {
  id: string;
  plateNumber: string;
  type: "Van" | "Pickup" | "Car";
  makeModel: string;
  year?: number;
  assignedTechnicianId?: string;
  assignedTechnicianName?: string;
  status: "active" | "maintenance" | "inactive";
  serviceDue?: string;
  mileage?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface DatabaseState {
  settings: BusinessSettingsType;
  bookings: BookingRecord[];
  statusHistory: StatusHistoryItem[];
  technicians: TechnicianRecord[];
  fleetVehicles?: FleetVehicleRecord[];
  contactMessages: ContactMessageRecord[];
  blogPosts: BlogPostRecord[];
  users?: AuthUserRecord[];
  adminCredentials?: AdminCredentialsRecord;
  auditLogs?: AuditLogRecord[];
  staffMembers?: StaffMemberRecord[];
}
