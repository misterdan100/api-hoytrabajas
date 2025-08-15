import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const res = await prisma.product.create({data: body})

    return Response.json(res, { status: 200})

  } catch (error) {
    console.log(error)
  }
}

export async function GET() {
  const products = await prisma.product.findMany()

  return Response.json(products, {status: 200})
}