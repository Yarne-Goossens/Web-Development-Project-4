// Execute: npx ts-node init-db.ts

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
      mass: 5.972168*Math.pow(10,24),
      },
      {
        planet_name: 'Jupiter',
        radius: 69911,
        semimajor_axis: 778412010,
        mass: 1.8986*Math.pow(10,27)
      },
      {
        planet_name: 'Mars',
        radius: 227939366,
        semimajor_axis: 1830,
        mass: 6.4171*Math.pow(10,23)
      }
    ]
})
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
}
]
})
const accounts=await prisma.account.createMany({
  data: [
    {
      username: 'admin',
      password: 'admin',
      email:'admin@telenet.be',
      role: 'admin'
    },
    {
      username: 'Jefke Bezos',
      password: 'Jefke',
      email:'jefke@hotmail.com',
      role: 'user'
      
    }
    ]
})

const resources=await prisma.resource.createMany({
  data: [
    {
      resource_name: 'Water',
      description: "Water is a transparent, tasteless, odorless, and nearly colorless chemical substance, which is the main constituent of Earth's streams, lakes, and oceans, and the fluids of most living organisms. It is vital for all known forms of life, even though it provides no calories or organic nutrients. Its chemical formula is H2O, meaning that each of its molecules contains one oxygen and two hydrogen atoms, connected by covalent bonds.",
      chemical_composition: 'H2O',
      planet_id: 1
    },
    {
      resource_name: 'Oxygen',
      description: "Oxygen is a chemical element with the symbol O and atomic number 8. It is a member of the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing agent that readily forms oxides with most elements as well as with other compounds. By mass, oxygen is the third-most abundant element in the universe, after hydrogen and helium.",
      chemical_composition: 'O2',
      planet_id: 1
    },
    {
      resource_name: 'Silica',
      description: "Silica, also known as silicon dioxide, is an oxide of silicon with the chemical formula SiO2, most commonly found in nature as quartz and in various living organisms. In many parts of the world, silica is the major constituent of sand. Silica is one of the most complex and most abundant families of materials, existing as a compound of several minerals and as synthetic product.",
      chemical_composition: 'SiO2',
      planet_id: 1
    },
    {
      resource_name: 'Silica',
      description: "Silica, also known as silicon dioxide, is an oxide of silicon with the chemical formula SiO2, most commonly found in nature as quartz and in various living organisms. In many parts of the world, silica is the major constituent of sand. Silica is one of the most complex and most abundant families of materials, existing as a compound of several minerals and as synthetic product.",
      chemical_composition: 'SiO2',
      planet_id: 3
    }
  ]})}


main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
