<template>
  <div v-if="tasks.length">
    <TaskCard
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      mode="list"
      @task-selected="$emit('task-selected', $event)"
      @delete="() => deleteTask(task.id)"
    />
  </div>
  <v-alert v-else type="info">No tasks found</v-alert>
</template>

<script setup lang="ts">
import type { Task } from '../dataTypes/task';
import { useTaskStore } from '../stores/tasks';
import TaskCard from './TaskCard.vue';

const { deleteTask } = useTaskStore();

defineProps<{
  tasks: Task[]
}>()

defineEmits(['task-selected'])
</script>