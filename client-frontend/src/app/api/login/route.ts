import { fetchUsers } from '@/app/utils/fetch';
import { NextRequest, NextResponse } from 'next/server';
 
export async function POST(request: NextRequest) {
  const req = await request.json()
  const res = await fetch('', {
      method: 'POST',
      body: JSON.stringify({ username: req.username, verification_code: req.verification_code }),
    })
  const data = await res.json();
 
  return NextResponse.json({ data });
}