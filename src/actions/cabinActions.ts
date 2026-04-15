'use server';

import { revalidatePath } from 'next/cache';
import { toast } from 'sonner';
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
        return { success: true };
    } catch (error) {
        console.error("Error creating cabin:", error);
        return { success: false, error: "Failed to create cabin" };
    }
}
