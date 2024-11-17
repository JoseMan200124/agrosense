// src/app/api/auth/route.js
export async function GET(request) {
    return new Response(JSON.stringify({ message: "API de AgroSense" }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
