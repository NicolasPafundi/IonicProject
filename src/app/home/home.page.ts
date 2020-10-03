import { Component } from '@angular/core';
import {Trivia} from '../trivia/trivia.model';
import {TriviaService} from '../trivia/trivia.service'
import {LoadingController} from '@ionic/angular'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private trivias:Trivia[] = [];

  constructor(private TriviaService:TriviaService,private LoadingController:LoadingController) { }

  async ngOnInit(){
    this.loadPage();
  }

  async ionViewWillEnter(){
    this.loadPage();
  }

  async loadPage(){
    const loading = await this.LoadingController.create({
      message: 'Please wait...'
    });
    await loading.present();
    this.trivias = this.TriviaService.getTrivias();
    await loading.dismiss();
  }

}
