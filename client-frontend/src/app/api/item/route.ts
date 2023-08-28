import { NextResponse } from 'next/server';
 
export async function GET() {
  const res = [{id: 1, name:"menu item 1", price:0.0}, {id: 2, name:"menu item 2", price:0.0}, {id: 3, name:"menu item 3", price:0.0}, {id: 4, name:"menu item 4", price:0.0}, {id: 5, name:"menu item 5", price:0.0}, {id: 6, name:"menu item 6", price:0.0}, {id: 7, name:"menu item 7", price:0.0}, {id: 8, name:"menu item 8", price:0.0}, {id: 9, name:"menu item 9", price:0.0}, {id: 10, name:"menu item 10", price:0.0}]
  console.log("get menu item");
 
  return NextResponse.json({ res });
}