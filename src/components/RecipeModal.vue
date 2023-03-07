<template>
    <!-- ref 都要叫modal -->
    <div class="modal fade" ref="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
            <div class="modal-header bg-dark">
                <h5 class="modal-title text-white" id="exampleModalLabel">
                  <span v-if="status === 'edit'">編輯產品內容</span>
                  <span v-else-if="status === 'new'">新增產品內容</span>
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-4">
                      <div class="row">
                        <div class="col-12">
                          <label for="imgUrl" class="form-label">圖片網址</label>
                          <input type="text" id="imgUrl" class="form-control mb-3" v-model="tempRecipe.image">
                          <img :src="tempRecipe.image" alt="" width="300">
                        </div>
                        <div class="col-12">
                          <label for="videoUrl" class="form-label">影片網址</label>
                          <input type="text" id="videoUrl" class="form-control mb-3" v-model="tempRecipe.video">
                        </div>
                        <div class="col-12">
                          <label for="ingredients" class="form-label">材料</label>
                          <div class="input-group mb-3 " v-for="(item, index) in tempRecipe.ingredients" :key="item + 342">
                            <div class="input-group-text">{{ index + 1 }}</div>
                            <input type="text" id="ingredients" class="form-control " v-model="tempRecipe.ingredients[index].name" style="width: 150px;">
                            <input type="text" id="ingredients" class="form-control " v-model.number="tempRecipe.ingredients[index].num">
                            <input type="text" id="ingredients" class="form-control " v-model="tempRecipe.ingredients[index].unit">
                            <button type="button" class="btn btn-danger btn-sm" @click="() => tempRecipe.ingredients.splice(index ,1)">x</button>
                          </div>
                        </div>
                        <div class="d-flex" v-if="(tempRecipe.ingredients && tempRecipe.ingredients[tempRecipe.ingredients.length - 1] !== '') || !tempRecipe.ingredients">
                            <button type="button" class="ms-auto btn btn-primary" @click="() => tempRecipe.ingredients.push({name:'', num:'', unit:''})">新增材料</button>
                        </div>
                      </div>
                    </div>
                    <div class="col-8">
                      <div class="row gy-3">
                        <div class="col-3">
                          <label for="title" class="form-label">食譜編號（id）</label>
                          <input type="text" id="title" class="form-control" disabled v-model="tempRecipe.id">
                        </div>
                        <div class="col-3">
                          <label for="category" class="form-label">食譜類別</label>
                          <select name="" id="category" class="form-select" v-model="tempRecipe.category">
                            <option v-for="item in recipeType" :key="item" :value="item">
                              {{ item }}
                            </option>
                          </select>
                        </div>
                        <div class="col-6">
                          <label for="title" class="form-label">食譜名稱</label>
                          <input type="text" id="title" class="form-control" v-model="tempRecipe.title">
                        </div>
                        <div class="col-5">
                          <label for="content" class="form-label">作者</label>
                          <input type="text" id="content" class="form-control" v-model="tempRecipe.author">
                        </div>
                        <div class="col-4">
                          <label for="content" class="form-label">食譜內容</label>
                          <input type="text" id="content" class="form-control" v-model="tempRecipe.content">
                        </div>
                        <div class="col-3">
                          <label for="costs" class="form-label">成本</label>
                          <div class="d-flex align-items-center">
                            <input type="text" id="costs" class="form-control me-2" v-model="total">元
                          </div>
                        </div>
                        <div class="col-12">
                          <label for="description" class="form-label">食譜描述</label>
                          <textarea name="" id="description" cols="30" rows="10" class="form-control" v-model="tempRecipe.description"></textarea>
                        </div>
                        <div class="col-12">
                          <label for="instructions" class="form-label">製作步驟</label>
                          <textarea name="" id="instructions" cols="30" rows="10" class="form-control" v-model="tempRecipe.instructions"></textarea>
                        </div>
                        <div class="col-12">
                          <label for="product" class="form-label text-primary">所需產品</label>
                          <ol>
                            <li v-for="(product, index) in tempRecipe.relativeProducts" :key="product.id" class="row mb-5">
                              <label :for="product + index" class="col-8 mb-0">{{ index + 1 }}. {{ product.title }} ： {{ product.num }}{{ product.unit }} / {{ product.price }} 元</label>
                              <div class="col-4">
                                <div class="input-group input-group-sm">
                                  <!-- 這裡的 group 絕對是暫存 一開始設定的1要另外放不能改到暫存的  問題不在這 改什麼都一樣-->
                                  <select name="" :id="product + index" class="form-select" v-model="tempRecipe.relativeProducts[index].group">
                                    <option v-for="num in 20" :key="num + 34534" :value="num">{{ num }}</option>
                                  </select>
                                  <span class="input-group-text" id="basic-addon2">組</span>
                                </div>
                              </div>
                            </li>
                          </ol>
                          <h5 class="text-end text-primary">
                            總計： {{ tempRecipe.total }} 元
                          </h5>
                          <!-- <select name="" id="" class="form-select">
                            <option value=""></option>
                          </select> -->
                        </div>
                      </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                <button type="button" class="btn btn-primary" @click="updateRecipe">
                  <span v-if="status === 'edit'">確認編輯</span>
                  <span v-else-if="status === 'new'">確認新增</span>
                </button>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
