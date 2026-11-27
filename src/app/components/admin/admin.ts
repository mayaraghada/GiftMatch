import { Component, OnInit, signal } from '@angular/core';
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
  // Signaux : pilotent l'affichage
  gifts = signal<Gift[]>([]);
  message = signal('');
  errorMessage = signal('');
  selectedCategory = signal('');
  giftToDelete = signal<Gift | null>(null);

  // Listes des menus déroulants
  categories = ['Technologie', 'Mode', 'Beauté', 'Maison', 'Loisirs', 'Livres', 'Sport'];
  occasions = ['Anniversaire', 'Fête des mères', 'Pendaison de crémaillère', 'Noël'];
  interests = [
    'Musique', 'Sport', 'Informatique', 'Mode', 'Bien-être', 'Parfums',
    'Maquillage', 'Décoration', 'Cuisine', 'Lecture', 'Jeux', 'Dessin'
  ];

  // Formulaire
  giftForm: Gift = this.emptyGift();
  editing = false;
  showForm = false;

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

  // ---------- READ ----------
  loadGifts() {
    this.giftService.getGifts().subscribe({
      next: (data) => {
        this.gifts.set(data);
      },
      error: () => {
        this.errorMessage.set("Impossible de charger les cadeaux. L'API est-elle lancée ?");
      }
    });
  }

  // ---------- FILTRE ----------
  filteredGifts(): Gift[] {
    const cat = this.selectedCategory();
    if (cat === '') {
      return this.gifts();
    }
    return this.gifts().filter(gift => gift.category === cat);
  }

  onCategoryChange(value: string) {
    this.selectedCategory.set(value);
  }

  // ---------- FORMULAIRE ----------
  startAdd() {
    this.giftForm = this.emptyGift();
    this.editing = false;
    this.showForm = true;
    this.message.set('');
    this.scrollToForm();
  }

  startEdit(gift: Gift) {
    this.giftForm = { ...gift };
    this.editing = true;
    this.showForm = true;
    this.message.set('');
    this.scrollToForm();
  }

  private scrollToForm() {
    setTimeout(() => {
      document.getElementById('gift-form')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 0);
  }

  cancel() {
    this.showForm = false;
    this.giftForm = this.emptyGift();
  }

  // ---------- CREATE / UPDATE ----------
  save(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (this.editing) {
      this.giftService.updateGift(this.giftForm).subscribe({
        next: () => {
          this.message.set('✅ Cadeau modifié.');
          this.afterSave();
        },
        error: () => {
          this.errorMessage.set('Erreur lors de la modification.');
        }
      });
    } else {
      this.giftService.addGift(this.giftForm).subscribe({
        next: () => {
          this.message.set('✅ Cadeau ajouté.');
          this.afterSave();
        },
        error: () => {
          this.errorMessage.set("Erreur lors de l'ajout.");
        }
      });
    }
  }

  private afterSave() {
    this.errorMessage.set('');
    this.showForm = false;
    this.giftForm = this.emptyGift();
    this.loadGifts();
  }

  // ---------- DELETE ----------
  askDelete(gift: Gift) {
    this.giftToDelete.set(gift);
  }

  cancelDelete() {
    this.giftToDelete.set(null);
  }

  confirmDelete() {
    const gift = this.giftToDelete();
    if (!gift) {
      return;
    }
    this.giftToDelete.set(null);

    this.giftService.deleteGift(gift.id!).subscribe({
      next: () => {
        this.message.set('🗑️ Cadeau supprimé.');
        this.errorMessage.set('');
        this.loadGifts();
      },
      error: () => {
        this.errorMessage.set('Erreur lors de la suppression.');
      }
    });
  }

  // ---------- DÉCONNEXION ----------
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}