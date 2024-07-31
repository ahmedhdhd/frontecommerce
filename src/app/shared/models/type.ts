export interface Type {
    id: number;
    name: string;
}
export class Address {
    firstName: string| undefined;
    lastName: string| undefined;
    street: string| undefined;
    city: string| undefined;
    state: string| undefined;
    zipcode: string| undefined;
}