export enum Type {
  Cat,
  Dog,
  null,
}

export interface Pet {
  id: string;
  ownerName: string;
  name: string;
  description: string;
  found: boolean;
  phoneNumber: string;
  photoUrl: string;
  type: Type;
  breed: string;
  date: string;
  lat: string;
  lng: string;
}

export const defaultPet: Pet = {
  id: '',
  ownerName: '',
  name: '',
  description: '',
  found: false,
  phoneNumber: '',
  photoUrl: '',
  type: Type.null,
  breed: '',
  date: '',
  lat: '',
  lng: '',
};

export const emptyPet: Pet = {
  id: '',
  ownerName: '',
  name: '',
  description: '',
  found: false,
  phoneNumber: '',
  photoUrl: '',
  type: Type.null,
  breed: '',
  date: '',
  lat: '',
  lng: '',
};
