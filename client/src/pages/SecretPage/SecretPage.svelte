<script>
    import { useNavigate, useLocation } from "svelte-navigator";
    import { onMount } from "svelte";
    import { baseUrl } from "../../Components/stores/generelStore";
    import { user } from "../../Components/stores/userStore";

    const navigate = useNavigate();
    const location = useLocation();

    onMount( async () => {
      let sessionId = localStorage.getItem('currentSession')
      let response
      if (sessionId != ""){
      response = await fetch(baseUrl+'/checkloginstatus',{
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({sessionId}), 
    })} else {
     backToHome()
    }

    if (!response.ok){
      backToHome()
    }
      
    })

    function backToHome() {
      $user = false
      localStorage.removeItem("currentUser")
      localStorage.removeItem("currentSession")
      navigate("/", { replace: true });    }

</script>

<h1>There is nothing here, but keep it a secret anyway</h1>
