
  /** @type {import('next').NextConfig} */
  const { withGluestackUI } = require('@gluestack/ui-next-adapter');
  
  const nextConfig = {
    reactStrictMode: true,
  };
  
  module.exports = withGluestackUI(nextConfig);
  