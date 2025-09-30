export interface Catering {
  title: string;
  specialWishes?: string;
  slug?: string;
  remarks?: string;
  place?: string;
  offeringCreated?: boolean;
  numberOfPersons?: number;
  location?: {
    latitude?: number;
    longitude?: number;
  };
  description?: string;
  date?: Date;
  createdAt?: string;
  client?: string;
  cateringType?: string;
  cateringStyle?: string;
  additionalServices?: string[];
  end?: Date; 
  start?: Date;
  releatedFiles?: string[];
}
