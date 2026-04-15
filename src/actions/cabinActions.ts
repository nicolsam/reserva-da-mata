'use server';

import { revalidatePath } from 'next/cache';
import Prisma from "@/src/lib/prisma";
import { cabinSchema } from '@/src/services/components/CabinService';

export async function createCabinAction(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const validatedData = cabinSchema.parse(rawData);

    try {
        await Prisma.cabin.create({
            data: {
                ...validatedData,
                regular_price: validatedData.regular_price,
                discount: validatedData.discount,
            },
        });
        revalidatePath('/cabins');
    } catch (error) {
        console.error("Error creating cabin:", error);
        throw new Error("Failed to create cabin");
    }
}
