import BX24Service from '../services/BX24Service.js';
import '../style/main.css';

import * as API from './api.js';
import { fieldsOfStages } from './constants.js';
import { renderForm } from './render.js';

BX24Service.init(async function () {
  const isBinded = localStorage.getItem('isBinded');

  if (!isBinded) {
    const result = await API.placementBind();
    console.log('🚀 ~ result:', result);
  } else {
    localStorage.setItem('isBinded', true);
  }

  const currentDeal = await API.fetchCurrentDeal(33);
  console.log('🚀 ~ currentDeal:', currentDeal);

  const fields = await API.fetchFields(currentDeal.STAGE_ID);

  let values = {};

  fieldsOfStages[currentDeal.STAGE_ID].forEach((field) => {
    if (field in fields) {
      values[field] = currentDeal[field];
    }
  });
  console.log('🚀 ~ values:', values);

  renderForm('.form-deal', fields, values);

  const formDeal = document.querySelector('.form-deal').querySelector('form');

  formDeal?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(formDeal);

    const data = {};

    for (const [key, value] of formData) {
      data[key] = value;
    }
    console.log('🚀 ~ formDeal?.addEventListener ~ data:', JSON.stringify(data));
    const result = await API.fetchUpdateDeal(33, data, {});
    console.log('🚀 ~ result update deal:', result);
  });
});
