<template>
  <v-card class="mb-4">
    <v-card-title>Новая задача</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="handleSubmit">
        <v-text-field
          v-model="title"
          label="Название*"
          :rules="[value => !!value || 'Название должно быть заполнено']"
          required
        ></v-text-field>

        <v-text-field
          v-model="date"
          type="date"
          label="Дата*"
          :rules="[value => !!value || 'Дата должна быть заполнена']"
          required
        ></v-text-field>

        <v-textarea
          v-model="description"
          label="Описание"
          rows="3"
        ></v-textarea>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="$emit('cancel')">Cancel</v-btn>
          <v-btn color="primary" type="submit">Save</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['cancel', 'save'])

const title = ref('')
const date = ref<Date | null>()
const description = ref('')

function handleSubmit() {
  if (!title.value || !date.value) return

  emit('save', {
    title: title.value,
    date: date.value,
    description: description.value
  })

  title.value = ''
  date.value = null
  description.value = ''
}
</script>