<template>
  <div class="flex flex-grow items-center">
    <div class="search flex p-2 ml-5 rounded-lg">
      <img src="../../assets/icons/Search.svg" alt="" />
      <input
        type="search"
        placeholder="Search "
        class="flex-grow bg-transparent ml-3 focus:border-none rounded-md outline-none hover:border-none transition-colors duration-200"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'SearchBar'
}
</script>
<style lang="scss" scoped>
.search {
  background-color: var(--primary-light, #e6e8ec);
  border-color: #e6e8ec;
}

header {
  background-color: var(--white-normal, #fff);
}
</style>