
'use client';

import type { Product, SaleRecord, Account } from '@/types/kiddieMart';

const DB_NAME = 'KiddieMartDB';
const DB_VERSION = 2;
const PRODUCT_STORE_NAME = 'products';
const SALES_HISTORY_STORE_NAME = 'salesHistory';

let db: IDBDatabase | null = null;

interface Stores {
  [PRODUCT_STORE_NAME]: IDBObjectStore;
  [SALES_HISTORY_STORE_NAME]: IDBObjectStore;
  accounts: IDBObjectStore;
}

export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('IndexedDB error:', (event.target as IDBRequest).error);
      reject('Error opening IndexedDB.');
    };

    request.onsuccess = (event) => {
      db = (event.target as IDBRequest).result as IDBDatabase;
      console.log('Database opened successfully');
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const tempDb = (event.target as IDBRequest).result as IDBDatabase;
      if (!tempDb.objectStoreNames.contains(PRODUCT_STORE_NAME)) {
        const productStore = tempDb.createObjectStore(PRODUCT_STORE_NAME, { keyPath: 'id' });
        productStore.createIndex('category', 'category', { unique: false });
        console.log(`Object store "${PRODUCT_STORE_NAME}" created.`);
      }
      if (!tempDb.objectStoreNames.contains(SALES_HISTORY_STORE_NAME)) {
        const salesStore = tempDb.createObjectStore(SALES_HISTORY_STORE_NAME, { keyPath: 'id' });
        salesStore.createIndex('timestamp', 'timestamp', { unique: false });
        console.log(`Object store "${SALES_HISTORY_STORE_NAME}" created.`);
      }
      if (!tempDb.objectStoreNames.contains('accounts')) {
        tempDb.createObjectStore('accounts', { keyPath: 'id' });
        console.log(`Object store "accounts" created.`);
      }
    };
  });
};

const getStore = (storeName: keyof Stores, mode: IDBTransactionMode): IDBObjectStore => {
  if (!db) {
    throw new Error('Database not open. Call openDB() first.');
  }
  const transaction = db.transaction(storeName, mode);
  return transaction.objectStore(storeName);
};

// Product Operations
export const getAllProducts = async (): Promise<Product[]> => {
  await openDB();
  return new Promise((resolve, reject) => {
    const store = getStore(PRODUCT_STORE_NAME, 'readonly');
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result as Product[]);
    request.onerror = (event) => reject('Error fetching products: ' + (event.target as IDBRequest).error);
  });
};

export const addProductDB = async (product: Product): Promise<Product> => {
  await openDB();
  return new Promise((resolve, reject) => {
    const store = getStore(PRODUCT_STORE_NAME, 'readwrite');
    const request = store.add(product);
    request.onsuccess = () => resolve(product);
    request.onerror = (event) => reject('Error adding product: ' + (event.target as IDBRequest).error);
  });
};

export const updateProductDB = async (product: Product): Promise<Product> => {
  await openDB();
  return new Promise((resolve, reject) => {
    const store = getStore(PRODUCT_STORE_NAME, 'readwrite');
    const request = store.put(product);
    request.onsuccess = () => resolve(product);
    request.onerror = (event) => reject('Error updating product: ' + (event.target as IDBRequest).error);
  });
};

export const deleteProductDB = async (productId: string): Promise<void> => {
  await openDB();
  return new Promise((resolve, reject) => {
    const store = getStore(PRODUCT_STORE_NAME, 'readwrite');
    const request = store.delete(productId);
    request.onsuccess = () => resolve();
    request.onerror = (event) => reject('Error deleting product: ' + (event.target as IDBRequest).error);
  });
};

export const bulkAddProductsDB = async (products: Product[]): Promise<void> => {
  await openDB();
  return new Promise((resolve, reject) => {
    if (!db) {
      reject('Database not open.');
      return;
    }
    const transaction = db.transaction(PRODUCT_STORE_NAME, 'readwrite');
    const store = transaction.objectStore(PRODUCT_STORE_NAME);
    products.forEach(product => store.add(product));
    transaction.oncomplete = () => resolve();
    transaction.onerror = (event) => reject('Error bulk adding products: ' + (event.target as IDBTransaction).error);
  });
};


// Sales History Operations
export const getAllSalesHistory = async (): Promise<SaleRecord[]> => {
  await openDB();
  return new Promise((resolve, reject) => {
    const store = getStore(SALES_HISTORY_STORE_NAME, 'readonly');
    const request = store.getAll();
    request.onsuccess = () => resolve((request.result as SaleRecord[]).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    request.onerror = (event) => reject('Error fetching sales history: ' + (event.target as IDBRequest).error);
  });
};

export const addSaleRecordDB = async (saleRecord: SaleRecord): Promise<SaleRecord> => {
  await openDB();
  return new Promise((resolve, reject) => {
    const store = getStore(SALES_HISTORY_STORE_NAME, 'readwrite');
    const request = store.add(saleRecord);
    request.onsuccess = () => resolve(saleRecord);
    request.onerror = (event) => reject('Error adding sale record: ' + (event.target as IDBRequest).error);
  });
};

export const bulkAddSalesHistoryDB = async (sales: SaleRecord[]): Promise<void> => {
  await openDB();
  return new Promise((resolve, reject) => {
    if (!db) {
      reject('Database not open.');
      return;
    }
    const transaction = db.transaction(SALES_HISTORY_STORE_NAME, 'readwrite');
    const store = transaction.objectStore(SALES_HISTORY_STORE_NAME);
    sales.forEach(sale => store.add(sale));
    transaction.oncomplete = () => resolve();
    transaction.onerror = (event) => reject('Error bulk adding sales history: ' + (event.target as IDBTransaction).error);
  });
};

// Account Operations
const ACCOUNTS_STORE_NAME = 'accounts';

export const getAllAccounts = async (): Promise<Account[]> => {
  await openDB();
  return new Promise((resolve, reject) => {
    const store = getStore(ACCOUNTS_STORE_NAME, 'readonly');
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result as Account[]);
    request.onerror = (event) => reject('Error fetching accounts: ' + (event.target as IDBRequest).error);
  });
};

export const addAccountDB = async (account: Account): Promise<Account> => {
  await openDB();
  return new Promise((resolve, reject) => {
    const store = getStore(ACCOUNTS_STORE_NAME, 'readwrite');
    const request = store.add(account);
    request.onsuccess = () => resolve(account);
    request.onerror = (event) => reject('Error adding account: ' + (event.target as IDBRequest).error);
  });
};

export const updateAccountDB = async (account: Account): Promise<Account> => {
  await openDB();
  return new Promise((resolve, reject) => {
    const store = getStore(ACCOUNTS_STORE_NAME, 'readwrite');
    const request = store.put(account);
    request.onsuccess = () => resolve(account);
    request.onerror = (event) => reject('Error updating account: ' + (event.target as IDBRequest).error);
  });
};
