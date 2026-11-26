export interface Gift {
  id?: number;        // le "?" = optionnel (json-server crée l'id à l'ajout)
  name: string;
  category: string;
  price: number;
  occasion: string;
  age: string;
  interest: string;
  description: string;
  image: string;
}