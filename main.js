//get API
var totalApi;
totalApi = localStorage.getItem("infApi");
//ham lay ra person de thuc hien lenh
function getExercises(callback){
  fetch(totalApi)
  .then((response)=>{
      return response.json();
  })
  .then(callback);
}
//tao ham render ra giao dien
function renderKey(key){
  var htmls = key.map((currentKey, currentIndex)=>{
    return `
      <li>
        <h3 id="id${currentKey.id}"> 
          ${currentIndex +1}: ${currentKey.key}
          <button class="deleteButton" onclick="deleteKey(${currentKey.id})"> &times; </button>
        </h3>
      </li>
    `;
  })
  var htmlCode = htmls.join("");
  var keySpace = document.querySelector("#keyList");
  keySpace.innerHTML = htmlCode;
}

//ham them vao danh sach
function addKey(callback){
  var createButton = document.querySelector("button#btn");
  createButton.onclick = ()=>{
    //lay thong tin du lieu
    var ques = document.querySelector("input.ques").value;
    var keyQues = document.querySelector("input.keyQues").value;
    //tao them data moi
    var newData = {
      ques: ques,
      key: keyQues
    };
    //them no vao file json
    var options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newData)
    };
    fetch(totalApi,options)
        .then((response)=>{
            return response.json();
        })
        .then(callback);
    }
}


//ham xoa dap an
function deleteKey(id){
   //fetch tiep
   var options = {
    method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    }
    fetch(totalApi+"/"+id, options)
      .then((response)=>{
          return response.json();
      })
      .then((data)=>{
          document.querySelector(`h2#id${id}`).remove();
      });
}

//thuc thi lenh chay full
function start(){
  getExercises((data)=>{
    renderKey(data);
  })
  addKey((data)=>{
    renderKey(data);
  })
}

document.querySelector(".entry").addEventListener("click", ()=>{
  var name = document.querySelector(".name").value;
  var api = document.querySelector(".api").value;
  totalApi = `${api}/${name}`;
  localStorage.setItem('infApi', `${totalApi}`);
  start();
})
start();

