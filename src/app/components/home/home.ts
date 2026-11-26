import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Gifts } from '../gifts/gifts';
import { Categories } from '../categories/categories';
import { GiftForm } from '../gift-form/gift-form';
import { Contact } from '../contact/contact';

@Component({
  selector: 'app-home',
  imports: [Header, Gifts, Categories, GiftForm, Contact],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  appName = 'GiftMatch';
  slogan = 'Vous cherchez le cadeau idéal ?';
}