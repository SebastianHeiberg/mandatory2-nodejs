<script>
    import {Router, Link, Route, navigate} from "svelte-navigator"
    import Home from "./pages/Home/Home.svelte"
    import Login from "./pages/Login/Login.svelte"
    import SecretPage from "./pages/SecretPage/SecretPage.svelte"
    import PrivateRoute from "./Components/PrivateRoute.svelte";
    import { onMount } from "svelte";
    import { baseUrl } from "./Components/stores/generelStore.js";
    import { user } from "./Components/stores/userStore";

    onMount( async () => {
      let sessionId = localStorage.getItem('currentSession')
      
      if (sessionId != ""){
      const response = await fetch(baseUrl+'/checkloginstatus',{
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({sessionId}), 
    })
      if (response.ok){
        $user = true
      } else {
        $user = false
      } 
    }
  })

  async function signOut(){
    const response = await fetch(baseUrl+"/signout")
    $user = false
    localStorage.removeItem("currentSession")
    navigate("/")
  }

  </script>

<Router>
  <nav>
    <Link to="/">Home</Link>
    {#if $user === true}
    <Link to="/SecretPage">secret Page</Link>
    <button on:click={signOut}>Signout</button>
    {/if}
    {#if $user === false}
    <Link to="/login">Login</Link>    
    {/if}
  </nav>
  <div>
    <Route path="/" component={Home}/>
    <Route path="/login" component={Login}/>
    <Route>
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </Route>
  </div>

  <PrivateRoute path="/SecretPage" let:location>
    <SecretPage/>
  </PrivateRoute>
</Router>


