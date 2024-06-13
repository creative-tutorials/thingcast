import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { userid } = req.headers;
  console.log(req.headers.cookie);

  try {
    const response = await axios.get("http://localhost:8080/event", {
      headers: {
        "Content-Type": "application/json",
        userid: userid,
      },
    });

    const data = response.data;

    if (response.status === 200) return Response.json(data);
  } catch (err: any) {
    // console.error(err);

    return Response.json({ error: err.message });
  }
}
