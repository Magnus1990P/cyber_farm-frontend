export async function GET(request, { params }) {

    var request_url = `http://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/organizations/`
    const url = new URL(request.url);
    const query = url.searchParams.get('query');
    if (query !== null) {
        request_url = `${request_url}?query=${query}`
    }
    const index_flag = url.searchParams.get('index');
    if (query !== null) {
        request_url = `${request_url}${query ? '&' : '?'}index=${index_flag}`
    }
    
    const res = await fetch(
        request_url,
        `http://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/organizations/?index=false`,
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
  
 