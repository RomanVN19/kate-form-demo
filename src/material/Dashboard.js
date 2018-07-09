import React from 'react';
import TableIcon from '@material-ui/icons/ViewModule';
import InputIcon from '@material-ui/icons/Input';
import GroupIcon from '@material-ui/icons/Dashboard';
import 'moment/locale/ru';

import { MainLayout } from 'kate-form-material-kit-react';
import InputsForm from './InputsForm';
import GroupsForm from './GroupsForm';
import TablesForm from './TablesForm';
import CardsForm from './CardsForm';

const routes = [
  {
    path: '/minimal',
    title: 'Minimal demo',
  },
  {
    path: '/material/inputs',
    component: InputsForm,
    title: 'Inputs',
    icon: InputIcon,
  },
  {
    path: '/material/groups',
    component: GroupsForm,
    title: 'Layouts',
    icon: GroupIcon,
  },
  {
    path: '/material/tables',
    component: TablesForm,
    title: 'Tables',
    icon: TableIcon,
  },
  {
    path: '/material/forms',
    component: CardsForm,
    title: 'Cards',
  },
];


const Dashboard = props => (
  <MainLayout routes={routes} {...props} />
);

export default Dashboard;
