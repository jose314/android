import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      { 
        path: 'home',
        children: [
          {
            path:'', loadChildren: () => import ('../home/home.module').then(m => m.HomePageModule)
          }
        ]
    }
    ]

  },

  {
    path: '',
    redirectTo:'tabs/home',
    pathMatch:'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
