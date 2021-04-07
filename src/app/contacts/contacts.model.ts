export class Contacts{

    constructor(
        public id: string,
        public name: string,
        public email: string,
        public price: string,
        public imageUrl: string,
        public group: Contacts[]
        ){}
}
