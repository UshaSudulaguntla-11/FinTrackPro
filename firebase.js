const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

let serviceAccount;
let db;
let mockMode = false;

// In-memory store for mock testing
const inMemoryStore = {
  users: {
    'test@gmail.com': {
      email: 'test@gmail.com',
      password: '', // Will be updated below to work with bcryptjs
      displayName: 'Test User',
      createdAt: new Date().toISOString()
    }
  }
};

// We need to hash the password for the test user to work with login
const bcrypt = require('bcryptjs');
inMemoryStore.users['test@gmail.com'].password = bcrypt.hashSync('test1234', 10);

try {
  serviceAccount = require('./serviceAccountKey.json');
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }
  db = admin.firestore();
  mockMode = false;
} catch (error) {
  console.log('Firebase credentials not found or invalid. Using MOCK database for local testing.');

  // Mock Firestore for local testing with in-memory persistence
  db = {
    collection: (colName) => {
      inMemoryStore[colName] = inMemoryStore[colName] || {};

      const getDocs = (filters = []) => {
        let docs = Object.keys(inMemoryStore[colName]).map(id => ({
          id,
          data: () => inMemoryStore[colName][id]
        }));

        // Apply filters (basic support for WHERE userId == X)
        filters.forEach(f => {
          if (f.op === '==') {
            docs = docs.filter(d => d.data()[f.field] === f.value);
          }
        });

        return docs;
      };

      const queryInterface = (filters = []) => ({
        where: (field, op, value) => queryInterface([...filters, { field, op, value }]),
        orderBy: () => queryInterface(filters),
        limit: () => queryInterface(filters),
        get: async () => ({
          docs: getDocs(filters)
        })
      });

      return {
        ...queryInterface(),
        doc: (docId) => {
          return {
            get: async () => {
              const data = inMemoryStore[colName][docId];
              console.log(`[MockDB] GET ${colName}/${docId}: ${data ? 'Found' : 'Not Found'}`);
              return {
                exists: !!data,
                data: () => data || null
              };
            },
            set: async (data) => {
              console.log(`[MockDB] SET ${colName}/${docId}`, data);
              inMemoryStore[colName][docId] = { ...inMemoryStore[colName][docId], ...data };
              return { success: true };
            },
            update: async (data) => {
              console.log(`[MockDB] UPDATE ${colName}/${docId}`, data);
              inMemoryStore[colName][docId] = { ...inMemoryStore[colName][docId], ...data };
              return { success: true };
            },
            delete: async () => {
              console.log(`[MockDB] DELETE ${colName}/${docId}`);
              delete inMemoryStore[colName][docId];
              return { success: true };
            }
          };
        },
        add: async (data) => {
          const docId = 'mock-id-' + Math.random().toString(36).substr(2, 9);
          inMemoryStore[colName][docId] = data;
          return { id: docId };
        }
      };
    }
  };
  mockMode = true;
}

module.exports = { db, admin, mockMode };
