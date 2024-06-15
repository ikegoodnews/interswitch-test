import localForage from 'localforage';
import CryptoJS from 'crypto-js';

localForage.setDriver([localForage.INDEXEDDB, localForage.LOCALSTORAGE, localForage.WEBSQL]);
const passphrase = 'interswtich-test-lock';
export const eventsKey = 'interswitch-test-events';

export const getObjectFromStorage = async (key) => {
   try {
      return localForage.getItem(key).then((data) => {
         if (passphrase && !!data) {
            data = CryptoJS.AES.decrypt(data, passphrase);
            data = data.toString(CryptoJS.enc.Utf8);
            return JSON.parse(data);
         }
         return data;
      });
   } catch (error) {
      throw error;
   }
};

export const clearObjectFromStorage = async (key) => {
   try {
      await localForage.removeItem(key);
      return true;
   } catch (error) {
      throw error;
   }
};

export const setObjectInStorage = async (key, data) => {
   try {
      if (passphrase) {
         data = CryptoJS.AES.encrypt(JSON.stringify(data), passphrase).toString();
      }
      await localForage.setItem(key, data);
      return true;
   } catch (error) {
      throw error;
   }
};
