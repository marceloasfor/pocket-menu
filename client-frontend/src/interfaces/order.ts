export interface Order {
    itemId: number;
    name: string;
    observations: string | null;
    price: number | null;
}