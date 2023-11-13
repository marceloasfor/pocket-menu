import { MenuItem } from "./menu-item";
import { Order } from "./order";
import { User } from "./user";

export interface Data {
    users:User[];
    orders:Order[];
    menu:MenuItem[];
    // restaurant:string;
    verificationCode:string;
    username:string|null;
}