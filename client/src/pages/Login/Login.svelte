<script>
  import { useNavigate, useLocation } from "svelte-navigator";
  import { user } from "../../Components/stores/userStore.js";
  import {topcenterMessageSucces, topcenterMessageFail} from "../../Components/toastr/toastrMessage.js"
  import { baseUrl } from "../../Components/stores/generelStore.js";
  const navigate = useNavigate()


  async function handleSubmit(event) {

  event.preventDefault()
  let email = event.target.email.value
  let password = event.target.password.value

  try{
    const response = await fetch(baseUrl+"/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password}), 
    })

    if (response.ok) {
      topcenterMessageSucces()
      const userdata = await response.json();
      localStorage.setItem("currentUser", userdata.data.user.email)
      localStorage.setItem("currentSession", userdata.data.session)
      $user = true
      navigate("/SecretPage", { replace: true });
    } else{
      const errorResponse = await response.json();
      const errorMessage = errorResponse.data;
      topcenterMessageFail(errorMessage)
    }
    
  } catch(err){
    console.log(err)
  }
  
  }

</script>

<h1>Login</h1>
<form on:submit={handleSubmit}>
  <label>
    Email
    <input name="email" type="email" placeholder="test@test.dk" 
    />
  </label>
  <label>
    Password
    <input  name="password" type="password" placeholder="1234"/>
  </label>
  <button>Log in</button>
</form>



<style>
  form {
    max-width: 400px;
    margin: 5px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  }

  label {
    display: block;
    margin-bottom: 10px;
  }

  input[type="email"],
  input[type="password"] {
    width: 80%;
    padding: 8px;
    margin-top: 5px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  button {
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
  }

  button:hover {
    background-color: #45a049;
  }
</style>
