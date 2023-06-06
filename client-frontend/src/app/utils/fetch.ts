// server-only
// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching

export async function fetchUsers() {
    return [{name:"user 1"}, {name:"user 2"}, {name:"user 3"}, {name:"user 4"}, {name:"user 5"}];
}

export async function fetchOrders() {
    return [{itemId: 1, name:"order 1", observations: "no lettuce", quantity: 1}, {itemId: 1, name:"order 2", observations: null, quantity: null}, {itemId: 1, name:"order 3", observations: null, quantity: null}, {itemId: 1, name:"order 4", observations: null, quantity: null}, {itemId: 1, name:"order 5", observations: null, quantity: null}, {itemId: 1, name:"order 6", observations: null, quantity: null}, {itemId: 1, name:"order 7", observations: null, quantity: null}];
}

export async function fetchMenu() {
    return [{id: 1, name:"menu item 1", price:0.0}, {id: 2, name:"menu item 2", price:0.0}, {id: 3, name:"menu item 3", price:0.0}, {id: 4, name:"menu item 4", price:0.0}, {id: 5, name:"menu item 5", price:0.0}, {id: 6, name:"menu item 6", price:0.0}, {id: 7, name:"menu item 7", price:0.0}, {id: 8, name:"menu item 8", price:0.0}, {id: 9, name:"menu item 9", price:0.0}, {id: 10, name:"menu item 10", price:0.0}];
}

export async function fetchVerificationCode(table:string) {
    return "asdfg"
}