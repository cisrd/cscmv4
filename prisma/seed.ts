import { faker } from "@faker-js/faker";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


interface Country {
    name: string;
    code: string;
}

const generateUniqueCountries = (): Country[] => {

    const countries = new Set<string>();
    for (let i = 0; i < 195; i++) {
        countries.add(JSON.stringify({
            name: faker.location.country(),
            code: faker.location.countryCode('alpha-2')
        }));
    }
    return Array.from(countries).map(country => JSON.parse(country) as Country);

}

async function main() {

    try {
        await prisma.tCountry.deleteMany();

        const uniqueCountries = generateUniqueCountries();

        const result = await prisma.tCountry.createMany({
            data: uniqueCountries,
            skipDuplicates: false, // This ensures that duplicates are not inserted
        });

        console.log(`Countries created: ${result.count}`);
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
