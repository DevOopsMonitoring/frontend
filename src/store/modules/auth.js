import axios from "axios";

const state = {
  user: null,
  posts: null,
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  StatePosts: (state) => state.posts,
  StateUser: (state) => state.user,
};

const actions = {
  async Register({dispatch}, form) {
    await axios.post('register', form)
    let UserForm = new FormData()
    UserForm.append('username', form.username)
    UserForm.append('password', form.password)
    await dispatch('LogIn', UserForm)
  },

  LogIn({commit}, user) {
    axios({
      method: 'post',
      url: '/auth/login',
      withCredentials: false,
      data: {
        username: user.username,
        password: user.password
      }
    })
    .then(response => {
      localStorage.setItem('ACCESS_TOKEN', response.data.access_token);
      localStorage.setItem('REFRESH_TOKEN', response.data.refresh_token);
      // eslint-disable-next-line no-constant-condition
      if (false) commit("setUser", 'some')


    })
  },

  // refreshTokens (context, credentials) {
    
  //   dispatch('autoRefresh', credentials)
  // },

  // autoRefresh (context, credentials) {
  //   const { state, commit, dispatch } = context
  //   const { accessToken } = state
  //   const { exp } = jwt_decode(accessToken)
  //   const now = Date.now() / 1000 // exp is represented in seconds since epoch
  //   let timeUntilRefresh = exp - now
  //   timeUntilRefresh -= (15 * 60) // Refresh 15 minutes before it expires
  //   const refreshTask = setTimeout(() => dispatch('refreshTokens', credentials), timeUntilRefresh * 1000)
  //   commit('refreshTask', refreshTask) // In case you want to cancel this task on logout
  // },

  async CreatePost({ dispatch }, post) {
    await axios.post("post", post);
    return await dispatch("GetPosts");
  },

  async GetPosts({ commit }) {
    let response = await axios.get("posts");
    commit("setPosts", response.data);
  },

  async LogOut({ commit }) {
    let user = null;
    commit("logout", user);
  },
};

const mutations = {
  setUser(state, username) {
    state.user = username;
  },

  setPosts(state, posts) {
    state.posts = posts;
  },
  logout(state, user) {
    state.user = user;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
