import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { QuizParams } from '../models/quiz-params.model';

@Component({
  selector: 'app-quiz-params',
  templateUrl: './quiz-params.component.html',
  styleUrls: ['./quiz-params.component.scss']
})
export class QuizParamsComponent implements OnInit{
  quizParams: QuizParams = new QuizParams();


  constructor(private router: Router) { }

  ngOnInit() {
  }

  generateQuiz() {
    this.router.navigate(['/quiz'], { queryParams: this.quizParams });
  }
}
