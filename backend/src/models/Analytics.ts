import mongoose, { Schema, Document } from 'mongoose';

// Interfaces
interface IGeoLocation {
  countryName: string;
  countryCode: string;
  cityName: string;
  latitude: number;
  longitude: number;
  timeZone: string;
  isProxy: boolean;
}

interface IViewport {
  width: number;
  height: number;
}

export interface ISession extends Document {
  sessionId: string;
  timestamp: Date;
  page: string;
  referrer: string;
  userAgent: string;
  geoLocation: IGeoLocation;
  viewport: IViewport;
  createdAt: Date;
}

export interface IEvent extends Document {
  sessionId: string;
  timestamp: Date;
  eventName: string;
  params: Record<string, any>;
  createdAt: Date;
}

// Schemas
const GeoLocationSchema = new Schema({
  countryName: String,
  countryCode: String,
  cityName: String,
  latitude: Number,
  longitude: Number,
  timeZone: String,
  isProxy: Boolean
});

const ViewportSchema = new Schema({
  width: Number,
  height: Number
});

const SessionSchema = new Schema({
  sessionId: { type: String, required: true, index: true },
  timestamp: { type: Date, required: true, index: true },
  page: { type: String, required: true },
  referrer: String,
  userAgent: String,
  geoLocation: GeoLocationSchema,
  viewport: ViewportSchema,
  createdAt: { type: Date, default: Date.now, expires: '90d' } // TTL index: documents will be automatically deleted after 90 days
});

const EventSchema = new Schema({
  sessionId: { type: String, required: true, index: true },
  timestamp: { type: Date, required: true, index: true },
  eventName: { type: String, required: true },
  params: Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now, expires: '90d' } // TTL index: documents will be automatically deleted after 90 days
});

// Indexes for better query performance
SessionSchema.index({ 'geoLocation.countryName': 1 });
SessionSchema.index({ 'geoLocation.cityName': 1 });
EventSchema.index({ eventName: 1 });

// Models
export const Session = mongoose.model<ISession>('Session', SessionSchema);
export const Event = mongoose.model<IEvent>('Event', EventSchema); 