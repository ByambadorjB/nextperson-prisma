import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
    const people = await prisma.person.findMany();
    return new Response(JSON.stringify(people), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        console.log('Before reading JSON');
        const body = await req.json();
        console.log('Received data:', body); // Log the incoming data

        const {firstname, lastname, phone, dob} = body;
        if (!firstname || !lastname || !phone) {
            return new Response('Missing required fields', {
                status: 400,
            })
        }

        // Handle date conversion
        let dobDate = null;
        if(dob) {
            dobDate = new Date(dob);
            if(isNaN(dobDate.getTime())){
                return new Response('Invalid Date format', {
                    status: 400,
                });
            }
        }
        

        const person = await prisma.person.create({
            data: {
                firstname,
                lastname,
                phone,
                dob: dobDate,
                // ...(dobDate && { dob: dobDate }) // Only add dob if it's not null

            }
        })

        //return the data record
        return new Response(JSON.stringify(person), {
            // status: 202,
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        })

    } catch (error) {
        console.error('Error occured: ', error);
        console.log('Received data:', req.body);
        return new Response('Error', {
            status: 500,
        })
        
    }


}