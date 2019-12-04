<template>
  <div class = "overlay">
    
    <!--class-name-draggable="my-active-class"
    class-name-resizable="my-active-class"
    class-name-active="my-active-class"-->
   <div class="overlay">
    <vue-draggable-resizable :active.sync="active">
        <p>Controlling the active state from outside the component by providing the <b>:active</b> prop.</p>
    </vue-draggable-resizable>
</div>
    
  </div>
  
</template>

<script>
    export default {
        data() {
            return {
                sync: false,
                draggingId: null,
                prevOffsetX: 0,
                prevOffsetY: 0,
                elements: [
                    { id: 1, title: 'Element 1', x: 0, y: 0, width: 100, height: 100, zindex: 0, text: 'Element 1' },
                    { id: 2,title: 'Element 1',  x: 200, y: 200, width: 100, height: 100, zindex: 1, text: 'Element 2' },
                    { id: 3,title: 'Element 1',  x: 0, y: 200, width: 100, height: 100, zindex: 2, text: 'Element 3' },
                ],
                z_index_max: 0,
                current_zim: -1,
            }
        },
        created(){
          this.z_index_max = this.elements.length;  
        },
        mounted() {
            window.addEventListener('keydown', ev => {
                if (ev.keyCode === 17) {
                    this.sync = true;
                }
            });
            window.addEventListener('keyup', ev => {
                if (ev.keyCode === 17) {
                    this.sync = false;
                }
            });
        },

        methods: {
            dragging(id, left, top) {
                this.current_zim = this.elements.length;
                this.draggingId = id;


                if (!this.sync) return;

                const offsetX = left - this.draggingElement.x;
                const offsetY = top - this.draggingElement.y;

                const deltaX = this.deltaX(offsetX);
                const deltaY = this.deltaY(offsetY);

                this.elements.map(el => {
                    if (el.id !== id) {
                        el.zindex = this.z_index_max;
                        el.x += deltaX;
                        el.y += deltaY;
                        
                        if(el.y < 0){
                            el.y = 0;
                        }
                        if(el.x < 0){
                            el.x = 0;
                        }
                        console.log(el.x, el.y);
                        this.current_zim = el.zindex;
                        this.elements.id.zindex = this.current_zim;
                    }

                    return el;
                });
            },
            resizing(id, left, top, width, height) {
                this.elements.map(el => {
                    if (el.id === id) {
                        el.x = left;
                        el.y = top;
                        el.width = width;
                        el.height = height;
                    }

                    return el;
                });

                this.draggingId = null;
                this.prevOffsetX = 0;
                this.prevOffsetY = 0;
            },
            deltaX(offsetX) {
                const ret = offsetX - this.prevOffsetX;

                this.prevOffsetX = offsetX;

                return ret;
            },
            deltaY(offsetY) {
                const ret = offsetY - this.prevOffsetY;

                this.prevOffsetY = offsetY;

                return ret;
            },
        },
        computed: {
            draggingElement: function() {
                if (!this.draggingId) return;
                return this.elements.find(el => el.id === this.draggingId);
            },
        },
        watch: {
            elements: function() {
                this.z_index_max = this.elements.length; 
                return;
            },
        }
        
    }
</script>

<style>

.prevent_overflow{
    overflow: hidden;
}


/* I am toggling between hidden and visible for hover/not-hover
    because the vue-draggable-resizable handles are hidden 
    when the overflow is hidden 
    */
.my-class {
  color: black;

  overflow: hidden;
  background-color: lightgreen;
  -webkit-transition: background-color 200ms linear;
  -ms-transition: background-color 200ms linear;
  transition: background-color 200ms linear;
  border: 1px solid black;
}
/* I am toggling between hidden and visible for hover/not-hover
    because the vue-draggable-resizable handles are hidden 
    when the overflow is hidden 
    */
    
.my-class {
    position: relative;
}
/*target*/
.my-class:hover{
    /*overflow: auto;*/
    overflow: visible;
    border-bottom: none;
}



.my-class:active{
    opacity: 0.8;
}
/*
.my-class > p:hover {
     border: 1px solid black;
     border-top: none;
     border-bottom: none;
}
*/


.my-dragging-class {
  background-color: violet;
  border: 1px solid black;
}

.my-resizing-class {
  background-color: lightblue;
  border: 1px solid black;
}

.overlay {
  background-color: #ccc;
  position: fixed;
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  height: 80%;
  left: 0px;
  z-index: 0;
  overflow: scroll;
  overflow-x: scroll;
  overflow-y: scroll;
  /*
  overflow-y: hidden;
  overflow-x: visible;
  */
}
</style>
