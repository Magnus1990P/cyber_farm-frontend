export async function GET(request, { params }) {
    var request_url = `http://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/contacts`
    
    const url = new URL(request.url);
    const query = url.searchParams.get('query');
    if (query !== null) {
        request_url = `${request_url}?query=${query}`
    }

    const res = await fetch(
        request_url,
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



export async function POST(request) {
    const body = await request.json();
    const { name, email, phone } = body;

    const response = await fetch(
        `http://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/contacts`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"name": name, "email": email, "phone":phone})
        }
    )
    .then(response => {
        if(response.ok){ return response.json(); }
        else { throw new Error("Failed query", {cause: response}); }
    })
    .then(data => {
        return new Response(
            JSON.stringify({message: `Contact created ${data}`,}),
            {status: 201,}
        );
    })
    .catch(function(err) {
        return [];
    })

    return new Response(
        JSON.stringify({message: `Contact created`,}),
        {status: 201,}
    );
}
  