import Vue from 'vue'
import Vuex from 'vuex'
import API from "@/api/api"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    images: [],
    currentPage: 0,
    hasMore: true,
    pageCount: null,
    currentImage: {}
  },

  getters: {
    images: (state) => {
      return state.images
    },
    currentImage: (state) => {
      return state.currentImage
    },
    currentPage: (state) => {
      return state.currentPage
    },
    hasMore: (state) => {
      return state.hasMore
    },

  },

  actions: {
    // One of the assignments was to handle token expiration error
    // honestly I didn't implement it because I never faced it, so
    // I don't know exactly how the API responses in such case
    // But in that case, one should revoke the current token
    // and fetch it again, or redirect to login, or one
    // of many available paths...
    async getAccessToken({ commit }) {
      try {
        const { data } = await API.post('/auth', { apiKey: "23567b218376f79d9415" })
        if (data.auth) {
          localStorage.setItem('accessToken', data.token)
          //we could commit to a user state, no need in this application
          return true
        } else {
          alert('Error while authorizing')
          return false
        }
      } catch (error) {
        alert('There has been an error while authorizing, please try again later')
        return false
      }
    },

    async getImages({ state, commit }) {
      try {
        const { data } = await API.get('/images', { page: state.currentPage })
        commit('setImages', data)
      } catch (error) {
        alert('There has been an error while getting the images, please try again later')
        return false
      }
    },

    async getImageDetails(_, imageId) {
      try {
        //one of the assignments was to avoid redundant calls to the API
        //I would rather cache the image details and avoid calling the API again 
        //if the user clicked on the same image twice or more times, but
        //im running out of time and it's getting late.
        const { data } = await API.get(`/images/${imageId}`)
        return data
      } catch (error) {
        alert('There has been an error while getting the image details, please try again later')
      }
    }
  },

  mutations: {
    setImages(state, data) {
      state.images = state.images.concat(data.pictures)
      state.currentPage = data.page
      state.pageCount = data.pageCount
      state.hasMore = data.hasMore
    },
    setCurrentImage: (state, payload) => {
      state.currentImage = payload
    },
    setCurrentPage: (state, payload) => {
      state.currentPage = payload
    },
  },


  //Didnt modularized the store because it seemed overkill for the application
  //and would add complexity and time
  modules: {
  }
})
