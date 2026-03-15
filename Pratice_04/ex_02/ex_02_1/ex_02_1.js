const form = document.getElementById("input_form")
const name = document.getElementById("name")
const email = document.getElementById("email")
const phone = document.getElementById("phone")
const password = document.getElementById("password")
const confirm_pass = document.getElementById("confirm_pass")
const term = document.getElementById("term")
const success  = document.getElementById("success")

function show_error(id, message){
    document.getElementById(id).textContent = message;
}

function clear_error(id){
    document.getElementById(id).textContent = "";
}

function validateName(){
    const value = name.value.trim();
    const regex = /^[A-Za-zÀ-ỹ\s]+$/;
    if(value === ""){
        show_error("name_error","Nhập tên");
        return false;
    }
    if(value.length < 3){
        show_error("name_error","Tên nhiều hơn 3 ký tự");
        return false;
    }
    if(!regex.test(value)){
        show_error("name_error","Tên chứa chữ cái");
        return false;
    }
    clear_error("name_error");
    return true;
}

function validateEmail(){
    const value = email.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if ( value === ""){
        show_error("email_error","Nhập email")
        return false;
    }

    if (!regex.test(value)){
        show_error("email_error","Sai định dạng");
        return false;
    }

    clear_error("email_error");
    return true;
}

function validatePhone(){
    const value = phone.value.trim();
    const regex = /^0\d{9}$/;
    if (value === ""){
        show_error("phone_error","Nhập sđt");
        return false;
    }

    if (!regex.test(value)){
        show_error("phone_error","Sđt không dúng định dạng")
        return false;
    }

    clear_error("phone_error");
    return true;
}

function validatePassword(){
    const value = password.value.trim();
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (value === ""){
        show_error("password_error","Nhập password");
        return false;
    }

    if (!regex.test(value)){
        show_error("password_error","Password không dúng định dạng")
        return false;
    }

    clear_error("password_error");
    return true;
}

function validateConfirm(){
    if(confirm_pass.value !== password.value){
        show_error("confirmPass_error","Mật khẩu không khớp");
        return false;
    }
    clear_error("confirmPass_error");
    return true;
}

function validateGender(){
    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender){
        show_error("gender_error","Chọn giới tính");
        return false;
    }
    clear_error("gender_error");
    return true;
}

function validateTerm(){
    if(!term.checked){
        show_error("term_error","Đồng ý điều khoản");
        return false;
    }
    clear_error("term_error");
    return true;
}

form.addEventListener("submit",function(e){
    e.preventDefault();

    const a = validateName() & validateEmail() & validatePhone() & validatePassword() & validateConfirm() & validateGender() & validateTerm(); 

    if ( a ){
        form.style.display = "none";
        success.textContent = "Đăng ký thành công " + name.value;
    }
});

