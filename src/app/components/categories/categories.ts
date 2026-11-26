import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories {
  categories = [
    { name: 'Technologie', icon: '💻' },//objet
    { name: 'Mode', icon: '👗' },
    { name: 'Beauté', icon: '💄' },
    { name: 'Maison', icon: '🏠' },
    { name: 'Loisirs', icon: '🎮' },
    { name: 'Livres', icon: '📚' },
    { name: 'Sport', icon: '⚽' }
  ];
}