import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";


export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {

   const url = new URL(request.url); 
  
  const slug = url.searchParams.get("slug");  const { searchParams } = new URL(request.url);




  if (slug) {
    const post = await getEntry("blog", slug);

    if ( post) {
      return new Response(JSON.stringify(post), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }); 
    }
      return new Response(JSON.stringify({ msg: `Post ${ slug } not found`}), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
       
  return new Response(JSON.stringify({ msg: "Slug parameter is required" }), {
    status: 400,
    headers: {
      "Content-Type": "application/json",
    },
  });
};