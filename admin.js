/*
* using this command to get api link
*     ssh -R 80:localhost:3000 serveo.net
*
*/


//get API
var listKey = document.querySelector("#keyList");
var mainApi = "http://localhost:3000";
fetch('db.json')
  .then(response => response.json())
  .then(data => {
    return Object.keys(data);
  })
  .then(nameStudent=>{
    let studentCount = new Array(nameStudent.length);
    for(let i=0;i<studentCount.length;i++){
      studentCount[i] = 0;
    }
    console.log(studentCount)
    //nghe lenh tu input
    for(let i=0;i<nameStudent.length;i++){
      //xet tung nguoi mot
      fetch(`${mainApi}/${nameStudent[i]}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); // Phân giải phản hồi thành JSON
        })
        .then((jsonData)=>{
          document.querySelector("#submit").addEventListener("click", ()=>{
            const targetQues = document.querySelector(".questionNo").value;
            const trueAnswer = document.querySelector(".trueAnswer").value;
            //console.log(targetQues)
            // Tìm và in ra dữ liệu chứa câu hỏi đã nhập
            for (const dataName in jsonData) {
              const data = jsonData[dataName];
              if(data.ques == targetQues){
                //console.log(nameStudent[i] + ": " + data.key);
                if(data.key == trueAnswer){
                  var htmls = `
                    <h3>${nameStudent[i]}: ${data.key} (correct)</h3>
                  `
                  studentCount[i]++;
                }else{
                  var htmls = `
                    <h3>${nameStudent[i]}: ${data.key} (wrong) </h3>
                  `
                }
                listKey.innerHTML += htmls;
                console.log(listKey)
              }
            }
            updateRes(nameStudent, studentCount);
          })
      
      })
    }
  })

function updateRes(nameStudent, studentCount){
  var resTable = document.querySelector("#result");
  var htmls = "";
  for(let i=0;i<nameStudent.length;i++){
    htmls += `
      <h3>${nameStudent[i]}: ${studentCount[i]}</h3>
    `
  }
  resTable.innerHTML = htmls;
}
