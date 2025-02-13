import { NextResponse } from 'next/server'

export async function GET() {
  const randomNumber = Math.random()

  return NextResponse.json(
    { randomNumber },
    {
      status: 200,
    },
  )
}