import modalMixin from '../mixins/modalMixin'
const { VITE_PATH } = import.meta.env
export default {
  data () {
    return {
      tempRecipe: {},
      status: 'edit',
      recipeType: [
        '法式甜點',
        '義式甜點',
        '美式甜點',
        '日式甜點',
        '台式甜點'
      ],
      // relativeProducts: [], // 剛開始用來存的東西
      total: 0
    }
  },
  mixins: [modalMixin],
  props: ['id', 'openModal', 'getRecipes', 'products', 'getProducts', 'recipes'],
  methods: {
    updateRecipe () {
      if (this.status === 'edit') {
        // this.tempRecipe.relativeProducts = this.relativeProducts
        this.tempRecipe.total = this.total
        this.$http.put(`${VITE_PATH}/recipes/${this.tempRecipe.id}`, this.tempRecipe)
          .then(res => {
            console.log(res.data)
            this.getRecipes()
            this.hide()
          }).catch(err => {
            console.log(err)
          })
      } else if (this.status === 'new') {
        this.$http.post(`${VITE_PATH}/recipes`, this.tempRecipe)
          .then(res => {
            console.log(res.data)
            this.getRecipes()
            this.hide()
          }).catch(err => {
            console.log(err)
          })
      }
    }
  },
  mounted () {
    this.getProducts()
  },
  watch: {
    id () {
      // console.log('id變了')
      if (this.id !== 'new' && this.id !== '') {
        this.$http.get(`${VITE_PATH}/recipes/${this.id}`)
          .then(res => {
            this.tempRecipe = res.data
            console.log(this.tempRecipe)

            // 取得相關產品
            this.tempRecipe.relativeProducts = []
            this.total = 0

            // 先有這個
            this.products.forEach((product, index) => { // 會把所有產品跑一遍
              product.relevantRecipes.forEach(item => {
                if (item === this.tempRecipe.title) { // 為甚麼後面的不跑是因為沒達到 item === this.tempRecipe.title 這個條件
                  // product.group = 5 // 原本在recipe的group不存在才加
                  // 原本是空物件 後來加東西
                  this.tempRecipe.relativeProducts.push(product)
                  this.total += product.price

                  // console.log(product)
                }
              })
            })

            this.recipes.forEach(recipe => {
              recipe.relativeProducts.forEach((originData, index) => {
                if (!originData.group || originData.group === 1) {
                  console.log('group不存在或是等於1')
                  this.tempRecipe.relativeProducts[index].group = 1
                } else if (originData.group && originData.group !== 1) {
                  this.tempRecipe.relativeProducts[index].group = originData.group
                  console.log('group存在')
                  console.log(this.tempRecipe.relativeProducts[index].group, '暫存為什麼還是1?', this.tempRecipe.relativeProducts)
                }
              })
            })
            // 問題；暫存沒改到? 但是有改到推到實際資料的值
            // console.log(this.tempRecipe.relativeProducts)
            this.show()
            this.status = 'edit'
            this.openModal('')
          }).catch(err => {
            console.log(err)
          })
      } else if (this.id === 'new') {
        this.tempRecipe = {
          ingredients: []
        }
        this.relativeProducts = []
        this.show()
        this.status = 'new'
        this.openModal('')
      }
    }
  }
}
</script>
