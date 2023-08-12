import { mapState, mapMutations } from "vuex";
import moment from "moment";
import axios from "axios";
import _ from "lodash";

const myPlugin = {
  install(Vue) {
    Vue.mixin({
      data: () => ({
        api: "http://localhost:6673/api/", //server
        tasksArr: [],
      }),
      methods: {
        getTasks() {
          const url = `${this.api}getTasks`;
          axios
            .get(url)
            .then((res) => {
              this.tasksArr = res.data;
            })
            .catch((err) => {
              console.log(err);
            });
        },
      },
    });
  },
};

export default myPlugin;
