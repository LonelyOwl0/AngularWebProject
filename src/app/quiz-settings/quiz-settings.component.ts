import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-quiz-settings',
  templateUrl: './quiz-settings.component.html',
  styleUrls: ['./quiz-settings.component.css']
})
export class QuizSettingsComponent implements OnInit {
  settings = {
    category:'',
    difficulty: '',
    type: '',
    numberOfQuestions: null
  };

  @Output() settingsSubmitted = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.settingsSubmitted.emit(this.settings);
  }
}
