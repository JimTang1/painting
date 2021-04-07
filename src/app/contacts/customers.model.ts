export class Customers{

  constructor(
      public id: string,
      public name: string,
      public price: string,
      public description: string,
      public imageUrl: string,
      public group: Customers[]
      ){}
}
