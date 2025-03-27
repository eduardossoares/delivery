const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api-delivery-three.vercel.app", // Substitua pelo domínio real
        port: "",
        pathname: "/api/files/**",
      },
    ],
  },
};
module.exports = nextConfig;
