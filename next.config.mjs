/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'olxfpizvsxntekjdsopx.supabase.co',
            },
        ],
    },
};

export default nextConfig;
