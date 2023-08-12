<template>
  <div
    class="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 translate-y-1 px-4"
  >
    <div
      class="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5"
    >
      <h1
        class="text-center mt-4 text-3xl font-bold tracking-tight text-gray-700 sm:text-5xl"
      >
        Tasks
      </h1>
      <div class="text-center mt-7">
        <span
          class="rounded-md bg-yellow-50 px-2 py-1 mr-2 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20"
          >On-going ({{ ongoingTasks.length }})</span
        >
        <span
          class="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
          >Completed ({{ completedTasks.length }})</span
        >
      </div>
      <div class="p-4">
        <div
          style="
            max-height: 300px;
            overflow: auto;
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
          "
        >
          <div v-if="ongoingTasks.length == 0" class="text-center m-5">
            No tasks
          </div>
          <div
            class="grid grid-cols-7 gap-4 group relative flex gap-x-6 rounded-lg p-1 hover:bg-gray-100"
            v-for="(item, i) in ongoingTasks"
            :key="i"
            @mouseover="hover_i = i"
            @mouseleave="hover_i = -1"
          >
            <div
              class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-gray-100"
            >
              <component
                :is="item.icon"
                class="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                aria-hidden="true"
                @click="updateStatus(item)"
              />
            </div>
            <div class="col-span-5">
              <span class="font-semibold text-gray-900" v-if="edit_i != i">{{
                item.description
              }}</span>
              <input
                v-if="edit_i == i"
                type="text"
                v-model="updated_task_description"
                class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Task"
                @keypress.enter="updateTask(item)"
              />
              <p class="text-gray-600">{{ item.date }}</p>
            </div>
            <div
              v-if="i == hover_i"
              class="text-right flex flex-none items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 mr-1 editBtn"
                @click="
                  (edit_i = i), (updated_task_description = item.description)
                "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 deleteBtn"
                @click="deleteTask(item)"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div
          class="grid grid-cols-1 divide-x divide-gray-900/5 bg-gray-50 pt-5"
        >
          <div
            class="bg-red-100 border border-red-400 text-red-700 pl-2 pt-2 pb-2 mb-2 rounded relative"
            role="alert"
            v-show="showAlert"
          >
            <span class="block sm:inline">{{ alertMessage }}</span>
            <span class="absolute top-0 bottom-0 right-0 pl-2 pt-2 pb-2">
              <svg
                class="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                @click="(showAlert = false), (alertMessage = '')"
              >
                <title>Close</title>
                <path
                  d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                />
              </svg>
            </span>
          </div>
          <input
            type="text"
            v-model="task_description"
            class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Task"
            @keypress.enter="addTask()"
          />
          <a
            v-for="item in callsToAction"
            :key="item.name"
            :href="item.href"
            @click="addTask()"
            class="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
          >
            <component
              :is="item.icon"
              class="h-5 w-5 flex-none text-gray-400"
            />
            {{ item.name }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import _ from "lodash";

import { PlusCircleIcon } from "@heroicons/vue/20/solid";
import { CheckCircleIcon } from "@heroicons/vue/24/outline";

export default {
  components: {
    // AddTaskDialogVue,
  },
  data: () => ({
    isOpen: false,
    task_description: "",
    updated_task_description: "",
    showAlert: false,
    alertMessage: "",
    hover_i: -1,
    edit_i: -1,
    tasks: [
      {
        date: "2023-08-11 17:56",
        description: "Get a better understanding of your traffic",
        href: "#",
        icon: CheckCircleIcon,
        isCompleted: false,
      },
      {
        date: "2023-08-11 17:56",
        description: "Speak directly to your customers",
        href: "#",
        icon: CheckCircleIcon,
        isCompleted: false,
      },
      {
        date: "2023-08-11 17:56",
        description: "Your customers' data will be safe and secure",
        href: "#",
        icon: CheckCircleIcon,
        isCompleted: false,
      },
      {
        date: "2023-08-11 17:56",
        description: "Connect with third-party tools",
        href: "#",
        icon: CheckCircleIcon,
        isCompleted: false,
      },
      {
        date: "2023-08-11 17:56",
        description: "Build strategic funnels that will convert",
        href: "#",
        icon: CheckCircleIcon,
        isCompleted: false,
      },
    ],
    callsToAction: [{ name: "Add Task", href: "#", icon: PlusCircleIcon }],
  }),
  mounted() {
    //if we use API to fetch tasks list
    //this.getTasks() --> can be found on plugins/globalPlugins
  },
  computed: {
    ongoingTasks() {
      let ongoing = this.tasks.filter((rec) => {
        return !rec.isCompleted;
      });
      return _.orderBy(ongoing, "date", "desc");
    },
    completedTasks() {
      let ongoing = this.tasks.filter((rec) => {
        return rec.isCompleted;
      });
      return _.orderBy(ongoing, "date", "desc");
    },
  },
  methods: {
    test() {
      console.log("clicked");
    },
    closeAddTaskDialog(val) {
      this.isOpen = val;
    },
    addTask() {
      if (!this.task_description) {
        this.showAlert = true;
        this.alertMessage = "Task cannot be empty!";
      } else {
        //check for duplicate entry
        let duplicates = this.tasks.filter((rec) => {
          return rec.description == this.task_description;
        });

        if (duplicates.length > 0) {
          this.showAlert = true;
          this.alertMessage = "Duplicate task!";
        } else {
          this.showAlert = false;
          let obj = {
            date: moment().format("YYYY-MM-DD HH:ss"),
            description: this.task_description,
            href: "#",
            icon: CheckCircleIcon,
          };
          this.tasks.push(obj);
          this.task_description = "";
        }
      }
    },
    deleteTask(item) {
      let index = _.findIndex(
        this.tasks,
        (rec) => rec.description === item.description
      );
      this.tasks.splice(index, 1);
    },
    updateTask(item) {
      let index = _.findIndex(
        this.tasks,
        (rec) => rec.description === item.description
      );
      this.tasks[index].description = this.updated_task_description;
      this.edit_i = -1;
      this.updated_task_description = "";
    },
    updateStatus(item) {
      let index = _.findIndex(
        this.tasks,
        (rec) => rec.description === item.description
      );
      this.tasks[index].isCompleted = true;
    },
  },
};
</script>

<style scoped>
.deleteBtn {
  color: #ea222c;
  cursor: pointer;
}
.deleteBtn:hover {
  color: #b80000;
}
.editBtn {
  color: #0b9571;
  cursor: pointer;
}
.editBtn:hover {
  color: #077055;
}
</style>
