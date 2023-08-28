import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const res = [{name:"user 1"}, {name:"user 2"}, {name:"user 3"}, {name:"user 4"}, {name:"user 5"}]
    console.log("get users");
   
    return NextResponse.json({ res });
}

export async function POST(request: NextRequest) {
    console.log("post users");
   
    return NextResponse.json({ message: "ok" });
}

export async function DELETE(request: NextRequest) {
    console.log("delete user");
   
    return NextResponse.json({ message: "ok" });
}