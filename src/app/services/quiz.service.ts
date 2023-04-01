import { HttpClient } from '@angular/common/http';
import { QuizQuestion } from '../models/quiz-question.model';
import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private prompt = 'Generate a quiz on the theme of {{theme}} with {{numQuestions}} questions at {{level}} level.\n1.';

  constructor(private http: HttpClient) {}

  async generateQuiz(theme: string, level: string, numQuestions: number): Promise<QuizQuestion[]> {
    const apiKey = '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';
    const organization = 'Personnal';
    const configuration = new Configuration({
      organization,
      apiKey,
    });
    const openai = new OpenAIApi(configuration);

    const body = {
      model: 'gpt-3.5-turbo',
      prompt: this.prompt
        .replace('{{theme}}', theme)
        .replace('{{level}}', level)
        .replace('{{numQuestions}}', numQuestions.toString()),
      temperature: 0.5,
      max_tokens: 256,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      n: numQuestions * 4,
      stop: ['\n\n'],
    };

    try {
      const response = await openai.createCompletion(body);
      const choices = response.data.choices.map((choiceObj: any) => choiceObj.text as string);
      const questions: QuizQuestion[] = [];
      let currentQuestion: QuizQuestion = new QuizQuestion();

      for (let i = 0; i < choices.length; i++) {
        const choice = choices[i].trim();

        if (choice.startsWith('Question:')) {
          if (currentQuestion.question) {
            questions.push(currentQuestion);
          }
          currentQuestion = new QuizQuestion();
          currentQuestion.question = choice.substr(9);
        } else if (choice.startsWith('Answer:')) {
          currentQuestion.answer = choice.substr(7);
        } else {
          currentQuestion.choices?.push(choice);
        }
      }

      questions.push(currentQuestion);
      return questions;
    } catch (error) {
      console.error('Error generating quiz:', error);
      throw error;
    }
  }
}
