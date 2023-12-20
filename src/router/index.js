import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NewFeedback from "../views/NewFeedback.vue";
import EditFeedback from "../views/EditFeedback.vue";
import FeedbackDetails from "../views/FeedbackDetails.vue";
import Roadmap from "../views/Roadmap.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { showTopbarAndSidebar: true },
      props: (route) => (
        { categoryFilter: route.params.categoryFilter || "all" },
        { topbarFilter: route.params.topbarFilter || "Most upvotes" }
      ),
    },
    {
      path: "/new-feedback",
      name: "newFeedback",
      component: NewFeedback,
      meta: { showTopbarAndSidebar: false },
    },
    {
      path: "/edit-feedback/:id",
      name: "editFeedback",
      component: EditFeedback,
      meta: { showTopbarAndSidebar: false },
      props: true,
    },
    {
      path: "/feedback-details/:id",
      name: "feedbackDetails",
      component: FeedbackDetails,
      meta: { showTopbarAndSidebar: false },
      props: true,
    },
    {
      path: "/roadmap",
      name: "roadmap",
      component: Roadmap,
      meta: { showTopbarAndSidebar: false },
    },
  ],
});

export default router;
