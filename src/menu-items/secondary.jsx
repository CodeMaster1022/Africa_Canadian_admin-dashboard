// third-party
// import { FormattedMessage } from 'react-intl';

// assets
import {
  FileDoneOutlined,
  LoginOutlined,
  UserOutlined,
  TeamOutlined,
  PhoneOutlined,
  RocketOutlined,
  AppstoreAddOutlined,
  FundOutlined,
  CalendarOutlined,
  MenuUnfoldOutlined,
  InboxOutlined,
  BankOutlined,
  BookOutlined
} from '@ant-design/icons';

// type

// icons
const icons = {
  FileDoneOutlined,
  FundOutlined,
  UserOutlined,
  TeamOutlined,
  LoginOutlined,
  PhoneOutlined,
  RocketOutlined,
  AppstoreAddOutlined,
  CalendarOutlined,
  MenuUnfoldOutlined,
  InboxOutlined,
  BankOutlined,
  BookOutlined
};

// ==============================|| MENU ITEMS - PAGES ||============================== //

const secondary = {
  id: 'Seconday',
  title: 'Seconday',
  type: 'group',
  children: [
    {
      id: 'survery',
      title: 'Surveys',
      type: 'item',
      url: '/surverys',
      icon: icons.FileDoneOutlined
    },
    {
      id: 'education',
      title: 'Education Materials',
      type: 'item',
      url: '/education',
      icon: icons.InboxOutlined
    },
    {
      id: 'service',
      title: 'Legal Services',
      type: 'item',
      url: '/services',
      icon: icons.BankOutlined
    },
    {
      id: 'report',
      title: 'Reports',
      type: 'item',
      url: '/reports',
      icon: icons.BookOutlined,
      target: true
    }
  ]
};

export default secondary;
