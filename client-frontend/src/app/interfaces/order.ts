export interface Order {
    itemId: number;
    name: string;
    observations: string | null;
    quantity: number | null;
}