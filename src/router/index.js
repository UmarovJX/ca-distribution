import { createRouter, createWebHistory } from 'vue-router'
import { useSettingsStore } from '../stores/settings'
import HomeView from '../views/HomeView.vue'
import SignUpView from '../views/SignUpView.vue'
import SignInView from '../views/SignInView.vue'
import MyCoursesView from '../views/MyCoursesView.vue'
import CourseView from '../views/CourseView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: SignUpView
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInView
    },
    {
      path: '/mycourses',
      name: 'mycourses',
      component: MyCoursesView
    },
    {
      path: '/course/:id',
      name: 'course/:id',
      component: CourseView
    },

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach((to) => {
  const settings = useSettingsStore()

  if (!['signin', 'register'].includes(to.name) && settings.token === '') return { name: 'signin' }
})

export default router
