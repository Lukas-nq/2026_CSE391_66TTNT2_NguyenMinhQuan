const form = document.getElementById("oder_form")
const product = document.getElementById("product")
const quantity = document.getElementById("quantity")
const date = document.getElementById("date")
const address = document.getElementById("address")
const note = document.getElementById("note")
const note_count = document.getElementById("note_count")
const total = document.getElementById("total")
const confirm_box = document.getElementById("confirm_box")

const prices = {
    ao: 150000,
    quan: 200000,
    mu: 100000
}

function show_error(id, message){
    document.getElementById(id).textContent = message;
}

function clear_error(id){
    document.getElementById(id).textContent = "";
}

function validateProduct(){
    if (product.value === ""){
        show_error("product_error","Chọn sản phẩm")
        return false;
    }
    clear_error("product_error");
    return true;
}

function validateQuantity(){
    if (quantity.value === ""){
        show_error("quantity_error","Chọn số lượng")
        return false;
    }
    if(quantity.value < 1 || quantity.value > 99 ){
        show_error("quantity_error","Số lượng từ 1 - 99")
        return false
    }
    clear_error("quantity_error");
    return true;
}

function validateDate(){
    if (date.value === ""){
        show_error("date_error","Chọn ngày giao")
        return false;
    }
    const today = new Date()
    const selected = new Date(date.value)
    
    const max = new Date()
    max.setDate(today.getDate()+30)

    if(selected < today){
        show_error("date_error","Chọn ngày tương lai")
        return false
    }
    if(selected > max){
        show_error("date_error","Không qua 30 ngày tính từ hôm nay")
        return false
    }
    clear_error("date_error");
    return true;
}

function validateAddress(){

    const value = address.value.trim()

    if(value.length < 10){
        show_error("address_error","Địa chỉ nhiều hơn 10 ký tự")
        return false
    }

    clear_error("address_error")
    return true
}

function validateNote(){
    if (note.value.length > 200){
        show_error("note_error","Không quá 200 ký tự")
        return false;
    }
    clear_error("note_error");
    return true;
}

function validatePay(){
    const pay = document.querySelector('input[name="pay"]:checked')

    if (!pay){
        show_error("pay_error","Chọn phương thức thanh toán")
        return false;
    }
    clear_error("pay_error");
    return true;
}

note.addEventListener("input", function(){
    const len = note.value.length
    note_count.textContent = len + "/200"
    if(len > 200){
        note_count.style.color = "red"
    }else{
        note_count.style.color = "black"
    }
})

function calcTotal(){
    const p = product.value
    const q = quantity.value

    if(p !== "" && q !== ""){
        const sum = prices[p] * q
        total.textContent = Number(sum).toLocaleString("vi-VN")
    }
}

product.addEventListener("change",calcTotal)
quantity.addEventListener("input",calcTotal)

form.addEventListener("submit", function(e){

    e.preventDefault()

    const valid = validateProduct() & validateQuantity() & validateDate() & validateAddress() & validateNote() & validatePay()

    if(valid){
        confirm_box.textContent = "Đặt hàng thành công!"
        form.style.display = "none"
    }

})


