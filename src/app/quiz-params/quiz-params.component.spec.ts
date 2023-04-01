import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizParamsComponent } from './quiz-params.component';

describe('QuizParamsComponent', () => {
  let component: QuizParamsComponent;
  let fixture: ComponentFixture<QuizParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizParamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
