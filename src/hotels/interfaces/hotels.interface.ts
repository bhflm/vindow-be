import { Document } from 'mongoose';

interface Hotel {
  readonly name: string;
  readonly address: string;
}
export interface InternalHotel extends Hotel, Document {
  readonly id: string;
}

export interface ExternalHotel extends Hotel {
  readonly uid: string;
};