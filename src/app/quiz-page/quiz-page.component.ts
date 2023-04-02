import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})
export class QuizPageComponent implements OnInit {
  @Input() quizQuestions: any[]=[];
  userAnswers: (number|undefined)[] = []!;
  @Output() quizCompleted = new EventEmitter();

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.quizQuestions = JSON.parse(<string>params.get('quizQuestions'));
    });

    this.userAnswers = new Array(this.quizQuestions.length);
    this.quizQuestions.forEach(question => {
      question.options = this.shuffleOptions([...question.incorrect_answers, question.correct_answer]);
    });
  }

  onSubmit(event: { preventDefault: () => void; }) {
      event.preventDefault();
      this.quizCompleted.emit(this.userAnswers);
    }




  shuffleOptions(options: string[]): string[] {
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  }
}
