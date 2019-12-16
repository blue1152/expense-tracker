const costs = document.querySelectorAll("#cost");
const sum = document.querySelector("#sum");
const symbols = document.querySelectorAll("#category");

// 計算總金額
let total = 0;
for (let cost of costs) {
  total += parseInt(cost.innerHTML);
}
sum.innerHTML = total;

// 符號
for (let el of symbols) {
  switch (el.innerHTML) {
    case "家居物業":
      el.innerHTML = `<i class="fas fa-home"></i>`;
      break;
    case "交通出行":
      el.innerHTML = `<i class="fas fa-shuttle-van"></i>`;
      break;
    case "休閒娛樂":
      el.innerHTML = `<i class="fas fa-grin-beam"></i>`;
      break;
    case "餐飲食品":
      el.innerHTML = `<i class="fas fa-utensils"></i>`;
      break;
    case "其他":
      el.innerHTML = `<i class="fas fa-pen"></i>`;
      break;
  }
}
