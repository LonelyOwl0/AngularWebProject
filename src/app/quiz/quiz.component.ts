import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { QuizQuestion } from '../models/quiz-question.model';
import { ActivatedRoute } from '@angular/router';
import {QuizParams} from "../models/quiz-params.model";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  quizQuestions: QuizQuestion[] = [];

  constructor(private quizService: QuizService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const quizParams = {
        theme: params['theme'],
        level: params['level'],
        numQuestions: params['numQuestions']
      };
      this.generateQuiz(quizParams);
    });
  }

  async generateQuiz(quizParams: QuizParams) {
    try {
      const questions: QuizQuestion[] = await this.quizService.generateQuiz(quizParams.theme, quizParams.level, quizParams.numQuestions);
      this.quizQuestions = questions;
    } catch (error) {
      console.error('Error generating quiz:', error);
    }
  }


}
