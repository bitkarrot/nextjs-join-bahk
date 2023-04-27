/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    API_KEY: process.env.ADMIN_API_KEY,
    INVOICE_API_KEY: process.env.INVOICE_API_KEY,
    ON_CHAIN_WALLET: process.env.ON_CHAIN_WALLET,
    LNBITS_WALLET: process.env.LNBITS_WALLET,
    LNBITS_BASE_URL: process.env.LNBITS_BASE_URL,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  }
}

module.exports = nextConfig