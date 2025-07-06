


fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
.then(res => res.json())
.then(data =>{
    const meals = data.meals;
    const select = document.getElementById('search');
    meals.forEach(meal => {
    const option = document.createElement('option');
        option.value = meal.strCategory;
        option.textContent = meal.strCategory;
        select.appendChild(option);
    })
})
document.getElementById('search-btn').addEventListener('click',()=>{

const value = document.getElementById('search').value;
console.log(value);
fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(value)}`)
.then(res => res.json())
.then(data =>{
    const meals = data.meals;
    console.log(meals);
     const result = document.getElementById('result');
        result.innerHTML = '';  
        meals.forEach(meal => {
          
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
            .then(res => res.json())
            .then(data => {
             const details = data.meals[0];
             const place = details.strArea;
          



            const price = Math.floor(Math.random()*400)+100;
        console.log(meal.strMeal); 
        const card = document.createElement('div');
        card.className = 'card-meal';
        card.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" height="200px" width="200px">`
        + `<h3>${meal.strMeal}</h3>
        <p>₹ ${price}</p>
        <h2>${place}</h2>`;

        const add = document.createElement('button');
        add.innerText = 'Add to Bill';
        add.className = 'add-btn';
       add.addEventListener('click', () => {
  const bill = document.getElementById('bill-items');
  const total = document.getElementById('total');
  const list = document.createElement('li');
  list.innerHTML = `${meal.strMeal}          - ₹ ${price}`;
  bill.appendChild(list);
  total.innerText = parseInt(total.innerText) + price;
});
        card.appendChild(add);
        result.appendChild(card);
        console.log(meal.strMealThumb);  // ✅ Correct thumbnail URL
      
            })
      });
})
}
);

 document.getElementById('bill-link').addEventListener('click', (e)=>{
   
e.preventDefault();
document.getElementById('bill').style.display = 'block';
 });

 document.getElementById('close-bill').addEventListener('click',(e)=>{
    e.preventDefault();
    document.getElementById('bill').style.display = 'none';
 })


