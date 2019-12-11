<template>
  <div class="about">
    <h1>Welcome to Stickies!</h1>
    <h2>A page for you to make notes</h2>
    <h2>and keep track of important things</h2>
    
    
    <br>
    <br>
    
    <div>
      <h2>Meet our Designers:</h2>
      <div class="row">
          <div class="polaroid left-margin">
            <img src="./../assets/spring.jpeg" alt=""/> 
            <div class="pic-container">
              <p class="medium-font">Primbu</p>
            </div>
          </div>
          
          
        
          <div class="polaroid right-margin">
            <img src="./../assets/m.jpeg" alt=""/> 
            <div class="pic-container">
              <p class="medium-font">Starkid</p>
            </div>
          </div>
      </div>
      
      <br><br><br><br><br><br>
      <p>Please note we made our own icon.</p>
    <p>and what your mouse does when it hovers over the</p>
    <p>"New Sticky" button on the Sticky page :)</p>
      <br><br><br><br><br><br>
    </div>
    
  </div>
</template>


<style>
  .polaroid {
    margin: auto;
    width: 25%;
    align-content: center !important;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  .polaroid>img {
    width: 100%;
  }

  .pic-container {
    text-align: center !important;
    padding: 10px 20px;
  }

  .row {
    display: flex;
    flex-direction: row;
    content: "";
    clear: both;
    padding-top: 15px;
  }

  .left-margin {
    /*margin-left: 20%;*/
  }

  .right-margin {
    /*margin-right: 20%;*/
  }

  .bottom-margin {
    margin-bottom: 10%
  }

  .reviews-container {
    background-color: #dbd9fa;
    display: flex;
    grid-rows: auto auto auto auto;
    margin-bottom: 10px !important;
    margin-right: 10% !important;
    margin-left: 10% !important;
    border-color: black;
    border: 3px solid black;
  }

  .reviews-container .reviews-img {
    margin-left: 2%;
    margin-right: 2%;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 15%;
    height: 10%;
    border-color: black;
    border: 3px solid black;

  }

  
  /* Container holding the image and the text */

  .img-text-container {
    position: relative;
    text-align: center;
    font-size: 100px;
    color: white;
  }

  .top-left {
    position: absolute;
    top: 12%;
    left: 20%;
    transform: translate(-50%, -50%);
  }

  .top-right {
    position: absolute;
    top: 12%;
    left: 80%;
    transform: translate(-50%, -50%);
  }

  .top-centered {
    position: absolute;
    top: 10%;
    left: 30%;
    transform: translate(-50%, -50%);
  }

  .bottom-centered {
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .bottom-right {
    position: absolute;
    bottom: 12%;
    left: 65%;
    transform: translate(-50%, -50%);
  }
</style>
