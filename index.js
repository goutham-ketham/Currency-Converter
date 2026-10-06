const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

console.log(countryList);

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (event) => {
    updateFlag(event.target);
  });
}

function updateFlag(element) {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}

btn.addEventListener("click", async (event) => {
  event.preventDefault();
  let amount = document.querySelector("input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 0) {
    amtVal = 1;
    amount.value = "1";
  }
  console.log(fromCurr.value, toCurr.value);
  console.log(amtVal);

  let fromCountry = fromCurr.value.toLowerCase();
  let toCountry = toCurr.value.toLowerCase();

  const URL = `${BASE_URL}/${fromCountry}.json`;

  console.log(URL);

  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCountry][toCountry];

  console.log(rate);

  let finalAmount = amtVal * rate;

  console.log(finalAmount);

  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});
