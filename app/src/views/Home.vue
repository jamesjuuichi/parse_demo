<template lang="pug">
#home
  small-container
    .list-header
      .col
      .col
      .col
      .col.text-center(v-if="showPrivate") Private
    .list
      .item(v-for="item in items")
        .col {{ item.get('name') }}
        .col {{ item.get('price') }}
        .col {{ categoryName(item) }}
        .col.text-center(v-if="showPrivate") {{ !isPrivate(item) ? '' : 'x' }}
    template(v-if="isLoggedIn")
      .separator
      p.form-title Input new item
      form
        .input-group
          label(for="name") Name
          input(name="name" type="text" v-model="formName")
        .input-group
          label(for="price") Price
          input(name="price" type="number" v-model.number="formPrice")
        .input-group
          label(for="private") Private
          input(name="private" type="checkbox" v-model="formIsPrivate")
        .button.submit-button(@click="onSubmitClick") Add
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import toggles from '@/constants/toggles'
import SmallContainer from '@/components/SmallContainer'

export default {
  mounted() {
    this.fetchItems()
  },
  data() {
    return {
      formName: '',
      formPrice: '',
      formIsPrivate: false,
    }
  },
  components: {
    SmallContainer,
  },
  computed: {
    ...mapState(['items']),
    ...mapGetters(['isLoggedIn']),
    showPrivate() {
      return toggles.SHOW_PRIVATE && this.isLoggedIn
    },
  },
  methods: {
    ...mapActions(['fetchItems', 'createItem']),
    categoryName(item) {
      return item.get('category') ? item.get('category').get('name') : ''
    },
    clearForm() {
      this.formName = ''
      this.formPrice = ''
      this.formIsPrivate = false
    },
    isPrivate(item) {
      if (!item || !item.getACL()) {
        return false
      }
      return !item.getACL().getPublicReadAccess()
    },
    async onSubmitClick() {
      await this.createItem({
        name: this.formName,
        price: this.formPrice || 0,
        isPrivate: this.formIsPrivate,
      })
      this.clearForm()
    }
  },
}
</script>
<style lang="stylus" scoped>
@require '~@/assets/functions'

#home
  display flex
  justify-content center
.list-header,
.item
  display flex
  margin 0 -.5rem
  padding-bottom .5rem
.col
  padding 0 0.5rem
  width 25%
  flex 1 0 auto
.form-title
  font-size to-rem(24px)
form
  margin 1rem 0
.input-group
  margin-bottom .5rem
  label
    width to-rem(80px)
    display inline-block
  input:not([type='checkbox'])
    width to-rem(160px)
  input[type='checkbox']
    margin-left 0
    margin-right 0
.submit-button
  width to-rem(240px)
  margin 0
</style>
