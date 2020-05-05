import { getSampleRequest } from '@js/sample';
import './style.scss';

const testButton = document.getElementById('testButton');
testButton.addEventListener('click', () => {
  getSampleRequest();
});
