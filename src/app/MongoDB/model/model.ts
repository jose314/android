import { ObjectId } from "mongodb";
export default class Usuarios{
    constructor(public name: string,
        public lastName: string,
        public email: string,
        public phoneNumber: number,
        public vendedores: string,
        public ID?: ObjectId){}
}