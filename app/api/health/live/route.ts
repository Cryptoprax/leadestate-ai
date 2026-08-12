import{NextResponse}from"next/server";export function GET(){return NextResponse.json({status:"alive",version:process.env.APP_VERSION??"development",timestamp:new Date().toISOString()})}
