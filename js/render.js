function renderForm(parentSelector, fields, values = null, classList = []) {
  const parentElem = document.querySelector(parentSelector);

  if (!parentElem) {
    console.log('🚀 ~ renderForm ~ parentElem:', parentElem);
    console.error(`Parent element for form not found: ${parentSelector}`);
    return;
  }

  let fieldsHTML = '';

  Object.keys(fields).forEach((name) => {
    fieldsHTML += renderHtmlField(name, fields[name], values?.[name]);
  });

  let classes;

  if (Array.isArray(classList)) {
    classes = classList.join(' ');
  } else {
    classes = classList;
  }

  const formHTML = `
    <form id="deal-form" class="${classes}">
      ${fieldsHTML}
    </div>
    <div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
    </form>
  `;

  parentElem.innerHTML = formHTML;
}

function renderHtmlField(name, field, value) {
  if (!field) return;

  let htmlInput = '';
  let htmlLabel = `
     <label
          for="${name}"
          class="form-label"
          >${field.formLabel ?? field.title ?? 'Unknown field'}</label
        >
  `;

  switch (field.type) {
    case 'date':
      htmlInput = `
        <input
          id="${name}"
          name="${name}"
          type="date"
          value = "${new Date(value ?? '').toISOString().split('T')[0]}"
          class="form-control"
        />
      `;
      break;
    case 'string':
      htmlInput = `
        <input
          id="${name}"
          name="${name}"
          value = "${value ?? ''}"
          type="text"
          class="form-control"
        />
      `;
      break;
    case 'integer':
    case 'double':
      htmlInput = `
        <input
          id="${name}"
          name="${name}"
          value = "${value ?? ''}"
          type="number"
          class="form-control"
        />
      `;
      break;
    case 'char':
      htmlInput = `
        <input
          id="${name}"
          name="${name}"
          value = "${value ?? ''}"
          type="text"
          class="form-control"
        />
      `;
    case 'enumeration':
      const options = field.items?.map((item) => {
        return `<option value="${item.ID}">${item.VALUE}</option>`;
      });

      options.unshift(`<option value="">Не выбрано</option>`);

      htmlInput = `
        <select
          id="${name}"
          name="${name}"
          value = "${value ?? ''}"
          class="form-select">
          ${options.join('')}
        </select>
      `;
      break;

    default:
      console.error('Неизвестный тип поля', field.type);
      break;
  }

  let htmlField = `
    <div className="mb-3">
      ${htmlLabel}
      ${htmlInput}
    </div>
  `;

  return htmlField;
}

export { renderForm };
