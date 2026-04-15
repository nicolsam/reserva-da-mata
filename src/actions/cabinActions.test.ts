import { createCabinAction } from './cabinActions';
import Prisma from '@/src/lib/prisma';
import { revalidatePath } from 'next/cache';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock the Prisma client
vi.mock('@/src/lib/prisma', () => ({
  default: {
    cabin: {
      create: vi.fn(),
    },
  },
}));

// Mock next/cache
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

describe('cabinActions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a cabin successfully', async () => {
    const formData = new FormData();
    formData.append('name', 'Luxury Cabin');
    formData.append('max_capacity', '4');
    formData.append('regular_price', '200');
    formData.append('discount', '10');

    (Prisma.cabin.create as any).mockResolvedValue({ id: '1' });

    await createCabinAction(formData);

    expect(Prisma.cabin.create).toHaveBeenCalledTimes(1);
    expect(Prisma.cabin.create).toHaveBeenCalledWith({
      data: {
        name: 'Luxury Cabin',
        max_capacity: 4,
        regular_price: 200,
        discount: 10,
      },
    });
    expect(revalidatePath).toHaveBeenCalledWith('/cabins');
  });

  it('should return error when creation fails', async () => {
    const formData = new FormData();
    formData.append('name', 'Luxury Cabin');
    formData.append('max_capacity', '4');
    formData.append('regular_price', '200');

    (Prisma.cabin.create as any).mockRejectedValue(new Error('Database error'));

    const result = await createCabinAction(formData);
    expect(result).toEqual({ success: false, error: "Failed to create cabin" });
    expect(Prisma.cabin.create).toHaveBeenCalledTimes(1);
  });

  it('should return validation error when name is missing', async () => {
    const formData = new FormData();
    formData.append('max_capacity', '4');
    formData.append('regular_price', '200');

    const result = await createCabinAction(formData);
    expect(result.success).toBe(false);
    expect(result.error).toBeTruthy();
  });

  it('should return validation error when price is negative', async () => {
    const formData = new FormData();
    formData.append('name', 'Test Cabin');
    formData.append('max_capacity', '4');
    formData.append('regular_price', '-10');

    const result = await createCabinAction(formData);
    expect(result.success).toBe(false);
    expect(result.error).toBeTruthy();
  });
});
