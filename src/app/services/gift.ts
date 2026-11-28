//Un service est une classe spécialisée dans une mission précise. Ici, sa mission est : parler à l'API pour récupérer et envoyer les cadeaux.

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gift } from '../models/gift';

@Injectable({ //indique qu'Angular peut fournir ce service à n'importe quel composant, avec une seule instance partagée dans toute l'application.
  providedIn: 'root'
})

export class GiftService {
  private apiUrl = 'http://localhost:3000/gifts';//C'est l'adresse de la cuisine

  constructor(private http: HttpClient) {} //njection de dépendances = on demande ce dont on a besoin, et Angular nous le fournit.

  // GET : récupérer tous les cadeaux
  //Un Observable est comme un ticket de commande au restaurant : ce n'est pas encore le plat, mais ça promet que le plat arrivera.
  //tant qu'on n'a pas écrit .subscribe(), la requête ne part pas. C'est le composant qui déclenchera l'envoi.
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