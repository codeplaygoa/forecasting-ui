import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';

// Menu
export interface Menu {
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	public screenWidth: any
	public collapseSidebar: boolean = false
	public fullScreen = false;

	constructor() {
		this.onResize();
		if (this.screenWidth < 991) {
			this.collapseSidebar = true
		}
	}

	// Windows width
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	MENUITEMS: Menu[] = [
        {
			title: 'Analysis', icon: 'pie-chart', type: 'sub', active: true, children: [
				{ path: '/analysis/forecasting', title: 'Forecasting', type: 'link' },
				{ path: '/analysis/assumptions', title: 'Input & Assumptions', type: 'link', },
				{ path: '', title: 'Simulations', type: 'link' },
				{ path: '', title: 'Actualization', type: 'link' }
			]
		},
        {
			title: 'Input Data', icon: 'edit-3', type: 'sub', active: true, children: [
				{ path: '/input-data/actuals-weekly-data', title: 'Actuals Weekly Data', type: 'link' },
				{ path: '/input-data/forecast-weekly-data', title: 'Forecast Weekly Data', type: 'link' }
			]
		},          
        {
			path: '/faq', title: 'FAQ', icon: 'help-circle', type: 'link'
		},
		{
			path: '/knowledgebase', title: 'Knowledgebase', icon: 'database', type: 'link'
		},
        
        
	]
	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);


}
