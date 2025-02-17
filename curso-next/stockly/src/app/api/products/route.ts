import { db } from '@/_lib/prisma'
import type { Product } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const products: Product[] = await db.product.findMany()

  return NextResponse.json({ products }, { status: 200 })
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  const name = body.name
  const price = body.price
  const stock = body.stock

  await db.product.create({
    data: {
      name,
      price,
      stock,
    },
  })

  return NextResponse.json({ message: 'Success', data: body }, { status: 200 })
}
