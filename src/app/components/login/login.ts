import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    // Déjà connecté : inutile de revoir le formulaire
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/admin']);
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (this.auth.login(this.username, this.password)) {
      this.errorMessage = '';
      this.router.navigate(['/admin']);
    } else {
      this.errorMessage = 'Identifiant ou mot de passe incorrect.';
      this.password = '';      // on vide le mot de passe
    }
  }
}