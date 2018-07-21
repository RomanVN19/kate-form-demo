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
    path: '/kate-form-demo/minimal',
    title: 'Minimal demo',
  },
  {
    path: '/kate-form-demo/material/inputs',
    component: InputsForm,
    title: 'Inputs',
    icon: InputIcon,
  },
  {
    path: '/kate-form-demo/material/groups',
    component: GroupsForm,
    title: 'Layouts',
    icon: GroupIcon,
  },
  {
    path: '/kate-form-demo/material/tables',
    component: TablesForm,
    title: 'Tables',
    icon: TableIcon,
  },
  {
    path: '/kate-form-demo/material/forms',
    component: CardsForm,
    title: 'Cards&tabs',
  },
];


const Dashboard = props => (
  <MainLayout title="kate-form demo" routes={routes} {...props} />
);

export default Dashboard;
