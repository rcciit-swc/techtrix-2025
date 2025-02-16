/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i.postimg.cc',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'i.imgur.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'sfrxivbavmvrjmmrmfxq.supabase.co',
          port: '',
          pathname: '/storage/v1/object/public/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  