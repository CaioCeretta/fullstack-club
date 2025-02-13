import { db } from '@/_lib/prisma'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const productId = params.id

  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  })

  if (!product) {
    return NextResponse.json(
      { message: `Product with the id ${productId} was not found` },
      { status: 404 },
    )
  }

  return NextResponse.json({ product }, { status: 200 })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  await db.product.delete({
    where: {
      id: params.id,
    },
  })

  return NextResponse.json({}, { status: 200 })
}
