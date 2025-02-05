const config = {
    audience: process.env.AUTH0_AUDIENCE || "",
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL || "",
    tokenSigningAlg: process.env.AUTH0_SIGNIN_ALGO || ""
};

export default config;