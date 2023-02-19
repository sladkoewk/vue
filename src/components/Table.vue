<script setup lang="ts">
export interface TableProps {
  columns?: ColumnProps[];
}

export interface ColumnProps {
  label?: string;
}
</script>

<template>
  <table>
    <thead>
      <th></th>
    </thead>
  </table>
</template>
