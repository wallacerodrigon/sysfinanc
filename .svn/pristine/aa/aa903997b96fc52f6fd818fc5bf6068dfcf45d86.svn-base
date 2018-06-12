import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../service/user.service';
import {User} from '../model/user.model';

@Injectable()
export class UserResolver implements Resolve<User> {

  constructor(private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise<User>(resolve => {
      this.userService.getById(route.params.id).subscribe(data => {
        resolve(data as User);
      });
    });
  }
}
