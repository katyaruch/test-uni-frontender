const getData = () => {
  return fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .catch(error => console.error('Ошибка получения данных:', error));
};

const renderTable = (data) => {
  const html = data.length ? `
    <table>
      <thead>
        <tr>
          ${Object.keys(data[0]).map(th => `<th>${th}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${data.map(obj => `
          <tr>
            ${Object.values(obj).map(value => `<td>${value}</td>`).join('')}
          </tr>
        `).join('')}
        </tbody>
    </table>
  ` : `not found`;
   document.querySelector('.table').innerHTML = html;
}

const sortData = (data, key, ascending) => {
  return data.sort((a, b) => {
    if (a[key] < b[key]) {
      return ascending ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return ascending ? 1 : -1;
    }
    return 0;
  });
}

const searchFilter = (data, value) => {
  return data.filter((item) => {
    return Object.values(item).some((val) => {
      return val.toString().includes(value.toString());
    });
  });
};

const initTable = () => {
  let tableData = [];
  let filteredData = [];
  let ascending = true;
  
  getData().then(data => {
    tableData = data;
    filteredData = tableData.slice();
    renderTable(tableData);
    
    document.addEventListener('click', (event) => {
      if (event.target.closest('th')) {
        const key = event.target.textContent;
        tableData = sortData(filteredData, key, ascending);
        renderTable(tableData);
        ascending = !ascending;
      }
    });

    const searchInput = document.querySelector('[type="search"]');
    searchInput.addEventListener('input', (event) => {
      const search = event.target.value;
      if (search.length === 0) {
          renderTable(data);
      } else if (search.length > 2) {
          filteredData = searchFilter(tableData, search);
          renderTable(filteredData);
      }
    });
  });
}

initTable();