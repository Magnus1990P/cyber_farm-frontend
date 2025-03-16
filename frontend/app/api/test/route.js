export async function GET() {
    return new Response(JSON.stringify([process.env.NEXT_PUBLIC_API_HOST, process.env.NEXT_PUBLIC_API_PORT]), {status: 200,});
}
