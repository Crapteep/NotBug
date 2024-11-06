
export interface Service {
    part: string;
    cost: number;
    date: Date;
  }
  
  export interface Car {
    id: number;
    make: string;
    model: string;
    year: number;
    services: Service[];
  }
  