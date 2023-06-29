import { Image } from './image.interface';
export interface Hotel {
  name: string;
  address: string;
}
export interface InternalHotel extends Hotel {
  readonly uid: string;
  images: Image[]
};

export interface ExternalHotel extends Hotel {
  readonly uid: string;
};