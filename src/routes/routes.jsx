import HomePage from '../pages/HomePage'
import PersonDetail from '../pages/PersonDetail'
import FavoriteList from '../pages/FavoriteList'
import MediaDetail from '../pages/MediaDetail'
import MediaList from '../pages/MediaList'
import MediaSearch from '../pages/MediaSearch'
import PasswordUpdate from '../pages/PasswordUpdate'
import ReviewList from '../pages/ReviewList'
import ProctectedPage from '../components/common/ProctectedPage'

export const routesGen = {
  home: '/',
  mediaList: (type) => `/${type}`,
  mediaDetail: (type, id) => `/${type}/${id}`,
  mediaSearch: '/search',
  person: (id) => `/person/${id}`,
  favoriteList: '/favorites',
  reviewList: '/reviews',
  passwordUpdate: '/password-update'

}

const routes = [
  {
    index: true,
    element: <HomePage/>,
    state: 'home'
  },
  {
    path: '/person/:personId',
    element: <PersonDetail/>,
    state: 'person.detail'
  },
  {
    path: '/search',
    element: <MediaSearch/>,
    state: 'search'
  },
  {
    path: '/password-update',
    element: (
        <ProctectedPage>
            <PasswordUpdate/>
        </ProctectedPage>
    ),
    state: 'password.update'
  },
  {
    path: '/favorites',
    element: (
        <ProctectedPage>
            <FavoriteList/>
        </ProctectedPage>
    ),
    state: 'favorites'
  },
  {
    path: '/reviews',
    element: (
        <ProctectedPage>
            <ReviewList/>
        </ProctectedPage>
    ),
    state: 'reviews'
  },
  {
    path: '/:mediaType',
    element: <MediaList/>
  },
  {
    path: '/:mediaType/:mediaId',
    element: <MediaDetail/>
  }
]

export default routes
