console.log('connected')
const categoryList = document.querySelector('#category')
const menuList = document.querySelector('#menu');
const orderAmount = document.querySelector('#order-amount')


// update what is the category user selecte in
const getSelectedCategory = () => {
    categoryList.addEventListener('change', () => {
        const selectedCategory = categoryList.value ;
        menuList.replaceChildren()
        showFoodItems(selectedCategory)
    })
}

// show food items in the item selection area
const showFoodItems = (category) => {

    fetch('../product.json')
        .then(response =>{
            if(!response.ok){
                throw new Error('Networ response error');
            }
            return response.json();
        })
        .then(data => {
            const foods = data.menu;
            const selectedCategory = category || 'All';
            //console.log(selectedCategory)
            
            foods.forEach(item => {
                const category = item.category;
                const foodItem = document.createElement('option')
                const foodName = item.item_name 
                
                // show category related food items
                if(category == selectedCategory){
                    foodItem.value = foodName;
                    foodItem.innerText = foodName;
                    menuList.appendChild(foodItem)
                }
                // show all the food items when user didnt select specific category of product
                else if(selectedCategory == 'All'){                    
                    foodItem.value = foodName;
                    foodItem.innerText = foodName;
                    menuList.appendChild(foodItem)
                }
            })
            
        })

}

// show product categories in category selection area
const showCategory = () => {
    fetch('../product.json')
        .then(response => response.json())
        .then(data => {
            const foods = data.menu;
            
            // map and store categories in category variavle. 
            // this technique use for store one value when couple of same values return
            const category = [...new Set(foods.map(item => item.category))]
            
            category.forEach(item => {
                const categoryItem = document.createElement('option')
                categoryItem.value = item;
                categoryItem.innerText = item;

                categoryList.appendChild(categoryItem);
            })
            
        })
}


showFoodItems()
showCategory()
getSelectedCategory()