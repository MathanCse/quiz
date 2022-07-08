import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class FormComponent extends Component {
  @service router;

  //Needed declarations /*Here*/-----------------------------
  @tracked mat = '';
  @tracked nameField = false;
  @tracked error = '';

  //register button function(click action)--------------------
  @action
  buttonClickValu() {
    this.mat = document.getElementById('name').value;//get the value from input field
    localStorage.setItem('name', this.mat); // set the localstorage
    if (!this.mat) {
      this.error = 'Please Enter Your name';
      this.nameField = false;
    } else {
      this.error = '';
      this.nameField = true;
      this.router.transitionTo('question');
    }
  }
}
