const admin = require("firebase-admin");
const XLSX = require("xlsx");
const fs = require("fs");

// Firebase'ga ulanish
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

// Excel faylini o‘qish
const workbook = XLSX.readFile("users.xlsx");
const sheetName = workbook.SheetNames[0]; // 1-chi sahifa
const sheet = workbook.Sheets[sheetName];

// Excelni JSON formatga o‘tkazish
let users = XLSX.utils.sheet_to_json(sheet);

// **Bo‘sh qiymatlarni filtrlash**
users = users.filter(user => user.login && user.parol && user.fio && user.guruh);

// **100 ta foydalanuvchini bitta arrayga joylab, 100 ta document yaratish**
const chunkSize = 100; // Har bir document uchun 100 ta user
const userChunks = [];

for (let i = 0; i < users.length; i += chunkSize) {
  userChunks.push(users.slice(i, i + chunkSize));
}

// **Firebase'ga yuklash**
async function uploadUsers() {
  try {
    for (let i = 0; i < userChunks.length; i++) {
      const batch = db.batch();
      const docRef = db.collection("users").doc(`batch_${i + 1}`);

      batch.set(docRef, { users: userChunks[i] });
      await batch.commit();
      console.log(`batch_${i + 1} yuklandi`);
    }
    console.log("Hamma foydalanuvchilar yuklandi!");
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
  }
}

uploadUsers();
