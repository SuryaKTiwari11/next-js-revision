import {NextResponse} from "next/server"

export async function GET(_req:Request,{params}:{params:{id:string}}) {
  const { id } = params;
  return NextResponse.json({ message: "Post fetched successfully", postId: `${id}` });
}
