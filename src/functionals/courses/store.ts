import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCourseReportStore = defineStore("courseReport", () => {
  // state: () => {
  //   return {
  //     userList: [] as UserInfo[],
  //     user: null as UserInfo | null,
  //     courseName: null as string | null,
  //     managerFullname: null as string | null,
  //   };
  // },
  // getters: {
  //   countUsers: (state) => state.userList.length,
  // },
  // actions: {
  //   clearCourseName() {
  //     this.courseName = null;
  //   },
  //   clearManagerFullname() {
  //     this.managerFullname = null;
  //   },
  // },

  const count = ref(0);
  const name = ref("Eduardo");
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }
  function setName(newName: string) {
    name.value = newName;
  }

  return { count, name, doubleCount, increment, setName };
});

interface UserInfo {
  name: string;
  age: number;
}
