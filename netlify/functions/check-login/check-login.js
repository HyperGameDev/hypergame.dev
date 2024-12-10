const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert({
        type: "service_account",
        project_id: process.env.HGD_FB1_PROJECT_ID,
        private_key_id: process.env.HGD_FB1_PRIVATE_KEY_ID,
        private_key: process.env.HGD_FB1_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.HGD_FB1_CLIENT_EMAIL,
        client_id: process.env.HFD_FB1_CLIENT_ID,
        auth_uri: process.env.HFD_FB1_AUTH_URI,
        token_uri: process.env.HFD_FB1_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.HGD_FB1_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.HGD_FB1_CLIENT_X509_CERT_URL
    }),
    databaseURL: process.env.HGD_FB1_RTDB1  // Use the environment variable for the database URL
});

exports.handler = async function(event, context) {
    const idToken = event.headers.authorization?.split('Bearer ')[1];

    if (!idToken) {
        return {
            statusCode: 401,
            body: JSON.stringify({ message: 'Unauthorized' })
        };
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        return {
            statusCode: 200,
            body: JSON.stringify({ uid: decodedToken.uid })
        };
    } catch (error) {
        console.error('Error verifying ID token:', error);
        return {
            statusCode: 401,
            body: JSON.stringify({ message: 'Unauthorized' })
        };
    }
};
