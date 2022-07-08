import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
export default class QuestionController extends Controller {
  @tracked questions = [
    {
      question: 'Name of the screen that recognizes touch input is',
      a: 'Point Screen',
      b: 'Touch Screen',
      c: 'Andriod Screen',
      d: 'Recog screen',
      correct: 'c',
    },
    {
      question: 'Most popular programing language',
      a: 'Java',
      b: 'C',
      c: 'C++',
      d: 'Python',
      correct: 'a',
    },
    {
      question: '10+5',
      a: '20',
      b: '12',
      c: '15',
      d: '25',
      correct: 'c',
    },
    {
      question: 'Ember latest Stable release',
      a: 'June 2022',
      b: 'April 2022',
      c: 'May 2022',
      d: 'March 2022',
      correct: 'd',
    },
    {
      question: 'User friendly Operating System for PC',
      a: 'Mac Os',
      b: 'Linux',
      c: 'Windows',
      d: 'Android',
      correct: 'c',
    },
  ];
  @tracked ans_one = '';
  sessionValue = localStorage.getItem('name');
  @tracked mat = '';

  @action
  lableValue(event) {
    this.mat = event.target.value;
  }

  @action
  checkfuntion() {
    this.setTheValue();
  }
  @tracked index = 0;
  // @tracked currentQuizData = questions[this.index];
  @tracked question = '';

  @action
  setTheValue() {
    console.log('##############');
    console.log(this.questions[this.index].question);
    this.question = this.questions[this.index].question;
    console.log(this.question);
  }
}
