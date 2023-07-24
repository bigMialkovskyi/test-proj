const userLogin = async (form) => {
  const dbName = "auth";
  const dbVersion = 3;

  let db

  function getFromDB() {
    const transaction = db.transaction(["users-list"], "readonly");
    const objectStore = transaction.objectStore("users-list");
    const request = objectStore.getAll();

    // const myIndex = objectStore.index("login");

    // myIndex.openCursor().onsuccess = (event) => {
    //   const cursor = event.target.result;
    //   if (cursor) {
    //     cursor.continue();
    //   }
    // }

    request.onsuccess = (event) => {
      const result = event.target.result;
      if (result) {
        let user = null
        result.forEach(element => {
          if (element.login == form.login) return user = element
        });

        if (!user) return console.log('user with that name does not exist')
        if (user) {
          if (user.password != form.password) return console.log("Invalid password")
          if (user.password == form.password) return console.log("Welcome")
        }
      } else {
        console.log("Data not found in IndexedDB.");
      }
    };

    request.onerror = (event) => {
      console.error("Error getting data from IndexedDB:", event.target.error);
    };
  }

  const DBOpenRequest = window.indexedDB.open(dbName, dbVersion);

  DBOpenRequest.onsuccess = (event) => {
    db = DBOpenRequest.result;
    console.log("IndexedDB connection opened successfully!");
    getFromDB()
  };


  DBOpenRequest.onerror = (event) => {
    console.error("Error opening IndexedDB:", event.target.error);
  };

  DBOpenRequest.onupgradeneeded = (event) => {
    console.log("prepear to upgrade")
  };

};

const createUser = async (newUser) => {
  const dbName = "auth";
  const storeName = "users-list";
  const dbVersion = 3;
  let response_message = ''
  let db

  const DBOpenRequest = window.indexedDB.open(dbName, dbVersion);

  function addToDB(data) {
    const transaction = db.transaction(["users-list"], "readwrite");
    const objectStore = transaction.objectStore("users-list");
    const request = objectStore.add(data);

    request.onsuccess = (event) => {
      console.log("Data added to IndexedDB successfully!", request.result);
      response_message = request.result
    };

    request.onerror = (event) => {
      console.error("Error adding data to IndexedDB:", event.target.error);
    };
  }


  DBOpenRequest.onsuccess = (event) => {
    db = DBOpenRequest.result;
    console.log("ping")

    console.log("IndexedDB connection opened successfully!");
    console.log(db)

    addToDB(newUser)
  };

  DBOpenRequest.onerror = (event) => {
    console.error("Error opening IndexedDB:", event.target.error);
    return {
      success: false,
      message: "Error opening IndexedDB"
    }
  };

  DBOpenRequest.onupgradeneeded = (event) => {
    console.log("prepear to upgrade")
    db = event.target.result;
    db.onerror = (event) => {
      console.log("Error loading database.")
    };

    const objectStore = db.createObjectStore("users-list", { keyPath: "id", autoIncrement: true });
    objectStore.createIndex("login", "login", { unique: true });
    objectStore.createIndex("email", "email", { unique: true });
    objectStore.createIndex("password", "email", { unique: false });
    console.log("Object store created and upgraded.")
  };

  return response_message
};

export const usersApi = {
  createUser,
  userLogin
};  