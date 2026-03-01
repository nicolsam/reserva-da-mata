import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaClient } from '../app/generated/prisma/client';
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    await prisma.cabins.deleteMany(); // Opcional: limpa a tabela antes de popular

    await prisma.cabins.createMany({
        data: [
        {
            name: 'Cozy Cabin',
            max_capacity: 4,
            regular_price: 150.0,
            discount: 20.0,
            description:
            'A cozy cabin in the woods with a fireplace and a hot tub.',
            imageUrl: 'https://example.com/images/cozy_cabin.jpg',
        },
        {
            name: 'Lakeside Retreat',
            max_capacity: 6,
            regular_price: 250.0,
            discount: 50.0,
            description:
            'A beautiful lakeside retreat with stunning views and a private dock.',
            imageUrl: 'https://example.com/images/lakeside_retreat.jpg',
        },
        {
            name: 'Mountain Lodge',
            max_capacity: 8,
            regular_price: 300.0,
            discount: 75.0,
            description:
            'A spacious mountain lodge with a large deck and panoramic views.',
            imageUrl: 'https://example.com/images/mountain_lodge.jpg',
        },
        ],
    });
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
