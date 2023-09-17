const form = document.getElementById("payment-form")
const messageBar = document.getElementById("message-bar")


const removeMessageBar = (param) => {
    setTimeout(()=>{
        messageBar.classList.remove("show-message", param)
    }, 3000)
}

const handleSubmit = async(e) => {
    e.preventDefault();
    
    let formdata = new FormData(form);
    
    //convert formdata to json
    let payload  = {};

    formdata.forEach((value, key)=>{
        payload[key] = value
    });
    // payload["expiry_date"] = "2023-03-04"

    const res = axios.post("http://127.0.0.1:7001/payment/validate", data = payload)
      .then((response) => {

        messageBar.innerText = response?.data.message;
        messageBar.classList.add('show-message','success')
        form.reset()
        removeMessageBar("success");

      },(error) => {

        messageBar.innerText = error?.response?.data?.detail;
        messageBar.classList.add('show-message','error')
        removeMessageBar("error");
      });

}


form.addEventListener('submit', handleSubmit)

