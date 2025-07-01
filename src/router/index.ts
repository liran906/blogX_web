// M
import {createRouter, createWebHistory} from 'vue-router'
import NProgress from "nprogress";
import {userStorei} from "@/stores/user_store";
import {Message} from "@arco-design/web-vue";
import {showLogin} from "@/components/web/f_login"; // 导入 nprogress模块


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "web",
      path: "/",
      component: () => import("@/views/web/index.vue"),
      children: [
        {
          name: "web_home",
          path: "",
          component: () => import("@/views/web/web_home.vue"),
        },
        {
          name: "userCenter",
          path: "center",
          component: () => import("@/views/web/user_center/index.vue"),
          children: [
            {
              name: "userCenterInfo",
              path: "info",
              component: () => import("@/views/web/user_center/info.vue"),
            },
            {
              name: "userCenterAccount",
              path: "account",
              component: () => import("@/views/web/user_center/account.vue"),
            },
            {
              name: "userCenterLoginRecord",
              path: "login_record",
              component: () => import("@/views/web/user_center/login_record.vue"),
            },
            {
              name: "userCenterPrivacy",
              path: "privacy",
              component: () => import("@/views/web/user_center/privacy.vue"),
            },
            {
              name: "userCenterHome",
              path: "home",
              component: () => import("@/views/web/user_center/home.vue"),
            },
            {
              name: "userCenterHistory",
              path: "history",
              component: () => import("@/views/web/user_center/history.vue"),
            }
          ]
        },
        {
          name: "platform",
          path: "platform",
          component: () => import("@/views/web/platform/index.vue"),
          children: [
            {
              name: "platformArticle",
              path: "article",
              component: () => import("@/views/web/platform/platform_article.vue"),
            },
            {
              name: "platformArticleAdd",
              path: "article_add",
              component: () => import("@/views/web/platform/platform_article_add.vue"),
            },
            {
              name: "platformArticleEdit",
              path: "article/:id",
              component: () => import("@/views/web/platform/platform_article_edit.vue"),
            },
            {
              name: "platformComment",
              path: "comment",
              component: () => import("@/views/web/platform/comment/index.vue"),
              redirect: "/platform/comment/article",
              children: [
                {
                  name: "platformCommentArticle",
                  path: "article",
                  component: () => import("@/views/web/platform/comment/article_comment.vue"),
                },
                {
                  name: "platformCommentMy",
                  path: "me",
                  component: () => import("@/views/web/platform/comment/my_comment.vue"),
                }
              ]
            }
          ]
        },
        {
          name: "user",
          path: "user/:id",
          component: () => import("@/views/web/user/index.vue"),
          children: [
            {
              name: "userArticle",
              path: "article",
              component: () => import("@/views/web/user/article_list.vue"),
            },
            {
              name: "userArticleCollect",
              path: "collect",
              component: () => import("@/views/web/user/collect_list.vue"),
            },
            {
              name: "userFansList",
              path: "fans",
              component: () => import("@/views/web/user/fans_list.vue"),
            },
            {
              name: "userFocusList",
              path: "focus",
              component: () => import("@/views/web/user/focus_list.vue"),
            }
          ]
        },
        {
          name: "articleDetail",
          path: "article/:id",
          component: () => import("@/views/web/article/index.vue"),
        },
        {
          name: "msg",
          path: "msg",
          component: () => import("@/views/web/msg/index.vue"),
          children: [
            {
              name: "msgComment",
              path: "comment",
              component: () => import("@/views/web/msg/comment.vue"),
            },
            {
              name: "msgDigg",
              path: "digg",
              component: () => import("@/views/web/msg/digg.vue"),
            },
            {
              name: "msgChat",
              path: "chat",
              component: () => import("@/views/web/msg/chat.vue"),
            },
            {
              name: "msgSystem",
              path: "system",
              component: () => import("@/views/web/msg/system.vue"),
            },
            {
              name: "msgSettings",
              path: "settings",
              component: () => import("@/views/web/msg/settings.vue"),
            }
          ]
        },
      ]
    },
    {
      name: "login",
      path: "/login",
      component: () => import("@/views/login/index.vue")
    },
    {
      name: "admin",
      path: "/admin",
      component: () => import("@/views/admin/index.vue"),
      meta: {
        title: "首页",
        role: [1,3] // todo ??? 没有 2？
      },
      children: [
        {
          name: "home",
          path: "",
          component: () => import("@/views/admin/home/index.vue"),
          meta: {
            title: "数据统计"
          }
        },
        {
          name: "userManage",
          path: "user_manage",
          meta: {
            title: "用户管理",
            role: [1]
          },
          children: [
            {
              name: "userList",
              path: "user_list",
              meta: {
                title: "用户列表"
              },
              component: () => import("@/views/admin/user_manage/user_list.vue"),
            }
          ]
        },
        {
          name: "articleManage",
          path: "article",
          meta: {
            title: "文章管理"
          },
          children: [
            {
              name: "articleList",
              path: "article_list",
              meta: {
                title: "文章列表"
              },
              component: () => import("@/views/admin/article_manage/article_list.vue"),
            }
          ]
        },
        {
          name: "settingsManage",
          path: "settings",
          meta: {
            title: "系统管理",
            role: [1]
          },
          children: [
            {
              name: "siteManage",
              path: "site",
              meta: {
                title: "站点配置"
              },
              children: [
                {
                  name: "siteManageSite",
                  path: "site",
                  meta: {
                    title: "网站设置"
                  },
                  component: () => import("@/views/admin/settings_manage/site_manage/site.vue"),
                },
                {
                  name: "siteManageEmail",
                  path: "email",
                  meta: {
                    title: "邮箱设置"
                  },
                  component: () => import("@/views/admin/settings_manage/site_manage/email.vue"),
                },
                {
                  name: "siteManageQQ",
                  path: "qq",
                  meta: {
                    title: "QQ设置"
                  },
                  component: () => import("@/views/admin/settings_manage/site_manage/qq.vue"),
                },
                {
                  name: "siteManageAi",
                  path: "ai",
                  meta: {
                    title: "AI设置"
                  },
                  component: () => import("@/views/admin/settings_manage/site_manage/ai.vue"),
                },
                {
                  name: "siteManageCloud",
                  path: "cloud",
                  meta: {
                    title: "对象存储设置"
                  },
                  component: () => import("@/views/admin/settings_manage/site_manage/cloud/qiniu.vue"),
                }
              ]
            },
            {
              name: "bannerList",
              path: "banner",
              meta: {
                title: "banner管理"
              },
              component: () => import("@/views/admin/settings_manage/banner_list.vue"),
            },
            {
              name: "logList",
              path: "logs",
              meta: {
                title: "系统信息"
              },
              component: () => import("@/views/admin/settings_manage/log_list.vue"),
            }
          ]
        }
      ]
    },
    {
      name: "test",
      path: "/test",
      component: () => import("@/test/echarts.vue"),
    },
    {
      name: "notfound",
      path: "/:match(.*)",
      component: () => import("@/views/web/404.vue"),
    }
  ]
})

// 全局前置守卫：每次路由跳转前都会触发
router.beforeEach((to, from, next) => {

  // ✅ 如果目标路由有设置 meta.role（需要权限控制）
  if (to.meta.role) {

    // 获取用户状态（如登录状态、角色信息）
    const userStore = userStorei() // 假设这是 Pinia 的 userStore

    // 🔒 用户未登录，不能访问需要权限的页面
    if (!userStore.isLogin) {
      Message.warning("需要登录")

      // 重定向到登录页，同时附带原本想访问的路径（用于登录后跳转回来）
      showLogin({to: to.path, reload: true})
      return
    }

    // ❌ 用户已登录，但角色不在允许访问的角色列表中
    if (!to.meta.role.includes(userStore.userInfo.role)) {
      Message.warning("鉴权失败")
      // 如果不是从 login 页面跳转来的，则返回原路径
      if (from.path !== "/login") {
        router.push(from.path)
      } else {
        // 否则退回默认页面
        router.push({ path: "/web" })
      }
      return
    }
  }

  // ✅ 一切正常，继续导航，并开启页面顶部加载进度条
  NProgress.start()
  next()
})

//当路由进入后：关闭进度条
router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()//完成进度条
})

export default router
