import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  name = '';
  email = '';
  message = '';
  sent = false;      // devient true après un envoi réussi

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;        // formulaire invalide : on n'envoie rien
    }

    // Ici, on simulerait l'envoi (API, email...)
    console.log('Message reçu :', this.name, this.email, this.message);

    this.sent = true;
    form.resetForm();   // vide les champs et remet l'état à zéro
  }
}