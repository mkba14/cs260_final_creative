<template>
    <div>
      <vue-draggable-resizable
        class-name="my-class"
        class-name-active="my-active-class"
        v-for="element in elements"
        :key="element.id"
        :x="element.x"
        :y="element.y"
        :w="element.width"
        :h="element.height"
        :min-width="50"
        :min-height="50"
        :max-width="1000"
        :max-height="1000"
        :resizable="true"
        :z-index="element.z_index"
        @resizing="(left, top, width, height) => resizing(element.id, left, top, width, height)" 

        @dragging="(left, top) => dragging(element.id, left, top)"
        @dragstop="(left, top) => dragstop(element.id, left, top)"
      >
          <!--<vue-draggable-resizable
          :w="element.width"
          :h="element.height"
          :resizable="true"
          :draggable="false"-->
          <div
          class = "scrollable" style="width:element.width, height:element.height">
            <h1>{{element.title}}
            </h1>
            <p>{{ element.text }}
            <br>
            X: {{ element.x }} / Y: {{ element.y }} 
            <br>
            Width: {{ element.width }} / Height: {{ element.height }}
            </p>
            </div>
          <!--</vue-draggable-resizable>-->

      </vue-draggable-resizable>
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
                    { id: 1, x: 0, y: 0, height: 100, width: 100, text: 'Element 1', z_index: 0 },
                    { id: 2, x: 200, y: 200, height: 10, width: 100, text: 'Element 2', z_index: 1 }
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
                //this.elements.id.z_index = 100 + left;
                this.elements.map(el => {
                    if (el.id !== id) {
                        el.x += deltaX;
                        el.y += deltaY;
                        if(el.x < 0){
                            el.x = 0;
                        }
                        if(el.y < 0){
                            el.y = 0;
                        }
                        //el.z_index = 100;
                    }

                    return el;
                });
            },
            dragstop(id, left, top) {
                this.elements.map(el => {
                    if (el.id === id) {
                        el.x = left;
                        el.y = top;
                        //el.z_index = 100;
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
    .my-class {
        background-color: lightgreen;
        border: 1px solid blue;
        /*overflow: hidden;*/
    }
    .scrollable{
        background-color: lightblue;
        opacity: 80%;
        height: 100%;
        width: 100%;
        overflow: auto;
    }
</style>
