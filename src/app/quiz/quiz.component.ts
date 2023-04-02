import { Component } from '@angular/core';
import { OpenTdbService } from '../open-tdb.service';
import { Router } from "@angular/router";
import {QuizServiceService} from "../quiz-service.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  score: number = 0;
  quizCompleted: boolean = false;
  quizQuestions: any[] = [];

  constructor(private openTdbService: OpenTdbService, private router: Router,private quizService: QuizServiceService) { }

  onSettingsSubmitted(settings: { numberOfQuestions: any; category: any; difficulty: any; type: any; }) {
    this.openTdbService.getQuizQuestions(settings).subscribe(response => {
      this.quizQuestions = response.results;
      this.router.navigate(['/quiz-page', { quizQuestions: JSON.stringify(this.quizQuestions) }]);
    });
  }

  onQuizCompleted(userAnswers: number[]) {
    debugger;
    console.log("I am called");
    this.score = 0;
    this.quizQuestions.forEach((question, index) => {
      if (question.correct_answer === question.options[userAnswers[index]]) {
        this.score++;
      }
    });
    this.quizCompleted = true;
    console.log("The quiz is over ");
  }
}
