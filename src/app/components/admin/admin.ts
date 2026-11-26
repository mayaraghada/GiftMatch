import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { GiftService } from '../../services/gift';
import { Gift } from '../../models/gift';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, RouterLink],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {
  gifts: Gift[] = [];
  categories = ['Technologie', 'Mode', 'Beauté', 'Maison', 'Loisirs', 'Livres', 'Sport'];

  giftForm: Gift = this.emptyGift();   // le cadeau en cours d'édition
  editing = false;                     // false = ajout, true = modification
  showForm = false;                    // formulaire visible ou non
  message = '';
  errorMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private giftService: GiftService
  ) {}

  ngOnInit() {
    this.loadGifts();
  }

  emptyGift(): Gift {
    return {
      name: '',
      category: '',
      price: 0,
      occasion: '',
      age: '',
      interest: '',
      description: '',
      image: ''
    };
  }

  // READ
  loadGifts() {
    this.giftService.getGifts().subscribe({
      next: (data) => {
        this.gifts = data;
      },
      error: () => {
        this.errorMessage = "Impossible de charger les cadeaux. L'API est-elle lancée ?";
      }
    });
  }

  // Ouvrir le formulaire en mode ajout
  startAdd() {
    this.giftForm = this.emptyGift();
    this.editing = false;
    this.showForm = true;
    this.message = '';
  }

  // Ouvrir le formulaire en mode modification
  startEdit(gift: Gift) {
    this.giftForm = { ...gift };    // copie : on ne modifie pas le tableau directement
    this.editing = true;
    this.showForm = true;
    this.message = '';
  }

  cancel() {
    this.showForm = false;
    this.giftForm = this.emptyGift();
  }

  // CREATE ou UPDATE
  save(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (this.editing) {
      this.giftService.updateGift(this.giftForm).subscribe({
        next: () => {
          this.message = '✅ Cadeau modifié.';
          this.afterSave();
        },
        error: () => {
          this.errorMessage = 'Erreur lors de la modification.';
        }
      });
    } else {
      this.giftService.addGift(this.giftForm).subscribe({
        next: () => {
          this.message = '✅ Cadeau ajouté.';
          this.afterSave();
        },
        error: () => {
          this.errorMessage = "Erreur lors de l'ajout.";
        }
      });
    }
  }

  private afterSave() {
    this.errorMessage = '';
    this.showForm = false;
    this.giftForm = this.emptyGift();
    this.loadGifts();
  }

  // DELETE
  remove(gift: Gift) {
    if (!confirm(`Supprimer « ${gift.name} » ?`)) {
      return;
    }
    this.giftService.deleteGift(gift.id!).subscribe({
      next: () => {
        this.message = '🗑️ Cadeau supprimé.';
        this.errorMessage = '';
        this.loadGifts();
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la suppression.';
      }
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}