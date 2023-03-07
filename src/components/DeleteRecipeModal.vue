<template>
    <!-- ref 都要叫modal -->
    <div class="modal fade" ref="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header bg-dark">
                <h5 class="modal-title text-white" id="exampleModalLabel">
                    刪除產品
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>確定要刪除食譜
                    <span class="text-danger fw-bold">
                      【{{tempRecipe.title}}】
                    </span>
                    嗎?
                </p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                <button type="button" class="btn btn-danger" @click="deleteRecipe">
                確認刪除
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
      tempRecipe: {}
    }
  },
  mixins: [modalMixin],
  props: ['id', 'openDeleteModal', 'getRecipes'],
  methods: {
    deleteRecipe () {
      this.$http.delete(`${VITE_PATH}/recipes/${this.tempRecipe.id}`)
        .then(res => {
          console.log(res.data)
          this.getRecipes()
          this.hide()
        }).catch(err => {
          console.log(err)
        })
    }
  },
  watch: {
    id () {
      if (this.id) {
        console.log(this.id, '改變了')
        this.$http.get(`${VITE_PATH}/recipes/${this.id}`)
          .then(res => {
            this.tempRecipe = res.data
            console.log(this.tempRecipe)
            this.show()
            this.openDeleteModal('')
          }).catch(err => {
            console.log(err)
          })
      }
    }
  }
}
</script>
