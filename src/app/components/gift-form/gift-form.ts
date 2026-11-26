import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GiftService } from '../../services/gift';
import { Gift } from '../../models/gift';

@Component({
  selector: 'app-gift-form',
  imports: [FormsModule],
  templateUrl: './gift-form.html',
  styleUrl: './gift-form.css'
})
export class GiftForm implements OnInit {
  // Critères saisis par l'utilisateur
  occasion = '';
  age: number | null = null;
  budget: number | null = null;
  interest = '';

  occasions = ['Anniversaire', 'Fête des mères', 'Pendaison de crémaillère', 'Noël'];

  // Données
  allGifts: Gift[] = [];
  results: Gift[] = [];
  searched = false;      // devient true après une recherche valide
  errorMessage = '';     // erreur de l'API
  formError = '';        // message si aucun critère n'est rempli

  constructor(private giftService: GiftService) {}

  ngOnInit() {
    this.giftService.getGifts().subscribe({
      next: (data) => {
        this.allGifts = data;
      },
      error: () => {
        this.errorMessage = "Impossible de charger les cadeaux. L'API est-elle lancée ?";
      }
    });
  }

  search() {
    // Au moins un champ est-il rempli ?
    const hasCriteria =
      this.occasion !== '' ||
      this.age !== null ||
      this.budget !== null ||
      this.interest.trim() !== '';

    if (!hasCriteria) {
      this.formError = 'Veuillez remplir au moins un critère.';
      this.results = [];
      this.searched = false;
      return;            // on s'arrête : aucun filtrage
    }

    this.formError = '';

    this.results = this.allGifts.filter(gift => {
      const okOccasion = this.occasion === '' || gift.occasion === this.occasion;
      const okBudget = this.budget === null || gift.price <= this.budget;
      const okInterest = this.interest.trim() === '' ||
        gift.interest.toLowerCase().includes(this.interest.trim().toLowerCase());
      const okAge = this.age === null || this.ageMatches(gift.age, this.age);

      return okOccasion && okBudget && okInterest && okAge;
    });
    this.searched = true;
  }

  // "18-30" et 25 → true ; "18-30" et 40 → false
  ageMatches(range: string, age: number): boolean {
    const [min, max] = range.split('-').map(Number);
    return age >= min && age <= max;
  }

  reset() {
    this.occasion = '';
    this.age = null;
    this.budget = null;
    this.interest = '';
    this.results = [];
    this.searched = false;
    this.formError = '';
  }
}