<template>
    <div class = "overlay">
        <div class="toggle" @click="toggleStickyMkr">Make New Sticky!</div>
        <div v-if="mkStickies">
            <form class = "myStickyForm" @submit.prevent="addSticky">
                <br>
                <br>
                <input v-model="title" placeholder="title">
                <br>
                <textarea v-model="text" placeholder="description" rows="4" cols="50"></textarea>
                <br>
                <button>Make New Sticky :)</button>
            </form>
        </div>
        <div class="lala" v-else>
        <vue-draggable-resizable
            class-name-dragging = "my-dragging-class"
            class-name-resizing = "my-resizing-class"
            class-name="my-class"
            class-name-active="my-active-class"
            
            :drag-handle="'.scrollable'"
            :draggable="canDrag"
            :resizable="canDrag"
            v-for="element in elements"
            :key="element._id"
            :x="element.x"
            :y="element.y"
            :w="element.width"
            :h="element.height"
            :min-width="100"
            :min-height="100"
            :max-width="1000"
            :max-height="1000"
            
            :parent="true"
            @resizing="(left, top, width, height) => resizing(element._id, left, top, width, height)" 
            @resizestop="moveSticky(element)"
            @dragging="(left, top) => dragging(element._id, left, top)"
            @dragstop="(left, top) => dragstop(element._id, left, top)"
          >     
          
            <div class="outsider" v-if="element._id==current_id">
                  <div class="modal" v-if="!canDrag">
                      <div class="top_bar">
                        <button @click="chgDrag(element._id)">Exit</button>
                      </div>
                      <p> Permanently Delete Sticky?<br>
                      <button @click="deleteSticky(element)">Yes</button>  
                          <button @click="chgDrag(element._id)">No</button>
                      </p>
                  </div>
            </div>
            <div class="scrollable">
                <div class="top_bar">
                    <button @click="chgDrag(element._id)">X</button>
                </div>
                <div>
                    <h3 class="left">{{element.title}}
                    </h3>
                    <p>
                        {{ element.text }}
                    </p>
                </div>
            </div>
              
          </vue-draggable-resizable>
          </div>
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
                mkStickies: false,
                deleteStickies: false,
                canDrag: true,
                canResize: true,
                current_id: "",
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
            chgDrag(id) {
                if (this.canDrag) {
                    this.current_id = id;
                    this.canDrag = false;
                }
                else {
                    this.canDrag = true;
                    this.current_id= "";
                }
                //this.canDrag = !this.canDrag;
            },
            toggleStickyMkr() {
                if (this.mkStickies === false) {
                    this.mkStickies = true;
                }
                else {
                    this.mkStickies = false;
                }
            },
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
                    console.log(this.title);
                    await axios.post('/api/notes', {
                        title: this.title,
                        text: this.text
                    });
                    this.text = "";
                    this.title = "";
                    //console.log("TURNING OFF");
                    this.mkStickies = false;
                }
                catch (error) {
                    console.log("What doesn't it work?");
                    console.log(error);
                }
                this.getStickies();
            },

            async deleteSticky(sticky) {
                try {
                    this.deleteStickies = true;
                    console.log("deleting sticky: ", sticky);
                    await axios.delete('/api/notes/' + sticky._id);
                    await this.getStickies();
                    //console.log("remaining stickies: ", this.elements);
                    this.deleteStickies = false;
                    this.chgDrag(sticky._id);
                    return true;
                }
                catch (error) {
                    console.log(error);
                }
            },

            async moveSticky(sticky) {
                try {
                    //console.log("Edit ", sticky);
                    await axios.put("/api/notes/" +
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
                    console.log("Cannot move:")
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
                        this.moveSticky(el);
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
                        /*if (!this.deleteStickies) {
                            this.moveSticky(el);
                        }*/
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

<style scoped>
    .my-class {
        background-color: lightblue;
        border: 1px solid blue;
        /*overflow: hidden;*/
    }
    
    .my-class:hover{
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    }


    .full_height {
        height: 100%;
        overflow: auto;
    }

    .scrollable {
        height: 100%;
        width: 100%;
        overflow: auto;
    }

    .top_bar>button {
        float: right;
    }

    button {
        border-radius: 20%;
        cursor: pointer;
    }
    
    button:hover{
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    }

    .board {
        height: 100%;
        width: 100%;
        background-color: black;
    }

    .overlay {
        background-color: #ccc;
        position: fixed;
        width: 90%;
        height: 80%;
        margin-left: 5%;
        margin-right: 5%;
        left: 0px;
        z-index: 0;
        overflow: scroll;
        overflow-x: scroll;
        overflow-y: scroll;
    }

    .myStickyForm {
        background-color: white;
        background-color: lightgray;
        height: 80%;
        position: fixed;
        margin-left: auto;
        margin-right: auto;
        width: 90%;
        z-index: -1;
    }
    

    .toggle {
        background-color: white;
        width: 90%;
        position: fixed;
        margin-left: auto;
        margin-right: auto;

    }

    .toggle:hover {
        background-color: blue;
        color: white;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    }

    .lala {
        height: 10000px;
        /*%;*/
        width: 10000px;
        /*linear-gradient*/
        background-color: #dbdbdb;
        background-image: linear-gradient(to bottom right, #dbdbdb, #b3b3b3, #828282, #404040)/*lightgray, darkgray, black);/*lightgray 5%, gray 5%, darkgray 5%, black 5%, darkgray 5%, gray 5%, lightgray 5%);
        */
    }

    .my-dragging-class {
        opacity: 80%;
        background-color: lightpink;
        /*border: 1px solid black;*/
    }

    .my-resizing-class {
        opacity: 80%;
        background-color: lightgreen;
        /*border: 1px solid gre;*/
    }
    .modal {
        float: left;
        background-color: lightyellow;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        width: 100%;
        
        padding-left: 2%;
        padding-right: 2%;
    }
    .outsider{
        position: absolute;
        top: 0px;
        z-index: 100;
    }
    
</style>
