<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-card class="pa-4">
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Планировщик задач</span>
            <div>
              <v-btn
                class="mr-2"
                icon=""
                color="primary"
                @click="togglePicker"
              >▼</v-btn>
              <v-btn
                icon=""
                color="primary"
                @click="showForm = true"
              >+</v-btn>
            </div>
          </v-card-title>

          <v-card-text>
            <Transition name="slide-fade">
              <div v-if="showDatePicker">
                <v-row>
                  <v-col>
                    <v-date-picker
                      v-model="selectedDate"
                      @update:model-value="applyFilter"
                    ></v-date-picker>
                  </v-col>
                  <v-col>
                    <v-btn @click="clearFilter">Очистить фильтр</v-btn>
                  </v-col>
                </v-row>
              </div>
            </Transition>

            <Transition name="slide-fade">
              <TaskForm
                v-if="showForm"
                @cancel="showForm = false"
                @save="handleSave"
              />
            </Transition>

            <TaskList
              v-if="!taskStore.selectedTaskId"
              :tasks="taskStore.filteredTasks"
              @task-selected="taskStore.selectTask($event)"
            />

            <div v-else>
              <v-btn
                @click="taskStore.clearSelection()"
                class="mb-4"
              >Назад</v-btn>
              <TaskCard
                :task="taskStore.selectedTask!"
                mode="detail"
                @delete="handleDelete"
              />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTaskStore } from '../stores/tasks';
import TaskCard from './TaskCard.vue';
import TaskList from './TaskList.vue';
import TaskForm from './TaskForm.vue';

const taskStore = useTaskStore();
const showForm = ref(false);
const showDatePicker = ref(false);
const selectedDate = ref<Date | null>()

function handleSave(task: { title: string; date: Date; description: string }) {
  taskStore.addTask(task)
  showForm.value = false
}

function togglePicker() {
  showDatePicker.value = !showDatePicker.value
}

function applyFilter() {
  if (selectedDate.value) {
    taskStore.setSelectedDate(selectedDate.value)
  }
}

function clearFilter() {
  selectedDate.value = null;
  taskStore.clearSelectedDate();
}

function handleDelete(id: string) {
  taskStore.deleteTask(id);
  taskStore.clearSelection();
}
</script>

<style scoped>
  .slide-fade-enter-active {
    transition: all 0.2s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
</style>