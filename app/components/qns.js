import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class QnsComponent extends Component {
  //Needed declarations /*Here*/
  @service router;
  @tracked startTime = 0.5;
  @tracked time = this.startTime * 60;
  @tracked minutes = undefined;
  @tracked seconds = undefined;
  @tracked finalMin = undefined;
  @tracked finalSec = undefined;
  @tracked stopInterval = undefined;

  @tracked currentQuizData = '';
  @tracked score = 0;
  @tracked questionNo = 1;
  @tracked index = 0;
  @tracked scoreValue = false;
  @tracked currentQuizData = '';
  @tracked question = '';
  @tracked totalQuestion = '';
  @tracked ans_one = '';
  @tracked ans_two = '';
  @tracked ans_three = '';
  @tracked ans_four = '';
  @tracked q_Weight = '';
  @tracked totalMarks = 0;

  //intial funation's---------------------
  constructor() {
    super(...arguments);
    this.firstQuestionLoad();
    this.initiateInterval();
  }

  //get the if the user login or not----------------
  sessionValue = localStorage.getItem('name');

  // I use'd array of object-----------------------------
  @tracked questions = [
    {
      question: 'Which of the following is not input device',
      a: 'Touch Pad',
      b: 'Mouse',
      c: 'Scanner',
      d: 'Printer',
      correct: 'd',
      mark: '2',
    },
    {
      question: 'Most popular programing language',
      a: 'Java',
      b: 'C',
      c: 'C++',
      d: 'Python',
      correct: 'a',
      mark: '2',
    },
    {
      question: 'Brain of a computer',
      a: 'Mouse',
      b: 'Mother bord',
      c: 'Monitor',
      d: 'CPU',
      correct: 'd',
      mark: '3',
    },
    {
      question: 'Ember latest Stable release',
      a: 'June 2022',
      b: 'April 2022',
      c: 'May 2022',
      d: 'March 2022',
      correct: 'd',
      mark: '3',
    },
    {
      question: 'User friendly Operating System for PC',
      a: 'Mac Os',
      b: 'Linux',
      c: 'Windows',
      d: 'Non of the above',
      correct: 'c',
      mark: '2',
    },
    {
      question: 'Which of the following is valid storage type?',
      a: 'CPU',
      b: 'Pen Drive',
      c: 'Track Ball',
      d: 'Non of the above',
      correct: 'b',
      mark: '3',
    },
    {
      question: 'The list of code instructions is called?',
      a: 'Computer Program',
      b: 'Algoritham',
      c: 'Flow Chart',
      d: 'Utility Program',
      correct: 'a',
      mark: '2',
    },
    {
      question: 'Which of the Following is system softwere?',
      a: 'Tally',
      b: 'Word',
      c: 'Excel',
      d: 'linux',
      correct: 'd',
      mark: '3',
    },
  ];

  //interval Init----------------------------------------
  @action
  initiateInterval() {
    this.scoreValue = false;
    this.stopInterval = setInterval(this.timerFunction, 1000);
  }

  //timer function here----------------------------------------
  @action
  timerFunction() {
    if (!this.scoreValue) {
      const scoreDocEl = document.getElementById('score');
      const countDownEl = document.getElementById('time');

      this.minutes = Math.floor(this.time / 60);
      this.seconds = this.time % 60;

      this.seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds;

      this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;

      console.log(this.minutes + ':' + this.seconds);
      countDownEl.innerHTML = this.minutes + ':' + this.seconds;
      if (this.seconds == 0 && this.minutes == 0) {
        this.minutes = 0;
        this.seconds = 0;
        this.scoreValue = true;
        this.findTotalQuestionMark();
      } else if (!this.seconds == 0) {
        this.time--;
      }
    }
  }

  //set the questions and answers options------------------------------
  @action
  firstQuestionLoad() {
    this.deSelected();
    this.currentQuizData = this.questions[this.index];
    this.question = this.questionNo + '. ' + this.currentQuizData.question;
    this.totalQuestion = this.questions.length;
    this.ans_one = this.currentQuizData.a;
    this.ans_two = this.currentQuizData.b;
    this.ans_three = this.currentQuizData.c;
    this.ans_four = this.currentQuizData.d;
    this.q_Weight = this.currentQuizData.mark;
  }

  //next button click and check the answer (click action)-------------------------
  @action
  checkfuntion() {
    this.index++;
    this.questionNo++;
    const selValue = this.getSelected(); // getselects the options from radio group

    if (selValue === this.currentQuizData.correct) {
      //check the answer
      this.score += parseInt(this.currentQuizData.mark);
    }

    if (this.index < this.questions.length) {
      this.firstQuestionLoad();
    } else {
      this.findTotalQuestionMark();
      this.scoreValue = true;
      this.index = 0;
    }
  }

  //get the selected option in group of radio options-----------------------
  @action
  getSelected() {
    const answerEls = document.querySelectorAll('.answer');
    let answer = 0;
    answerEls.forEach((answerEl) => {
      if (answerEl.checked) {
        answer = answerEl.id;
      }
    });
    return answer;
  }

  //deselect the radio options--------------------------------------
  @action
  deSelected() {
    const answerEls = document.querySelectorAll('.answer');
    answerEls.forEach((answerEl) => {
      answerEl.checked = false;
    });
  }

  //exit the questions page (click action)------------------------------
  @action
  exitFunction() {
    let replay = confirm('Do you want to exit the Quiz');
    if (replay) {
      this.router.transitionTo('index');
      localStorage.setItem('name', '');
    }
  }

  //find the total mark of total questions------------------------------
  @action
  findTotalQuestionMark() {
    this.questions.forEach((element) => {
      this.totalMarks += parseInt(element.mark);
    });
  }

  //play again button (click function)----------------------------------
  @action
  playagainButton() {
    this.index = 0;
    this.scoreValue = false;
    this.totalMarks = 0;
    this.score = 0;
    this.questionNo = 1;
    this.firstQuestionLoad();
    this.startTime = 1;
    this.time = this.startTime * 60;
  }
}
