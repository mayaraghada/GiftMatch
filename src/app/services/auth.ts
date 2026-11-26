import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERNAME = 'admin';
  private readonly PASSWORD = 'admin123';
  private readonly KEY = 'giftmatch_admin';

  // Renvoie true si les identifiants sont corrects
  login(username: string, password: string): boolean {
    if (username === this.USERNAME && password === this.PASSWORD) {
      sessionStorage.setItem(this.KEY, 'true');
      return true;
    }
    return false;
  }

  logout() {
    sessionStorage.removeItem(this.KEY);
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem(this.KEY) === 'true';
  }
}