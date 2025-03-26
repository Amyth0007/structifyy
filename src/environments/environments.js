
const developmentEnvironmentVariables = {
    apiUrl: 'https://backend-yqwt.onrender.com',
    s3Url: 'https://leads-test-public.s3.ap-south-1.amazonaws.com',
    ioSocketUrl: 'http://localhost:4444',
    env:'dev',
    qrAPI:'localhost:4200/qr?executive=',
    flatFreezeDuration: 3
}
const getEnvironments = (env) => {
    switch (env) {
        case 'dev':
            return developmentEnvironmentVariables;
        default:
            return developmentEnvironmentVariables;
    }
}

export const environments = getEnvironments('dev');
