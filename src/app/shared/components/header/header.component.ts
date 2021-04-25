
import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { NavService, Menu } from '../../services/nav.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { CategoryService, CategoryPPG } from '../../services/category.service';
import { Subscription } from 'rxjs';
import { RestApiService } from "../../services/rest-api.service";
import { DOCUMENT } from '@angular/common';

var body = document.getElementsByTagName("body")[0];
 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public menuItems: Menu[];
  public items: Menu[];
  public searchResult: boolean = false;
  public searchResultEmpty: boolean = false;
  public openNav: boolean = false
  public right_sidebar: boolean = false
  public text: string;
  public elem;
  public selectedCategory: string;
  public categories;
  public isOpenMobile: boolean = false
  public url: string
  
  @Output() rightSidebarEvent = new EventEmitter<boolean>();

  constructor(
    private categoryService: CategoryService,  
    private restApi: RestApiService,  
    public navServices: NavService,
    @Inject(DOCUMENT) private document: any,
    private translate: TranslateService,

    public authService: AuthService) {
        translate.setDefaultLang('en'); 
        let user:any = JSON.parse(localStorage.getItem('user'));
    if(user!==null)
      this.url = user.photoURL;
    } 

    ngOnDestroy() {
    this.removeFix();
    }

    right_side_bar() {
    this.right_sidebar = !this.right_sidebar
    this.rightSidebarEvent.emit(this.right_sidebar)
    }

    collapseSidebar() {
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar
    }

    openMobileNav() {
    this.openNav = !this.openNav;
    }

    public changeLanguage(lang) {
    this.translate.use(lang)
    }
    logout() {
        this.authService.SignOut()
    }

    public changeCategory(selectCategoryId,selectedCategoryName){

      this.selectedCategory = selectedCategoryName

      let match = this.categories.filter( categoryItems => {
        if(categoryItems.category_name === selectedCategoryName){
            return categoryItems;
        }
      });

      const currentItem:CategoryPPG = {
         category:match[0].category_id,
         year:'',
         aggregation:'',
         retailer:null
      };

      this.categoryService.updateItem(currentItem);

    }

    searchTerm(term: any) {
    term ? this.addFix() : this.removeFix();
    if (!term) return this.menuItems = [];
    let items = [];
    term = term.toLowerCase();
    this.items.filter(menuItems => {
      if (menuItems.title.toLowerCase().includes(term) && menuItems.type === 'link') {
        items.push(menuItems);
      }
      if (!menuItems.children) return false
      menuItems.children.filter(subItems => {
        if (subItems.title.toLowerCase().includes(term) && subItems.type === 'link') {
          subItems.icon = menuItems.icon
          items.push(subItems);
        }
        if (!subItems.children) return false
        subItems.children.filter(suSubItems => {
          if (suSubItems.title.toLowerCase().includes(term)) {
            suSubItems.icon = menuItems.icon
            items.push(suSubItems);
          }
        })
      })
      this.checkSearchResultEmpty(items)
      this.menuItems = items
    });
    }
 
    checkSearchResultEmpty(items) {
    if (!items.length)
      this.searchResultEmpty = true;
    else
      this.searchResultEmpty = false;
    }

    addFix() {
    this.searchResult = true;
    body.classList.add("offcanvas");
    }

    removeFix() {
    this.searchResult = false;
    body.classList.remove("offcanvas");
    this.text = "";
    }

    ngOnInit() {
    this.elem = document.documentElement;
    this.navServices.items.subscribe(menuItems => {
      this.items = menuItems
    });

    this.restApi.getCategories().subscribe((data: {}) => {
          this.categories = data 
          if(!this.selectedCategory) {
            this.selectedCategory = this.categories[0].category_name
              const currentItem:CategoryPPG = {
                 category:this.categories[0].category_id,
                 year:'',
                 aggregation:'',
                 retailer:null
                   
            };
             
            this.categoryService.updateItem(currentItem);
        }  
      })  
    }

    toggleFullScreen() {
    this.navServices.fullScreen = !this.navServices.fullScreen;
    if (this.navServices.fullScreen) {
      if (this.elem.requestFullscreen) {
        this.elem.requestFullscreen();
      } else if (this.elem.mozRequestFullScreen) {
        /* Firefox */ 
        this.elem.mozRequestFullScreen();
      } else if (this.elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.elem.webkitRequestFullscreen();
      } else if (this.elem.msRequestFullscreen) {
        /* IE/Edge */
        this.elem.msRequestFullscreen();
      }
    } else {
      if (!this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
    }
}
