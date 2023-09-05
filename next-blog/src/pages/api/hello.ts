// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import jsonData from '../../blog/blog.json';


type Data = {
  name: string
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log(res,"response")
  res.status(200).json(jsonData)
}
