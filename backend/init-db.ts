// Execute: npx ts-node init-db.ts
/*
PrismaClientKnownRequestError: 
Invalid `prisma.resource.create()` invocation in
C:\Users\yarne\OneDrive\Documents\School\Web 4\web4-project-56_17\backend\init-db.ts:45:40

  42     ],
  43   });
  44
→ 45 const earthRes = await prisma.resource.create(
An operation failed because it depends on one or more records that were required but not found. Expected 1 records to be connected, found only 0.
    at Kr.handleRequestError (C:\Users\yarne\OneDrive\Documents\School\Web 4\web4-project-56_17\backend\node_modules\@prisma\client\src\runtime\RequestHandler.ts:211:13)
    at Kr.handleAndLogRequestError (C:\Users\yarne\OneDrive\Documents\School\Web 4\web4-project-56_    at Kr.request (C:\Users\yarne\OneDrive\Documents\School\Web 4\web4-project-56_17\backend\node_modules\@prisma\client\src\runtime\RequestHandler.ts:163:12)
    at async t._request (C:\Users\yarne\OneDrive\Documents\School\Web 4\web4-project-56_17\backend\node_modules\@prisma\client\src\runtime\getPrismaClient.ts:1036:14) {
  code: 'P2025',
  clientVersion: '4.10.1',
  meta: { cause: 'Expected 1 records to be connected, found only 0.' },
  batchRequestIdx: undefined
}


set search_path to web4;
ALTER SEQUENCE "web4"."planet_planet_id_seq" RESTART WITH 1;

ALTER SEQUENCE "web4"."satellite_satellite_id_seq" RESTART WITH 1;

ALTER SEQUENCE "web4"."account_account_id_seq" RESTART WITH 1;

ALTER SEQUENCE "web4"."resource_resource_id_seq" RESTART WITH 1;
*/
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const main = async () => {
  // Use the prisma API to fill the database with some initial data

  prisma.satellite.deleteMany({}).then(()=>console.log('removed all satellites'));
  prisma.planet.deleteMany({}).then(()=>console.log('removed all planets'));
  prisma.account.deleteMany({}).then(()=>console.log('removed all accounts'));
  prisma.resource.deleteMany({}).then(()=>console.log('removed all resources'));
 
  const planets = await prisma.planet.createMany({
    data: [
      {
        planet_name: 'Earth',
        radius: 6371,
        semimajor_axis: 149598023,
        mass: 5.972168 * Math.pow(10, 24),
      },
      {
        planet_name: 'Jupiter',
        radius: 69911,
        semimajor_axis: 778412010,
        mass: 1.8986 * Math.pow(10, 27),
      },
      {
        planet_name: 'Mars',
        radius: 227939366,
        semimajor_axis: 1830,
        mass: 6.4171 * Math.pow(10, 23),
      },
      {
        planet_name: 'Mercury',
        radius: 2439.7,
        semimajor_axis: 57909175,
        mass: 3.3011 * Math.pow(10, 23),
      },
      {
        planet_name: 'Venus',
        radius: 6051.8,
        semimajor_axis: 108208000,
        mass: 4.8675 * Math.pow(10, 24),
      },{
        planet_name: 'Saturn',
        radius: 58232,
        semimajor_axis: 1426666422,
        mass: 5.6834 * Math.pow(10, 26),
      },
    ],
  });
  
const earthRes = await prisma.resource.create({
  data: {
    resource_name: 'Water',
    chemical_composition: 'H2O',
    description: 'Sustains life on Earth',
    planet_id: 1,
    planets: {
      connect: {
        planet_id: 1,
      },
    },
  },
});

const earthRes2 = await prisma.resource.create({
  data: {
    resource_name: 'Oxygen',
    chemical_composition: 'O2',
    description: 'Essential gas for breathing',
    planet_id: 1,
    planets: {
      connect: {
        planet_id: 1,
      },
    },
  },
});

const jupiterRes = await prisma.resource.create({
  data: {
    resource_name: 'Hydrogen',
    chemical_composition: 'H2',
    description: 'Most abundant element on Jupiter',
    planet_id: 2,
    planets: {
      connect: {
        planet_id: 2,
      },
    },
  },
});

const jupiterRes2 = await prisma.resource.create({
  data: {
    resource_name: 'Helium',
    chemical_composition: 'He',
    description: 'Second most abundant element on Jupiter',
    planet_id: 2,
    planets: {
      connect: {
        planet_id: 2,
      },
    },
  },
});

const marsRes = await prisma.resource.create({
  data: {
    resource_name: 'Iron',
    chemical_composition: 'Fe',
    description: 'Common metallic element on Mars',
    planet_id: 3,
    planets: {
      connect: {
        planet_id: 3,
      },
    },
  },
});

const marsRes2 = await prisma.resource.create({
  data: {
    resource_name: 'Perchlorate',
    chemical_composition: 'ClO4-',
    description: 'Chemical compound found in Martian soil',
    planet_id: 3,
    planets: {
      connect: {
        planet_id: 3,
      },
    },
  },
});
const satellites=await prisma.satellite.createMany({
  data: [
    {
      satellite_name: 'Moon',
      radius: 1737,
      semimajor_axis: 384400,
      mass: 7.34767309*Math.pow(10,22),
      planet_id: 1
},
{
  satellite_name: 'Io',
  radius: 1821.6,
  semimajor_axis: 421700,
  mass: 8.931938*Math.pow(10,22),
  planet_id: 2
},
{
  satellite_name: 'Europa',
  radius: 1560.8,
  semimajor_axis: 671100,
  mass: 4.799844*Math.pow(10,22),
  planet_id: 2
},
{
  satellite_name: 'Phobos',
  radius: 11,
  semimajor_axis: 9376,
  mass: 1.0659*Math.pow(10,16),
  planet_id: 3
},
{
  satellite_name: 'Deimos',
  radius: 6.2,
  semimajor_axis: 23460,
  mass: 1.4762*Math.pow(10,15),
  planet_id: 3
},{
  satellite_name: 'Titan',
  radius: 2575,
  semimajor_axis: 1221870,
  mass: 1.3452 * Math.pow(10, 23),
  planet_id: 6,
},
{
  satellite_name: 'Enceladus',
  radius: 252.1,
  semimajor_axis: 237948,
  mass: 1.08022 * Math.pow(10, 20),
  planet_id: 6,
},
]
})


}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
