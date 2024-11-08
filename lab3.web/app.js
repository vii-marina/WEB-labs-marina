// Додавання продукту
function addProduct() {
    const inputProduct = document.getElementById("inputProduct").value.trim();
    if (inputProduct) {
      const newProductRef = database.ref("products/").push();
      newProductRef.set({
        name: inputProduct,
        bought: false
      });
      document.getElementById("inputProduct").value = '';
    }
  }
  
  // Відображення продуктів
  function getProducts() {
    const productList = document.getElementById("productList");
    firebase.database().ref("products/").on("value", (snapshot) => {
      productList.innerHTML = ''; // Очистити старий список
      snapshot.forEach((childSnapshot) => {
        const product = childSnapshot.val();
        const productId = childSnapshot.key;
  
        const productItem = document.createElement("div");
        productItem.className = "product-item" + (product.bought ? " bought" : "");
  
        const productName = document.createElement("span");
        productName.className = "product-name";
        productName.textContent = product.name;
        productName.onclick = () => toggleBoughtStatus(productId, product.bought);
  
        productItem.appendChild(productName);
        productList.appendChild(productItem);
      });
    });
  }
  
  // Зміна статусу продукту
  function toggleBoughtStatus(productId, boughtStatus) {
    firebase.database().ref("products/" + productId).update({
      bought: !boughtStatus
    });
  }
  
  // Виклик функції відображення при завантаженні сторінки
  getProducts();
  