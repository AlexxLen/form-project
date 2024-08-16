import BX24Service from '../services/BX24Service';
import { fieldsOfStages, PLACEMENT_BIND } from './constants';

async function fetchCurrentDeal() {
  let dealId = BX24Service.placementInfo().options.ID ?? 33;
  console.log('🚀 ~ fetchCurrentDeal ~ dealId:', dealId);

  const data = await BX24Service.callMethod('crm.deal.get', { id: dealId });
  console.log('🚀 ~ fetchCurrentDeal ~ data:', data);
  return data;
}

// function fetchFields(fields = []) {
//   let data = {};

//   BX24.callMethod('crm.deal.fields', {}, function (result) {
//     if (result.error()) console.error(result.error());
//     else {
//       data = result.data();
//       return data;
//     }
//   });

//   if (fields && fields.length > 0) {
//     let newData = {};

//     console.log('🚀 ~ fetchFields ~ fields:', fields);
//     fields.forEach((field) => {
//       console.log('🚀 ~ isVAlidValue:', field in data);
//       if (field in data) {
//         newData[field] = JSON.parse(JSON.stringify(data[field]));
//         console.log('🚀 ~ newData:', newData);
//       }
//     });
//   } else {
//     return data;
//   }
// }

async function fetchFields(stage = null) {
  const data = await BX24Service.callMethod('crm.deal.fields');
  const fields = fieldsOfStages[stage];

  if (fields && fields.length > 0) {
    let newData = {};
    console.log('🚀 ~ fetchFields ~ fields:', fields);
    fields.forEach((field) => {
      if (field in data) {
        newData[field] = JSON.parse(JSON.stringify(data[field]));
      }
    });
    return newData;
  } else {
    return data;
  }
}
// i need name of fuctnion that update data of deal

async function fetchUpdateDeal(id, data, params) {
  const test = {
    id,
    fields: {
      ...data,
    },
    params: {
      ...params,
    },
  };
  console.log('🚀 ~ fetchUpdateDeal ~ test:', JSON.stringify(test));

  const result = await BX24Service.callMethod('crm.deal.update', {
    id,
    fields: {
      ...data,
    },
    params: {
      ...params,
    },
  });
  return result;
}

function placementBind() {
  const url = window.location.href;
  // const url = 'https://faf7-31-162-11-18.ngrok-free.app/index.html';

  console.log('🚀 ~ url:', url);
  console.log('🚀 ~ placement_bind:', PLACEMENT_BIND);

  const result = BX24Service.callMethod('placement.bind', {
    PLACEMENT: PLACEMENT_BIND ?? 'DEFAULT',
    HANDLER: url,
    TITLE: 'Тестовая карточка',
  });
  return result;
}

export { fetchCurrentDeal, fetchFields, fetchUpdateDeal, placementBind };
