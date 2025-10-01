<!-- TASteps.vue -->
<template>
  <div class="container mt-4">
    <!-- Steps Header -->
    <div class="steps-header">
      <div
        v-for="(step, index) in steps"
        :key="step.id"
        class="step-element"
      >
        <!-- Step Circle with Icon -->
        <div
          class="step-circle d-flex align-items-center justify-content-center"
          :class="getStepClass(index)"
          @click="goToStep(index)"
        >
          <!-- Dynamic Icon based on step status -->
          <div class="step-icon" v-html="getStepIcon(step, index)"></div>
        </div>

        <!-- Step Label -->
        <div class="step-label">
          <small :class="getLabelClass(index)">{{ step.label }}</small>
          <p class="step-desc">{{ step.description }}</p>
        </div>
      </div>
    </div>

    <!-- Step Content -->
    <div class="step-content">
      <!-- Step 1: Personal Information -->
      <div v-if="currentStep === 0" class="p-3">
        <h4>Step 1: Personal Information</h4>
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input
            v-model="formData.name"
            type="text"
            class="form-control"
            @input="validateStep1"
          >
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input
            v-model="formData.email"
            type="email"
            class="form-control"
            @input="validateStep1"
          >
        </div>
      </div>

      <!-- Step 2: Address Information -->
      <div v-else-if="currentStep === 1" class="p-3">
        <h4>Step 2: Address Information</h4>
        <div class="mb-3">
          <label class="form-label">Address</label>
          <input
            v-model="formData.address"
            type="text"
            class="form-control"
            @input="validateStep2"
          >
        </div>
        <div class="mb-3">
          <label class="form-label">City</label>
          <input
            v-model="formData.city"
            type="text"
            class="form-control"
            @input="validateStep2"
          >
        </div>
      </div>

      <!-- Step 3: Confirmation -->
      <div v-else-if="currentStep === 2" class="p-3">
        <h4>Step 3: Confirmation</h4>
        <div class="card">
          <div class="card-body">
            <h5>Review Your Information</h5>
            <p><strong>Name:</strong> {{ formData.name }}</p>
            <p><strong>Email:</strong> {{ formData.email }}</p>
            <p><strong>Address:</strong> {{ formData.address }}</p>
            <p><strong>City:</strong> {{ formData.city }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="d-flex justify-content-between mt-4">
      <button
        v-if="currentStep > 0"
        class="btn btn-outline-secondary"
        @click="previousStep"
      >
        Previous
      </button>
      <div></div> <!-- Spacer -->
      <button
        v-if="currentStep < steps.length - 1"
        class="btn btn-primary"
        @click="nextStep"
        :disabled="!steps[currentStep].completed"
      >
        Next
      </button>
      <button
        v-else
        class="btn btn-success"
        @click="finish"
      >
        Finish
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

// Reactive data
const currentStep = ref(0)

const formData = reactive({
  name: '',
  email: '',
  address: '',
  city: ''
})

const steps = ref([
  {
    id: 1,
    label: 'Personal Info',
    description: 'Enter your personal details',
    status: 'pending',
    completed: false,
    icon: 'user' // Custom icon for this step
  },
  {
    id: 2,
    label: 'Address',
    description: 'Enter your address information',
    status: 'pending',
    completed: false,
    icon: 'location'
  },
  {
    id: 3,
    label: 'Confirmation',
    description: 'Review and confirm your information',
    status: 'pending',
    completed: false,
    icon: 'check'
  }
])

// SVG Icons Library
const icons = {
  user: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  `,
  location: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  `,
  check: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  `,
  document: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  `,
  home: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  `,
  mail: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  `,
  // Status icons
  pending: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
    </svg>
  `,
  completed: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  `,
  current: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="6" fill="currentColor"></circle>
    </svg>
  `
}

// Methods
const getStepIcon = (step, index) => {
  // If step is completed, show completed icon
  if (step.status === 'completed') {
    return icons.completed
  }

  // If step is current, show current icon or custom icon
  if (index === currentStep.value) {
    return icons[step.icon] || icons.current
  }

  // For pending steps, show custom icon or pending icon
  return icons[step.icon] || icons.pending
}

const getStepClass = (index) => {
  const classes = []
  if (index === currentStep.value) {
    classes.push('step-current', 'bg-primary', 'text-white')
  } else if (steps.value[index].status === 'completed') {
    classes.push('step-completed', 'bg-success', 'text-white')
  } else {
    classes.push('step-pending', 'bg-light', 'text-secondary')
  }

  classes.push('step-clickable')

  return classes
}

const getLabelClass = (index) => {
  if (index === currentStep.value) {
    return 'text-primary fw-bold'
  } else if (steps.value[index].status === 'completed') {
    return 'text-success'
  } else {
    return 'text-muted'
  }
}

const validateStep1 = () => {
  steps.value[0].completed = formData.name.trim() !== '' && formData.email.trim() !== ''
  if (steps.value[0].completed) {
    steps.value[0].status = 'completed'
  }
}

const validateStep2 = () => {
  steps.value[1].completed = formData.address.trim() !== '' && formData.city.trim() !== ''
  if (steps.value[1].completed) {
    steps.value[1].status = 'completed'
  }
}

const goToStep = (index) => {
  // Only allow going to completed steps or next logical step
  const targetStep = steps.value[index]
  if (targetStep.status === 'completed' || index <= currentStep.value) {
    currentStep.value = index
  }
}

const nextStep = () => {
  if (currentStep.value < steps.value.length - 1) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const finish = () => {
  alert('Form submitted successfully!')
  console.log('Form data:', formData)
}

// Auto-validate when form data changes
watch(formData, () => {
  if (currentStep.value === 0) validateStep1()
  if (currentStep.value === 1) validateStep2()
}, { deep: true })
</script>

<style scoped>
.steps-header{
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.steps-header::after{
  content:"";
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 2px;
  background: #c7cbce;
  transform: translateY(-50%);
  z-index: 1;
}

.step-element{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  text-align: start;
  padding: 1rem;
  background: white;
  z-index: 2;
  flex: 1;
}

.step-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-weight: bold;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  flex-shrink: 0;
  border: 2px solid transparent;
}

.step-current {
  border-color: #0d6efd;
}

.step-completed {
  border-color: #198754;
}

.step-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-label{
  background: white;
  padding-left: 1rem;
  z-index: 2;
}

.step-desc {
  font-size: 0.8rem;
  color: #6c757d;
  margin: 0;
  margin-top: 0.2rem;
}

.step-clickable {
  cursor: pointer;
}

.step-clickable:hover {
  transform: scale(1.05);
}

.step-content {
  min-height: 200px;
  padding: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  background: #f8f9fa;
}

/* Responsive design */
@media (max-width: 768px) {
  .step-element {
    flex-direction: column;
    text-align: center;
    padding: 0.5rem;
  }

  .step-label {
    padding-left: 0;
    padding-top: 0.5rem;
  }

  .step-desc {
    font-size: 0.7rem;
  }

  .step-circle {
    width: 40px;
    height: 40px;
  }
}
</style>
