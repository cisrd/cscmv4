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
// Seed the Country
const country = await prisma.tTreeview.create({
    data: {
      name: 'KAZAKHSTAN',
      adresse: '',
      projectCode: '',
      codeAnalytic: ''
    },
  });

  // Seed the Project under the Country
  const project = await prisma.tTreeview.create({
    data: {
      name: 'KAZ MINERALS',
      parentId: country.id,
      adresse: 'Project Address',
      projectCode: 'P1',
      codeAnalytic: '001-001'
    },
  });

  // Seed the Site under the Project
  const site = await prisma.tTreeview.create({
    data: {
      name: 'AKTOGAY',
      parentId: project.id,
      adresse: '',
      projectCode: 'S1',
      codeAnalytic: '001-001-001'
    },
  });

  // Seed the Substore under the Site
  const substore = await prisma.tTreeview.create({
    data: {
      name: 'Catering',
      parentId: site.id,
      adresse: '',
      projectCode: 'SS1',
      codeAnalytic: '001-001-001-001'
    },
  });

  // Seed the Storage under the Substore
  const storage = await prisma.tTreeview.create({
    data: {
      name: 'Storage',
      parentId: substore.id,
      adresse: 'Storage Address',
      projectCode: 'ST1',
      codeAnalytic: '001-001-001-001-001'
    },
  });

  console.log('Seeding completed.');
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
