<template>
    <div>
        <div>Make New Stickie!</div>
        <form>
            <input v-model="title" placeholder="title">
            <br>
            <textarea v-model="text" placeholder="description" rows="4" cols="50"></textarea>
            <br>
            <button @click="addSticky">Make New Sticky :)</button>
        </form>
        
      <vue-draggable-resizable
        class-name="my-class"
        class-name-active="my-active-class"
        v-for="element in elements"
        :key="element._id"
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
        @resizing="(left, top, width, height) => resizing(element._id, left, top, width, height)" 

        @dragging="(left, top) => dragging(element._id, left, top)"
        @dragstop="(left, top) => dragstop(element._id, left, top)"
      >
          
          <!--<vue-draggable-resizable
          :w="element.width"
          :h="element.height"
          :resizable="true"
          :draggable="false"-->
          <div class="top_bar">
              <button @click="deleteSticky(element)">X</button>
          </div>
          <div
          class = "scrollable">
            <h3>{{element.title}}
            </h3>
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
    /* global axios*/
    import axios from 'axios';

    export default {
        data() {
            return {
                sync: false,
                draggingId: null,
                prevOffsetX: 0,
                prevOffsetY: 0,
                elements: [],
                title: "",
                text: "",

            }
        },
        created() {
            this.getStickies();
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
            async getStickies() {
                try {
                    console.log("get stickies");
                    let response = await axios.get("/api/notes");
                    this.elements = response.data;
                    return true;
                }
                catch (error) {
                    console.log("error in getting stickies");
                    console.log(error);
                }
            },
            async addSticky() {
                console.log("upload");
                try {

                    await axios.post('/api/notes', {
                        title: this.title,
                        text: this.text
                    });
                    this.text = "";
                    this.title = "";
                }
                catch (error) {
                    console.log("What doesn't it work?");
                    console.log(error);
                }
                this.getStickies();
            },

            async deleteSticky(sticky) {
                try {
                    console.log("deleting sticky: ", sticky);
                    let response = await axios.delete('/api/notes/' + sticky._id);
                    this.getStickies();
                    return true;
                }
                catch (error) {
                    console.log(error);
                }
            },

            async editSticky(sticky) {
                try {
                    console.log("Edit ", sticky);
                    let response = await axios.put("/api/notes/" +
                        sticky._id, {
                            x: sticky.x,
                            y: sticky.y,
                            height: sticky.height,
                            width: sticky.width
                        });
                    this.getStickies();
                    return true;
                }
                catch (error) {
                    console.log(error);
                }
            },
            dragging(id, left, top) {
                this.draggingId = id;

                if (!this.sync) return;

                const offsetX = left - this.draggingElement.x;
                const offsetY = top - this.draggingElement.y;


                const deltaX = this.deltaX(offsetX);
                const deltaY = this.deltaY(offsetY);
                //this.elements._id.z_index = 100 + left;
                this.elements.map(el => {
                    if (el._id !== id) {
                        el.x += deltaX;
                        el.y += deltaY;
                        if (el.x < 0) {
                            el.x = 0;
                        }
                        if (el.y < 0) {
                            el.y = 0;
                        }
                        //el.z_index = 100;
                    }

                    return el;
                });
            },
            dragstop(id, left, top) {
                this.elements.map(el => {
                    if (el._id === id) {
                        el.x = left;
                        el.y = top;
                        this.editSticky(el);
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
                    if (el._id === id) {
                        el.x = left;
                        el.y = top;
                        el.width = width;
                        el.height = height;
                        this.editSticky(el);
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

                return this.elements.find(el => el._id === this.draggingId);
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

    .top_bar {
        height: 20%;
    }

    .scrollable {
        background-color: lightblue;
        /*opacity: 80%;*/
        height: 80%;
        width: 100%;
        overflow: auto;
    }

    .top_bar>button {
        height: 100%;
    }
</style>
