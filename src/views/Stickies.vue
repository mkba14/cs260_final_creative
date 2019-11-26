<template>
  <div class = "overlay">
    
    <!--class-name-draggable="my-active-class"
    class-name-resizable="my-active-class"
    class-name-active="my-active-class"-->
    <vue-draggable-resizable
     class-name-dragging="my-dragging-class" 
     class-name-resizing="my-resizing-class"
     class-name="my-class"
    
    
        v-for="element in elements"
        :key="element.id"
        :x="element.x"
        :y="element.y"
        :w="100" 
        :h="100"
        :minHeight="100"
        :minWidth="100"
        
        :resizable = "true"
        z-index = "element.zindex"
        @dragging="(left, top) => dragging(element.id, left, top)" 
        @resizing="(left, top, width, height) => resizing(element.id, left, top, width, height)" 
        :parent="true"
    >
      <p>Hello! I'm a flexible component. You can drag me around and you can resize me.<br>
      X: {{ element.x }} / Y: {{ element.y }} - Width: {{ element.width }} / Height: {{ element.height }}</p>
    </vue-draggable-resizable>
    
  </div>
</template>

<script>
    //import VueDraggableResizable from 'vue-draggable-resizable'

    export default {
        data() {
            return {
                sync: false,
                draggingId: null,
                prevOffsetX: 0,
                prevOffsetY: 0,
                elements: [
                    { id: 1, x: 0, y: 0, width: 0, height: 0, zindex: 0, text: 'Element 1' },
                    { id: 2, x: 200, y: 200, width: 0, height: 0, zindex: 1, text: 'Element 2' },
                    { id: 3, x: 0, y: 200, width: 0, height: 0, zindex: 2, text: 'Element 3' },
                ]
            }
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
                this.draggingId = id;

                if (!this.sync) return;

                const offsetX = left - this.draggingElement.x;
                const offsetY = top - this.draggingElement.y;

                const deltaX = this.deltaX(offsetX);
                const deltaY = this.deltaY(offsetY);

                this.elements.map(el => {
                    if (el.id !== id) {
                        el.x += deltaX;
                        el.y += deltaY;
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
            }
        },
        computed: {
            draggingElement: function() {
                if (!this.draggingId) return;

                return this.elements.find(el => el.id === this.draggingId);
            }
        }
    }
</script>

<style>
    .my-active-class {
        background-color: lightblue;
        border: 1px solid black;
    }

    .item {
        display: flex;
        background-color: green;
        overflow: auto;
        /* scollbars where necessary*/
        /*scroll;*/
        /* scrollbars on row & column; not necssary*/
        /*hidden;*/
        /* hide overflow*/
    }

    .my-class {
        background-color: lightgreen;
        overflow: auto;
        -webkit-transition: background-color 200ms linear;
        -ms-transition: background-color 200ms linear;
        transition: background-color 200ms linear;
        border: 1px solid black;
    }

    .my-dragging-class {
        background-color: violet;
        border: 1px solid black;
    }

    .my-resizing-class {
        background-color: lightpink;
        border: 1px solid black;
    }

    .overlay {
        background-color: #ccc;
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0px;
        z-index: 0;
    }
</style>
