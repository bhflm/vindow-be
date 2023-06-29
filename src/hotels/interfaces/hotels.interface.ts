export interface Hotel {
  name: string;
  address: string;
}
export interface InternalHotel extends Hotel {};

export interface ExternalHotel extends Hotel {
  readonly uid: string;
};