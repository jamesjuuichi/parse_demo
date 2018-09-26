<template lang="pug">
#home
  small-container
    .list-header
      .col
      .col
      .col
      .col(v-if="showPrivate") Private
    .list
      .item(v-for="item in items")
        .col {{ item.get('name') }}
        .col {{ item.get('price') }}
        .col {{ categoryName(item) }}
        .col(v-if="showPrivate") {{  }}
</template>

<script>
import { mapGetters } from 'vuex'
import toggles from '@/constants/toggles'
import { getItems } from '@/api/Item'
import SmallContainer from '@/components/SmallContainer'

export default {
  mounted() {
    this.loadItems()
  },
  components: {
    SmallContainer,
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
    showPrivate() {
      return toggles.SHOW_PRIVATE && this.isLoggedIn
    },
  },
  data() {
    return {
      items: [],
    }
  },
  methods: {
    async loadItems() {
      const items = await getItems(0, 10)
      this.items = items
    },
    categoryName(item) {
      return item.get('category') ? item.get('category').get('name') : ''
    },
  },
}
</script>
<style lang="stylus" scoped>
#home
  display flex
  justify-content center
.list-header,
.item
  display flex
.col
  width 25%
  flex 1 0 auto
</style>
