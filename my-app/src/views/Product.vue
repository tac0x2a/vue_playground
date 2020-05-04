<template>
  <div>
    <h1>Product</h1>
    <div v-if="$route.params.id">Param: ID:{{pid + 1}}</div>
    <div v-if="$route.query.id">Query: ID:{{qid + 1}}</div>
  </div>
</template>

<script>
export default {
  props: {pid: Number,  qid: Number}
}
</script>

