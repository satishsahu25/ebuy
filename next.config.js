/** @type {import('next').NextConfig} */
const nextConfig = {

    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: {
                    "Access-Control-Allow-Origin": "https://ebuy-satishsahu25.vercel.app",
                    'Access-Control-Allow-Methods': ['GET', 'POST', 'PUT', 'DELETE']
                }
                    
            }
        ]
    }

}

module.exports = nextConfig
