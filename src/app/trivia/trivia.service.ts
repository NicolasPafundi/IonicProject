import { Injectable } from '@angular/core';
import {Trivia} from './trivia.model'
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TriviaService {

  private trivias:Trivia[] = [];

  constructor(private http:HttpClient) { }

  getTrivias(){
    return [...this.trivias];
  }

  getTrivia(triviaId:string){
    return{
      ...this.trivias.find(trivia=>{return trivia.id===triviaId})
    } 
  }

  getRandomTriviaFromApi(){
    return this.http.get('https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple');
  }

  addTrivia(trivia:Trivia){
    if(this.trivias.length > 0){
      trivia.id = parseInt(this.trivias[this.trivias.length - 1].id) + 1+"";
    }else{
      trivia.id="1";
    }
    console.log(trivia.id);
    this.trivias.push(trivia);
  }

  deleteTrivia(triviaId:string){
    this.trivias= this.trivias.filter(trivia=>{return trivia.id!==triviaId})
  }


}
