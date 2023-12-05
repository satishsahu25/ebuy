/** @type {import('next').NextConfig} */
const nextConfig = {

    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [{
                    key:"Access-Control-Allow-Origin",value:"https://ebuy-satishsahu25.vercel.app",
                },{
                    key:'Access-Control-Allow-Methods',value:['GET', 'POST', 'PUT', 'DELETE']
                }]
                    
            }
        ]
    }

}

module.exports = nextConfig
