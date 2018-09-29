import { Menu } from './interface/menu';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MENUS } from 'src/app/mock/menus';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

	menus: Menu[] = MENUS;

	constructor(private route: ActivatedRoute, private router: Router) { }

	ngOnInit () {
		this.setActivedMenu();
	}

	setActivedMenu (): void {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				let currentUrl = event.url;
				for (let parentMenu of this.menus) {
					if (parentMenu.menus && parentMenu.menus.length > 0) {
						for (let menu of parentMenu.menus) {
							if (menu.url == currentUrl) {
								menu.isActive = true;
								break;
							}
						}
					}
				}
			}
		})
	}
}