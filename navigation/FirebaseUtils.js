import { firestore } from '../firebase';
export const getUserRole = async (userId) => {
  try {
    const userRef = firestore.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      const userData = userDoc.data();
     

      return userData.role;
    }
  } catch (error) {
    console.error('khong lay dc role', error);
  }

  return null;
};