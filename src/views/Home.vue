<template>
  <div >
    <br>
    <h1>Welcome to STICKIES!</h1>
    <br>
    <br>
    <img src="../assets/icon.jpg" alt="logo" height="30%" width="30%" padding-right="10%">
    <br>
    <br>
    <button>
      <a href="/stickies" class="button">Go to your sticky board!</a>
    </button>
    <br>
    <br><br>
    <br><br>
    <br><br>
    <br><br>
    <br>
      
    </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'

  export default {
    name: 'home',
    components: {
      HelloWorld
    }
  }
</script>

<style>
  .button {
    background-color: navy;
    
    /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    
  }
  button:hover{
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  }
</style>
