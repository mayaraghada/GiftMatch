import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gift } from '../models/gift';

@Injectable({ //indique qu'Angular peut fournir ce service à n'importe quel composant, avec une seule instance partagée dans toute l'application.
  providedIn: 'root'
})

export class GiftService {
  private apiUrl = 'http://localhost:3000/gifts';

  constructor(private http: HttpClient) {}

  // GET : récupérer tous les cadeaux
  getGifts(): Observable<Gift[]> {
    return this.http.get<Gift[]>(this.apiUrl);
  }

  // GET : récupérer un cadeau par son id
  getGift(id: number): Observable<Gift> {
    return this.http.get<Gift>(`${this.apiUrl}/${id}`);
  }

  // POST : ajouter un cadeau
  addGift(gift: Gift): Observable<Gift> {
    return this.http.post<Gift>(this.apiUrl, gift);
  }

  // PUT : modifier un cadeau
  updateGift(gift: Gift): Observable<Gift> {
    return this.http.put<Gift>(`${this.apiUrl}/${gift.id}`, gift);
  }

  // DELETE : supprimer un cadeau
  deleteGift(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}