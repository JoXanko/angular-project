export enum Type {
  Cat,
  Dog,
}
export class Pet {
  id: string;
  name: string;
  description: string;
  found: boolean;
  phoneNumber: number;
  photoUrl: string;
  type: Type;
  breed: string;

  constructor(
    id:string,
    name: string,
    phoneNumber: number,
    description: string,
    found: boolean,
    photoUrl: string,
    type: Type,
    breed: string
  ) {
    this.id=id;
    this.name = name;
    this.found = false;
    this.phoneNumber = phoneNumber;
    this.description = description;
    this.photoUrl = photoUrl;
    this.type = type;
    this.breed = breed;
  }
}
