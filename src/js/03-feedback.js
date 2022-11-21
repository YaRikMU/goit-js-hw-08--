import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');

const LOCAL_STORAGE_KEY = 'feedback-form-state';

let data = {};

loadForm();

formEl.addEventListener('input', throttle(onSaveFormInput, 500));

formEl.addEventListener('submit', onFormSubmit);

function onSaveFormInput(evt) {
  data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};

  data[evt.target.name] = evt.target.value;

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

function onFormSubmit(evt) {
  event.preventDefault();
  if (!evt.target.email.value || !evt.target.message.value) {
    alert('Enter all data');
    return;
  }

  evt.target.reset();
  console.log(data);
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

function loadForm() {
  try {
    let formLoad = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (!formLoad) {
      return;
    }

    data = formLoad;
    formEl.email.value = data.email || '';
    formEl.message.value = data.message || '';
  } catch (error) {
    console.error('Error.message ', error.message);
  }
}
