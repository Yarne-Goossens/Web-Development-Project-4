// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  planet_name: string
  planet_id: number
  account_id: number
  radius: number
  semimajor_axis: number 
  mass: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const response = await fetch("http://localhost:3000/planet/planetoverview");
    const jsonData = await response.json();
    console.log(jsonData)
    res.status(200).json(jsonData)
}
