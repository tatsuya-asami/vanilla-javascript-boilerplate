import { testAlert } from '@js/sample.js';
import './style.scss';

const sampleButton = document.getElementById('sampleButton');
sampleButton.addEventListener('click', () => {
  testAlert(33);
});
