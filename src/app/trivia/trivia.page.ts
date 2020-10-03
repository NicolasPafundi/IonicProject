import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {Trivia} from './trivia.model';
import {TriviaService} from './trivia.service'
import {TriviaAPI} from './triviaAPI.model'
import {AlertController} from '@ionic/angular'
import {LoadingController} from '@ionic/angular'

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.page.html',
  styleUrls: ['./trivia.page.scss'],
})
export class TriviaPage implements OnInit {

  trivia:Trivia = new Trivia();
  answer:string;

  constructor(private ActivatedRoute:ActivatedRoute,private Router:Router,private TriviaService:TriviaService, private AlertController:AlertController,private LoadingController:LoadingController) { }

  async ngOnInit() {
    const loading = await this.LoadingController.create({
      message: 'Please wait...'
    });
    await loading.present();

    await this.loadPage();
    
    await loading.dismiss();
  }

  addTrivia(){
    this.TriviaService.addTrivia(this.trivia);
    this.Router.navigate(['/home'])
  }
  async deleteTrivia(){

    const alert = await this.AlertController.create({
      header: 'Remove trivia from your list?',
      message: "You can't recover it",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Okay',
          handler: () => {
            this.TriviaService.deleteTrivia(this.trivia.id);
            this.Router.navigate(['/home'])
          }
        }
      ]
    });
    await alert.present();
  }

  async checkAsnwer(){
    var result="Incorrect";
    var message="Correct answer: "+this.trivia.correctAnswer;
    if(this.answer==this.trivia.correctAnswer){
      result="Correct";
      message="Good job!";
    }else if(!this.answer){
      result="Incorrect";
      message="Choose your answer first!";
    }

    const alert = await this.AlertController.create({
      header:result,
      message:message,
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          cssClass: 'secondary'
        }
      ]
    });
    await alert.present();

  }

  getRandomTrivia(){
    this.TriviaService.getRandomTriviaFromApi()
    .subscribe((resp: TriviaAPI) => {
      this.trivia.question = resp.results[0].question;
      this.trivia.incorrectAnswers = resp.results[0].incorrect_answers;
      this.trivia.correctAnswer = resp.results[0].correct_answer;
      this.trivia.incorrectAnswers.push(this.trivia.correctAnswer);
      this.trivia.incorrectAnswers.sort(function(){return Math.random()-0.5});
    });
  }

  async loadPage(){
    return await this.ActivatedRoute.paramMap.subscribe(paramMap=>{
      if(!paramMap.get('triviaId')){
        this.getRandomTrivia();
      }else{
        this.trivia = this.TriviaService.getTrivia(paramMap.get('triviaId'));
        this.trivia.incorrectAnswers.sort(function(){return Math.random()-0.5});
      }
    })
  }
}
