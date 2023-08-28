import { fetchVerificationCode } from '@/app/utils/fetch';
import { NextRequest, NextResponse } from 'next/server';
 
export async function POST(request: NextRequest) {
    const req = await request.json()
    const realCode = await fetchVerificationCode(req.table);
    const res = realCode === req.code
 
    return NextResponse.json({ res });
}