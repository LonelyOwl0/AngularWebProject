import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from '../auth.service';
import { categoryMap } from '../category-map';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss']
})
export class QuizResultsComponent implements OnInit {
  user: any;
  quizResults: any[] = [];
  displayedColumns: string[] = ['category', 'type', 'difficulty', 'amount', 'date', 'score'];

  constructor(private authService: AuthService, private db: AngularFireDatabase) {}

  ngOnInit() {
    this.authService.getUser().subscribe((user) => {
      this.user = user;
      const userName = this.user.displayName;
      this.db.list(`quizResults/${userName}`).valueChanges().subscribe((results) => {
        this.quizResults = results;
      });
    });
  }

  getCategoryName(categoryId: string): string {
    return categoryMap[categoryId] || 'Unknown';
  }
}
