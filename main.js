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
function renderKey(){
  console.log("hehe")
  var htmls = "";
  fetch(totalApi)
  .then(response=>response.json())
  .then(key=>{
    console.log(key)
    for(let i=0;i<key.length;i++){
      htmls += `<li>
      <h3 id="id${key[i].id}"> 
        ${key[i].ques}: ${key[i].key}
        <button class="deleteButton" onclick="deleteKey(${key[i].id})"> &times; </button>
      </h3>
    </li>`
    }
    var keySpace = document.querySelector("#keyList");
    keySpace.innerHTML = htmls;
  })
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
function deleteKey(id, callback){
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
      .then(()=>{
        document.querySelector(`h3#id${id}`).remove();
      });
}

//thuc thi lenh chay full
function start(){
  getExercises(()=>{
    renderKey();
  })
  addKey(()=>{
    renderKey();
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

