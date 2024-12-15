const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin SDK
const serviceAccount = require('../scripts/serviceAccountKey.json'); // Update this path
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://komsu-a0920-default-rtdb.europe-west1.firebasedatabase.app/' // Update this URL
});
const db = admin.database();

const exportUserData = async () => {
  try {
    const userViewsRef = db.ref('userViews');
    const userPurchasesRef = db.ref('userPurchases');
    const userRatingsRef = db.ref('userRatings');

    const [viewsSnapshot, purchasesSnapshot, ratingsSnapshot] = await Promise.all([
      userViewsRef.once('value'),
      userPurchasesRef.once('value'),
      userRatingsRef.once('value')
    ]);

    const userData = {
      views: viewsSnapshot.val(),
      purchases: purchasesSnapshot.val(),
      ratings: ratingsSnapshot.val()
    };

    const outputPath = path.join(__dirname, 'userData.json');
    fs.writeFileSync(outputPath, JSON.stringify(userData, null, 2));
    console.log('User data exported successfully:', outputPath);
  } catch (error) {
    console.error('Error exporting user data:', error);
  }
};

exportUserData();
