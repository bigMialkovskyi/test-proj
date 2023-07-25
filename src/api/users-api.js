// функція для входу в особистий кабінет
// приймає форму з обліковими даними
// шукає користувача в середині indexedDB
// в разі успіху повертає відповідний статус 
// в разі помилки повертаємо текст помилки
const userLogin = async (form) => {
  return new Promise((resolve, reject) => {
    const dbName = "auth";
    const dbVersion = 2;
    let db

    function getFromDB() {
      const transaction = db.transaction(["users-list"], "readonly");
      const objectStore = transaction.objectStore("users-list");
      const request = objectStore.getAll();

      request.onsuccess = (event) => {
        const result = event.target.result;
        if (!result) {
          return resolve({
            success: false,
            message: "Data not found in IndexedDB."
          })
        }
        const user = result.find((item) => item.login === form.login)
        console.log(user)
        console.log(form.password)
        if (!user) return resolve({
          success: false,
          message: 'user with that name does not exist'
        })
        if (user.password !== form.password) return resolve({
          success: false,
          message: "Invalid password"
        })
        return resolve({
          success: true,
          message: "logined",
          user
        })
      };

      request.onerror = (event) => {
        reject({
          success: false,
          message: "Error getting data from IndexedDB",
          error: event.target.error
        })
      };
    }

    const DBOpenRequest = window.indexedDB.open(dbName, dbVersion);

    DBOpenRequest.onsuccess = (event) => {
      db = DBOpenRequest.result;
      console.log("IndexedDB connection opened successfully!");
      getFromDB()
    };

    DBOpenRequest.onerror = (event) => {
      reject({
        success: false,
        message: "Error opening IndexedDB:",
        error: event.target.error
      })
    };
  })
};

// функція для реєстрації
// викликається для створення бази даних та сховища об'єктів і / або створення нового запису в ній
// якщо дані з форми відповідають вимогам - створюється новий користувач
// в разі успіху повертаємо відповідний статус
// в разі помилки повертаємо текст помилки
const createUser = async (newUser) => {
  return new Promise((resolve, reject) => {
    const dbName = "auth";
    const dbVersion = 2;
    let db

    const DBOpenRequest = window.indexedDB.open(dbName, dbVersion);

    function addToDB(data) {
      const transaction = db.transaction(["users-list"], "readwrite");
      const objectStore = transaction.objectStore("users-list");
      const request = objectStore.add(data);

      request.onsuccess = (event) => {
        return resolve({
          success: true,
          message: "Data added to IndexedDB successfully!",
          result: request.result
        })
      };

      request.onerror = (event) => {
        return reject({
          success: false,
          message: "Error adding data to IndexedDB. Maybe the username or email address is already taken",
          error: event.target.error
        })
      };
    }

    DBOpenRequest.onsuccess = (event) => {
      db = DBOpenRequest.result;
      console.log("IndexedDB connection opened successfully!");
      addToDB(newUser)
    };

    DBOpenRequest.onerror = (event) => {
      console.error("Error opening IndexedDB:", event.target.error);
      return reject({
        success: false,
        message: "Error opening IndexedDB",
        error: event.target.error
      })
    };

    DBOpenRequest.onupgradeneeded = (event) => {
      db = event.target.result;
      db.onerror = (event) => {
        return reject({
          success: false,
          message: "Error loading database.",
          error: event.target.error
        })
      };

      const objectStore = db.createObjectStore("users-list", { keyPath: "id", autoIncrement: true });
      objectStore.createIndex("login", "login", { unique: true });
      objectStore.createIndex("email", "email", { unique: true });
      objectStore.createIndex("password", "password", { unique: false });
      console.log("Object store created and upgraded.")
    };
  })
};

export const usersApi = {
  createUser,
  userLogin
};  