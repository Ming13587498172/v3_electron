import { MockMethod } from 'vite-plugin-mock'

/** 
 * 动态权限
 * @requireAuth  是否需要用户权限
 * @roles  受访问限制的角色
 */
let dynamicRoutesData = [
  {
    id: 1,
    title: '有人问我思念到极致是什么感觉，我说我曾经发了句晚安给他，一晚上醒来七次看手机信息。',
    meta: {
      requireAuth: true,
      roles: ['admin', 'common']
    }
  }, {
    id: 2,
    title: '有没有那么一瞬间，在大街上看到一个熟悉的背影，心突然就跳乱了节拍，直到发现原来只是陌生人，于是一整天，全是回忆。',
    meta: {
      requireAuth: false,
    }
  }, {
    id: 3,
    title: '看不见你的时候，思念像座山压在胸口；看得见你的时候，快乐像条河涌进心头；让山和水来见证我对你的思念。',
    meta: {
      requireAuth: true,
      roles: ['admin', 'common']
    }
  }, {
    id: 4,
    title: '旧人不敢提，怕伤心。新人不敢碰，怕辜负。唯有酒，伤身不伤心。端起这杯酒，愿你余生无波澜，敬我往事不悲欢。',
    meta: {
      requireAuth: true,
      roles: ['admin']
    }
  }, {
    id: 5,
    title: '你不在的每一分钟，我的心都在煎熬，想念你的心不由自主，你在我的脑海里的画面像放电影似的一遍又一遍地倒带。',
    meta: {
      requireAuth: true,
      roles: ['admin', 'common']
    }
  }, {
    id: 6,
    title: '有些人会一直刻在记忆里的，即使忘记了他的声音，忘记了他的笑容，忘记了他的脸，但是每当想起他时的那种感受，是永远都不会改变的。',
    meta: {
      requireAuth: false,
    }
  }, {
    id: 7,
    title: '心中纵有万语千言想对你说，却找不到一个打扰你的理由，有千万次想关心你，却找不到一个合适的身份。',
    meta: {
      requireAuth: true,
      roles: ['admin', 'common']
    }
  }, {
    id: 8,
    title: '没有你的陪伴，每一刻都变得如此漫长，如此煎熬。',
    meta: {
      requireAuth: true,
      roles: ['admin']
    }
  }, {
    id: 9,
    title: '孤单不是与生俱来，而是由你爱上一个人的那一刻开始。',
    meta: {
      requireAuth: true,
      roles: ['common']
    }
  }, {
    id: 10,
    title: '不是因为寂寞才想你，而是因为想你才寂寞。孤独的感觉之所以如此之重，只是因为想得太深。',
    meta: {
      requireAuth: true,
      roles: ['admin']
    }
  }
]

const mock: Array<MockMethod> = [
  {
    url: '/api/dynamicRoutes',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: dynamicRoutesData
      }
    }
  }
]

export default mock
