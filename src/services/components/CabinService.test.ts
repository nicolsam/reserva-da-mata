import { getAllCabins, getCabinById } from './CabinService';
import Prisma from '@/src/lib/prisma';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock the Prisma client
vi.mock('@/src/lib/prisma', () => ({
  default: {
    cabin: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

describe('CabinService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch all cabins successfully', async () => {
    const mockCabins = [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        created_at: new Date(),
        updated_at: new Date(),
        name: 'Cozy Cabin',
        description: 'A cozy place',
        imageUrl: 'url',
        max_capacity: 4,
        regular_price: 100.00,
        discount: 0,
      },
    ];
    // Cast to any to bypass type check for mock
    (Prisma.cabin.findMany as any).mockResolvedValue(mockCabins);

    const result = await getAllCabins();
    expect(result).toEqual(mockCabins);
    expect(Prisma.cabin.findMany).toHaveBeenCalledTimes(1);
  });

  it('should throw an error when fetching cabins fails', async () => {
    (Prisma.cabin.findMany as any).mockRejectedValue(new Error('Database error'));

    await expect(getAllCabins()).rejects.toThrow('Failed to fetch cabins');
    expect(Prisma.cabin.findMany).toHaveBeenCalledTimes(1);
  });

  it('should fetch a cabin by id successfully', async () => {
    const mockCabin = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      created_at: new Date(),
      updated_at: new Date(),
      name: 'Cozy Cabin',
      description: 'A cozy place',
      imageUrl: 'url',
      max_capacity: 4,
      regular_price: 100.00,
      discount: 0,
    };
    (Prisma.cabin.findUnique as any).mockResolvedValue(mockCabin);

    const result = await getCabinById('123e4567-e89b-12d3-a456-426614174000');
    expect(result).toEqual(mockCabin);
    expect(Prisma.cabin.findUnique).toHaveBeenCalledWith({
      where: { id: '123e4567-e89b-12d3-a456-426614174000' },
    });
  });

  it('should return null when fetching a cabin by id fails', async () => {
    (Prisma.cabin.findUnique as any).mockRejectedValue(new Error('Database error'));

    const result = await getCabinById('123e4567-e89b-12d3-a456-426614174000');
    expect(result).toBeNull();
    expect(Prisma.cabin.findUnique).toHaveBeenCalledTimes(1);
  });
});
