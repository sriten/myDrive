import {Component, OnInit} from '@angular/core';
import {AppContext} from '../../middleware/app.context';
import {Router} from '@angular/router';
import {User} from '../../models/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  users: User[] = [];
  selectedUserId: string;

  constructor(
    private appContext: AppContext,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.users = this.appContext.Repository.User.getAll();
    this.selectedUserId = this.users[0].Id;
  }

  signOut() {
    this.appContext.Session.Gapi.signOut();
    this.router.navigate(['/signin']);
  }
}
