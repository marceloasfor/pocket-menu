import { NextRequest, NextResponse } from 'next/server';
 
export async function GET() {
  const res = [{itemId: 1, name:"order 1", observations: "no lettuce", quantity: 1}, {itemId: 1, name:"order 2", observations: null, quantity: null}, {itemId: 1, name:"order 3", observations: null, quantity: null}, {itemId: 1, name:"order 4", observations: null, quantity: null}, {itemId: 1, name:"order 5", observations: null, quantity: null}, {itemId: 1, name:"order 6", observations: null, quantity: null}, {itemId: 1, name:"order 7", observations: null, quantity: null}]
  console.log("get orders");
 
  return NextResponse.json({ res });
}

export async function POST(request: NextRequest) {
  const req = await request.json()
  console.log(`order ${req.id} to ${req.verification_code}`);
 
  return NextResponse.json({  });
}