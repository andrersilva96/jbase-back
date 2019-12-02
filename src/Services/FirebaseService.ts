import * as admin from 'firebase-admin';

export abstract class FirebaseService {
  public static async getUser (token: string) :Promise<Object> {
    const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS)
    const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG)
    adminConfig.credential = admin.credential.cert(serviceAccount)
    !admin.apps.length ? admin.initializeApp( adminConfig ) : admin.app()

    const data = await admin.auth().verifyIdToken(token)
    const userProvider:any = await admin.auth().getUser(data.uid)

    return {
      email: userProvider.providerData[0].email,
      name: userProvider.providerData[0].displayName
    }
  }
}
