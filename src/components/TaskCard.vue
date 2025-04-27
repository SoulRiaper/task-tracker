<template>
  <v-card
    class="mb-2"
    :class="{ 'task-card': mode === 'list' }"
    @click="mode === 'list' ? $emit('task-selected', task.id) : null"
  >
    <v-card-title class="d-flex justify-space-between">
      <span>{{ task.title }}</span>
      <div>
        <span v-if="mode === 'list'">{{ formattedDate }}</span>
        <v-btn
          class="ml-2"
          v-if="mode === 'list'"
          icon=""
          variant="text"
          color="error"
          @click.stop="handleDelete"
        >x</v-btn>
      </div>
    </v-card-title>

    <v-card-text v-if="mode === 'detail'">
      <div class="text-subtitle-1 mb-2">{{ formattedDate }}</div>
      <div>{{ task.description || '' }}</div>
      <v-btn
        class="mt-4"
        color="error"
        @click.stop="handleDelete"
      >
        Удалить
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Task } from '../dataTypes/task';

const props = defineProps<{
  task: Task
  mode: 'list' | 'detail'
}>()

const emit = defineEmits(['task-selected', 'delete'])

const formattedDate = computed(() => {
  return new Date(props.task.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

function handleDelete() {
  emit('delete', props.task.id);
}
</script>

<style scoped>
.task-card {
  cursor: pointer;
  transition: all 0.2s;
}

.task-card:hover {
  background-color: rgba(0, 0, 0, 0.02);
}
</style>