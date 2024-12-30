export type OrderDetails = {
    type: string;
    servings: number;
    occasion: string;
    deliveryDate: Date;
    description: string;
    referenceImages: File[];
    allergyInfo: string;
  };
  
  export type ContactDetails = {
    name: string;
    email: string;
    phone: string;
    address: string;
  };