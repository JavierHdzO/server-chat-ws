export const configuration =  () => ({
    PORT: parseInt(process.env.PORT),
    SECRET_KEY_JWT:  process.env.SECRET_KEY_JWT
})