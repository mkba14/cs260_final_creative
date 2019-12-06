<template>
  <div id="app">
    <div class="header">
    <img src="./assets/icon.jpg" alt="logo" height="10%" width="10%" padding-right="10%">
    <h1>Stickies</h1>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> | 
            <router-link to="/stickies">Stickies</router-link>

    </div>
  </div>
    <router-view/>
      <div class="footer">
      <div color="white">Created by Spring & Makenzie &nbsp; &nbsp;&nbsp;
        <i class="fa fa-github" style="color:white; height: 20px;"></i>
        <a href="https://github.com/mkba14/cs260_final_creative">
      Check out our Github</a></div>
    </div>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
<style>
body {
  margin: 0px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.header {
  display: flex;
  justify-content: space-between;
  background: #4da6ff;
  padding: 1% 1%;
  color: white;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #fff;
}

#nav a.router-link-exact-active {
  color: navy;
}

.content {
  padding: 10px 100px;
}
.footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 35px;
    background-color: #FFC300;
    color: white !important;
    text-align: center !important;
}

.yellow {
    color: yellow !important;
}

.white {
    color: white !important;
}
</style>
