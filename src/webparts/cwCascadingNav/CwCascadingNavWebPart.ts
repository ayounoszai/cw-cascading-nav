import { Version } from '@microsoft/sp-core-library';
import {BaseClientSideWebPart} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

// import * as strings from 'CwCwCascadingNavWebPartStrings';

import Vue from 'vue';

import axios from 'axios';
axios.defaults.headers.get['Accept'] = "application/json;odata=verbose";








import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);



import CwCwCascadingNavComponent from './components/CwCwCascadingNav.vue';

export interface ICwCwCascadingNavWebPartProps {}
export default class CwCwCascadingNavWebPart extends BaseClientSideWebPart<ICwCwCascadingNavWebPartProps> {
  public render(): void {
    const id: string = `wp-${this.instanceId}`;
    this.domElement.innerHTML = `<div id="${id}"></div>`;

    axios.defaults.baseURL = `${this.context.pageContext.site.absoluteUrl}`;
    
    new Vue({
      render: h => h(CwCwCascadingNavComponent)
    }).$mount(`#${id}`);
    
  }

  // protected get dataVersion(): Version {
  //   return Version.parse('1.0');
  // }
}
