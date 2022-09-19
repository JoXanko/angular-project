export enum Type {
  Cat,
  Dog,
  null,
}

export interface Pet {
  id: string;
  ownerName: string;
  ownerId: string;
  name: string;
  description: string;
  found: boolean;
  phoneNumber: string;
  photoUrl: string;
  type: Type;
  date: string;
  breed: string;
  lat: string;
  lng: string;
}

export const defaultPet: Pet = {
  id: '',
  ownerName: '',
  ownerId:'',
  name: '',
  description: '',
  found: false,
  phoneNumber: '',
  photoUrl: '',
  type: Type.null,
  date: '',
  breed: '',
  lat: '',
  lng: '',
};

export const emptyPet: Pet = {
  id: '',
  ownerName: '',
  ownerId:'',
  name: '',
  description: '',
  found: false,
  phoneNumber: '',
  photoUrl: '',
  type: Type.null,
  date: '',
  breed: '',
  lat: '',
  lng: '',
};
