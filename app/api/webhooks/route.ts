import prisma from '@/lib/db'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)

    // Do something with payload
    // For this guide, log payload to console
    if (evt.type === 'user.created') {
        const { id, email_addresses, first_name, image_url, last_name } = evt.data
        try {
            const newEvent = await prisma.user.create({
            data: {
              id: id,
              email: email_addresses[0].email_address,
              firstName: first_name,
              lastName: last_name,
              profileImage: image_url,
            },
          })
          return new Response(JSON.stringify(newEvent), {
            status: 201,
          })
        } catch (err) {
          console.error('Error: Failed to store event in the database:', err)
          return new Response('Error: Failed to store event in the database', {
            status: 500,
          });
        }
    }
    
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}