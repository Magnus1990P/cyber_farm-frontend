export async function GET() {
    const res = await fetch(
        `http://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/companies`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
    )
    .then(response => {
        if(response.ok){ return response.json(); }
        else { throw new Error("Failed query", {cause: response}); }
    })
    .then(data => {
        return data;
    })
    .catch(function(err) {
        return [];
    });

    const data = await res;
    return new Response(JSON.stringify(data), {status: 200,});
}
