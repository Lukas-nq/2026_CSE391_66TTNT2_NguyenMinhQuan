const name_input = document.getElementById('name');
const score_input = document.getElementById('score');
const btn_submit = document.getElementById('btn_submit');
const infor = document.getElementById('infor');
const total = document.getElementById('total');
const avg = document.getElementById('avg');

const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("rank");
const sortScore = document.getElementById("sortScore");

let arr = [];
let filteredStudents = [];

let sortAsc = null;

// thêm sinh viên
btn_submit.addEventListener('click', add_info);

name_input.addEventListener('keydown', function(e){
    if(e.key === "Enter"){
        add_info(e);
    }
});

score_input.addEventListener('keydown', function(e){
    if(e.key === "Enter"){
        add_info(e);
    }
});

function add_info(event){

    event.preventDefault();

    let name = name_input.value.trim();
    let score = parseFloat(score_input.value);

    if(name === "" || isNaN(score) || score < 0 || score > 10){
        alert("Nhập thông tin hợp lệ!");
        return;
    }

    arr.push([name, score]);

    name_input.value = "";
    score_input.value = "";

    applyFilters();
}

// xác định xếp loại
function getRank(score){

    if(score >= 8.5) return "Giỏi";
    else if(score >= 7) return "Khá";
    else if(score >= 5) return "Trung bình";
    else return "Yếu";

}

// áp dụng tìm kiếm + lọc + sort
function applyFilters(){

    let keyword = searchInput.value.toLowerCase();
    let rank = filterSelect.value;

    filteredStudents = arr.filter(function(student){

        let name = student[0].toLowerCase();
        let score = student[1];
        let studentRank = getRank(score);

        let matchName = name.includes(keyword);
        let matchRank = rank === "all" || studentRank === rank;

        return matchName && matchRank;

    });

    // sort
    if(sortAsc !== null){

        filteredStudents.sort(function(a,b){

            return sortAsc ? a[1] - b[1] : b[1] - a[1];

        });

    }

    render();
}

// vẽ bảng
function render(){

    infor.innerHTML = "";

    if(filteredStudents.length === 0){

        let tr = document.createElement("tr");
        let td = document.createElement("td");

        td.colSpan = 5;
        td.textContent = "Không có kết quả";

        tr.appendChild(td);
        infor.appendChild(tr);

    }

    for(let i = 0; i < filteredStudents.length; i++){

        let student = filteredStudents[i];

        let tr = document.createElement("tr");

        let score = student[1];

        if(score < 5){
            tr.style.backgroundColor = "yellow";
        }

        let td1 = document.createElement("td");
        td1.textContent = i + 1;

        let td2 = document.createElement("td");
        td2.textContent = student[0];

        let td3 = document.createElement("td");
        td3.textContent = score;

        let td4 = document.createElement("td");
        td4.textContent = getRank(score);

        let td5 = document.createElement("td");

        let btnDelete = document.createElement("button");
        btnDelete.textContent = "Xóa";

        btnDelete.addEventListener("click", function(){

            let index = arr.indexOf(student);
            arr.splice(index,1);

            applyFilters();

        });

        td5.appendChild(btnDelete);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        infor.appendChild(tr);

    }

    updateStats();

}

// cập nhật tổng
function updateStats(){

    let sum = 0;

    for(let i = 0; i < arr.length; i++){

        sum += arr[i][1];

    }

    total.textContent = "Tổng sinh viên: " + arr.length;

    let avg_value = arr.length === 0 ? 0 : (sum / arr.length).toFixed(2);

    avg.textContent = "Điểm trung bình: " + avg_value;

}

// tìm kiếm realtime
searchInput.addEventListener("input", applyFilters);

// lọc
filterSelect.addEventListener("change", applyFilters);

// sắp xếp điểm
sortScore.addEventListener("click", function(){

    if(sortAsc === null){
        sortAsc = true;
    }else{
        sortAsc = !sortAsc;
    }

    sortScore.textContent = sortAsc ? "Điểm ▲" : "Điểm ▼";

    applyFilters();

});