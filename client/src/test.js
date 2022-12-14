const PRODUCTS = [
  { category: "Fruits", price: "1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "1", stocked: true, name: "Peas" },
];

let time = performance.now();

const categories = Array.from(
  new Set(
    PRODUCTS.map((product) => {
      return product.category;
    })
  )
);

time = performance.now() - time;

let time2 = performance.now();

const categories2 = PRODUCTS.reduce((acc, current) => {
  if (acc.indexOf(current.category) === -1) {
    acc.push(current.category);
  }
  return acc;
}, []);

time2 = performance.now() - time2;

let time3 = performance.now();

const categories3 = Object.keys(
  Object.fromEntries(PRODUCTS.map(({ category }) => [category]))
);

time3 = performance.now() - time3;

console.log(categories, time);
console.log(categories2, time2);
console.log(categories3, time3);
