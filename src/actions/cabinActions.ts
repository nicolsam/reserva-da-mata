'use server';

import { revalidatePath } from 'next/cache';
import { ZodError } from 'zod';
import Prisma from "@/src/lib/prisma";
import { cabinSchema } from '@/src/services/components/CabinService';

export async function createCabinAction(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());

    try {
        const validatedData = cabinSchema.parse(rawData);

        await Prisma.cabin.create({
            data: {
                ...validatedData,
                regular_price: validatedData.regular_price,
                discount: validatedData.discount,
            },
        });
        revalidatePath('/cabins');
        return { success: true };
    } catch (error) {
        if (error instanceof ZodError) {
            const firstError = error.issues[0];
            const message = firstError ? firstError.message : "Invalid form data";
            return { success: false, error: message };
        }
        console.error("Error creating cabin:", error);
        return { success: false, error: "Failed to create cabin" };
    }
}
