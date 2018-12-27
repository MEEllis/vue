import Loadable from 'react-loadable';
import ContentLoader from '@/containers/MyContentLoader';

const Home = Loadable({
    loader: () => import('@/pages/Home'),
    loading: ContentLoader
});


const StorageInfo = Loadable({
    loader: () => import('@/pages/baseSetting/StorageInfo'),
    loading: ContentLoader
});

const Page404 = Loadable({
    loader: () => import('@/pages/error/Page404'),
    loading: ContentLoader
});

//key为与后端返回菜单的name相对应
export default {
    "home": Home,
    "storageInfo": StorageInfo,
    "error_404": Page404,
    "page404": Page404,
}