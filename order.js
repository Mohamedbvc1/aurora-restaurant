
const menu = [
  { name: "Margherita pizza",          price: 16.25, img: "images/margherita.jpg" },
  { name: "Spinach & burrata pizza",   price: 18.50, img: "images/spinach-burrata.jpg" },
  { name: "Veggie supreme pizza",      price: 17.75, img: "images/veggie-supreme.jpg" },
  { name: "Cherry tomato pesto pizza", price: 17.95, img: "images/cherry-tomato-pesto.jpg" },
  { name: "Four cheese pizza",         price: 18.25, img: "images/four-cheese.jpg" },
  { name: "Classic burger",            price: 14.50, img: "images/classic-burger.jpg" },
  { name: "Cheeseburger",        price: 16.95, img: "images/cheeseburger.jpg" },
  { name: "Double smash burger",       price: 18.50, img: "images/double-smash-burger.jpg" },
  { name: "Buffalo wings",             price: 13.95, img: "images/buffalo-wings.jpg" },
  { name: "Honey garlic wings",        price: 14.25, img: "images/honey-garlic-wings.jpg" },
  { name: "Ribeye steak",              price: 32.00, img: "images/ribeye-steak.jpg" },
  { name: "Sirloin steak",             price: 27.50, img: "images/sirloin-steak.jpg" }
];

const menuDiv = document.getElementById("menu");

menu.forEach(function (dish, index) {
  const card = document.createElement("div");
  card.className = "card";

  const pic = document.createElement("img");
  pic.src = dish.img;
  pic.alt = dish.name;

  const title = document.createElement("h3");
  title.textContent = dish.name;

  const price = document.createElement("p");
  price.textContent = "$" + dish.price.toFixed(2);

  const qty = document.createElement("input");
  qty.type = "number";
  qty.min = 0;
  qty.value = 0;
  qty.id = "qty" + index;

  const info = document.createElement("div");
  info.className = "info";
  info.append(pic, title, price);

  card.append(info, qty);
  menuDiv.append(card);
});



const summaryDiv = document.getElementById("summary");

function updateSummary() {
  let subtotalCents = 0;
  let lines = "";

  menu.forEach(function (dish, index) {
    const qty = Number(document.getElementById("qty" + index).value);
    if (qty > 0) {
      const lineCents = Math.round(dish.price * 100) * qty;
      subtotalCents += lineCents;
       lines += "<p class='row'><span>" + qty + " × " + dish.name + "</span><span>$" + (lineCents / 100).toFixed(2) + "</span></p>";
    }
  });

  const gstCents = Math.round(subtotalCents * 0.05);
  const totalCents = subtotalCents + gstCents;

  summaryDiv.innerHTML =
    "<p class='label'>YOUR ORDER</p>" +
    lines +
    "<hr>" +
    "<p class='row'><span>Subtotal</span><span>$" + (subtotalCents / 100).toFixed(2) + "</span></p>" +
    "<p class='row'><span>GST (5%)</span><span>$" + (gstCents / 100).toFixed(2) + "</span></p>" +
    "<hr>" +
    "<p class='row total'><span>Total</span><span>$" + (totalCents / 100).toFixed(2) + "</span></p>";
   
    const btn = document.createElement("button");
    btn.textContent = "Generate Receipt";
    btn.id = "receiptBtn";
    btn.addEventListener("click", showReceipt);
    summaryDiv.append(btn);
}

menuDiv.addEventListener("input", updateSummary);
updateSummary();


function showReceipt() {
   document.getElementById("receipt")?.remove();
  let text = "AURORA RESTAURANT - RECEIPT\n" + new Date().toLocaleString() + "\n\n";
  let subtotalCents = 0;

  menu.forEach(function (dish, index) {
    const qty = Number(document.getElementById("qty" + index).value);
    if (qty > 0) {
      const lineCents = Math.round(dish.price * 100) * qty;
      subtotalCents += lineCents;
      text += qty + " x " + dish.name + "  $" + (lineCents / 100).toFixed(2) + "\n";
    }
  });

  if (subtotalCents === 0) {
    alert("Please choose at least one dish.");
    return;
  }

  const gstCents = Math.round(subtotalCents * 0.05);
  const totalCents = subtotalCents + gstCents;
  text += "\nSubtotal: $" + (subtotalCents / 100).toFixed(2);
  text += "\nGST (5%): $" + (gstCents / 100).toFixed(2);
  text += "\nTotal: $" + (totalCents / 100).toFixed(2);
  text += "\n\nThank you for dining with us!";

  const receipt = document.createElement("div");
  receipt.id = "receipt";
  receipt.textContent = text;
  summaryDiv.append(receipt);
}