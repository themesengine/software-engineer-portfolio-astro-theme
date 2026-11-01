// Used by the Docker HEALTHCHECK and uptime monitors.
export const prerender = false;

export function GET() {
    return Response.json(
        {
            status: "ok"
        },
        {
            headers: {
                "Cache-Control": "no-store"
            }
        }
    );
}
