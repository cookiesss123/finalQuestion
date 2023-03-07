<template>
    <div class="container">
        <div class="d-flex my-4">
            <button type="button" class="ms-auto btn btn-primary" @click="openModal('new')">建立新食譜</button>
        </div>
        <table class="table text-center">
            <thead>
                <tr>
                    <th>食譜編號</th>
                    <th>分類</th>
                    <th>食譜名稱</th>
                    <th>產品</th>
                    <th>成本</th>
                    <th>編輯</th>
                </tr>
            </thead>
            <tbody v-for="recipe in recipes" :key="recipe.id">
                <tr>
                    <td>{{ recipe.id }}</td>
                    <td>{{ recipe.category }}</td>
                    <td>{{ recipe.title }}</td>
                    <td>
                      <template v-for="(product, index) in recipe.relativeProducts" :key="product.id">
                        {{`${index + 1}${product.title} `}}
                      </template>
                    </td>
                    <td>{{ recipe.total }}</td>
                    <td>
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-primary" @click="openModal(recipe.id)">編輯</button>
                            <button type="button" class="btn btn-sm btn-outline-danger" @click="openDeleteModal(recipe.id)">刪除</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <RecipeModal :id="recipeId" :open-modal="openModal" :get-recipes="getRecipes" :products="products" :get-products="getProducts" :recipes="recipes"></RecipeModal>
        <DeleteRecipeModal ref="deleteRecipeModal" :id="recipeDeleteId" :get-recipes="getRecipes" :open-delete-modal="openDeleteModal"></DeleteRecipeModal>
    </div>
</template>
<script>
import RecipeModal from '@/components/RecipeModal.vue'
import DeleteRecipeModal from '@/components/DeleteRecipeModal.vue'
const { VITE_PATH } = import.meta.env
export default {
  components: {
    RecipeModal,
    DeleteRecipeModal
  },
  data () {
    return {
      recipes: [],
      products: {},
      recipeId: '',
      recipeDeleteId: ''
    }
  },
  methods: {
    // recipes/1?_embed=products可以查到單一產品的細項
    getRecipes () {
      this.$http.get(`${VITE_PATH}/recipes`)
        .then(res => {
          console.log(res.data)
          this.recipes = res.data
        }).catch(err => {
          console.log(err)
        })
    },
    openModal (id) {
      this.recipeId = id
    },
    getProducts () {
      this.$http.get(`${VITE_PATH}/products`)
        .then(res => {
          console.log(res.data)
          this.products = res.data

          //  結構!!   recipeProducts: [
          //   {xx食譜: [{產品資訊}, {產品資訊}]},
          // ]
        }).catch(err => {
          console.log(err)
        })
    },
    openDeleteModal (id) {
      this.recipeDeleteId = id
    }
  },
  mounted () {
    this.getRecipes()
    this.getProducts()
  }
}
</script>
