import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Task } from '../dataTypes/task'

export const useTaskStore = defineStore('tasks', () => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
  const tasks = ref<Task[]>(storedTasks.map((task: any) => ({
    ...task,
    date: new Date(task.date)
  })));

  const selectedDate = ref<Date | null>()
  const selectedTaskId = ref<string | null>(null)

  const filteredTasks = computed(() => {
    if (selectedDate.value) {
      return tasks.value.filter(task => 
        isSameDate(task.date, selectedDate.value!)
      )
    }
    return tasks.value
  })

  function isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }

  const selectedTask = computed(() => {
    return tasks.value.find(task => task.id === selectedTaskId.value)
  })

  function addTask(task: Omit<Task, 'id'>) {
    const newTask = {
      ...task,
      id: Date.now().toString()
    }
    tasks.value.push(newTask)
    saveToLocalStorage()
  }

  function deleteTask(id: string) {
    tasks.value = tasks.value.filter(task => task.id !== id)
    saveToLocalStorage()
  }

  function setSelectedDate(date: Date) {
    selectedDate.value = date
    selectedTaskId.value = null
  }

  function clearSelectedDate() {
    selectedDate.value = null;
  } 

  function selectTask(id: string) {
    selectedTaskId.value = id
  }

  function clearSelection() {
    selectedTaskId.value = null
  }

  function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  }

  return {
    tasks,
    filteredTasks,
    selectedTask,
    selectedDate,
    clearSelectedDate,
    selectedTaskId,
    addTask,
    deleteTask,
    setSelectedDate,
    selectTask,
    clearSelection
  }
})