const submitBtn = document.querySelector(".order-submit")
const selectedItemAre = document.querySelector('.item-selected');
const totalBillArea = document.querySelector('.total-bill-amount')
let totalBill = 0;

submitBtn.addEventListener('click', () => {
    const itemQuantity = orderAmount.value;
    const itemSelected = menuList.value;
    let itemPrice;

    getItemPrice(itemSelected)
    .then(price => {
        itemPrice = price * itemQuantity;
        totalBill += itemPrice
        console.log(totalBill)
        updateTotalBill(parseFloat(totalBill).toFixed(2))
        printData(itemSelected, itemQuantity, itemPrice)
    })
    
})

const getItemPrice = (itemName) => {
    return fetch('../product.json')
    .then(response =>{
        if(!response.ok){
            throw new Error('Networ response error');
        }
        return response.json();
    })
    .then(data => {
        const foods = data.menu;
        let foodPrice  = 0;
        
        //find price
        foods.forEach(element => {
            if(itemName === element.item_name){
                foodPrice = element.item_price;
            }
        })
        
        return foodPrice
        
    })
}

const printData = (pName, pQuantity, pPrice) => {
    const details = [pName, pQuantity,pPrice]
    const tBody = document.querySelector('.table-body')
    const tRow = `<tr><td>${pName}</td><td>${pQuantity}</td><td>$${pPrice}</td></tr>`;
    tBody.innerHTML += tRow;
}

const updateTotalBill = (totalBill) => {
    totalBillArea.innerText = totalBill
}
